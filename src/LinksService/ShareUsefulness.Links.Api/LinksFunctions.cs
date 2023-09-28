using Amazon.Lambda.Annotations;
using Amazon.Lambda.Annotations.APIGateway;
using Amazon.Lambda.Core;
using AWS.Lambda.Powertools.Tracing;
using ShareUsefulness.Infrastructure.Command;
using ShareUsefulness.Links.Core.Commands.AddLink;
using ShareUsefulness.Links.Core.Commands.GetList;

[assembly: LambdaSerializer(typeof(Amazon.Lambda.Serialization.SystemTextJson.DefaultLambdaJsonSerializer))]

namespace ShareUsefulness.Links.Api;

public class LinksFunctions
{
    [LambdaFunction(PackageType = LambdaPackageType.Image, Policies = "AWSLambdaBasicExecutionRole", MemorySize = 256, Timeout = 30)]
    [HttpApi(LambdaHttpMethod.Post, "/list")]
    [Tracing]
    public async Task<GetListResponse> GetList(
        [FromServices] ICommandHandler<GetListRequest, GetListResponse> handler,
        [FromBody] GetListRequest request)
    {
        return await handler.Handle(request);
    }

    [LambdaFunction(PackageType = LambdaPackageType.Image, Policies = "AWSLambdaBasicExecutionRole", MemorySize = 256, Timeout = 30)]
    [HttpApi(LambdaHttpMethod.Post, "/add")]
    [Tracing]
    public async Task<CommandResponse> AddLink(
        [FromServices] ICommandHandler<AddLinkRequest, CommandResponse> handler,
        [FromBody] AddLinkRequest request)
    {
        return await handler.Handle(request);
    }
}
