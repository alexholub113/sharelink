using Links.Core.Models;

namespace Links.Dal;

public class DataStore : IDataStore
{
    private readonly IList<Link> _links = new List<Link>();

    public IReadOnlyCollection<Link> GetList() => _links.ToList().AsReadOnly();

    public void Add(Link link) => _links.Add(link);

    public void Remove(string name)
    {
        var link = _links.Single(x => x.Name == name);
        _links.Remove(link);
    }
}
