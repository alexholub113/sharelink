using Amazon.DynamoDBv2;
using Amazon.DynamoDBv2.DocumentModel;
using Amazon.DynamoDBv2.Model;
using LinkService.Common.Models;

namespace LinkService.Common.DataAccess;

public class LinkRepository : ILinkRepository
{
    private static readonly string TableName = Environment.GetEnvironmentVariable("LINK_TABLE_NAME");
    private static readonly AmazonDynamoDBClient Client = new();

    public async Task<GetListResponse> GetList(GetListRequest request)
    {
        var table = Table.LoadTable(Client, TableName);
        
        var filter = new QueryFilter();
        if (request.Tags != null && request.Tags.Any(x => !string.IsNullOrEmpty(x)))
        {
            filter.AddCondition(
                nameof(Link.Tags).ToLower(),
                ScanOperator.Contains,
                request.Tags.Select(x => new AttributeValue(x)).ToList());
        }
        var query = new QueryOperationConfig
        {
            Limit = request.Limit,
            BackwardSearch = false,
            PaginationToken = request.PaginationToken,
            Filter = filter,
        };
        var search = table.Query(query);

        var nextSet = await search.GetNextSetAsync();

        var links = nextSet.Select(LinkMapper.FromDynamoDb).ToList();
        return new GetListResponse(links, search.Count, search.PaginationToken);
    }

    public async Task Put(Link link)
    {
        await Client.PutItemAsync(TableName, LinkMapper.ToDynamoDb(link));
    }

    public async Task IncrementLikes(string id)
    {
        var request = new UpdateItemRequest
        {
            Key = new Dictionary<string, AttributeValue>() { { nameof(Link.Id).ToLower(), new AttributeValue { S = id } } },
            ExpressionAttributeNames = new Dictionary<string, string>()
            {
                {"#Q", nameof(Link.Likes).ToLower()}
            },
            ExpressionAttributeValues = new Dictionary<string, AttributeValue>()
            {
                {":incr",new AttributeValue {N = "1"}}
            },
            UpdateExpression = "SET #Q = #Q + :incr",
            TableName = TableName
        };

        await Client.UpdateItemAsync(request);
    }
}
