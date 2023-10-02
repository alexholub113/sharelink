using LinkService.Common.Models;

namespace LinkService.Common.DataAccess;

public interface ILinkRepository
{
    Task<GetListResponse> GetList(GetListRequest request);

    Task Put(Link link);

    Task IncrementLikes(string id);
}
