using System.Text.Json;
using Amazon.Lambda.Annotations;
using Amazon.Lambda.Annotations.APIGateway;
using Amazon.Lambda.Core;
using AWS.Lambda.Powertools.Logging;
using AWS.Lambda.Powertools.Tracing;
using ShareUsefulness.Infrastructure.Command;
using ShareUsefulness.Links.Api;
using ShareUsefulness.Links.Core.Commands.AddLink;
using ShareUsefulness.Links.Core.Commands.GetList;

[assembly: LambdaSerializer(typeof(LambdaEnumSerializer))]

namespace ShareUsefulness.Links.Api;

public class LinksFunctions
{
    [LambdaFunction(PackageType = LambdaPackageType.Image, Policies = "AWSLambdaBasicExecutionRole", MemorySize = 256, Timeout = 30)]
    [HttpApi(LambdaHttpMethod.Post, "/list")]
    [Tracing]
    [Logging]
    public async Task<CommandResponse<GetListResponse>> GetList(
        [FromServices] ICommandHandler<GetListRequest, GetListResponse> handler,
        [FromBody] GetListRequest request)
    {
        return await handler.Handle(request);
    }

    [LambdaFunction(PackageType = LambdaPackageType.Image, Policies = "AWSLambdaBasicExecutionRole", MemorySize = 256, Timeout = 30)]
    [HttpApi(LambdaHttpMethod.Post, "/add")]
    [Tracing]
    [Logging]
    public async Task<CommandResponse<string>> AddLink(
        [FromServices] ICommandHandler<AddLinkRequest, string> handler,
        [FromBody] AddLinkRequest request)
    {
        Logger.LogInformation($"Request: {JsonSerializer.Serialize(request)}");
        return await handler.Handle(request);
    }
}
