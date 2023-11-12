using System.ComponentModel.DataAnnotations;

namespace ShareLink.Identity.Dto;

public class SignInRequest
{
    [Required]
    [EmailAddress]
    public required string Email { get; init; }

    [Required]
    public required string Password { get; init; }

    public bool UseBearerScheme { get; init; }
}
