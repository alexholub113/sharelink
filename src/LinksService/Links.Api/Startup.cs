using Links.Dal;
using Microsoft.Extensions.DependencyInjection;

namespace ShareUsefulness.Links.Api;

[Amazon.Lambda.Annotations.LambdaStartup]
public class Startup
{
    public void ConfigureServices(IServiceCollection services)
    {
        services.AddSingleton<IDataStore, DataStore>();
    }
}
