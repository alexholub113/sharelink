using System.Linq;
using System.Threading.Tasks;
using Amazon.DynamoDBv2.Model;
using Amazon.Lambda.APIGatewayEvents;
using Amazon.Lambda.Core;
using Amazon.Lambda.RuntimeSupport;
using Amazon.Lambda.Serialization.SystemTextJson;
using LinkService.Common;
using LinkService.Common.DataAccess;
using LinkService.Common.Dto;
using LinkService.GetListHandler.Dto;

namespace LinkService.GetListHandler;

public class GetListHandler
{
    private readonly ILinkDynamoDbContext _dbContext;
    public GetListHandler(ILinkDynamoDbContext dbContext)
    {
        _dbContext = dbContext;
    }
    
    private static async Task Main()
    {
        var handler = new GetListHandler(new LinkDynamoDbContext()).Handle;
        await LambdaBootstrapBuilder.Create(handler, new SourceGeneratorLambdaJsonSerializer<GetListJsonSerializerContext>(options => {
                options.PropertyNameCaseInsensitive = true;
            }))
            .Build()
            .RunAsync();
    }

    public async Task<APIGatewayHttpApiV2ProxyResponse> Handle(
        APIGatewayHttpApiV2ProxyRequest apiV2ProxyRequest, ILambdaContext context)
    {
        var data = await _dbContext.Client.ScanAsync(new ScanRequest()
        {
            TableName = _dbContext.TableName,
            Limit = 20
        });
        
        var links = data.Items.Select(LinkMapper.FromDynamoDb).ToList();
        var result = new SuccessApiResponse<GetListResponse>(new GetListResponse(links, links.Count));
        return ApiGatewayResponseBuilder.Success(
            result, GetListJsonSerializerContext.Default.SuccessApiResponseGetListResponse);
    }
}
