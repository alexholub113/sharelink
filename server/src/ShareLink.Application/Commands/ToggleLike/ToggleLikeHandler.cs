using Microsoft.AspNetCore.Authorization;
using ShareLink.Application.Abstraction;
using ShareLink.Application.Extensions;

namespace ShareLink.Application.Commands.ToggleLike;

[Authorize]
public class ToggleLikeHandler(IApplicationDbContext context, IUserContext userContext)
{
    public async Task Handle(ToggleLikeRequest request, CancellationToken cancellationToken = default)
    {
        var userProfile = await context.GetUserProfile(userContext.UserId, cancellationToken);
        var link = await context.GetLink(request.LinkId, cancellationToken);
        userProfile.ToggleLike(link);

        await context.SaveChangesAsync(cancellationToken);
    }
}