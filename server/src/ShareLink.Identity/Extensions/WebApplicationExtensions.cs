using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using ShareLink.Identity.Api.Services;

namespace ShareLink.Identity.Api.Extensions;

public static class WebApplicationExtensions
{
    public static async Task InitializeIdentity(this WebApplication webApplication)
    {
        using var scope = webApplication.Services.CreateScope();
        var services = scope.ServiceProvider;
        var identityInitializer = services.GetRequiredService<IdentityInitializer>();
        await identityInitializer.InitialiseAsync();
    }
}