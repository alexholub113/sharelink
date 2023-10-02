using System.Globalization;
using Amazon.DynamoDBv2.DocumentModel;
using Amazon.DynamoDBv2.Model;
using LinkService.Common.Models;

namespace LinkService.Common.DataAccess;

public class LinkMapper
{
    public static Link FromDynamoDb(Dictionary<string, AttributeValue> item)
    {
        return new Link
        {
            Id = item["id"].S,
            Title = item["title"].S,
            Url = item["url"].S,
            Tags = item["tags"].SS,
            Likes = int.Parse(item["likes"].N),
            CreatedAt = DateTime.Parse(item["createdAt"].S),
            Type = (LinkType)Enum.Parse(typeof(LinkType), item["type"].S)
        };
    }
    
    public static Link FromDynamoDb(Document item)
    {
        return new Link
        {
            Id = item["id"].AsString(),
            Title = item["title"].AsString(),
            Url = item["url"].AsString(),
            Tags = item["tags"].AsListOfString(),
            Likes = item["likes"].AsInt(),
            CreatedAt = item["createdAt"].AsDateTime(),
            Type = (LinkType)Enum.Parse(typeof(LinkType), item["type"].AsString())
        };
    }
    
    public static Dictionary<string, AttributeValue> ToDynamoDb(Link link)
    {
        var item = new Dictionary<string, AttributeValue>(7)
        {
            { "id", new AttributeValue(link.Id) },
            { "title", new AttributeValue(link.Title) },
            { "url", new AttributeValue(link.Url) },
            { "tags", new AttributeValue(link.Tags.ToList()) },
            { "likes", new AttributeValue()
            {
                N = link.Likes.ToString(CultureInfo.InvariantCulture)
            } },
            { "createdAt", new AttributeValue()
            {
                S = link.CreatedAt.ToString(CultureInfo.InvariantCulture)
            } },
            { "type", new AttributeValue(link.Type.ToString()) }
        };

        return item;
    }
}
