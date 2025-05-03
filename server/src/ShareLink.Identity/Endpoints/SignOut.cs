using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Routing;
using ShareLink.Infrastructure.Abstractions;

namespace ShareLink.Identity.Api.Endpoints;

public record SignOutRequest();

public class SignOut : IEndpoint
{
    public void MapEndpoint(IEndpointRouteBuilder app)
    {
        app.MapPost("api/v1/identity/signout", Handle).WithTags("Identity");
    }

    private static async Task<Ok> Handle(SignOutRequest _, SignInManager<ApplicationUser> signInManager)
    {
        await signInManager.SignOutAsync();
        return TypedResults.Ok();
    }
}
