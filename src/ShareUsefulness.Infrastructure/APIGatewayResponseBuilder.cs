using System.Net;
using System.Text.Json;
using Amazon.Lambda.APIGatewayEvents;

namespace ShareUsefulness.Infrastructure;

public static class APIGatewayResponseBuilder
{
    public static APIGatewayProxyResponse Build<T>(HttpStatusCode statusCode, T body) where T : class
    {
        return new APIGatewayProxyResponse()
        {
            StatusCode = (int)statusCode,
            Body = JsonSerializer.Serialize(new ApiWrapper<T>(body, statusCode.ToString()), typeof(ApiWrapper<T>), CustomJsonSerializerContext.Default),
            Headers = new Dictionary<string, string>(1)
            {
                {"ContentType", "application/json"},
            }
        };
    }
}
