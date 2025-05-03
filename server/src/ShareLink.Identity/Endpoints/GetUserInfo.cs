using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;
using ShareLink.Infrastructure.Abstractions;
using ShareLink.Links.Api.Abstraction;

namespace ShareLink.Identity.Api.Endpoints;

public record UserInfo(string? Nickname);

public class GetUserInfo : IEndpoint
{
    public void MapEndpoint(IEndpointRouteBuilder app)
    {
        app.MapGet("api/v1/identity/getuserinfo", Handle).WithTags("Identity");
    }

    private static UserInfo Handle(IUserContext userContext)
    {
        var userNickname = userContext.UserNickname;
        if (string.IsNullOrEmpty(userNickname))
        {
            return new UserInfo(null);
        }

        return new UserInfo(userNickname);
    }
}
