using System.ComponentModel.DataAnnotations;
using MediatR;
using ShareLink.Application.Common.Attributes;

namespace ShareLink.Application.PreviewLinkHandler;

public class PreviewLinkRequest : IRequest<PreviewLinkResponse>
{
    [Required(ErrorMessage = "Url is required.")]
    [LinkUrl]
    public required string Url { get; init; }
}