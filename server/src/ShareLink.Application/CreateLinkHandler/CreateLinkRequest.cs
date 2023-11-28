using System.ComponentModel.DataAnnotations;
using MediatR;
using ShareLink.Application.Common.Attributes;
using ShareLink.Application.Common.Dto;

namespace ShareLink.Application.CreateLinkHandler;

public class CreateLinkRequest : IRequest<LinkDto>
{
    [Required(ErrorMessage = "Title is required.")]
    [LinkTitle]
    public required string Title { get; init; }

    [Required(ErrorMessage = "Url is required.")]
    [LinkUrl]
    public required string Url { get; init; }

    [Required(ErrorMessage = "Tags are required.")]
    [LinkTagCollection]
    public required string[] Tags { get; init; }
}