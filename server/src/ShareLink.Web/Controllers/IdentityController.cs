using Microsoft.AspNetCore.Authentication.BearerToken;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using ShareLink.Identity.Dto;
using ShareLink.Identity.Services;

namespace ShareLink.Web.Controllers;

[ApiController]
[Route("[controller]")]
public class IdentityController(IIdentityService identityService) : ControllerBase
{
    [HttpPost("register")]
    public async Task<Results<Ok, ValidationProblem>> Register([FromBody] RegisterRequest request)
    {
        return await identityService.Register(request);
    }

    [HttpPost("login")]
    public async Task<Results<Ok<AccessTokenResponse>, EmptyHttpResult, ProblemHttpResult>> Login([FromBody] LoginRequest request)
    {
        return await identityService.Login(request);
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