using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using ShareLink.Application.Common.Abstraction;

namespace ShareLink.Dal;

public static class DependencyInjection
{
    public static IServiceCollection AddDalServices(
        this IServiceCollection services,
        IConfiguration configuration)
    {
        var domainListConnectionString = configuration.GetConnectionString("ShareLink");
        var dbOptionsAction = new Action<DbContextOptionsBuilder>(
            x => x.UseNpgsql(domainListConnectionString, builder => builder.MigrationsAssembly("ShareLink.Migrations"))
        );
        services.AddDbContext<IApplicationDbContext, ApplicationDbContext>(dbOptionsAction);
        services.AddDbContext<ApplicationDbContext>(dbOptionsAction);

        return services;
    }
}
