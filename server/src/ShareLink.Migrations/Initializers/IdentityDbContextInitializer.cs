using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using ShareLink.Identity;

namespace ShareLink.Migrations.Initializers;

public class IdentityDbContextInitializer(ILogger<AppIdentityDbContext> logger, AppIdentityDbContext context)
{
    public async Task InitialiseAsync()
    {
        try
        {
            await context.Database.MigrateAsync();
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "An error occurred while initialising the database.");
            throw;
        }
    }
}