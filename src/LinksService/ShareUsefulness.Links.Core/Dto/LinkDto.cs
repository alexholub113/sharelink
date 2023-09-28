using System.Diagnostics.CodeAnalysis;

namespace ShareUsefulness.Links.Api.Dto;

public class LinkDto
{
    public string Id { get; init; }

    public string ProviderName { get; init; }
    
    public string Type { get; init; }
    
    public string Title { get; init; }
    
    public string Url { get; init; }
    
    public string[] Tags { get; init; }
    
    public int Likes { get; init; }
    
    public DateTime CreatedDate { get; init; }
}
