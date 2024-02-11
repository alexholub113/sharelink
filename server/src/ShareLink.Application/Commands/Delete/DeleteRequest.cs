using System.ComponentModel.DataAnnotations;

namespace ShareLink.Application.Commands.Delete;

public class DeleteRequest
{
    [Required(ErrorMessage = "Link id is required.")]
    public string LinkId { get; init; } = null!;
}