using System.ComponentModel.DataAnnotations;
using ShareLink.Application.Attributes;

namespace ShareLink.Application.Commands.Preview;

public class PreviewRequest
{
    [Required(ErrorMessage = "Url is required.")]
    [LinkUrl]
    public string Url { get; init; } = null!;
}