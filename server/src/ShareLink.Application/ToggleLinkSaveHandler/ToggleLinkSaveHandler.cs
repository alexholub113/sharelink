using MediatR;
using ShareLink.Application.Common.Services;

namespace ShareLink.Application.ToggleLinkSaveHandler;

public class ToggleLinkSaveRequest : IRequest
{
    public string LinkId { get; set; } = string.Empty;

    public bool State { get; init; }
}

public class ToggleLinkSaveHandler(IUserInteractionsService userInteractionsService) : IRequestHandler<ToggleLinkSaveRequest>
{
    public async Task Handle(ToggleLinkSaveRequest request, CancellationToken cancellationToken)
    {
        await userInteractionsService.ToggleLinkLike(request.LinkId, request.State, cancellationToken);
    }
}
