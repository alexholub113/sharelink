using System.Reflection;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.DependencyInjection;

namespace ShareLink.Infrastructure.Abstractions;

public class CommandDescriptor(
    Type commandType,
    MethodInfo methodInfo,
    string moduleName,
    HttpMethod method,
    string route)
{
    private readonly List<object> _metadata = new List<object>();

    public Type CommandType => commandType;

    public string ModuleName => moduleName;

    public HttpMethod Method => method;

    public string Route { get; set; } = route;

    public MethodInfo MethodInfo => methodInfo;

    public List<Func<IServiceProvider, FilterDescriptor>> Filters { get; } = new List<Func<IServiceProvider, FilterDescriptor>>();

    public IReadOnlyList<object> Metadata => _metadata;

    public CommandDescriptor AddFilter<TFilter>()
        where TFilter : IFilterMetadata
    {
        Filters.Add(services =>
        {
            var instance = ActivatorUtilities.CreateInstance<TFilter>(services);
            return new FilterDescriptor(instance, 20);
        });
        return this;
    }

    public CommandDescriptor AddRoles(params string[] roles) =>
        roles.Aggregate(this, (descriptor, role) => descriptor.AddMetadata(new AuthorizeAttribute { Roles = role }));

    public CommandDescriptor AddMetadata(params object[] items)
    {
        _metadata.AddRange(items);
        return this;
    }
}