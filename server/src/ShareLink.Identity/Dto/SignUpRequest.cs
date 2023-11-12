using System.ComponentModel.DataAnnotations;

namespace ShareLink.Identity.Dto;

public class SignUpRequest
{
    [Required]
    [EmailAddress]
    public required string Email { get; init; }

    [Required]
    public required string Password { get; init; }

    [Required]
    [MinLength(3)]
    [MaxLength(50)]
    public required string Nickname { get; init; }
}
