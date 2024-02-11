using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using ShareLink.Application.Abstraction;
using ShareLink.Application.Extensions;
using ShareLink.Application.Services;
using ShareLink.Common.Exceptions;

namespace ShareLink.Application.Commands.Update;

[Authorize]
public class UpdateHandler(IApplicationDbContext context, IUserContext userContext, IContentModerator contentModerator)
{
    public async Task Handle(UpdateRequest request, CancellationToken cancellationToken = default)
    {
        var userId = userContext.UserId;
        if (userId is null)
        {
            throw new UnauthorizedAccessException();
        }

        var terms = await contentModerator.ModerateText(request.Title + " " + string.Join(" ", request.Tags));
        if (terms.Length > 0)
        {
            throw new BusinessException(
                ErrorCodes.ActionFailed,
                $"Title or tags have inappropriate words: {terms}.");
        }

        var link = await context.Links
            .Include(x => x.Tags)
            .SingleOrDefaultAsync(x => x.Id == request.LinkId && x.UserId == userId, cancellationToken);
        if (link is null)
        {
            throw new BusinessException(ErrorCodes.LinkNotFound);
        }

        link.Update(request.Title, await context.CreateTagList(request.Tags, cancellationToken));
        await context.SaveChangesAsync(cancellationToken);
    }
}