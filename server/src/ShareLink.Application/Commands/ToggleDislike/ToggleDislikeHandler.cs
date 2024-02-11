using Microsoft.AspNetCore.Authorization;
using ShareLink.Application.Abstraction;
using ShareLink.Application.Extensions;

namespace ShareLink.Application.Commands.ToggleDislike;

[Authorize]
public class ToggleDislikeHandler(IApplicationDbContext context, IUserContext userContext)
{
    public async Task Handle(ToggleDislikeRequest request, CancellationToken cancellationToken = default)
    {
        var userProfile = await context.GetUserProfile(userContext.UserId, cancellationToken);
        var link = await context.GetLink(request.LinkId, cancellationToken);
        userProfile.ToggleDislike(link);

        await context.SaveChangesAsync(cancellationToken);
    }
}