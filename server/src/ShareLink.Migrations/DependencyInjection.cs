using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using ShareLink.Migrations.Initializers;

namespace ShareLink.Migrations;

public static class DependencyInjection
{
    public static IServiceCollection AddMigrationsServices(
        this IServiceCollection services,
        IConfiguration configuration)
    {

        services.AddScoped<ApplicationDbContextInitializer>();
        services.AddScoped<IdentityDbContextInitializer>();

        return services;
    }
}
