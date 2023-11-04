using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using ShareLink.Dal.Migrations.Initializers;

namespace ShareLink.Dal.Migrations;

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
