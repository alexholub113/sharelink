using Microsoft.Extensions.DependencyInjection;
using ShareUsefulness.Infrastructure.Command;
using ShareUsefulness.Links.Core.Commands.AddLink;
using ShareUsefulness.Links.Core.Commands.GetList;
using ShareUsefulness.Links.Core.Data;

namespace ShareUsefulness.Links.Core;

public class Startup
{
    public static void ConfigureServices(IServiceCollection services)
    {
        services.AddSingleton<ILinkContext, LinkContext>(_ => {
            var connectionString = Environment.GetEnvironmentVariable("MONGO_CONNECTION_STRING");
            var databaseName = Environment.GetEnvironmentVariable("MONGO_DATABASE_NAME");
            return new LinkContext(connectionString, databaseName);
        });

        services.AddTransient<ICommandHandler<GetListRequest, GetListResponse>, GetListHandler>();
        services.AddTransient<ICommandHandler<AddLinkRequest, string>, AddLinkHandler>();
    }
}
