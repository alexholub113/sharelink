using System.ComponentModel.DataAnnotations;

namespace ShareLink.Identity.Commands.SignUp;

public class SignUpRequest
{
    [Required]
    [EmailAddress]
    public string Email { get; init; } = null!;

    [Required]
    public string Password { get; init; } = null!;

    [Required]
    [MinLength(3)]
    [MaxLength(50)]
    public string Nickname { get; init; } = null!;
}