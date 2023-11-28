using MediatR;
using Microsoft.EntityFrameworkCore;
using ShareLink.Application.Common.Abstraction;
using ShareLink.Application.Common.Exceptions;
using ShareLink.Common.Exceptions;

namespace ShareLink.Application.DeleteLinkHandler;

public class DeleteLinkHandler(IApplicationDbContext context, IUserContext userContext) : IRequestHandler<DeleteLinkRequest>
{
    public async Task Handle(DeleteLinkRequest request, CancellationToken cancellationToken)
    {
        var userId = userContext.UserId;
        if (userId is null)
        {
            throw new UserUnauthorizedException();
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