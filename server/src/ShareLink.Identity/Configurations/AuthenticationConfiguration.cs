public class AuthenticationConfiguration
{
    public static string SectionName = nameof(AuthenticationConfiguration).Replace("Configuration", string.Empty);

    public string? RedirectUri { get; set; }
}