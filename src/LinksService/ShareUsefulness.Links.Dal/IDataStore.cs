using ShareUsefulness.Links.Core.Models;

namespace Links.Dal;

public interface IDataStore
{
    Task<Link[]> GetList();

    Task Add(Link link);
}
