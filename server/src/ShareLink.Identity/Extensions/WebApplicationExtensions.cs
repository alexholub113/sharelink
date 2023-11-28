using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using ShareLink.Identity.Services;

namespace ShareLink.Identity.Extensions;

public static class WebApplicationExtensions
{
    public static async Task InitializeIdentity(this WebApplication webApplication)
    {
        var identityInitializer = webApplication.Services.GetRequiredService<IdentityInitializer>();
        await identityInitializer.InitialiseAsync();
    }
}