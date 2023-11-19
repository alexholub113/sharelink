using MediatR;
using ShareLink.Application.Common.Services;

namespace ShareLink.Application.ToggleLinkLikeHandler;

public class ToggleLinkLikeRequest : IRequest
{
    public required string LinkId { get; init; }

    public bool State { get; init; }
}

public class ToggleLinkLikeHandler(IUserInteractionsService userInteractionsService) : IRequestHandler<ToggleLinkLikeRequest>
{
    public async Task Handle(ToggleLinkLikeRequest request, CancellationToken cancellationToken)
    {
        await userInteractionsService.ToggleLinkLike(request.LinkId, request.State, cancellationToken);
    }
}