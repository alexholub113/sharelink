using ShareUsefulness.Infrastructure.Command;
using ShareUsefulness.Infrastructure.Exceptions;
using ShareUsefulness.Links.Core.Data;
using ShareUsefulness.Links.Core.Entities;

namespace ShareUsefulness.Links.Core.Commands.AddLink;

public class AddLinkHandler : CommandHandler<AddLinkRequest, string>
{
    private readonly ILinkContext _linkContext;

    public AddLinkHandler(ILinkContext linkContext)
    {
        _linkContext = linkContext;
    }

    protected override async Task<string> HandleInternal(AddLinkRequest request)
    {
        var errors = request.Validate().ToArray();
        if (errors.Any())
        {
            throw new RequestValidationException(errors);
        }

        await _linkContext.Links.InsertOneAsync(new Link
        {
            Title = request.Title,
            Type = request.Type,
            Url = request.Url,
            Tags = request.Tags,
            CreatedAt = DateTime.UtcNow,
        });

        return "Successfully added link";
    }
}
