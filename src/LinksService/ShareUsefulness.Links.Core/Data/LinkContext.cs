using MongoDB.Driver;
using ShareUsefulness.Links.Core.Entities;

namespace ShareUsefulness.Links.Core.Data;

public interface ILinkContext
{
    IMongoCollection<Link> Links { get; }
}

public class LinkContext : ILinkContext
{
    public LinkContext(string connectionString, string databaseName)
    {
        var client = new MongoClient(connectionString);
        var database = client.GetDatabase(databaseName);
        Links = database.GetCollection<Link>(nameof(Links));

        LinkContextSeed.SeedData(Links);
    }
    
    public IMongoCollection<Link> Links { get; }
}
