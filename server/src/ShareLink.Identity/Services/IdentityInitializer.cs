using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;

namespace ShareLink.Identity.Api.Services;

internal class IdentityInitializer(
    IOptions<AuthenticationConfiguration> authenticationConfiguration,
    UserManager<ApplicationUser> userManager,
    RoleManager<IdentityRole> roleManager)
{
    public async Task InitialiseAsync()
    {
        await SeedSuperAdmin();
    }

    private async Task SeedSuperAdmin()
    {
        var superAdminEmail = authenticationConfiguration.Value.SuperAdminEmail;
        if (string.IsNullOrEmpty(authenticationConfiguration.Value.SuperAdminEmail))
        {
            return;
        }

        if (!await roleManager.RoleExistsAsync(Roles.SuperAdmin))
        {
            await roleManager.CreateAsync(new IdentityRole(Roles.SuperAdmin));
        }

        var user = await userManager.Users.SingleOrDefaultAsync(x => x.Email == superAdminEmail);
        if (user != null)
        {
            var isAdmin = await userManager.IsInRoleAsync(user, Roles.SuperAdmin);
            if (!isAdmin)
            {
                await userManager.AddToRoleAsync(user, Roles.SuperAdmin);
            }
        }
    }
}