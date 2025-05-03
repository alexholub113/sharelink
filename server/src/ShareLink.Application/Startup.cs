using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using ShareLink.Infrastructure.Extensions;
using ShareLink.Links.Api.Configurations;
using ShareLink.Links.Api.Services;

namespace ShareLink.Links.Api;

public class Startup
{
    public static void ConfigureServices(IServiceCollection services, IConfiguration configuration)
    {
        services.Configure<GoogleApiConfiguration>(configuration.GetSection(GoogleApiConfiguration.SectionName));
        services.Configure<ContentModeratorConfiguration>(configuration.GetSection(ContentModeratorConfiguration.SectionName));
        services.AddScoped<IUrlParser, UrlParser>();
        services.AddScoped<IGoogleApiService, GoogleApiService>();
        services.AddScoped<IContentModerator, ContentModerator>();

        services.AddEndpoints(typeof(Startup).Assembly);
    }
}