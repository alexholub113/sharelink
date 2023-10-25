using AutoMapper;
using MediatR;
using ShareLink.Application.Common.Abstraction;
using ShareLink.Application.Common.Dto;
using ShareLink.Application.Common.Services;
using ShareLink.Domain.Enums;
using ShareLink.Domain.Models;

namespace ShareLink.Application.CreateLinkHandler;

public class CreateLinkResponse
{
    public LinkDto Link { get; set; } = null!;
}

public class CreateLinkRequest : IRequest<CreateLinkResponse>
{
    public string Title { get; set; } = null!;

    public string Url { get; set; } = null!;

    public string[] Tags { get; set; } = null!;
}

public class CreateLinkHandler(ILinkDbContext context, IMapper mapper, IUrlParser urlParser, IGoogleApiService googleApiService)
    : IRequestHandler<CreateLinkRequest, CreateLinkResponse>
{
    public async Task<CreateLinkResponse> Handle(CreateLinkRequest request, CancellationToken cancellationToken)
    {
        var (linkType, urlId) = urlParser.ParseUrl(request.Url);
        var link = new Link
        {
            Id = GetId(linkType, urlId),
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
        
        return new CreateLinkResponse
        {
            Link = mapper.Map<LinkDto>(link)
        };
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
            LinkType.Youtube => type + ":" + contentId,
            _ => throw new NotSupportedException()
        };
    }
}
