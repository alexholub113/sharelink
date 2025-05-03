using Microsoft.EntityFrameworkCore;
using ShareLink.Links.Api.Abstraction;
using ShareLink.Links.Api.Models;

namespace ShareLink.Dal;

public class ApplicationDbContext : DbContext, IApplicationDbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
    {
    }

    public DbSet<Link> Links => Set<Link>();

    public DbSet<Tag> Tags => Set<Tag>();

    public DbSet<UserProfile> UserProfiles => Set<UserProfile>();
    public void Push<T>(T entity)
    {
        if (entity != null) Add(entity);
    }

    public void Delete<T>(T entity)
    {
        if (entity != null) Remove(entity);
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.ApplyConfigurationsFromAssembly(typeof(ApplicationDbContext).Assembly);
        base.OnModelCreating(modelBuilder);
    }
}