using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;

namespace ShareLink.Dal.Migrations.Initializers;

public static class InitializerExtensions
{
    public static async Task InitialiseDatabases(this WebApplication app)
    {
        using var scope = app.Services.CreateScope();

        var applicationInitializer = scope.ServiceProvider.GetRequiredService<ApplicationDbContextInitializer>();
        var identityInitializer = scope.ServiceProvider.GetRequiredService<IdentityDbContextInitializer>();

        await Task.WhenAll(applicationInitializer.InitialiseAsync(), identityInitializer.InitialiseAsync());
    }
}
