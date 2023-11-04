using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;

namespace ShareLink.Migrations.ContextFactory;

public abstract class DbContextFactoryBase<T> : IDesignTimeDbContextFactory<T>
    where T : DbContext
{
    protected abstract string DataBaseName { get; }

    public T CreateDbContext(string[] args)
    {
        var path = Path.Combine(Directory.GetCurrentDirectory(), args[0]);

        var config = new ConfigurationBuilder()
            .SetBasePath(Path.GetDirectoryName(path))
            .AddJsonFile(Path.GetFileName(path))
            .Build();

        var optionsBuilder = new DbContextOptionsBuilder<T>();
        optionsBuilder.UseNpgsql(
            config.GetConnectionString(DataBaseName),
            builder => builder.MigrationsAssembly(GetType().Assembly.GetName().Name));

        return (T)Activator.CreateInstance(typeof(T), optionsBuilder.Options)!;
    }
}
