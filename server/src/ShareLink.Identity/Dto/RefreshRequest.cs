using System.ComponentModel.DataAnnotations;

namespace ShareLink.Identity.Api.Dto;

public class RefreshRequest
{
    [Required]
    public required string RefreshToken { get; init; }
}
