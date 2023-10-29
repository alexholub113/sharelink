using MediatR;
using ShareLink.Application.Common.Dto;
using ShareLink.Application.Common.Exceptions;
using ShareLink.Application.Common.Services;
using ShareLink.Domain;
using ShareLink.Domain.Enums;

namespace ShareLink.Application.PreviewLinkHandler;

public class PreviewLinkRequest : IRequest<PreviewLinkResponse>
{
    public string Url { get; set; } = null!;
}

public class PreviewLinkResponse
{
    public string Title { get; set; } = null!;

    public LinkType Type { get; set; }

    public YoutubeDataDto Youtube { get; set; } = null!;

    public string[] Tags { get; set; } = Array.Empty<string>();
}

public class PreviewLinkHandler(IUrlParser urlParser, IGoogleApiService googleApiService)
    : IRequestHandler<PreviewLinkRequest, PreviewLinkResponse>
{
    public Task<PreviewLinkResponse> Handle(PreviewLinkRequest request, CancellationToken cancellationToken)
    {
        var (linkType, id) = urlParser.ParseUrl(request.Url);
        return linkType switch
        {
            LinkType.Youtube => HandleYoutube(id),
            _ => throw new NotSupportedException($"Link type {linkType} is not supported.")
        };
    }

    private async Task<PreviewLinkResponse> HandleYoutube(string id)
    {
        var videoInfo = await googleApiService.GetYoutubeVideoInfo(id);
        var tags = videoInfo.Tags.Select(tag => tag.Trim().ToLower()).Distinct().Take(3).ToArray();
        var title = videoInfo.Title.Length > Constants.MaxLinkTitleLength
            ? videoInfo.Title[..(Constants.MaxLinkTitleLength - 3)] + "..."
            : videoInfo.Title;
        return new PreviewLinkResponse
        {
            Title = title,
            Type = LinkType.Youtube,
            Youtube = new YoutubeDataDto
            {
                VideoId = videoInfo.Id
            },
            Tags = tags,
        };
    }
}