using ShareLink.Domain.Enums;

namespace ShareLink.Domain.Models;

public class Link
{
    public required string Id { get; set; }

    public required string Title { get; set; }

    public LinkType Type { get; set; }

    public YoutubeData? Youtube { get; set; }

    public int Likes { get; set; }

    public required string UserId { get; set; }

    public required string UserDisplayName { get; set; }

    public DateTime CreatedAt { get; set; }

    public required IReadOnlyCollection<Tag> Tags { get; set; }
}
