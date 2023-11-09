using ShareLink.Domain.Enums;
using ShareLink.Domain.Models;

namespace ShareLink.Application.Common.Dto;

public class LinkDto
{
    public string Id { get; set; } = null!;

    public LinkType Type { get; set; }

    public string Title { get; set; } = null!;

    public YoutubeDataDto? Youtube { get; set; }

    public string[] Tags { get; set; } = null!;

    public int Likes { get; set; }

    public bool IsLiked { get; set; }

    public bool IsSaved { get; set; }

    public bool BelongsToUser { get; set; }

    public string User { get; set; } = null!;

    public DateTime CreatedAt { get; set; }
}