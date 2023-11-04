using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using ShareLink.Application.Common.Abstraction;
using ShareLink.Identity.Services;

namespace ShareLink.Identity;

public static class DependencyInjection
{
    public static IServiceCollection AddIdentityServices(
        this IServiceCollection services,
        IConfiguration configuration)
    {
        services.AddScoped<IIdentityContext, IdentityContext>();
        services.AddScoped<IIdentityService, IdentityService>();

        var identityConnectionString = configuration.GetConnectionString("Identity");
        var identityDbOptionsAction = new Action<DbContextOptionsBuilder>(
            options => options.UseNpgsql(identityConnectionString, builder => builder.MigrationsAssembly("ShareLink.Migrations"))
        );

        services.AddDbContext<IdentityDbContext>(identityDbOptionsAction);

        services.AddHttpContextAccessor();
        services.AddAuthentication().AddBearerToken(IdentityConstants.BearerScheme);
        services.AddAuthorizationBuilder();
        services.AddIdentityCore<ApplicationUser>()
            .AddEntityFrameworkStores<IdentityDbContext>()
            .AddApiEndpoints();

        return services;
    }
}
