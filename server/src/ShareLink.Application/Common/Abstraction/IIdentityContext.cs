namespace ShareLink.Application.Common.Abstraction;

public interface IIdentityContext
{
    string? UserDisplayName { get; }

    string? UserId { get; }
}
