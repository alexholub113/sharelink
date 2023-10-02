namespace LinkService.Common.DataAccess;

public class GetListRequest
{
    public int Limit { get; set; }

    public List<string>? Tags { get; set; }

    public string? UserId { get; set; }

    public string? PaginationToken { get; set; }
}
