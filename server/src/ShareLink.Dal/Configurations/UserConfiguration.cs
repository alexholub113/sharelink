using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using ShareLink.Domain.Models;

namespace ShareLink.Dal.Configurations;

public class UserConfiguration : IEntityTypeConfiguration<User>
{

    public void Configure(EntityTypeBuilder<User> builder)
    {
        builder.HasKey(x => x.Id);

        builder.HasMany(u => u.LikedLinks)
            .WithMany(l => l.LikedBy)
            .UsingEntity(j => j.ToTable("UserLikedLinks"));

        // Configure the many-to-many relationship for SavedLinks
        builder.HasMany(u => u.SavedLinks)
            .WithMany(l => l.SavedBy)
            .UsingEntity(j => j.ToTable("UserSavedLinks"));
    }
}
