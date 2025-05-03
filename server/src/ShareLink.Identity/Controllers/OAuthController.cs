using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Google;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

namespace ShareLink.Identity.Api.Controllers;

[ApiController]
[Route("[controller]")]
public class OAuthController(IOptions<AuthenticationConfiguration> authenticationConfiguration) : ControllerBase
{
    [HttpGet("login-google")]
    public ChallengeResult SignInGoogle()
    {
        return Challenge(new AuthenticationProperties { RedirectUri = authenticationConfiguration.Value.RedirectUri }, GoogleDefaults.AuthenticationScheme);
    }

    [HttpGet("login-github")]
    public IActionResult LoginWithGitHub()
    {
        return Challenge(new AuthenticationProperties { RedirectUri = authenticationConfiguration.Value.RedirectUri }, "GitHub");
    }
}