using ShareLink.Common.Exceptions;
using ShareLink.Links.Api.Constants;
using ShareLink.Links.Api.Enums;
using ShareLink.Links.Api.Models.ValueObjects;

namespace ShareLink.Links.Api.Models;

public class Link
{
    public required string Id { get; init; }

    public string Title { get; private set; } = string.Empty;

    public LinkType Type { get; init; }

    public YoutubeData? Youtube { get; init; }

    public UnknownSourceData? UnknownSource { get; init; }

    public ICollection<UserProfile> LikedBy { get; } = new List<UserProfile>();

    public ICollection<UserProfile> DislikedBy { get; } = new List<UserProfile>();

    public ICollection<UserProfile> SavedBy { get; } = new List<UserProfile>();

    public required string UserId { get; init; }

    public required string UserNickname { get; init; }

    public DateTime CreatedAt { get; init; }

    public IReadOnlyCollection<Tag> Tags { get; private set; } = new List<Tag>();

    public void Update(string title, IReadOnlyCollection<Tag> tags)
    {
        Validate(title, tags);

        Title = title;
        Tags = tags;
    }

    public static Link Create(
        string id,
        string title,
        LinkType type,
        YoutubeData? youtube,
        UnknownSourceData? unknownSource,
        string userId,
        string userNickname,
        IReadOnlyCollection<Tag> tags)
    {
        Validate(title, tags);
        Validate(type, youtube, unknownSource);

        return new Link
        {
            Id = id,
            Title = title,
            Type = type,
            Youtube = youtube,
            UnknownSource = unknownSource,
            Tags = tags,
            UserId = userId,
            UserNickname = userNickname,
            CreatedAt = DateTime.UtcNow
        };
    }

    private static void Validate(LinkType type, YoutubeData? youtube, UnknownSourceData? unknownSourceData)
    {
        if (type == LinkType.Youtube && string.IsNullOrEmpty(youtube?.VideoId))
        {
            throw new ActionFailedException("Youtube video id is required.");
        }

        if (type == LinkType.UnknownSource && string.IsNullOrEmpty(unknownSourceData?.Url))
        {
            throw new ActionFailedException("Url is required.");
        }
    }

    private static void Validate(string title, IReadOnlyCollection<Tag> tags)
    {
        if (string.IsNullOrEmpty(title) || title.Length is < ValidationRules.LinkTitle.MinLength or > ValidationRules.LinkTitle.MaxLength)
        {
            throw new ActionFailedException("Title is invalid.");
        }

        if (tags.Count is < ValidationRules.Tag.MinTagsCount or > ValidationRules.Tag.MaxTagsCount)
        {
            throw new ActionFailedException("Tags count is invalid.");
        }
    }
}