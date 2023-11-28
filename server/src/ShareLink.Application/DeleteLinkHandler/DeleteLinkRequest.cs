using System.ComponentModel.DataAnnotations;
using MediatR;

namespace ShareLink.Application.DeleteLinkHandler;

public class DeleteLinkRequest : IRequest
{
    [Required(ErrorMessage = "Link id is required.")]
    public required string LinkId { get; init; }
}