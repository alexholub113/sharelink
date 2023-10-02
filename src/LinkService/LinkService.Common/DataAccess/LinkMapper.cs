using System.Globalization;
using Amazon.DynamoDBv2.Model;
using LinkService.Common.Models;

namespace LinkService.Common.DataAccess;

public class LinkMapper
{
    public static Models.Link FromDynamoDb(Dictionary<string, AttributeValue> items)
    {
        return new Models.Link
        {
            Id = items["id"].S,
            Title = items["title"].S,
            Url = items["url"].S,
            Tags = items["tags"].SS,
            Likes = int.Parse(items["likes"].N),
            CreatedAt = DateTime.Parse(items["createdAt"].S),
            Type = (LinkType)Enum.Parse(typeof(LinkType), items["type"].S)
        };
    }
    
    public static Dictionary<string, AttributeValue> ToDynamoDb(Models.Link link)
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
