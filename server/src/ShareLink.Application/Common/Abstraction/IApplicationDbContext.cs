using Microsoft.EntityFrameworkCore;
using ShareLink.Domain.Models;

namespace ShareLink.Application.Common.Abstraction;

public interface IApplicationDbContext
{
    DbSet<Link> Links { get; }

    DbSet<Tag> Tags { get; }

    Task<int> SaveChangesAsync(CancellationToken cancellationToken);
}