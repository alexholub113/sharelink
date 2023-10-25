namespace ShareLink.Application.Common.Dto;

public class PaginatedList<T>
{
    public PaginatedList(IReadOnlyCollection<T> items, int totalCount, int pageNumber, int totalPages)
    {
        Items = items;
        TotalCount = totalCount;
        PageNumber = pageNumber;
        TotalPages = totalPages;
    }

    public IReadOnlyCollection<T> Items { get; }
    public int PageNumber { get; }
    public int TotalPages { get; }
    public int TotalCount { get; }

    public bool HasPreviousPage => PageNumber > 1;

    public bool HasNextPage => PageNumber < TotalPages;

    public static PaginatedList<T> Create(IReadOnlyCollection<T> items, int count, int pageNumber, int pageSize)
    {
        var totalPages = (int)Math.Ceiling(count / (double)pageSize);
        return new PaginatedList<T>(items, count, pageNumber, totalPages);
    }
}
