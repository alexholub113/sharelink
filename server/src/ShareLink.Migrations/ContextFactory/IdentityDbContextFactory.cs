using ShareLink.Identity;

namespace ShareLink.Migrations.ContextFactory
{
    public class IdentityDbContextFactory : DbContextFactoryBase<AppIdentityDbContext>
    {
        protected override string DataBaseName => "Identity";
    }
}