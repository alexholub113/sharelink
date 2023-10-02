using ShareUsefulness.Links.Core.Models;

namespace ShareUsefulness.Links.Core.Commands.AddLink;

public class AddLinkRequest
{
    public string Title { get; set; } = null!;

    public string Type { get; set; } = null!;

    public string Url { get; set; } = null!;

    public List<string> Tags { get; set; } = null!;

    public IEnumerable<string> Validate()
    {
        if (string.IsNullOrEmpty(Title))
        {
            yield return $"{nameof(Title)} is required";
        }

        if (string.IsNullOrEmpty(Type))
        {
            yield return $"{nameof(Type)} is required";
        }

        if (string.IsNullOrEmpty(Url))
        {
            yield return $"{nameof(Url)} is required";
        }

        if (Tags == null || Tags.Count == 0 || Tags.Any(string.IsNullOrEmpty))
        {
            yield return $"{nameof(Tags)} is required";
        }
    }
}
