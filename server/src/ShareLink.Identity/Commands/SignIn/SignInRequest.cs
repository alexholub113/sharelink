using System.ComponentModel.DataAnnotations;

namespace ShareLink.Identity.Commands.SignIn;

public class SignInRequest
{
    [Required]
    [EmailAddress]
    public string Email { get; init; } = null!;

    [Required]
    public string Password { get; init; } = null!;

    public bool UseBearerScheme { get; init; }
}