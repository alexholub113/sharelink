using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Google;
using Microsoft.AspNetCore.Mvc;

namespace ShareLink.Web.Controllers;

[ApiController]
[Route("[controller]")]
public class OAuthController : ControllerBase
{
    [HttpGet("login-google")]
    public ChallengeResult SignInGoogle()
    {
        return Challenge(new AuthenticationProperties { RedirectUri = "http://localhost:5173/" }, GoogleDefaults.AuthenticationScheme);
    }

    [HttpGet("login-github")]
    public IActionResult LoginWithGitHub()
    {
        return Challenge(new AuthenticationProperties { RedirectUri = "http://localhost:5173/" }, "GitHub");
    }
}