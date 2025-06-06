namespace ShareLink.Links.Api.Configurations;

public class ContentModeratorConfiguration
{
    public static string SectionName = nameof(ContentModeratorConfiguration).Replace("Configuration", string.Empty);

    public string Key { get; set; } = string.Empty;

    public string Endpoint { get; set; } = string.Empty;
}