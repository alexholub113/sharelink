using MediatR;
using ShareLink.Application.Common.Services;

namespace ShareLink.Application.ToggleLinkSaveHandler;

public class ToggleLinkSaveRequest : IRequest
{
    public required string LinkId { get; init; }

    public bool State { get; init; }
}

public class ToggleLinkSaveHandler(IUserInteractionsService userInteractionsService) : IRequestHandler<ToggleLinkSaveRequest>
{
    public async Task Handle(ToggleLinkSaveRequest request, CancellationToken cancellationToken)
    {
        await userInteractionsService.ToggleLinkSave(request.LinkId, request.State, cancellationToken);
    }
}