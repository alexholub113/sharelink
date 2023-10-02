using Amazon.DynamoDBv2.Model;
using ShareUsefulness.Links.Core.Models;

namespace ShareUsefulness.Links.Core.DataAccess;

public class LinkMapper
{
    public static Link FromDynamoDb(Dictionary<string, AttributeValue> items)
    {
        return new Link
        {
            Id = items["id"].S,
            Title = items["title"].S,
            Url = items["url"].S,
            Tags = items["tags"].SS.ToArray(),
            Likes = int.Parse(items["likes"].N),
            CreatedAt = DateTime.Parse(items["createdAt"].S),
            Type = (LinkType)Enum.Parse(typeof(LinkType), items["type"].S)
        };
    }
}
