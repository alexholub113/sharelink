using System.Diagnostics;
using System.Security.Claims;
using Microsoft.AspNetCore.Authentication.BearerToken;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;
using ShareLink.Identity.Dto;

namespace ShareLink.Identity.Services;

public class IdentityService(
    UserManager<ApplicationUser> userManager,
    IUserStore<ApplicationUser> userStore,
    SignInManager<ApplicationUser> signInManager,
    IOptionsMonitor<BearerTokenOptions> bearerTokenOptions,
    TimeProvider timeProvider) : IIdentityService
{
    public async Task<Results<Ok, ValidationProblem>> SignUp(SignUpRequest request)
    {
        var emailStore = (IUserEmailStore<ApplicationUser>)userStore;
        var user = new ApplicationUser();
        await userStore.SetUserNameAsync(user, request.Email, CancellationToken.None);
        await emailStore.SetEmailAsync(user, request.Email, CancellationToken.None);

        var result = await userManager.CreateAsync(user, request.Password);
        if (!result.Succeeded)
        {
            return CreateValidationProblem(result);
        }

        await userManager.AddClaimAsync(user, new Claim(ClaimsNames.Nickname, request.Nickname));

        return TypedResults.Ok();
    }

    public async Task<Results<Ok<AccessTokenResponse>, EmptyHttpResult, ProblemHttpResult>> SignIn(SignInRequest signInRequest)
    {
        signInManager.AuthenticationScheme = signInRequest.UseBearerScheme ? IdentityConstants.BearerScheme : IdentityConstants.ApplicationScheme;
        var result = await signInManager.PasswordSignInAsync(signInRequest.Email, signInRequest.Password, true, false);
        if (!result.Succeeded)
        {
            return TypedResults.Problem(result.ToString(), statusCode: StatusCodes.Status401Unauthorized);
        }

        // The signInManager already produced the needed response in the form of a cookie or bearer token.
        return TypedResults.Empty;
    }

    public async Task<Results<Ok<AccessTokenResponse>, UnauthorizedHttpResult, SignInHttpResult, ChallengeHttpResult>> Refresh(RefreshRequest request)
    {
        var refreshTokenProtector = bearerTokenOptions.Get(IdentityConstants.BearerScheme).RefreshTokenProtector;
        var refreshTicket = refreshTokenProtector.Unprotect(request.RefreshToken);

        // Reject the /refresh attempt with a 401 if the token expired or the security stamp validation fails
        if (refreshTicket?.Properties?.ExpiresUtc is not { } expiresUtc ||
            timeProvider.GetUtcNow() >= expiresUtc ||
            await signInManager.ValidateSecurityStampAsync(refreshTicket.Principal) is not ApplicationUser user)

        {
            return TypedResults.Challenge();
        }

        var newPrincipal = await signInManager.CreateUserPrincipalAsync(user);
        return TypedResults.SignIn(newPrincipal, authenticationScheme: IdentityConstants.BearerScheme);
    }

    public async Task<Ok> SignOut()
    {
        await signInManager.SignOutAsync();
        return TypedResults.Ok();
    }

    public Results<Ok<UserInfo>, EmptyHttpResult> GetUserInfo()
    {
        var user = signInManager.Context.User;
        if (user is not { Identity: { IsAuthenticated: true } })
        {
            return TypedResults.Empty;
        }

        var userInfo = new UserInfo
        {
            Nickname = user.FindFirstValue(ClaimsNames.Nickname) ?? user.FindFirstValue(ClaimTypes.Name)
        };

        return TypedResults.Ok(userInfo);
    }

    private static ValidationProblem CreateValidationProblem(IdentityResult result)
    {
        // We expect a single error code and description in the normal case.
        // This could be golfed with GroupBy and ToDictionary, but perf! :P
        Debug.Assert(!result.Succeeded);
        var errorDictionary = new Dictionary<string, string[]>(1);

        foreach (var error in result.Errors)
        {
            string[] newDescriptions;

            if (errorDictionary.TryGetValue(error.Code, out var descriptions))
            {
                newDescriptions = new string[descriptions.Length + 1];
                Array.Copy(descriptions, newDescriptions, descriptions.Length);
                newDescriptions[descriptions.Length] = error.Description;
            }
            else
            {
                newDescriptions = new[] { error.Description };
            }

            errorDictionary[error.Code] = newDescriptions;
        }

        return TypedResults.ValidationProblem(errorDictionary);
    }
}