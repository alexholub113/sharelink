using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

namespace ShareLink.Migrations.ContextFactory
{
    public class IdentityDbContextFactory : DbContextFactoryBase<IdentityDbContext>
    {
        protected override string DataBaseName => "Identity";
    }
}
