using MediatR;
using ShareLink.Application.Common.Abstraction;
using ShareLink.Application.Common.Extensions;

namespace ShareLink.Application.ToggleLinkDislikeHandler;

public class ToggleLinkDislikeHandler(IApplicationDbContext context, IUserContext userContext) : IRequestHandler<ToggleLinkDislikeRequest>
{
    public async Task Handle(ToggleLinkDislikeRequest request, CancellationToken cancellationToken)
    {
        var userProfile = await context.GetUserProfile(userContext.UserId, cancellationToken);
        var link = await context.GetLink(request.LinkId, cancellationToken);
        userProfile.ToggleDislike(link);

        await context.SaveChangesAsync(cancellationToken);
    }
}