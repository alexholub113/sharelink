using System.ComponentModel.DataAnnotations;
using ShareLink.Application.Attributes;

namespace ShareLink.Application.Commands.Create;

public class CreateRequest
{
    [Required(ErrorMessage = "Title is required.")]
    [LinkTitle]
    public string Title { get; init; } = null!;

    [Required(ErrorMessage = "Url is required.")]
    [LinkUrl]
    public string Url { get; init; } = null!;

    [Required(ErrorMessage = "Tags are required.")]
    [LinkTagCollection]
    public string[] Tags { get; init; } = null!;
}