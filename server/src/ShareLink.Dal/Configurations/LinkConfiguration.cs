using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using ShareLink.Domain.Enums;
using ShareLink.Domain.Models;

namespace ShareLink.Dal.Configurations;

public class LinkConfiguration : IEntityTypeConfiguration<Link>
{
    public void Configure(EntityTypeBuilder<Link> builder)
    {
        builder.HasIndex(x => x.Title);
        builder.HasIndex(x => x.UserId);
        builder.HasIndex(x => x.Type);
        builder.HasIndex(x => x.CreatedAt);

        builder.Property(x => x.Title).IsRequired();
        builder.Property(x => x.Type).IsRequired();
        builder.Property(x => x.UserId).IsRequired();
        builder.Property(x => x.UserDisplayName).IsRequired();
        builder.Property(x => x.CreatedAt).IsRequired();

        builder.Property(e => e.Type)
            .HasConversion(
                v => v.ToString(),
                v => (LinkType)Enum.Parse(typeof(LinkType), v));

        builder.Property(x => x.Youtube)
            .HasColumnType("jsonb")
            .HasDefaultValueSql("'{}'::jsonb");

        builder.HasMany(x => x.Tags)
            .WithMany(x => x.Links);
    }
}
