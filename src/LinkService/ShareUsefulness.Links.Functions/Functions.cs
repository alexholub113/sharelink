using System.Text.Json;
using System.Threading.Tasks;
using Amazon.Lambda.APIGatewayEvents;
using Amazon.Lambda.Core;
using ShareUsefulness.Lambda.Infrastructure;
using ShareUsefulness.Links.Core.Commands.AddLink;
using ShareUsefulness.Links.Core.Commands.GetList;
using ShareUsefulness.Links.Core.DataAccess;

namespace ShareUsefulness.Links.Functions;

public class Functions
{
    private static readonly LinkDynamoDbContext DbContext = new();

    public async Task<APIGatewayHttpApiV2ProxyResponse> GetList(
        APIGatewayHttpApiV2ProxyRequest apiV2ProxyRequest, ILambdaContext context)
    {
        var handler = new GetListHandler(DbContext);

        var result = await handler.Handle(new GetListRequest());

        return ApiGatewayResponseBuilder.Build(result);
    }

    public async Task<APIGatewayHttpApiV2ProxyResponse> AddLink(
        APIGatewayHttpApiV2ProxyRequest apiV2ProxyRequest, ILambdaContext context)
    {
        var addLinkRequest = JsonSerializer.Deserialize(apiV2ProxyRequest.Body, HttpApiJsonSerializerContext.Default.AddLinkRequest);
        var handler = new AddLinkHandler(DbContext);

        var result = await handler.Handle(addLinkRequest);

        return ApiGatewayResponseBuilder.Build(result);
    }
}
