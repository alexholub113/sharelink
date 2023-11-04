using ShareLink.Dal;

namespace ShareLink.Migrations.ContextFactory
{
    public class ApplicationDbContextFactory : DbContextFactoryBase<ApplicationDbContext>
    {
        protected override string DataBaseName => "ShareLink";
    }
}
