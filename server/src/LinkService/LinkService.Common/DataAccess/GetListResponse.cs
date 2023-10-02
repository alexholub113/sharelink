using LinkService.Common.Models;

namespace LinkService.Common.DataAccess;

public class GetListResponse
{
    public GetListResponse(IReadOnlyCollection<Link> links, int totalCount, string paginationToken)
    {
        Links = links;
        TotalCount = totalCount;
        PaginationToken = paginationToken;
    }

    public IReadOnlyCollection<Link> Links { get; }

    public int TotalCount { get; }
    
    public string PaginationToken { get; }
}
