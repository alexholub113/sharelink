using ShareLink.Common.Exceptions;

namespace ShareLink.Domain.Models;

public class Tag
{
    public required string Name { get; init; }

    public IReadOnlyCollection<Link> Links { get; set; } = new List<Link>();

    public static Tag Create(string name)
    {
        if (string.IsNullOrEmpty(name) || name.Length < ValidationRules.Tag.MinTagLength || name.Length > ValidationRules.Tag.MaxTagLength)
        {
            throw new ActionFailedException("Tag name is invalid.");
        }

        return new Tag
        {
            Name = name.ToLower()
        };
    }
}