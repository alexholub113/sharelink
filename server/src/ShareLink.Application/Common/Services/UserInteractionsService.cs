using Microsoft.EntityFrameworkCore;
using ShareLink.Application.Common.Abstraction;
using ShareLink.Application.Common.Exceptions;
using ShareLink.Common.Exceptions;
using ShareLink.Domain.Models;

namespace ShareLink.Application.Common.Services;

public interface IUserInteractionsService
{
    Task ToggleLinkLike(string linkId, bool state, CancellationToken cancellationToken);
    Task ToggleLinkSave(string linkId, bool state, CancellationToken cancellationToken);
}

public class UserInteractionsService(IApplicationDbContext context, IUserContext userContext) : IUserInteractionsService
{
    public async Task ToggleLinkLike(string linkId, bool state, CancellationToken cancellationToken)
    {
        var user = await GetUserProfile(cancellationToken);
        if (!state)
        {
            var link = GetLikedLink(user, linkId);
            user.LikedLinks.Remove(link);
        }
        else
        {
            var link = await GetLink(linkId, cancellationToken);
            user.LikedLinks.Add(link);
        }

        await context.SaveChangesAsync(cancellationToken);
    }


    public async Task ToggleLinkSave(string linkId, bool state, CancellationToken cancellationToken)
    {
        var userProfile = await GetUserProfile(cancellationToken);
        if (!state)
        {
            var link = GetSavedLink(userProfile, linkId);
            userProfile.SavedLinks.Remove(link);
        }
        else
        {
            var link = await GetLink(linkId, cancellationToken);
            userProfile.SavedLinks.Add(link);
        }

        await context.SaveChangesAsync(cancellationToken);
    }

    private async Task<UserProfile> GetUserProfile(CancellationToken cancellationToken)
    {
        var userId = userContext.UserId;
        if (userId == null)
        {
            throw new UserUnauthorizedException();
        }

        var userProfile = await context.UserProfiles.Include(x => x.LikedLinks).Include(x => x.SavedLinks).SingleOrDefaultAsync(x => x.UserId == userId, cancellationToken);
        if (userProfile == null)
        {
            userProfile = new UserProfile
            {
                UserId = userId
            };
            context.Push(userProfile);
        }

        return userProfile;
    }

    private async Task<Link> GetLink(string linkId, CancellationToken cancellationToken)
    {
        var link = await context.Links.SingleOrDefaultAsync(x => x.Id == linkId, cancellationToken);
        if (link == null)
        {
            throw new BusinessException(ErrorCodes.LinkNotFound);
        }

        return link;
    }

    private static Link GetLikedLink(UserProfile userProfile, string linkId)
    {
        var link = userProfile.LikedLinks.SingleOrDefault(x => x.Id == linkId);
        if (link == null)
        {
            throw new BusinessException(ErrorCodes.LinkNotFound);
        }

        return link;
    }

    private static Link GetSavedLink(UserProfile userProfile, string linkId)
    {
        var link = userProfile.SavedLinks.SingleOrDefault(x => x.Id == linkId);
        if (link == null)
        {
            throw new BusinessException(ErrorCodes.LinkNotFound);
        }

        return link;
    }
}