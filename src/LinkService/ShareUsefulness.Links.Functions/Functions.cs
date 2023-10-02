using System.Threading.Tasks;
using Amazon.Lambda.APIGatewayEvents;
using Amazon.Lambda.Core;
using ShareUsefulness.Lambda.Infrastructure;
using ShareUsefulness.Links.Core.Commands.GetList;
using ShareUsefulness.Links.Core.DataAccess;

namespace ShareUsefulness.Links.Functions;

public class Functions
{
    public async Task<APIGatewayHttpApiV2ProxyResponse> GetList(
        APIGatewayHttpApiV2ProxyRequest apiV2ProxyRequest, ILambdaContext context)
    {
        var handler = new GetListHandler(new LinkDynamoDbContext());

        var result = await handler.Handle(new GetListRequest());

        return ApiGatewayResponseBuilder.Build(result);
    }
}
