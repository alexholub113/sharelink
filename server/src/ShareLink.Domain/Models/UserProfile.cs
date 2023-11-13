namespace ShareLink.Domain.Models;

public class UserProfile
{
    public required string UserId { get; init; }

    public IList<Link> LikedLinks { get; init; } = new List<Link>();

    public IList<Link> SavedLinks { get; init; } = new List<Link>();
}