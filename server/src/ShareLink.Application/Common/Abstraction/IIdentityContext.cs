namespace ShareLink.Application.Common.Abstraction;

public interface IIdentityContext
{
    bool Authenticated { get; }

    string? UserDisplayName { get; }
}
