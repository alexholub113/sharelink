using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace ShareUsefulness.Links.Core.Entities;

public enum LinkType
{
    [BsonRepresentation(BsonType.String)]
    Youtube
}
