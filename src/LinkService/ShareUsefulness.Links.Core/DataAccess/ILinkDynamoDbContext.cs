using Amazon.DynamoDBv2;

namespace ShareUsefulness.Links.Core.DataAccess;

public interface ILinkDynamoDbContext
{
    string TableName { get; }
    AmazonDynamoDBClient Client { get; }
}
