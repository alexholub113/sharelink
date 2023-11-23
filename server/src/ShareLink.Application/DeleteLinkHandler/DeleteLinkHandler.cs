using MediatR;
using Microsoft.EntityFrameworkCore;
using ShareLink.Application.Common.Abstraction;
using ShareLink.Application.Common.Exceptions;
using ShareLink.Common.Exceptions;

namespace ShareLink.Application.DeleteLinkHandler;

public class DeleteLinkRequest : IRequest
{
    public required string LinkId { get; init; }
}

public class DeleteLinkHandler(IApplicationDbContext context, IUserContext userContext) : IRequestHandler<DeleteLinkRequest>
{
    public async Task Handle(DeleteLinkRequest request, CancellationToken cancellationToken)
    {
        var userId = userContext.UserId;
        if (userId is null)
        {
            throw new UserUnauthorizedException();
        }

        var link = await context.Links.SingleOrDefaultAsync(x => x.Id == request.LinkId && x.UserId == userId, cancellationToken);
        if (link is null)
        {
            throw new BusinessException(ErrorCodes.LinkNotFound);
        }

        context.Links.Remove(link);
        await context.SaveChangesAsync(cancellationToken);
    }
}