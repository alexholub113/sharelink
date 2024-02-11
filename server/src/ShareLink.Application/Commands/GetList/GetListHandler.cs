using Microsoft.EntityFrameworkCore;
using ShareLink.Application.Abstraction;
using ShareLink.Application.Dto;
using ShareLink.Application.Extensions;

namespace ShareLink.Application.Commands.GetList;

public class GetListHandler(IApplicationDbContext context, IUserContext userContext)
{
    public async Task<GetListResponse> Handle(GetListRequest request, CancellationToken cancellationToken = default)
    {
        var userId = userContext.UserId;
        if (string.IsNullOrEmpty(userId) && (request.Saved || request.Liked || request.Owned))
        {
            throw new UnauthorizedAccessException("You must be logged in to access this resource");
        }

        var query = context.Links
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
            .AsNoTracking()
            .PaginatedListAsync(request.PageNumber, request.PageSize);
        var tags = await query
            .SelectMany(x => x.Tags)
            .GroupBy(x => x.Name)
            .Select(x => new TagDto(x.Key, x.Count()))
            .AsNoTracking()
            .ToArrayAsync(cancellationToken);

        return new GetListResponse(links, tags);
    }
}