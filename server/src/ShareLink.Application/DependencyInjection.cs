using System.Reflection;
using FluentValidation;
using MediatR;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using ShareLink.Application.Common.Behaviours;
using ShareLink.Application.Common.Configurations;
using ShareLink.Application.Common.Services;

namespace ShareLink.Application;

public static class DependencyInjection
{
    public static IServiceCollection AddApplicationServices(
        this IServiceCollection services,
        IConfiguration configuration)
    {
        services.AddAutoMapper(Assembly.GetExecutingAssembly());
        services.AddValidatorsFromAssembly(Assembly.GetExecutingAssembly());
        services.Configure<GoogleApiConfiguration>(configuration.GetSection(GoogleApiConfiguration.SectionName));
        services.Configure<ContentModeratorConfiguration>(configuration.GetSection(ContentModeratorConfiguration.SectionName));

        services.AddScoped<IUrlParser, UrlParser>();
        services.AddScoped<IGoogleApiService, GoogleApiService>();
        services.AddScoped<IUserInteractionsService, UserInteractionsService>();
        services.AddScoped<IContentModerator, ContentModerator>();

        services.AddMediatR(
            cfg =>
            {
                cfg.RegisterServicesFromAssembly(Assembly.GetExecutingAssembly());
                cfg.AddBehavior(typeof(IPipelineBehavior<,>), typeof(UnhandledExceptionBehaviour<,>));
                cfg.AddBehavior(typeof(IPipelineBehavior<,>), typeof(ValidationBehaviour<,>));
            });

        return services;
    }
}