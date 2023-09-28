using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace ShareUsefulness.Links.Core.Entities;

public class Link
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string Id { get; set; }

    public LinkType Type { get; set; }
    
    public string Title { get; set; }
    
    public string Url { get; set; }
    
    public string[] Tags { get; set; }
    
    public int Likes { get; set; }
    
    public DateTime CreatedDate { get; set; }
}
