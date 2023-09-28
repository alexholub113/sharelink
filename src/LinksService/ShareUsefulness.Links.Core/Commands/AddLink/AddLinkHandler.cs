using ShareUsefulness.Infrastructure.Command;
using ShareUsefulness.Links.Core.Data;
using ShareUsefulness.Links.Core.Entities;

namespace ShareUsefulness.Links.Core.Commands.AddLink;

public class AddLinkHandler : ICommandHandler<AddLinkRequest, CommandResponse>
{
    private readonly ILinkContext _linkContext;

    public AddLinkHandler(ILinkContext linkContext)
    {
        _linkContext = linkContext;
    }

    public async Task<CommandResponse> Handle(AddLinkRequest request)
    {
        await _linkContext.Links.InsertOneAsync(new Link { Title = request.Title });

        return new CommandResponse();
    }
}
