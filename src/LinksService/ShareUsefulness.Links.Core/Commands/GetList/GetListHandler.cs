using MongoDB.Driver;
using MongoDB.Driver.Linq;
using ShareUsefulness.Infrastructure.Command;
using ShareUsefulness.Links.Core.Data;

namespace ShareUsefulness.Links.Core.Commands.GetList;

public class GetListHandler : ICommandHandler<GetListRequest, GetListResponse>
{
    private readonly ILinkContext _context;

    public GetListHandler(ILinkContext context)
    {
        _context = context;
    }

    public async Task<GetListResponse> Handle(GetListRequest request)
    {
        var items = await _context.Links
            .AsQueryable()
            .Select(x => new GetListResponseItem { Title = x.Title })
            .ToListAsync();

        return new GetListResponse(items.ToArray(), items.Count);
    }
}
