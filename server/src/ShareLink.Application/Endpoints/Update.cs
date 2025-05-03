using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Routing;
using Microsoft.EntityFrameworkCore;
using ShareLink.Common.Exceptions;
using ShareLink.Infrastructure.Abstractions;
using ShareLink.Links.Api.Abstraction;
using ShareLink.Links.Api.Attributes;
using ShareLink.Links.Api.Extensions;
using ShareLink.Links.Api.Services;
using System.ComponentModel.DataAnnotations;

namespace ShareLink.Links.Api.Endpoints;

public class UpdateRequest
{
    [Required(ErrorMessage = "Link id is required.")]
    public string LinkId { get; init; } = null!;

    [Required(ErrorMessage = "Title is required.")]
    [LinkTitle]
    public string Title { get; init; } = null!;

    [Required(ErrorMessage = "Tags are required.")]
    [LinkTagCollection]
    public string[] Tags { get; init; } = null!;
}

public class Update : IEndpoint
{
    public void MapEndpoint(IEndpointRouteBuilder app)
    {
        app.MapPut("api/v1/links/update", Handle).WithTags("Links");
    }

    [Authorize]
    private static async Task Handle(
        [FromBody] UpdateRequest request,
        IApplicationDbContext context,
        IUserContext userContext,
        IContentModerator contentModerator,
         CancellationToken cancellationToken = default)
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
