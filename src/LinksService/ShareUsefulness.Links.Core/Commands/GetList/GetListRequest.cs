using ShareUsefulness.Infrastructure.Command;

namespace ShareUsefulness.Links.Core.Commands.GetList;

public class GetListRequest : ICommandRequest
{
    public int Page { get; init; }
    
    public int PageSize { get; init; }
}
