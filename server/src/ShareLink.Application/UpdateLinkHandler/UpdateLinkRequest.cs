using System.ComponentModel.DataAnnotations;
using MediatR;
using ShareLink.Application.Common.Attributes;

namespace ShareLink.Application.UpdateLinkHandler;

public class UpdateLinkRequest : IRequest
{
    [Required(ErrorMessage = "Link id is required.")]
    public required string LinkId { get; init; }

    [Required(ErrorMessage = "Title is required.")]
    [LinkTitle]
    public required string Title { get; init; }

    [Required(ErrorMessage = "Tags are required.")]
    [LinkTagCollection]
    public required string[] Tags { get; init; }
}