using Microsoft.AspNetCore.Authentication.BearerToken;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using ShareLink.Identity.Dto;
using ShareLink.Identity.Services;

namespace ShareLink.Identity.Controllers;

[ApiController]
[Route("[controller]")]
public class AccountController(IIdentityService identityService) : ControllerBase
{
    [HttpPost("signup")]
    public async Task<Results<Ok, ValidationProblem>> Register([FromBody] SignUpRequest request)
    {
        return await identityService.SignUp(request);
    }

    [HttpPost("signin")]
    public async Task<Results<Ok<AccessTokenResponse>, EmptyHttpResult, ProblemHttpResult>> Login([FromBody] SignInRequest request)
    {
        return await identityService.SignIn(request);
    }

    [Authorize]
    [HttpPost("signout")]
    public async Task<Ok> SignOur()
    {
        return await identityService.SignOut();
    }

    [HttpPost("refresh")]
    public async Task<Results<Ok<AccessTokenResponse>, UnauthorizedHttpResult, SignInHttpResult, ChallengeHttpResult>> Refresh([FromBody] RefreshRequest request)
    {
        return await identityService.Refresh(request);
    }

    [HttpGet("userinfo")]
    public Results<Ok<UserInfo>, EmptyHttpResult> GetUserInfo()
    {
        return identityService.GetUserInfo();
    }
}