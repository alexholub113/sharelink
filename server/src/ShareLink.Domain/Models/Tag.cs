namespace ShareLink.Domain.Models;

public class Tag
{
    public string Name { get; set; } = null!;

    public IReadOnlyCollection<Link> Links { get; set; } = new List<Link>();
}
