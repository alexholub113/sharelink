namespace ShareUsefulness.Links.Core.Commands.GetList;

public class GetListResponse
{
    public GetListResponse(GetListResponseItem[] items, int total)
    {
        Items = items;
        Total = total;
    }

    public int Total { get; }
    
    public GetListResponseItem[] Items { get; }
}
