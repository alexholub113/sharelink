using System.Collections.Generic;
using System.Text.Json.Serialization;
using Amazon.Lambda.APIGatewayEvents;
using LinkService.AddLinkHandler.Dto;
using LinkService.Common.Dto;
using LinkService.Common.Models;

namespace LinkService.AddLinkHandler;

[JsonSerializable(typeof(APIGatewayHttpApiV2ProxyRequest))]
[JsonSerializable(typeof(APIGatewayHttpApiV2ProxyResponse))]
[JsonSerializable(typeof(Dictionary<string, string>))]
[JsonSerializable(typeof(FailedApiResponse))]
[JsonSerializable(typeof(SuccessApiResponse<Link>))]
[JsonSerializable(typeof(AddLinkRequest))]
public partial class AddLinkJsonSerializerContext : JsonSerializerContext
{
}
