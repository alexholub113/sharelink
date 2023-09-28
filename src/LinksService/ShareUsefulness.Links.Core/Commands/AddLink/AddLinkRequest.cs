using ShareUsefulness.Infrastructure.Command;

namespace ShareUsefulness.Links.Core.Commands.AddLink;

public class AddLinkRequest : ICommandRequest
{
    public string Title { get; set; }
}
