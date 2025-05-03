namespace ShareLink.Links.Api.Abstraction;

public interface IUserContext
{
    string? UserNickname { get; }

    string? UserId { get; }

    bool IsAdmin { get; }
}