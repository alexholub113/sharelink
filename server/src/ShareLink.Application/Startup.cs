using System.Text.RegularExpressions;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using ShareLink.Application.Configurations;
using ShareLink.Application.Services;
using ShareLink.Infrastructure.Commands;

namespace ShareLink.Application;

public class Startup
{
    public static void ConfigureServices(IServiceCollection services, IConfiguration configuration)
    {
        services.Configure<GoogleApiConfiguration>(configuration.GetSection(GoogleApiConfiguration.SectionName));
        services.Configure<ContentModeratorConfiguration>(configuration.GetSection(ContentModeratorConfiguration.SectionName));
        services.AddScoped<IUrlParser, UrlParser>();
        services.AddScoped<IGoogleApiService, GoogleApiService>();
        services.AddScoped<IContentModerator, ContentModerator>();

        services.AddCommandsFromAssembly<Startup>((type, builder) =>
        {
            var name = Regex.Replace(type.Name, @"Handler$", string.Empty).ToLowerInvariant();
            builder.Route = $"/api/v1/links/{name}";
        });
    }
}