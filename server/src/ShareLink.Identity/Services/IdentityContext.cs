using System.Security.Claims;
using Microsoft.AspNetCore.Http;
using ShareLink.Application.Common.Abstraction;

namespace ShareLink.Identity.Services;

public class IdentityContext(IHttpContextAccessor contextAccessor) : IIdentityContext
{
    public string? UserDisplayName => contextAccessor.HttpContext?.User.FindFirst(ClaimsNames.DisplayName)?.Value;

    public string? UserId => contextAccessor.HttpContext?.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
}
