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

        throw new NotImplementedException();
    }
}
