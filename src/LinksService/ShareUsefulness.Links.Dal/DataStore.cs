using ShareUsefulness.Links.Core.Models;

namespace Links.Dal;

public class DataStore : IDataStore
{
    private readonly IList<Link> _links = new List<Link> { new Link("test") };

    public Task<Link[]> GetList() => Task.FromResult(_links.ToArray());

    public Task Add(Link link) => Task.Run(() => _links.Add(link));
}
