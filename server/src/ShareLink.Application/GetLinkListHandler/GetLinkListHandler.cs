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

        var query = context.Links
            .AsNoTracking()
            .Include(x => x.Tags)
            .FilterByTags(request.Tags)
            .FilterByTitle(request.Title)
            .FilterLiked(request.Liked, userId)
            .FilterSaved(request.Saved, userId)
            .FilterOwned(request.Owned, userId);

        var links = await query
            .OrderByDescending(x => x.CreatedAt)
            .Select(x => new LinkDto
            {
                Id = x.Id,
                Title = x.Title,
                Type = x.Type,
                Youtube = x.Youtube == null ? null : new YoutubeDataDto { VideoId = x.Youtube.VideoId },
                UnknownSource = x.UnknownSource == null ? null : new UnknownSourceDataDto { Url = x.UnknownSource.Url },
                Likes = x.LikedBy.Count,
                Dislikes = x.DislikedBy.Count,
                IsLiked = x.LikedBy.Any(y => y.UserId == userId),
                IsDisliked = x.DislikedBy.Any(y => y.UserId == userId),
                IsSaved = x.SavedBy.Any(y => y.UserId == userId),
                User = x.UserNickname,
                CreatedAt = x.CreatedAt,
                Tags = x.Tags.Select(y => y.Name).OrderBy(tag => tag).ToArray(),
                BelongsToUser = userId != null && userId == x.UserId,
                Editable = userId != null && userId == x.UserId
            })
            .PaginatedListAsync(request.PageNumber, request.PageSize);
        var tags = await query
            .Include(x => x.Tags).ThenInclude(x => x.Links)
            .SelectMany(x => x.Tags)
            .Distinct()
            .Where(x => x.Links.Count > 0)
            .Select(x => new TagDto(x.Name, x.Links.Count))
            .ToArrayAsync(cancellationToken);

        return new GetLinkListResponse(links, tags);
    }
}