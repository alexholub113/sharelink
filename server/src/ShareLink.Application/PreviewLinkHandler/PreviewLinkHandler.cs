using MediatR;
using ShareLink.Application.Common.Dto;
using ShareLink.Application.Common.Services;
using ShareLink.Domain;
using ShareLink.Domain.Enums;

namespace ShareLink.Application.PreviewLinkHandler;

public class PreviewLinkHandler(IUrlParser urlParser, IGoogleApiService googleApiService)
    : IRequestHandler<PreviewLinkRequest, PreviewLinkResponse>
{
    public Task<PreviewLinkResponse> Handle(PreviewLinkRequest request, CancellationToken cancellationToken)
    {
        var (linkType, id) = urlParser.ParseUrl(request.Url);
        return linkType switch
        {
            LinkType.Youtube => HandleYoutube(id),
            LinkType.UnknownSource => Task.FromResult(HandleUnknownSourceLink(id)),
            _ => throw new NotSupportedException($"Link type {linkType} is not supported.")
        };
    }

    private async Task<PreviewLinkResponse> HandleYoutube(string id)
    {
        var videoInfo = await googleApiService.GetYoutubeVideoInfo(id);
        var tags = videoInfo.Tags
            .Select(tag => tag.Trim().ToLower())
            .Distinct()
            .Where(x => x.Length is >= ValidationRules.Tag.MinTagLength and <= ValidationRules.Tag.MaxTagLength)
            .Take(3)
            .ToArray();
        var title = videoInfo.Title.Length > ValidationRules.LinkTitle.MaxLength
            ? videoInfo.Title[..(ValidationRules.LinkTitle.MaxLength - 3)] + "..."
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

    private PreviewLinkResponse HandleUnknownSourceLink(string id) =>
        new()
        {
            Title = "",
            Type = LinkType.UnknownSource,
            UnknownSource = new UnknownSourceDataDto { Url = id },
            Tags = Array.Empty<string>(),
        };
}