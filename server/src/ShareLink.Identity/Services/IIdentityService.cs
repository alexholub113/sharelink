using Microsoft.AspNetCore.Authentication.BearerToken;
using Microsoft.AspNetCore.Http.HttpResults;
using ShareLink.Identity.Dto;

namespace ShareLink.Identity.Services;

public interface IIdentityService
{
    Task<Results<Ok, ValidationProblem>> Register(RegisterRequest request);

    Task<Results<Ok<AccessTokenResponse>, EmptyHttpResult, ProblemHttpResult>> Login(LoginRequest request);

    Task<Results<Ok<AccessTokenResponse>, UnauthorizedHttpResult, SignInHttpResult, ChallengeHttpResult>> Refresh(
        RefreshRequest request);
}
