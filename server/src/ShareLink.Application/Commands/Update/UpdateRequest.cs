using System.ComponentModel.DataAnnotations;
using ShareLink.Application.Attributes;

namespace ShareLink.Application.Commands.Update;

public class UpdateRequest
{
    [Required(ErrorMessage = "Link id is required.")]
    public string LinkId { get; init; } = null!;

    [Required(ErrorMessage = "Title is required.")]
    [LinkTitle]
    public string Title { get; init; } = null!;

    [Required(ErrorMessage = "Tags are required.")]
    [LinkTagCollection]
    public string[] Tags { get; init; } = null!;
}