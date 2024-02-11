using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using ShareLink.Application.Abstraction;
using ShareLink.Application.Dto;
using ShareLink.Application.Extensions;
using ShareLink.Application.Services;
using ShareLink.Common.Exceptions;
using ShareLink.Domain.Enums;
using ShareLink.Domain.Models;
using ShareLink.Domain.Models.ValueObjects;

namespace ShareLink.Application.Commands.Create;

[Authorize]
public class CreateHandler(
        IApplicationDbContext context,
        IUrlParser urlParser,
        IGoogleApiService googleApiService,
        IUserContext userContext,
        IContentModerator contentModerator)
{
    public async Task<LinkDto> Handle(CreateRequest request, CancellationToken cancellationToken = default)
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
            linkType == LinkType.Youtube ? await GetYoutubeData(urlId) : null,
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
            UnknownSource = link.UnknownSource == null ? null : new UnknownSourceDataDto { Url = link.UnknownSource.Url },
            Likes = 0,
            Dislikes = 0,
            IsLiked = false,
            IsDisliked = false,
            IsSaved = false,
            User = link.UserNickname,
            CreatedAt = link.CreatedAt,
            Tags = link.Tags.Select(y => y.Name).ToArray(),
            BelongsToUser = true,
            Editable = true
        };
    }

    private async Task<YoutubeData> GetYoutubeData(string id)
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