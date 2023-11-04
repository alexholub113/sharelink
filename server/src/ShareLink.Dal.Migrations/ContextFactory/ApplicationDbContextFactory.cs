namespace ShareLink.Dal.Migrations.ContextFactory
{
    public class ApplicationDbContextFactory : DbContextFactoryBase<ApplicationDbContext>
    {
        protected override string DataBaseName => "ShareLink";
    }
}
