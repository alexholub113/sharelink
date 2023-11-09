using ShareLink.Domain.Enums;

namespace ShareLink.Domain.Models;

public class Link
{
    public required string Id { get; init; }

    public required string Title { get; init; }

    public LinkType Type { get; init; }

    public YoutubeData? Youtube { get; init; }

    public ICollection<User> LikedBy { get; } = new List<User>();

    public ICollection<User> SavedBy { get; } = new List<User>();

    public required string UserId { get; init; }

    public required string UserNickname { get; init; }

    public DateTime CreatedAt { get; init; }

    public required IReadOnlyCollection<Tag> Tags { get; init; }
}
