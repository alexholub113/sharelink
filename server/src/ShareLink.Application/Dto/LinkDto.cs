using ShareLink.Domain.Enums;

namespace ShareLink.Application.Dto;

public class LinkDto
{
    public required string Id { get; set; }

    public LinkType Type { get; init; }

    public required string Title { get; init; }

    public YoutubeDataDto? Youtube { get; init; }

    public UnknownSourceDataDto? UnknownSource { get; init; }

    public required string[] Tags { get; init; }

    public int Likes { get; init; }

    public int Dislikes { get; init; }

    public bool IsLiked { get; init; }

    public bool IsDisliked { get; init; }

    public bool IsSaved { get; init; }

    public bool BelongsToUser { get; init; }

    public required string User { get; init; }

    public DateTime CreatedAt { get; init; }

    public bool Editable { get; init; }
}