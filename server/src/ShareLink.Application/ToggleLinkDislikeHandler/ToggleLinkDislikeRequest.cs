using System.ComponentModel.DataAnnotations;
using MediatR;

namespace ShareLink.Application.ToggleLinkDislikeHandler;

public class ToggleLinkDislikeRequest : IRequest
{
    [Required(ErrorMessage = "Link id is required.")]
    public required string LinkId { get; init; }
}