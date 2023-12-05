using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using ShareLink.Domain.Enums;
using ShareLink.Domain.Models;
using ShareLink.Domain.Models.ValueObjects;

namespace ShareLink.Dal.Configurations;

public class LinkConfiguration : IEntityTypeConfiguration<Link>
{
    public void Configure(EntityTypeBuilder<Link> builder)
    {
        builder.HasIndex(x => x.Title);
        builder.HasIndex(x => x.UserId);
        builder.HasIndex(x => x.Type);
        builder.HasIndex(x => x.CreatedAt);

        builder.Property(x => x.Title).UseCollation("secondary_strength").IsRequired();
        builder.Property(x => x.Type).IsRequired();
        builder.Property(x => x.UserId).IsRequired();
        builder.Property(x => x.UserNickname).IsRequired();
        builder.Property(x => x.CreatedAt).IsRequired();

        builder.Property(e => e.Type)
            .HasConversion(
                v => v.ToString(),
                v => (LinkType)Enum.Parse(typeof(LinkType), v));

        builder.OwnsOne<YoutubeData>(x => x.Youtube, d =>
            {
                d.ToJson();
            });
        builder.OwnsOne<UnknownSourceData>(x => x.UnknownSource, d =>
        {
            d.ToJson();
        });

        builder.HasMany(x => x.Tags)
            .WithMany(x => x.Links);
    }
}