using ShareLink.Domain.Enums;

namespace ShareLink.Domain.Models;

public class Link
{
    public string Id { get; set; } = null!;
    
    public string Title { get; set; } = null!;
    
    public LinkType Type { get; set; }
    
    public YoutubeData? Youtube { get; set; }

    public int Likes { get; set; }

    public string User { get; set; } = null!;

    public DateTime CreatedAt { get; set; }

    public IReadOnlyCollection<Tag> Tags { get; set; } = new List<Tag>();
}
