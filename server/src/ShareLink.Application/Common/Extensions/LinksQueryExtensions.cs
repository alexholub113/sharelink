using ShareLink.Domain.Models;

namespace ShareLink.Application.Common.Extensions;

public static class LinksQueryExtensions
{
    public static IQueryable<Link> FilterByTags(this IQueryable<Link> linksQuery, string? tags)
    {
        if (string.IsNullOrEmpty(tags))
        {
            return linksQuery;
        }

        var tagsArray = tags.Split(',');
        return linksQuery.Where(x => x.Tags.Any(y => tagsArray.Contains(y.Name)));
    }

    public static IQueryable<Link> FilterByTitle(this IQueryable<Link> linksQuery, string? title)
    {
        if (string.IsNullOrEmpty(title))
        {
            return linksQuery;
        }

        return linksQuery.Where(x => x.Title.Contains(title));
    }

    public static IQueryable<Link> FilterSaved(this IQueryable<Link> linksQuery, bool? considerFilter, string? userId)
    {
        return userId is null || considerFilter is null or false
            ? linksQuery
            : linksQuery.Where(x => x.SavedBy.Any(y => y.UserId == userId));
    }

    public static IQueryable<Link> FilterLiked(this IQueryable<Link> linksQuery, bool? considerFilter, string? userId)
    {
        return userId is null || considerFilter is null or false
            ? linksQuery
            : linksQuery.Where(x => x.LikedBy.Any(y => y.UserId == userId));
    }

    public static IQueryable<Link> FilterOwned(this IQueryable<Link> linksQuery, bool? considerFilter, string? userId)
    {
        return userId is null || considerFilter is null or false
            ? linksQuery
            : linksQuery.Where(x => x.UserId == userId);
    }
}