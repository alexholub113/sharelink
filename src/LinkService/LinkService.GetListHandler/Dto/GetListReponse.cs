using System.Collections.Generic;
using LinkService.Common.Models;

namespace LinkService.GetListHandler.Dto;

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
