using Microsoft.AspNetCore.Authorization;
using ShareLink.Application.Abstraction;
using ShareLink.Application.Extensions;

namespace ShareLink.Application.Commands.ToggleSave;

[Authorize]
public class ToggleSaveHandler(IApplicationDbContext context, IUserContext userContext)
{
    public async Task Handle(ToggleSaveRequest request, CancellationToken cancellationToken = default)
    {
        var userProfile = await context.GetUserProfile(userContext.UserId, cancellationToken);
        var link = await context.GetLink(request.LinkId, cancellationToken);
        userProfile.ToggleSave(link);

        await context.SaveChangesAsync(cancellationToken);
    }
}