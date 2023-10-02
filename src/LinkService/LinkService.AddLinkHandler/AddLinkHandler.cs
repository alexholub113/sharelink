using System;
using System.Linq;
using System.Threading.Tasks;
using Amazon.Lambda.APIGatewayEvents;
using Amazon.Lambda.Core;
using Amazon.Lambda.RuntimeSupport;
using Amazon.Lambda.Serialization.SystemTextJson;
using LinkService.Common;
using LinkService.Common.DataAccess;
using LinkService.Common.Dto;
using LinkService.Common.Extensions;
using LinkService.Common.Models;

namespace LinkService.AddLinkHandler;

public class AddLinkHandler
{
    private readonly ILinkDynamoDbContext _dbContext;
    public AddLinkHandler(ILinkDynamoDbContext dbContext)
    {
        _dbContext = dbContext;
    }
    
    private static async Task Main()
    {
        var handler = new AddLinkHandler(new LinkDynamoDbContext()).Handle;
        await LambdaBootstrapBuilder.Create(handler, new SourceGeneratorLambdaJsonSerializer<AddLinkJsonSerializerContext>(options => {
                options.PropertyNameCaseInsensitive = true;
            }))
            .Build()
            .RunAsync();
    }

    public async Task<APIGatewayHttpApiV2ProxyResponse> Handle(
        APIGatewayHttpApiV2ProxyRequest apiV2ProxyRequest, ILambdaContext context)
    {
        var request = apiV2ProxyRequest.Body.Deserialize(AddLinkJsonSerializerContext.Default.AddLinkRequest);
        var errors = request.Validate();
        if (errors.Any())
        {
            return ApiGatewayResponseBuilder.Fail(
                new FailedApiResponse(errors), AddLinkJsonSerializerContext.Default.FailedApiResponse);
        }

        var link = new Link
        {
            Id = request.Type.ToLower() + ":" + Guid.NewGuid(),
            Title = request.Title,
            Type = Enum.Parse<LinkType>(request.Type),
            Url = request.Url,
            Tags = request.Tags,
            Likes = 0,
            CreatedAt = DateTime.UtcNow
        };
        await _dbContext.Client.PutItemAsync(_dbContext.TableName, LinkMapper.ToDynamoDb(link));

        return ApiGatewayResponseBuilder.Success(
            new SuccessApiResponse<Link>(link), AddLinkJsonSerializerContext.Default.SuccessApiResponseLink);
    }
}
