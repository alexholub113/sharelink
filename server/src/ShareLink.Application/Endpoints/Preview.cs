using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Routing;
using Microsoft.EntityFrameworkCore;
using ShareLink.Infrastructure.Abstractions;
using ShareLink.Links.Api.Abstraction;
using ShareLink.Links.Api.Attributes;
using ShareLink.Links.Api.Constants;
using ShareLink.Links.Api.Dto;
using ShareLink.Links.Api.Enums;
using ShareLink.Links.Api.Services;
using System.ComponentModel.DataAnnotations;

namespace ShareLink.Links.Api.Endpoints;

public class PreviewRequest
{
    [Required(ErrorMessage = "Url is required.")]
    [LinkUrl]
    public string Url { get; init; } = null!;
}

public record PreviewResponse(string Title, LinkType Type, YoutubeDataDto? Youtube, UnknownSourceDataDto? UnknownSource, string[] Tags);

public class Preview : IEndpoint
{
    public void MapEndpoint(IEndpointRouteBuilder app)
    {
        app.MapPost("api/v1/links/preview", Handle).WithTags("Links");
    }

    private static Task<PreviewResponse> Handle(
        [FromBody] PreviewRequest request,
        IUrlParser urlParser,
        IGoogleApiService googleApiService,
        IApplicationDbContext context,
        CancellationToken cancellationToken = default)
    {
        var (linkType, id) = urlParser.ParseUrl(request.Url);
        return linkType switch
        {
            LinkType.Youtube => HandleYoutube(context, googleApiService, id),
            LinkType.UnknownSource => Task.FromResult(HandleUnknownSourceLink(id)),
            _ => throw new NotSupportedException($"Link type {linkType} is not supported.")
        };
    }

    private static async Task<PreviewResponse> HandleYoutube(IApplicationDbContext context, IGoogleApiService googleApiService, string id)
    {
        var videoInfo = await googleApiService.GetYoutubeVideoInfo(id);
        var tags = await FindMostMentionedTags(context, videoInfo.Tags);
        var title = videoInfo.Title.Length > ValidationRules.LinkTitle.MaxLength
            ? videoInfo.Title[..(ValidationRules.LinkTitle.MaxLength - 3)] + "..."
            : videoInfo.Title;
        return new(Title: title, Type: LinkType.Youtube, Youtube: new YoutubeDataDto { VideoId = videoInfo.Id }, UnknownSource: null, Tags: tags);
    }

    private static async Task<string[]> FindMostMentionedTags(IApplicationDbContext context, IEnumerable<string> youtubeVideoTags)
    {
        var allTags = await context.Tags.Select(tag => tag.Name).ToArrayAsync();
        var tagOccurrences = new Dictionary<string, int>();

        foreach (var videoTag in youtubeVideoTags.Distinct())
        {
            var lowerCaseVideoTag = videoTag.ToLowerInvariant();
            var matchedTags = allTags.Where(tag => lowerCaseVideoTag.Contains(tag));
            foreach (var matchedTag in matchedTags)
            {
                tagOccurrences.TryGetValue(matchedTag, out var value);
                tagOccurrences[matchedTag] = ++value;
            }
        }

        return tagOccurrences.OrderByDescending(kv => kv.Value).Take(ValidationRules.Tag.MaxSuggestedTagsCount).Select(kv => kv.Key).ToArray();
    }

    private static PreviewResponse HandleUnknownSourceLink(string id) =>
        new(Title: "", Type: LinkType.UnknownSource, Youtube: null, UnknownSource: new UnknownSourceDataDto(id), Tags: []);
}
