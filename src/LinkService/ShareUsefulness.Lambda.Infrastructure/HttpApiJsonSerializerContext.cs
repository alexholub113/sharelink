using System.Text.Json.Serialization;
using Amazon.Lambda.APIGatewayEvents;
using ShareUsefulness.Lambda.Infrastructure.Models;
using ShareUsefulness.Links.Core.Commands.GetList;

namespace ShareUsefulness.Lambda.Infrastructure;

[JsonSerializable(typeof(APIGatewayHttpApiV2ProxyRequest))]
[JsonSerializable(typeof(APIGatewayHttpApiV2ProxyResponse))]
[JsonSerializable(typeof(List<string>))]
[JsonSerializable(typeof(string))]
[JsonSerializable(typeof(Dictionary<string, string>))]
[JsonSerializable(typeof(FailedApiResponse))]
[JsonSerializable(typeof(SuccessApiResponse<GetListResponse>))]
[JsonSerializable(typeof(GetListRequest))]
public partial class HttpApiJsonSerializerContext : JsonSerializerContext
{
}
