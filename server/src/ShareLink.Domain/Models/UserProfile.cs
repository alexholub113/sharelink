namespace ShareLink.Domain.Models;

public class UserProfile
{
    public required string UserId { get; init; }

    public IList<Link> LikedLinks { get; init; } = new List<Link>();

    public IList<Link> SavedLinks { get; init; } = new List<Link>();

    public IList<Link> DislikedLinks { get; init; } = new List<Link>();

    public void ToggleLike(Link link)
    {
        if (LikedLinks.Remove(link))
        {
            return;
        }

        DislikedLinks.Remove(link);
        LikedLinks.Add(link);
    }

    public void ToggleDislike(Link link)
    {
        if (DislikedLinks.Remove(link))
        {
            return;
        }

        LikedLinks.Remove(link);
        DislikedLinks.Add(link);
    }

    public void ToggleSave(Link link)
    {
        if (!SavedLinks.Remove(link))
        {
            SavedLinks.Add(link);
        }
    }
}