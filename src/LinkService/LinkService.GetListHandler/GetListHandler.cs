using System.Threading.Tasks;
using Amazon.DynamoDBv2.Model;
using Amazon.Lambda.APIGatewayEvents;
using Amazon.Lambda.Core;
using Amazon.Lambda.RuntimeSupport;
using Amazon.Lambda.Serialization.SystemTextJson;
using LinkService.Common;
using LinkService.Common.DataAccess;
using LinkService.Common.Dto;
using LinkService.Common.Extensions;

namespace LinkService.GetListHandler;

public class GetListHandler
{
    private readonly ILinkRepository _linkRepository;

    public GetListHandler(ILinkRepository linkRepository)
    {
        _linkRepository = linkRepository;
    }

    private static async Task Main()
    {
        var handler = new GetListHandler(new LinkRepository()).Handle;
        await LambdaBootstrapBuilder.Create(handler, new SourceGeneratorLambdaJsonSerializer<GetListJsonSerializerContext>(options => {
                options.PropertyNameCaseInsensitive = true;
            }))
            .Build()
            .RunAsync();
    }

    public async Task<APIGatewayHttpApiV2ProxyResponse> Handle(
        APIGatewayHttpApiV2ProxyRequest apiV2ProxyRequest, ILambdaContext context)
    {
        var request = apiV2ProxyRequest.Body.Deserialize(GetListJsonSerializerContext.Default.GetListRequest);

        var response = await _linkRepository.GetList(request);

        return ApiGatewayResponseBuilder.Success(
            new SuccessApiResponse<GetListResponse>(response),
            GetListJsonSerializerContext.Default.SuccessApiResponseGetListResponse);
    }
}
