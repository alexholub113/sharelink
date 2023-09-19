using Links.Core.Models;

namespace Links.Dal;

public interface IDataStore
{
    IReadOnlyCollection<Link> GetList();

    void Add(Link link);

    void Remove(string name);
}
