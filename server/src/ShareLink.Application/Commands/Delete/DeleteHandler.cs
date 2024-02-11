using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using ShareLink.Application.Abstraction;
using ShareLink.Common.Exceptions;

namespace ShareLink.Application.Commands.Delete;

[Authorize]
public class DeleteHandler(IApplicationDbContext context, IUserContext userContext)
{
    public async Task Handle(DeleteRequest request, CancellationToken cancellationToken = default)
    {
        var userId = userContext.UserId;
        if (userId is null)
        {
            throw new UnauthorizedAccessException();
        }

        var link = await context.Links
            .Include(x => x.Tags)
            .ThenInclude(x => x.Links)
            .SingleOrDefaultAsync(x => x.Id == request.LinkId && x.UserId == userId, cancellationToken);
        if (link is null)
        {
            throw new BusinessException(ErrorCodes.LinkNotFound);
        }

        context.Tags.RemoveRange(link.Tags.Where(x => x.Links.Count == 1).ToArray());
        context.Links.Remove(link);
        await context.SaveChangesAsync(cancellationToken);
    }
}