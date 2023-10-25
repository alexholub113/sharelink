using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Npgsql;

namespace ShareLink.Dal;

public class LinkContextFactory: IDesignTimeDbContextFactory<LinkDbContext>
{
    public LinkDbContext CreateDbContext(string[] args)
    {
        var optionsBuilder = new DbContextOptionsBuilder<LinkDbContext>();
        optionsBuilder.UseNpgsql("Server=127.0.0.1;User Id=testuser;Password=testuser;Database=sharelink;");

        NpgsqlConnection.GlobalTypeMapper.UseJsonNet();

        return new LinkDbContext(optionsBuilder.Options);
    }
}
