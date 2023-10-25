namespace ShareLink.Application.Common.Configurations;

public class GoogleApiConfiguration
{
    public static string SectionName = nameof(GoogleApiConfiguration).Replace("Configuration", string.Empty);
    
    public string? ApiKey { get; set; }

    public string? ApplicationName { get; set; }
}
