using System.Security.Claims;
using Microsoft.AspNetCore.Http;
using ShareLink.Application.Common.Abstraction;

namespace ShareLink.Identity.Services;

public class IdentityContext(IHttpContextAccessor contextAccessor) : IIdentityContext
{
    public string? UserNickname => contextAccessor.HttpContext?.User.FindFirst(ClaimsNames.Nickname)?.Value;

    public string? UserId => contextAccessor.HttpContext?.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
}