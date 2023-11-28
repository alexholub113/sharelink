using ShareLink.Application.Common.Dto;
using ShareLink.Domain.Enums;

namespace ShareLink.Application.PreviewLinkHandler;

public class PreviewLinkResponse
{
    public string Title { get; set; } = null!;

    public LinkType Type { get; set; }

    public YoutubeDataDto Youtube { get; set; } = null!;

    public string[] Tags { get; set; } = Array.Empty<string>();
}