using Amazon.DynamoDBv2;

namespace LinkService.Common.DataAccess;

public interface ILinkDynamoDbContext
{
    string TableName { get; }
    AmazonDynamoDBClient Client { get; }
}
