using System.ComponentModel.DataAnnotations;

namespace ShareLink.Application.Commands.ToggleSave;

public class ToggleSaveRequest
{
    [Required(ErrorMessage = "Link id is required.")]
    public string LinkId { get; init; } = null!;
}