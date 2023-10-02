using Amazon.DynamoDBv2.Model;
using ShareUsefulness.Links.Core.DataAccess;

namespace ShareUsefulness.Links.Core.Commands.GetList;

public class GetListHandler
{
    private readonly ILinkDynamoDbContext _dbContext;

    public GetListHandler(ILinkDynamoDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<GetListResponse> Handle(GetListRequest request)
    {
        var data = await _dbContext.Client.ScanAsync(new ScanRequest()
        {
            TableName = _dbContext.TableName,
            Limit = 20
        });

        var links = data.Items.Select(LinkMapper.FromDynamoDb).ToList();
        return new GetListResponse(links, data.Count);
    }
}
