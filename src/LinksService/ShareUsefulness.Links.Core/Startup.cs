using Microsoft.Extensions.DependencyInjection;
using ShareUsefulness.Links.Core.Data;
using ShareUsefulness.Links.Core.Services;

namespace ShareUsefulness.Links.Core;

public class Startup
{
    public static void ConfigureServices(IServiceCollection services)
    {
        services.AddSingleton<ILinkContext, LinkContext>();
        services.AddScoped<ILinkService, LinkService>();
    }
}
