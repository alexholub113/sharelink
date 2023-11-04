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
    public string Title { get; set; } = null!;

    public string Url { get; set; } = null!;

    public string[] Tags { get; set; } = null!;
}

public class CreateLinkHandler(IApplicationDbContext context, IMapper mapper, IUrlParser urlParser, IGoogleApiService googleApiService)
    : IRequestHandler<CreateLinkRequest, LinkDto>
{
    public async Task<LinkDto> Handle(CreateLinkRequest request, CancellationToken cancellationToken)
    {
        var (linkType, urlId) = urlParser.ParseUrl(request.Url);
        var linkId = GetId(linkType, urlId);
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
            Tags = request.Tags.Select(x => new Tag { Name = x.ToLower() }).ToList(),
            Likes = 0,
            User = "some user",
            CreatedAt = DateTime.UtcNow
        };
        context.Links.Add(link);
        await context.SaveChangesAsync(cancellationToken);

        return mapper.Map<LinkDto>(link);
    }

    private async Task<YoutubeData> GetYoutubeData(string id)
    {
        var videoInfo = await googleApiService.GetYoutubeVideoInfo(id);
        return new YoutubeData { VideoId = videoInfo.Id };
    }

    private static string GetId(LinkType linkType, string contentId)
    {
        var type = linkType.ToString().ToLower();
        return linkType switch
        {
            LinkType.Youtube => type + "-" + contentId,
            _ => throw new NotSupportedException()
        };
    }
}