using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using ShareLink.Migrations.Initializers;

namespace ShareLink.Migrations;

public class Startup
{
    public static void ConfigureServices(IServiceCollection services, IConfiguration configuration)
    {
        services.AddScoped<ApplicationDbContextInitializer>();
        services.AddScoped<IdentityDbContextInitializer>();
    }
}