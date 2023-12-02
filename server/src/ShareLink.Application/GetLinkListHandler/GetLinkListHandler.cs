using MediatR;
using Microsoft.EntityFrameworkCore;
using ShareLink.Application.Common.Abstraction;
using ShareLink.Application.Common.Dto;
using ShareLink.Application.Common.Extensions;

namespace ShareLink.Application.GetLinkListHandler;

public class GetLinkListHandler(IApplicationDbContext context, IUserContext userContext)
    : IRequestHandler<GetLinkListRequest, GetLinkListResponse>
{
    public async Task<GetLinkListResponse> Handle(GetLinkListRequest request, CancellationToken cancellationToken)
    {
        var userId = userContext.UserId;
        if (string.IsNullOrEmpty(userId) && (request.Saved || request.Liked || request.Owned))
        {
            throw new UnauthorizedAccessException("You must be logged in to access this resource");
        }

        var links = await context.Links
            .AsNoTracking()
            .Include(x => x.Tags)
            .FilterByTags(request.Tags)
            .FilterByTitle(request.Title)
            .FilterLiked(request.Liked, userId)
            .FilterSaved(request.Saved, userId)
            .FilterOwned(request.Owned, userId)
            .OrderByDescending(x => x.CreatedAt)
            .Select(x => new LinkDto
            {
                Id = x.Id,
                Title = x.Title,
                Type = x.Type,
                Youtube = x.Youtube == null ? null : new YoutubeDataDto { VideoId = x.Youtube.VideoId },
                Likes = x.LikedBy.Count,
                IsLiked = x.LikedBy.Any(y => y.UserId == userId),
                IsSaved = x.SavedBy.Any(y => y.UserId == userId),
                User = x.UserNickname,
                CreatedAt = x.CreatedAt,
                Tags = x.Tags.Select(y => y.Name).OrderBy(tag => tag).ToArray(),
                BelongsToUser = userId != null && userId == x.UserId,
                Editable = userId != null && userId == x.UserId
            })
            .PaginatedListAsync(request.PageNumber, request.PageSize);
        var tags = await context.Tags
            .Include(x => x.Links)
            .AsNoTracking()
            .Where(x => x.Links.Count > 0)
            .Select(x => new TagDto(x.Name, x.Links.Count))
            .ToArrayAsync(cancellationToken);

        return new GetLinkListResponse(links, tags);
    }
}