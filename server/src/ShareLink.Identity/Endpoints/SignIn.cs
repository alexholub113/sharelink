using Microsoft.AspNetCore.Authentication.BearerToken;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Routing;
using ShareLink.Infrastructure.Abstractions;
using System.ComponentModel.DataAnnotations;

namespace ShareLink.Identity.Api.Endpoints;

public class SignInRequest
{
    [Required]
    [EmailAddress]
    public string Email { get; init; } = null!;

    [Required]
    public string Password { get; init; } = null!;

    public bool UseBearerScheme { get; init; }
}

public class SignIn : IEndpoint
{
    public void MapEndpoint(IEndpointRouteBuilder app)
    {
        app.MapPost("api/v1/identity/signin", Handle).WithTags("Identity");
    }

    private static async Task<Results<Ok<AccessTokenResponse>, EmptyHttpResult, ProblemHttpResult>> Handle(
        SignInRequest request, SignInManager<ApplicationUser> signInManager)
    {
        signInManager.AuthenticationScheme = request.UseBearerScheme ? IdentityConstants.BearerScheme : IdentityConstants.ApplicationScheme;
        var result = await signInManager.PasswordSignInAsync(request.Email, request.Password, true, false);
        if (!result.Succeeded)
        {
            return TypedResults.Problem(result.ToString(), statusCode: StatusCodes.Status401Unauthorized);
        }

        // The signInManager already produced the needed response in the form of a cookie or bearer token.
        return TypedResults.Empty;
    }
}
