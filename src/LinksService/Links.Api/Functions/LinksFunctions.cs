using Amazon.Lambda.Annotations;
using Amazon.Lambda.Annotations.APIGateway;
using Amazon.Lambda.Core;
using Links.Core.Models;
using Links.Dal;
using ShareUsefulness.Links.Api.Dto;

[assembly: LambdaSerializer(typeof(Amazon.Lambda.Serialization.SystemTextJson.DefaultLambdaJsonSerializer))]

namespace ShareUsefulness.Links.Api.Functions;

/// <summary>
/// A collection of sample Lambda functions that provide a REST api for doing simple math calculations. 
/// </summary>
public class LinksFunctions
{
    private IDataStore _dataStore;

    public LinksFunctions(IDataStore dataStore)
    {
        _dataStore = dataStore;
    }

    [LambdaFunction()]
    [HttpApi(LambdaHttpMethod.Get, "/list")]
    public Link[] GetList()
    {
        return _dataStore.GetList().ToArray();
    }

    [LambdaFunction()]
    [HttpApi(LambdaHttpMethod.Post, "/add")]
    public void AddLink([FromBody] AddLinkRequestDto requestDto)
    {
        _dataStore.Add(new Link(requestDto.Name));
    }
}
