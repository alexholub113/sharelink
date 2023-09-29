using ShareUsefulness.Infrastructure.Command;
using ShareUsefulness.Links.Core.Entities;

namespace ShareUsefulness.Links.Core.Commands.AddLink;

public class AddLinkRequest : ICommandRequest
{
    public string Title { get; set; } = null!;

    public LinkType Type { get; set; }

    public string Url { get; set; } = null!;

    public string[] Tags { get; set; } = Array.Empty<string>();

    public IEnumerable<string> Validate()
    {
        if (string.IsNullOrEmpty(Title))
        {
            yield return $"{nameof(Title)} is required";
        }
        
        if (Type == null)
        {
            yield return $"{nameof(Type)} is required";
        }
        
        if (string.IsNullOrEmpty(Url))
        {
            yield return $"{nameof(Url)} is required";
        }

        if (Tags.Length == 0 || Tags.Any(string.IsNullOrEmpty))
        {
            yield return $"{nameof(Tags)} is required";
        }
    }
}
