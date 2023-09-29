using MongoDB.Bson;
using MongoDB.Driver;
using ShareUsefulness.Links.Core.Entities;

namespace ShareUsefulness.Links.Core.Data;

public class LinkContextSeed
{
    public static void SeedData(IMongoCollection<Link> links)
    {
        var linksExists = links.Find(p => true).Any();
        if (!linksExists)
        {
            links.InsertManyAsync(GetPreconfiguredLinks());
        }
    }

    private static IEnumerable<Link> GetPreconfiguredLinks()
    {
        return new List<Link>()
        {
            new()
            {
                Id = ObjectId.GenerateNewId().ToString(),
                Title = "Youtube link 1",
                Url = "https://youtu.be/iDLDcUXhM60?si=_c3RTr7b_QDbkXPo",
                Tags = new [] { "react", "typescript" },
                CreatedAt = DateTime.UtcNow,
                Likes = 2,
                Type = LinkType.Youtube
            },
            new()
            {
                Id = ObjectId.GenerateNewId().ToString(),
                Title = "Youtube link 2",
                Url = "https://youtu.be/iDLDcUXhM60?si=_c3RTr7b_QDbkXPo",
                Tags = new [] { ".net", "c#" },
                CreatedAt = DateTime.UtcNow,
                Likes = 1,
                Type = LinkType.Youtube
            },
        };
    }

}
