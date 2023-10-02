using System.Net;
using System.Text.Json;
using Amazon.Lambda.APIGatewayEvents;
using ShareUsefulness.Lambda.Infrastructure.Models;
using ShareUsefulness.Links.Core.Commands.GetList;

namespace ShareUsefulness.Lambda.Infrastructure;

public static class ApiGatewayResponseBuilder
{
    private static readonly Dictionary<string, string> Headers = new() { { "Content-Type", "application/json" } };
    
    public static APIGatewayHttpApiV2ProxyResponse BuildFailed(string message) =>
        new()
        {
            Body = JsonSerializer.Serialize(
                new FailedApiResponse(message),
                Lambda.Infrastructure.HttpApiJsonSerializerContext.Default.FailedApiResponse),
            StatusCode = (int)HttpStatusCode.OK,
            Headers = Headers
        };

    public static APIGatewayHttpApiV2ProxyResponse Build(GetListResponse getListResponse) =>
        new()
        {
            Body = JsonSerializer.Serialize(
                new SuccessApiResponse<GetListResponse>(getListResponse),
                HttpApiJsonSerializerContext.Default.SuccessApiResponseGetListResponse),
            StatusCode = (int)HttpStatusCode.OK,
            Headers = Headers
        };
}
