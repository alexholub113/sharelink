using MediatR;
using ShareLink.Application.Common.Services;

namespace ShareLink.Application.ToggleLinkSaveHandler;

public class ToggleLinkSaveHandler(IUserInteractionsService userInteractionsService) : IRequestHandler<ToggleLinkSaveRequest>
{
    public async Task Handle(ToggleLinkSaveRequest request, CancellationToken cancellationToken)
    {
        await userInteractionsService.ToggleLinkSave(request.LinkId, request.State, cancellationToken);
    }
}