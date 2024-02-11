using System.Collections.Immutable;
using System.Reflection;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.Features;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Abstractions;
using Microsoft.AspNetCore.Mvc.ActionConstraints;
using Microsoft.AspNetCore.Mvc.ApplicationModels;
using Microsoft.AspNetCore.Mvc.Controllers;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.AspNetCore.Mvc.Infrastructure;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using Microsoft.AspNetCore.Mvc.Routing;
using Microsoft.AspNetCore.Routing;
using ShareLink.Infrastructure.Abstractions;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;

namespace ShareLink.Infrastructure.Commands;

public static class CommandEndpointRouteBuilderExtensions
{
    private static readonly TypeInfo[] FakePostAsyncControllerTypes = { typeof(FakePostAsyncController).GetTypeInfo() };
    private static readonly string[] PostHttpMethods = { "POST" };

    /// <summary>Adds endpoints for command actions to the <see cref="IEndpointRouteBuilder"/> without specifying any routes.</summary>
    /// <param name="endpoints">The <see cref="IEndpointRouteBuilder"/>.</param>
    public static void MapCommands(this IEndpointRouteBuilder endpoints)
    {
        RegisterCommandEndpoints(endpoints);
    }

    private static void RegisterCommandEndpoints(IEndpointRouteBuilder endpoints)
    {
        var services = endpoints.ServiceProvider;
        var descriptors = services.GetService<IEnumerable<CommandDescriptor>>() ?? Array.Empty<CommandDescriptor>();
        foreach (var descriptor in descriptors)
        {
            var actionConstraints = new List<IActionConstraintMetadata>
                { new HttpMethodActionConstraint(PostHttpMethods) };
            var commandTypeInfo = descriptor.CommandType.GetTypeInfo();
            var defaultEndpointMetadata = new object[]
            {
                new ControllerAttribute(),
                new CommandHandlerAttribute(),
                new RouteAttribute(descriptor.Route),
                new HttpPostAttribute(),
                new HttpMethodMetadata(PostHttpMethods),
            };
            var endpointMetadata = defaultEndpointMetadata
                .Concat(commandTypeInfo.GetCustomAttributes())
                .Concat(descriptor.Metadata)
                .ToArray();
            var extraFilters = descriptor.Filters.Select(x => x(services)).ToArray();
            var filterDescriptors = MakeFilterDescriptors(endpoints.ServiceProvider, commandTypeInfo)
                .Concat(extraFilters)
                .OrderBy(x => x.Order)
                .ToList();
            var filterEndpointMetadata = filterDescriptors.Select(x => x.Filter).ToArray();
            var finalEndpointMetadata = endpointMetadata.Concat(filterEndpointMetadata).Distinct().ToList();
            var parameterDescriptors = descriptor
                .MethodInfo
                .GetParameters()
                .Select(
                    (x, i) => new ParameterDescriptor
                    {
                        Name = x.Name!,
                        ParameterType = x.ParameterType,
                        BindingInfo = i == 0
                            ? new BindingInfo
                            {
                                BindingSource = BindingSource.Body,
                                RequestPredicate = _ => true,
                            }
                            : new BindingInfo
                            {
                                BindingSource = BindingSource.Special,
                            }
                    })
                .ToList();
            var properties = new Dictionary<object, object?>();
            {
                var apiDescriptionActionData = new ApiDescriptionActionData();
                properties[apiDescriptionActionData.GetType()] = apiDescriptionActionData;
            }

            var controllerActionDescriptor = new ControllerActionDescriptor
            {
                ActionConstraints = actionConstraints,
                ActionName = descriptor.MethodInfo.Name,
                AttributeRouteInfo = new AttributeRouteInfo
                {
                    Name = default,
                    Order = 0,
                    SuppressLinkGeneration = false,
                    SuppressPathMatching = false,
                    Template = descriptor.Route
                },
                BoundProperties = new List<ParameterDescriptor>(),
                ControllerName = descriptor.CommandType.Name,
                ControllerTypeInfo = commandTypeInfo,
                EndpointMetadata = finalEndpointMetadata,
                FilterDescriptors = filterDescriptors,
                MethodInfo = descriptor.MethodInfo,
                Parameters = parameterDescriptors,
                Properties = properties,
                RouteValues = new Dictionary<string, string?>
                {
                    { "action", CommandConstants.CommandMethodName },
                    { "controller", descriptor.ModuleName }
                }
            };

            var builder = endpoints.Map(descriptor.Route, InvokeCommandAction);
            builder.WithDisplayName(
                $"{descriptor.CommandType.FullName}.{descriptor.MethodInfo.Name} " +
                $"({descriptor.CommandType.Assembly.GetName().Name}) - " +
                $"{string.Join(", ", PostHttpMethods)} {descriptor.Route}");
            finalEndpointMetadata.ForEach(x => builder.WithMetadata(x));
            builder.WithMetadata(controllerActionDescriptor);
            actionConstraints.ForEach(x => builder.WithMetadata(x));
            builder.WithMetadata(new RouteNameMetadata($"{descriptor.Route}"));
        }
    }

