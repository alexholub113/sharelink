namespace LinkService.Common.Models;

public class Link
{
    public string Id { get; set; }

    public LinkType Type { get; set; }
    
    public string Title { get; set; }
    
    public string Url { get; set; }
    
    public List<string> Tags { get; set; }
    
    public int Likes { get; set; }
    
    public DateTime CreatedAt { get; set; }
}
