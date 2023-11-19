using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using ShareLink.Application.Common.Abstraction;
using ShareLink.Application.Common.Dto;
using ShareLink.Application.Common.Exceptions;
using ShareLink.Application.Common.Services;
using ShareLink.Domain.Enums;
using ShareLink.Domain.Models;

namespace ShareLink.Application.CreateLinkHandler;

public class CreateLinkRequest : IRequest<LinkDto>
{
    public required string Title { get; init; }

    public required string Url { get; init; }

    public required string[] Tags { get; init; }
}

public class CreateLinkHandler(
        IApplicationDbContext context,
        IMapper mapper,
        IUrlParser urlParser,
        IGoogleApiService googleApiService,
        IIdentityContext identityContext)
    : IRequestHandler<CreateLinkRequest, LinkDto>
{
    public async Task<LinkDto> Handle(CreateLinkRequest request, CancellationToken cancellationToken)
    {
        if (identityContext.UserId is null)
        {
            throw new UserUnauthorizedException();
        }

        var (linkType, urlId) = urlParser.ParseUrl(request.Url);
        var linkId = CreateLinkId(linkType, urlId);
        var isLinkExist = await context.Links.AnyAsync(x => x.Id == linkId, cancellationToken);
        if (isLinkExist)
        {
            throw new BusinessException(ErrorCodes.LinkExists, "Link already exists.");
        }

        var link = new Link
        {
            Id = linkId,
            Title = request.Title,
            Type = linkType,
            Youtube = linkType == LinkType.Youtube ? await GetYoutubeData(urlId) : null,
            Tags = await CreateTagList(request.Tags, cancellationToken),
            UserId = identityContext.UserId!,
            UserNickname = identityContext.UserNickname!,
            CreatedAt = DateTime.UtcNow
        };
        context.Links.Add(link);
        await context.SaveChangesAsync(cancellationToken);

        return mapper.Map<LinkDto>(link);
    }

    private async Task<IReadOnlyCollection<Tag>> CreateTagList(string[] tags, CancellationToken cancellationToken)
    {
        var tagList = new List<Tag>();
        var tagsInDatabase = await context.Tags
            .Where(x => tags.Contains(x.Name))
            .ToArrayAsync(cancellationToken);
        foreach (var requestTag in tags)
        {
            var tag = tagsInDatabase.FirstOrDefault(x => x.Name == requestTag);
            if (tag is null)
            {
                tag = new Tag { Name = requestTag.ToLower() };
                context.Tags.Add(tag);
            }

            tagList.Add(tag);
        }

        return tagList;
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
            _ => throw new NotSupportedException()
        };
    }
}