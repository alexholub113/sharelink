using Microsoft.AspNetCore.Authentication.OAuth;
using Microsoft.EntityFrameworkCore;

namespace ShareLink.Identity.Services;

public class OAuthEventHandler(IdentityDbContext identityDbContext) : IOAuthEventHandler
{
    public async Task HandleOnCreating(OAuthCreatingTicketContext context)
    {
        var userEmail = context.User.GetProperty("email").ToString();
        var identityUser = await identityDbContext.Users
            .FirstOrDefaultAsync(u => u.Email == userEmail);

        if (identityUser is null)
        {
            identityUser = new ApplicationUser
            {
                Email = userEmail,
                UserName = userEmail
            };
            await identityDbContext.Users.AddAsync(identityUser);
            await identityDbContext.SaveChangesAsync();
        }
    }
}