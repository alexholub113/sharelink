using Microsoft.AspNetCore.Http;
using ShareLink.Application.Common.Abstraction;

namespace ShareLink.Identity.Services;

public class IdentityContext(IHttpContextAccessor contextAccessor) : IIdentityContext
{
    public bool Authenticated => contextAccessor.HttpContext?.User.Identity?.IsAuthenticated ?? false;

    public string? UserDisplayName => contextAccessor.HttpContext?.User.FindFirst(ClaimsNames.DisplayName)?.Value;

}
