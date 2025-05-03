using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;
using Microsoft.EntityFrameworkCore;
using ShareLink.Common.Exceptions;
using ShareLink.Infrastructure.Abstractions;
using ShareLink.Links.Api.Abstraction;

namespace ShareLink.Links.Api.Endpoints;

public class Delete : IEndpoint
{
    public void MapEndpoint(IEndpointRouteBuilder app)
    {
        app.MapDelete("api/v1/links/delete/{linkId}", Handle).WithTags("Links");
    }

    [Authorize]
    private static async Task Handle(string linkId, IApplicationDbContext context, IUserContext userContext, CancellationToken cancellationToken = default)
    {
        var userId = userContext.UserId;
        if (userId is null)
        {
            throw new UnauthorizedAccessException();
        }

        var link = await context.Links
            .Include(x => x.Tags)
            .ThenInclude(x => x.Links)
            .SingleOrDefaultAsync(x => x.Id == linkId && x.UserId == userId, cancellationToken);
        if (link is null)
        {
            throw new BusinessException(ErrorCodes.LinkNotFound);
        }

        context.Tags.RemoveRange([.. link.Tags.Where(x => x.Links.Count == 1)]);
        context.Links.Remove(link);
        await context.SaveChangesAsync(cancellationToken);
    }
}
