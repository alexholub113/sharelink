using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using ShareLink.Links.Api.Abstraction;

namespace ShareLink.Dal;

public class Startup
{
    public static void ConfigureServices(IServiceCollection services, IConfiguration configuration)
    {
        var domainListConnectionString = configuration.GetConnectionString("ShareLink");
        var dbOptionsAction = new Action<DbContextOptionsBuilder>(
            x => x.UseNpgsql(domainListConnectionString, builder => builder.MigrationsAssembly("ShareLink.Migrations"))
        );
        services.AddDbContext<IApplicationDbContext, ApplicationDbContext>(dbOptionsAction);
        services.AddDbContext<ApplicationDbContext>(dbOptionsAction);
    }
}