    private static ImmutableList<FilterDescriptor> MakeFilterDescriptors(
        IServiceProvider services,
        TypeInfo commandTypeInfo)
    {
        var types = FakePostAsyncControllerTypes.Concat(new[] { commandTypeInfo });
        var applicationModelProviderContext = new ApplicationModelProviderContext(types);
        var applicationModelProviders = services.GetRequiredService<IEnumerable<IApplicationModelProvider>>();
        foreach (var amp in applicationModelProviders)
        {
            amp.OnProvidersExecuting(applicationModelProviderContext);
            amp.OnProvidersExecuted(applicationModelProviderContext);
        }

        var mvcOptions = services.GetService<IOptions<MvcOptions>>();
        var globalFilters =
            (mvcOptions?.Value != null ? mvcOptions.Value.Filters.ToArray() : Array.Empty<IFilterMetadata>())
            .Select(x => new FilterDescriptor(x, 10))
            .ToArray();
        var modelStateInvalidFilter = new ModelStateInvalidFilter(
            new ApiBehaviorOptions
            {
                SuppressMapClientErrors = true,
                InvalidModelStateResponseFactory = context =>
                {
                    var apiBehaviorOptions = context.HttpContext.RequestServices
                        .GetRequiredService<IOptions<ApiBehaviorOptions>>()
                        .Value;
                    return apiBehaviorOptions.InvalidModelStateResponseFactory(context);
                },
            },
            services.GetRequiredService<ILogger<ModelStateInvalidFilter>>());
        var defaultFilters = new[]
        {
            new FilterDescriptor(modelStateInvalidFilter, 30),
        };
        var filterDescriptors = applicationModelProviderContext
            .Result
            .Controllers
            .SelectMany(x => x.Filters)
            .Select(x => new FilterDescriptor(x, 20))
            .Concat(defaultFilters)
            .Concat(globalFilters)
            .ToImmutableList();
        return filterDescriptors;
    }

    private static async Task InvokeCommandAction(HttpContext httpContext)
    {
        using var scope = httpContext.RequestServices.CreateScope();
        var endpointFeature = httpContext.Features.Get<IEndpointFeature>();
        var actionDescriptor = endpointFeature
            ?.Endpoint
            ?.Metadata
            .Where(x => x is ControllerActionDescriptor)
            .Cast<ControllerActionDescriptor>()
            .First();
        var actionContext = new ActionContext(httpContext, new RouteData(), actionDescriptor!);
        var actionInvokerFactory = scope.ServiceProvider.GetRequiredService<IActionInvokerFactory>();
        var invoker = actionInvokerFactory.CreateInvoker(actionContext);
        await invoker!.InvokeAsync();
    }

    [Route("/fake1/[controller]/[action]")]
    [ApiController]
    public class FakePostAsyncController : Controller
    {
        [HttpPost]
        [Authorize]
        public Task<string?> Handle([FromBody] string? request, CancellationToken token = default)
        {
            throw new NotImplementedException();
        }
    }
}