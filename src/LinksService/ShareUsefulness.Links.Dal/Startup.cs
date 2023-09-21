using Links.Dal;
using Microsoft.Extensions.DependencyInjection;

namespace ShareUsefulness.Links.Dal;

public static class Startup
{
    public static void ConfigureServices(IServiceCollection services)
    {
        services.AddSingleton<IDataStore, DataStore>();
    }
}
