namespace ShareLink.Application.Common.Abstraction;

public interface IIdentityContext
{
    string? UserNickname { get; }

    string? UserId { get; }
}
