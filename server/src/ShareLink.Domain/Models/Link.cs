using ShareLink.Domain.Enums;

namespace ShareLink.Domain.Models;

public class Link
{
    public required string Id { get; init; }

    public required string Title { get; init; }

    public LinkType Type { get; init; }

    public YoutubeData? Youtube { get; init; }

    public ICollection<UserProfile> LikedBy { get; } = new List<UserProfile>();

    public ICollection<UserProfile> SavedBy { get; } = new List<UserProfile>();

    public required string UserId { get; init; }

    public required string UserNickname { get; init; }

    public DateTime CreatedAt { get; init; }

    public required IReadOnlyCollection<Tag> Tags { get; init; }
}
