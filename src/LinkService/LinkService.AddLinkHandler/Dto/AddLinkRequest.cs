using System.Collections.Generic;
using System.Linq;

namespace LinkService.AddLinkHandler.Dto;

public class AddLinkRequest
{
    public string Title { get; set; } = null!;

    public string Type { get; set; } = null!;

    public string Url { get; set; } = null!;

    public List<string> Tags { get; set; } = null!;

    public string[] Validate()
    {
        var errors = new List<string>();
        if (string.IsNullOrEmpty(Title))
        {
            errors.Add($"{nameof(Title)} is required");
        }

        if (string.IsNullOrEmpty(Type))
        {
            errors.Add($"{nameof(Type)} is required");
        }

        if (string.IsNullOrEmpty(Url))
        {
            errors.Add($"{nameof(Url)} is required");
        }

        if (Tags == null || Tags.Count == 0 || Tags.Any(string.IsNullOrEmpty))
        {
            errors.Add($"{nameof(Tags)} is required");
        }

        return errors.ToArray();
    }
}
