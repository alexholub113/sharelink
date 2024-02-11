using ShareLink.Application.Abstraction;

namespace ShareLink.Identity.Commands.GetUserInfo;

public class GetUserInfoHandler(IUserContext userContext)
{
    public Task<UserInfo> Handle(GetUserInfoRequest _)
    {
        var userNickname = userContext.UserNickname;
        if (string.IsNullOrEmpty(userNickname))
        {
            return Task.FromResult(new UserInfo
            {
                Nickname = null
            });
        }

        return Task.FromResult(new UserInfo
        {
            Nickname = userNickname
        });
    }
}