using MongoDB.Driver;
using ShareUsefulness.Links.Core.Entities;

namespace ShareUsefulness.Links.Core.Data;

public interface ILinkContext
{
    IMongoCollection<Link> Links { get; }
}

public class LinkContext : ILinkContext
{
    public LinkContext()
    {
        var client = new MongoClient("mongodb+srv://saj113:saj113@shareusefulnesscluster.r9yyidf.mongodb.net/?retryWrites=true&w=majority");
        var database = client.GetDatabase("LinksDb");
        Links = database.GetCollection<Link>(nameof(Links));

        LinkContextSeed.SeedData(Links);
    }
    
    public IMongoCollection<Link> Links { get; }
}
