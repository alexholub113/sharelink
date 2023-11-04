using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

namespace ShareLink.Dal.Migrations.ContextFactory
{
    public class IdentityDbContextFactory : DbContextFactoryBase<IdentityDbContext>
    {
        protected override string DataBaseName => "Identity";
    }
}
