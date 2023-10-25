using Microsoft.EntityFrameworkCore;
using ShareLink.Application.Common.Abstraction;
using ShareLink.Domain.Models;

namespace ShareLink.Dal;

public class LinkDbContext : DbContext, ILinkDbContext
{
    public LinkDbContext(DbContextOptions<LinkDbContext> options)
        : base(options)
    {
    }

    public DbSet<Link> Links => Set<Link>();
    
    public DbSet<Tag> Tags => Set<Tag>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.ApplyConfigurationsFromAssembly(typeof(LinkDbContext).Assembly);
        base.OnModelCreating(modelBuilder);
    }
}
