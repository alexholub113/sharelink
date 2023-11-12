using Microsoft.AspNetCore.Authentication.BearerToken;
using Microsoft.AspNetCore.Http.HttpResults;
using ShareLink.Identity.Dto;

namespace ShareLink.Identity.Services;

public interface IIdentityService
{
    Task<Results<Ok, ValidationProblem>> SignUp(SignUpRequest request);

    Task<Results<Ok<AccessTokenResponse>, EmptyHttpResult, ProblemHttpResult>> SignIn(SignInRequest request);

    Task<Ok> SignOut();

    Task<Results<Ok<AccessTokenResponse>, UnauthorizedHttpResult, SignInHttpResult, ChallengeHttpResult>> Refresh(
        RefreshRequest request);

    Results<Ok<UserInfo>, EmptyHttpResult> GetUserInfo();
}