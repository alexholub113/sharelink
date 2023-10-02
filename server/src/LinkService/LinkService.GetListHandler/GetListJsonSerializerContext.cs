using System.Collections.Generic;
using System.Text.Json.Serialization;
using Amazon.Lambda.APIGatewayEvents;
using LinkService.Common.DataAccess;
using LinkService.Common.Dto;

namespace LinkService.GetListHandler;

[JsonSerializable(typeof(APIGatewayHttpApiV2ProxyRequest))]
[JsonSerializable(typeof(APIGatewayHttpApiV2ProxyResponse))]
[JsonSerializable(typeof(Dictionary<string, string>))]
[JsonSerializable(typeof(FailedApiResponse))]
[JsonSerializable(typeof(SuccessApiResponse<GetListResponse>))]
[JsonSerializable(typeof(GetListRequest))]
public partial class GetListJsonSerializerContext : JsonSerializerContext
{
}
