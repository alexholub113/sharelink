using Amazon.Lambda.Annotations;
using Amazon.Lambda.Annotations.APIGateway;
using Amazon.Lambda.Core;
using AWS.Lambda.Powertools.Tracing;
using ShareUsefulness.Links.Core.Models;
using Links.Dal;
using ShareUsefulness.Links.Api.Dto;

[assembly: LambdaSerializer(typeof(Amazon.Lambda.Serialization.SystemTextJson.DefaultLambdaJsonSerializer))]

namespace ShareUsefulness.Links.Api.Functions;

public class LinksFunctions
{
    private IDataStore _dataStore;

    public LinksFunctions(IDataStore dataStore)
    {
        _dataStore = dataStore;
    }

    [LambdaFunction(PackageType = LambdaPackageType.Image, Policies = "AWSLambdaBasicExecutionRole", MemorySize = 256, Timeout = 30)]
    [HttpApi(LambdaHttpMethod.Get, "/list")]
    [Tracing]
    public async Task<Link[]> GetList()
    {
        return await _dataStore.GetList();
    }

    [LambdaFunction(PackageType = LambdaPackageType.Image, Policies = "AWSLambdaBasicExecutionRole", MemorySize = 256, Timeout = 30)]
    [HttpApi(LambdaHttpMethod.Post, "/add")]
    [Tracing]
    public async Task AddLink([FromBody] AddLinkRequestDto requestDto)
    {
        Tracing.AddAnnotation("link", requestDto.Name);
        await _dataStore.Add(new Link(requestDto.Name));
    }
}
