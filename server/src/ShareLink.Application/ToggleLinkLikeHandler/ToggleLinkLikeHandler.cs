using MediatR;
using ShareLink.Application.Common.Abstraction;
using ShareLink.Application.Common.Extensions;
using ShareLink.Application.Common.Services;

namespace ShareLink.Application.ToggleLinkLikeHandler;

public class ToggleLinkLikeHandler(IApplicationDbContext context, IUserContext userContext) : IRequestHandler<ToggleLinkLikeRequest>
{
    public async Task Handle(ToggleLinkLikeRequest request, CancellationToken cancellationToken)
    {
        var userProfile = await context.GetUserProfile(userContext.UserId, cancellationToken);
        var link = await context.GetLink(request.LinkId, cancellationToken);
        userProfile.ToggleLike(link);

        await context.SaveChangesAsync(cancellationToken);
    }
}