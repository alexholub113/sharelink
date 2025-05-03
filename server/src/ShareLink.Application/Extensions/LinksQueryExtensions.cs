using Microsoft.EntityFrameworkCore;
using ShareLink.Links.Api.Models;

namespace ShareLink.Links.Api.Extensions;

public static class LinksQueryExtensions
{
    public static IQueryable<Link> FilterByTags(this IQueryable<Link> linksQuery, string[]? tags)
    {
        if (tags is null || tags.Length == 0)
        {
            return linksQuery;
        }

        var tagsCount = tags.Length;
        return linksQuery.Where(link => link.Tags.Count(tag => tags.Contains(tag.Name)) == tagsCount);
    }

    public static IQueryable<Link> FilterByTitle(this IQueryable<Link> linksQuery, string? title)
    {
        if (string.IsNullOrEmpty(title))
        {
            return linksQuery;
        }

        return linksQuery.Where(x => EF.Functions.ILike(EF.Functions.Collate(x.Title, "tr-TR-x-icu"), $"%{title}%"));
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