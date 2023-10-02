using ShareUsefulness.Links.Core.Models;

namespace ShareUsefulness.Links.Core.Commands.GetList;

public class GetListResponse
{
    public GetListResponse(IReadOnlyCollection<Link> items, int totalCount)
    {
        Items = items;
        TotalCount = totalCount;
    }

    public IReadOnlyCollection<Link> Items { get; }

    public int TotalCount { get; }
}
