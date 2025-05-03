using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;
using ShareLink.Infrastructure.Abstractions;
using ShareLink.Links.Api.Abstraction;
using ShareLink.Links.Api.Extensions;

namespace ShareLink.Links.Api.Endpoints;

public class Dislike : IEndpoint
{
    public void MapEndpoint(IEndpointRouteBuilder app)
    {
        app.MapPost("api/v1/links/dislike/{linkId}", Handle).WithTags("Links");
    }

    [Authorize]
    private static async Task Handle(
        string linkId,
        IApplicationDbContext context,
        IUserContext userContext,
        CancellationToken cancellationToken = default)
    {
        var userProfile = await context.GetUserProfile(userContext.UserId, cancellationToken);
        var link = await context.GetLink(linkId, cancellationToken);
        userProfile.ToggleDislike(link);

        await context.SaveChangesAsync(cancellationToken);
    }
}
