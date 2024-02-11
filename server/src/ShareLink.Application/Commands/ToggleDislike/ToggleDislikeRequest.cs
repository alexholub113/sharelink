using System.ComponentModel.DataAnnotations;

namespace ShareLink.Application.Commands.ToggleDislike;

public class ToggleDislikeRequest
{
    [Required(ErrorMessage = "Link id is required.")]
    public string LinkId { get; init; } = null!;
}