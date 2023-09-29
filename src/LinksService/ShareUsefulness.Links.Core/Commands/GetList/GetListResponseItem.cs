using ShareUsefulness.Links.Core.Entities;

namespace ShareUsefulness.Links.Core.Commands.GetList;

public class GetListResponseItem
{
    public string Id { get; set; }

    public LinkType Type { get; set; }

    public string Title { get; set; }
    
    public string Url { get; set; }
    
    public string[] Tags { get; set; }
    
    public int Likes { get; set; }
    
    public DateTime CreatedAt { get; set; }
}
