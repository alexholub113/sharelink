using ShareUsefulness.Links.Core.DataAccess;
using ShareUsefulness.Links.Core.Models;

namespace ShareUsefulness.Links.Core.Commands.AddLink;

public class AddLinkHandler
{
    private readonly ILinkDynamoDbContext _dbContext;

    public AddLinkHandler(ILinkDynamoDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<Link> Handle(AddLinkRequest request)
    {
        var errors = request.Validate().ToArray();
        if (errors.Any())
        {
            throw new InvalidOperationException("Request is invalid. Errors: " + string.Join(", ", errors));
        }

        var link = new Link
        {
            Id = request.Type.ToString().ToLower() + ":" + Guid.NewGuid(),
            Title = request.Title,
            Type = Enum.Parse<LinkType>(request.Type),
            Url = request.Url,
            Tags = request.Tags,
            Likes = 0,
            CreatedAt = DateTime.UtcNow
        };
        await _dbContext.Client.PutItemAsync(_dbContext.TableName, LinkMapper.ToDynamoDb(link));

        return link;
    }
}
