using System.Text.Json.Serialization;
using Amazon.Lambda.APIGatewayEvents;
using ShareUsefulness.Infrastructure.Errors;
using ShareUsefulness.Links.Api.Dto;

namespace ShareUsefulness.Infrastructure;

[JsonSerializable(typeof(APIGatewayProxyRequest))]
[JsonSerializable(typeof(APIGatewayProxyResponse))]
[JsonSerializable(typeof(LinkDto))]
[JsonSerializable(typeof(ApiWrapper<LinkDto>))]
[JsonSerializable(typeof(ApiWrapper<LinkDto[]>))]
[JsonSerializable(typeof(ServerError))]
[JsonSerializable(typeof(Dictionary<string, object>))]
public partial class CustomJsonSerializerContext : JsonSerializerContext
{
    // By using this partial class derived from JsonSerializerContext, we can generate reflection free JSON Serializer code at compile time
    // which can deserialize our class and properties. However, we must attribute this class to tell it what types to generate serialization code for
    // See https://docs.microsoft.com/en-us/dotnet/standard/serialization/system-text-json-source-generation
}
