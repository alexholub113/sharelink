using ShareLink.Application.Common.Dto;
using ShareLink.Domain.Enums;

namespace ShareLink.Application.PreviewLinkHandler;

public class PreviewLinkResponse
{
    public string Title { get; set; } = null!;

    public LinkType Type { get; init; }

    public YoutubeDataDto? Youtube { get; init; }

    public UnknownSourceDataDto? UnknownSource { get; init; }

    public string[] Tags { get; set; } = Array.Empty<string>();
}