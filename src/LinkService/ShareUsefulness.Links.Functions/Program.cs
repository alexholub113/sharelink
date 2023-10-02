using System;
using System.Net;
using System.Threading.Tasks;
using Amazon.Lambda.APIGatewayEvents;
using Amazon.Lambda.Core;
using Amazon.Lambda.RuntimeSupport;
using Amazon.Lambda.Serialization.SystemTextJson;
using ShareUsefulness.Lambda.Infrastructure;

namespace ShareUsefulness.Links.Functions;

public class Program
{
    private static readonly Functions Functions = new(); 

    private static async Task Main()
    {
        Func<APIGatewayHttpApiV2ProxyRequest, ILambdaContext, Task<APIGatewayHttpApiV2ProxyResponse>> handler = FunctionHandler;
        await LambdaBootstrapBuilder.Create(handler, new SourceGeneratorLambdaJsonSerializer<HttpApiJsonSerializerContext>(options => {
                options.PropertyNameCaseInsensitive = true;
            }))
            .Build()
            .RunAsync();
    }

    private static async Task<APIGatewayHttpApiV2ProxyResponse> FunctionHandler(APIGatewayHttpApiV2ProxyRequest request, ILambdaContext context)
    {
        context.Logger.LogInformation($"Resource: {request.RouteKey}");
        if (request.RequestContext.Http.Method != "POST")
        {
            return new APIGatewayHttpApiV2ProxyResponse
            {
                Body = "Only POST allowed",
                StatusCode = (int)HttpStatusCode.MethodNotAllowed,
            };
        }

        try
        {
            switch (request.RequestContext.Http.Path)
            {
                case "/list":
                    return await Functions.GetList(request, context);
            }
        }
        catch (Exception e)
        {
            context.Logger.LogError($"Error: {e.Message}");
            return ApiGatewayResponseBuilder.BuildFailed(e.Message);
        }

        return new APIGatewayHttpApiV2ProxyResponse
        {
            Body = "Invalid path",
            StatusCode = (int)HttpStatusCode.NotFound,
        };
    }
}
