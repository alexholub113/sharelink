namespace ShareLink.Application.Common.Dto;

public class PaginatedList<T>(IReadOnlyCollection<T> items, int totalCount, int pageNumber, int totalPages)
{
    public IReadOnlyCollection<T> Items { get; } = items;
    public int PageNumber { get; } = pageNumber;
    public int TotalPages { get; } = totalPages;
    public int TotalCount { get; } = totalCount;

    public bool HasPreviousPage => PageNumber > 1;

    public bool HasNextPage => PageNumber < TotalPages;

    public static PaginatedList<T> Create(IReadOnlyCollection<T> items, int count, int pageNumber, int pageSize)
    {
        var totalPages = (int)Math.Ceiling(count / (double)pageSize);
        return new PaginatedList<T>(items, count, pageNumber, totalPages);
    }
}