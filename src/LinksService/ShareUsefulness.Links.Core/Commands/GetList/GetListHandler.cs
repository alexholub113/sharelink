using MongoDB.Driver;
using MongoDB.Driver.Linq;
using ShareUsefulness.Infrastructure.Command;
using ShareUsefulness.Links.Core.Data;

namespace ShareUsefulness.Links.Core.Commands.GetList;

public class GetListHandler : CommandHandler<GetListRequest, GetListResponse>
{
    private readonly ILinkContext _context;

    public GetListHandler(ILinkContext context)
    {
        _context = context;
    }

    protected override async Task<GetListResponse> HandleInternal(GetListRequest request)
    {
        var items = await _context.Links
            .AsQueryable()
            .Select(x => new GetListResponseItem { Title = x.Title, Url = x.Url, Tags = x.Tags, Type = x.Type, Id = x.Id, CreatedAt = x.CreatedAt })
            .ToListAsync();

        return new GetListResponse(items.ToArray(), items.Count);
    }
}
