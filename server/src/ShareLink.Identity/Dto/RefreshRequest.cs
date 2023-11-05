using System.ComponentModel.DataAnnotations;

namespace ShareLink.Identity.Dto;

public class RefreshRequest
{
    [Required]
    public required string RefreshToken { get; init; }
}
