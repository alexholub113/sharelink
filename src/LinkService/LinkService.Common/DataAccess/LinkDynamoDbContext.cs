using Amazon.DynamoDBv2;

namespace LinkService.Common.DataAccess;

public class LinkDynamoDbContext : ILinkDynamoDbContext
{
    private static readonly string _tableName = Environment.GetEnvironmentVariable("LINK_TABLE_NAME");
    private static readonly AmazonDynamoDBClient _dynamoDbClient;

    static LinkDynamoDbContext()
    {
        _dynamoDbClient = new AmazonDynamoDBClient();
    }

    public string TableName => _tableName;

    public AmazonDynamoDBClient Client => _dynamoDbClient;
}
