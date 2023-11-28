using MediatR;
using Microsoft.EntityFrameworkCore;
using ShareLink.Application.Common.Abstraction;
using ShareLink.Application.Common.Exceptions;
using ShareLink.Application.Common.Extensions;
using ShareLink.Common.Exceptions;

namespace ShareLink.Application.UpdateLinkHandler;

public class UpdateLinkHandler(IApplicationDbContext context, IUserContext userContext) : IRequestHandler<UpdateLinkRequest>
{
    public async Task Handle(UpdateLinkRequest request, CancellationToken cancellationToken)
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

        link.Update(request.Title, await context.CreateTagList(request.Tags, cancellationToken));
        await context.SaveChangesAsync(cancellationToken);
    }
}