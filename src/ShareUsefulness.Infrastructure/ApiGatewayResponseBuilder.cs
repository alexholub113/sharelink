﻿using System.Net;
using System.Text.Json;
using Amazon.Lambda.APIGatewayEvents;
using AWS.Lambda.Powertools.Tracing;

namespace ShareUsefulness.Infrastructure;

public static class ApiGatewayResponseBuilder
{
    public static APIGatewayProxyResponse Build<T>(HttpStatusCode statusCode, T body) where T : class
    {
        return new APIGatewayProxyResponse()
        {
            StatusCode = (int)statusCode,
            Body = JsonSerializer.Serialize(new ApiWrapper<T>(statusCode.ToString(), body), typeof(ApiWrapper<T>)),
            Headers = new Dictionary<string, string>(1)
            {
                {"ContentType", "application/json"},
                {"traceparent", Tracing.GetEntity().TraceId}
            }
        };
    }
}
