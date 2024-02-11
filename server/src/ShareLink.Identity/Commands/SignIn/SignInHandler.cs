using Microsoft.AspNetCore.Authentication.BearerToken;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Identity;

namespace ShareLink.Identity.Commands.SignIn;

public class SignInHandler(SignInManager<ApplicationUser> signInManager)
{
    public async Task<Results<Ok<AccessTokenResponse>, EmptyHttpResult, ProblemHttpResult>> Handle(SignInRequest request)
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