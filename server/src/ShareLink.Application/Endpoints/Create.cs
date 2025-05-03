using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Routing;
using Microsoft.EntityFrameworkCore;
using ShareLink.Common.Exceptions;
using ShareLink.Infrastructure.Abstractions;
using ShareLink.Links.Api.Abstraction;
using ShareLink.Links.Api.Attributes;
using ShareLink.Links.Api.Dto;
using ShareLink.Links.Api.Enums;
using ShareLink.Links.Api.Extensions;
using ShareLink.Links.Api.Models;
using ShareLink.Links.Api.Models.ValueObjects;
using ShareLink.Links.Api.Services;
using System.ComponentModel.DataAnnotations;

namespace ShareLink.Links.Api.Endpoints;

public class CreateRequest
{
    [Required(ErrorMessage = "Title is required.")]
    [LinkTitle]
    public string Title { get; init; } = null!;

    [Required(ErrorMessage = "Url is required.")]
    [LinkUrl]
    public string Url { get; init; } = null!;

    [Required(ErrorMessage = "Tags are required.")]
    [LinkTagCollection]
    public string[] Tags { get; init; } = null!;
}

public class Create : IEndpoint
{
    public void MapEndpoint(IEndpointRouteBuilder app)
    {
        app.MapPost("api/v1/links/create", Handle).WithTags("Links");
    }

    [Authorize]
    private static async Task<LinkDto> Handle(
        [FromBody] CreateRequest request,
        IApplicationDbContext context,
        IUrlParser urlParser,
        IGoogleApiService googleApiService,
        IUserContext userContext,
        IContentModerator contentModerator,
        CancellationToken cancellationToken = default)
    {
        if (userContext.UserId is null)
        {
            throw new UnauthorizedAccessException();
        }

        var terms = await contentModerator.ModerateText(request.Title + " " + string.Join(" ", request.Tags));
        if (terms.Length > 0)
        {
            throw new BusinessException(
                ErrorCodes.ActionFailed,
                $"Title or tags have inappropriate words: {terms}.");
        }

        var (linkType, urlId) = urlParser.ParseUrl(request.Url);
        var linkId = CreateLinkId(linkType, urlId);
        var isLinkExist = await context.Links.AnyAsync(x => x.Id == linkId, cancellationToken);
        if (isLinkExist)
        {
            throw new BusinessException(ErrorCodes.LinkExists, "Link already exists.");
        }

        var link = Link.Create(
            linkId,
            request.Title,
            linkType,
            linkType == LinkType.Youtube ? await GetYoutubeData(googleApiService, urlId) : null,
            linkType == LinkType.UnknownSource ? new UnknownSourceData { Url = urlId } : null,
            userContext.UserId!,
            userContext.UserNickname!,
            await context.CreateTagList(request.Tags, cancellationToken));
        context.Links.Add(link);
        await context.SaveChangesAsync(cancellationToken);

        return new LinkDto
        {
            Id = link.Id,
            Title = link.Title,
            Type = link.Type,
            Youtube = link.Youtube == null ? null : new YoutubeDataDto { VideoId = link.Youtube.VideoId },
            UnknownSource = link.UnknownSource == null ? null : new UnknownSourceDataDto(Url: link.UnknownSource.Url),
            Likes = 0,
            Dislikes = 0,
            IsLiked = false,
            IsDisliked = false,
            IsSaved = false,
            User = link.UserNickname,
            CreatedAt = link.CreatedAt,
            Tags = [.. link.Tags.Select(y => y.Name)],
            BelongsToUser = true,
            Editable = true
        };
    }

    private static async Task<YoutubeData> GetYoutubeData(IGoogleApiService googleApiService, string id)
    {
        var videoInfo = await googleApiService.GetYoutubeVideoInfo(id);
        return new YoutubeData { VideoId = videoInfo.Id };
    }

    private static string CreateLinkId(LinkType linkType, string contentId)
    {
        var type = linkType.ToString().ToLower();
        return linkType switch
        {
            LinkType.Youtube => type + "-" + contentId,
            LinkType.UnknownSource => type + "-" + contentId.GetHashCode(),
            _ => throw new NotSupportedException()
        };
    }
}
