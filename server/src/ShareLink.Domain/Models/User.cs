namespace ShareLink.Domain.Models;

public class User
{
    public required string Id { get; init; }

    public IList<Link> LikedLinks { get; init; } = new List<Link>();

    public IList<Link> SavedLinks { get; init; } = new List<Link>();
}
