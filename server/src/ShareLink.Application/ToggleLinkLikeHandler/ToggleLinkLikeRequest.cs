using System.ComponentModel.DataAnnotations;
using MediatR;

namespace ShareLink.Application.ToggleLinkLikeHandler;

public class ToggleLinkLikeRequest : IRequest
{
    [Required(ErrorMessage = "Link id is required.")]
    public required string LinkId { get; init; }

    public bool State { get; init; }
}