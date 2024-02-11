using System.ComponentModel.DataAnnotations;

namespace ShareLink.Application.Commands.ToggleLike;

public class ToggleLikeRequest
{
    [Required(ErrorMessage = "Link id is required.")]
    public string LinkId { get; init; } = null!;
}