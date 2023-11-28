namespace ShareLink.Application.Common.Abstraction;

public interface IUserContext
{
    string? UserNickname { get; }

    string? UserId { get; }

    bool IsAdmin { get; }
}