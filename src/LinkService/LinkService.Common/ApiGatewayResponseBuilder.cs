using System.Net;
using System.Text.Json;
using System.Text.Json.Serialization.Metadata;
using Amazon.Lambda.APIGatewayEvents;

namespace LinkService.Common;

public static class ApiGatewayResponseBuilder
{
    private static readonly Dictionary<string, string> Headers = new() { { "Content-Type", "application/json" } };

    public static APIGatewayHttpApiV2ProxyResponse Success<TValue>(TValue value, JsonTypeInfo<TValue> jsonTypeInfo) =>
        new()
        {
            Body = JsonSerializer.Serialize(value, jsonTypeInfo),
            StatusCode = (int)HttpStatusCode.OK,
            Headers = Headers
        };

    public static APIGatewayHttpApiV2ProxyResponse Fail<TValue>(TValue value, JsonTypeInfo<TValue> jsonTypeInfo) =>
        new()
        {
            Body = JsonSerializer.Serialize(value, jsonTypeInfo),
            StatusCode = (int)HttpStatusCode.BadRequest,
            Headers = Headers
        };
}
