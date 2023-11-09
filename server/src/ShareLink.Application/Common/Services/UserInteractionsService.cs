using Microsoft.EntityFrameworkCore;
using ShareLink.Application.Common.Abstraction;
using ShareLink.Application.Common.Exceptions;
using ShareLink.Domain.Models;

namespace ShareLink.Application.Common.Services;

public interface IUserInteractionsService
{
    Task ToggleLinkLike(string linkId, bool state, CancellationToken cancellationToken);
    Task ToggleLinkSave(string linkId, bool state, CancellationToken cancellationToken);
}

public class UserInteractionsService(IApplicationDbContext context, IIdentityContext identityContext) : IUserInteractionsService
{
    public async Task ToggleLinkLike(string linkId, bool state, CancellationToken cancellationToken)
    {
        var user = await GetUser(cancellationToken);
        if (!state)
        {
            var link = GetLink(user, linkId);
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
        var user = await GetUser(cancellationToken);
        if (!state)
        {
            var link = GetLink(user, linkId);
            user.SavedLinks.Remove(link);
        }
        else
        {
            var link = await GetLink(linkId, cancellationToken);
            user.SavedLinks.Add(link);
        }

        await context.SaveChangesAsync(cancellationToken);
    }

    private static Link GetLink(User user, string linkId)
    {
        var link = user.LikedLinks.SingleOrDefault(x => x.Id == linkId);
        if (link == null)
        {
            throw new BusinessException(ErrorCodes.LinkNotFound);
        }

        return link;
    }

    private async Task<User> GetUser(CancellationToken cancellationToken)
    {
        var userId = identityContext.UserId;
        if (userId == null)
        {
            throw new UserUnauthorizedException();
        }

        var user = await context.Users.Include(x => x.LikedLinks).SingleOrDefaultAsync(x => x.Id == userId, cancellationToken);
        if (user == null)
        {
            user = new User
            {
                Id = userId
            };
            context.Push(user);
        }

        return user;
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
}
