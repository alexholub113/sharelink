using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Npgsql;
using ShareLink.Application.Common.Abstraction;

namespace ShareLink.Dal;

public static class DependencyInjection
{
    public static IServiceCollection AddInfrastructureServices(
        this IServiceCollection services,
        IConfiguration configuration)
    {
        var domainListConnectionString = configuration.GetConnectionString("ShareLink");
        var dbOptionsAction = new Action<DbContextOptionsBuilder>(
            x => x.UseNpgsql(domainListConnectionString)
        );
        services.AddDbContext<ILinkDbContext, LinkDbContext>(dbOptionsAction);
        services.AddDbContext<LinkDbContext>(dbOptionsAction);

        NpgsqlConnection.GlobalTypeMapper.UseJsonNet();

        services.AddScoped<LinkDbContextInitializer>();

        return services;
    }
}