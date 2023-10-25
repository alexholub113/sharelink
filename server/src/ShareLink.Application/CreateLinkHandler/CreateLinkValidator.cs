using FluentValidation;
using ShareLink.Application.Common.Dto;
using ShareLink.Application.Common.Services;
using ShareLink.Domain;
using ShareLink.Domain.Enums;

namespace ShareLink.Application.CreateLinkHandler;

public class CreateLinkValidator : AbstractValidator<CreateLinkRequest>
{
    public CreateLinkValidator(IUrlParser urlParser)
    {
        RuleFor(v => v.Title)
            .NotEmpty()
            .Must(title => title.Trim().Length >= Constants.MinLinkTitleLength || title.Trim().Length <= Constants.MaxLinkTitleLength)
            .WithMessage($"Title must be between {Constants.MinLinkTitleLength} and {Constants.MaxLinkTitleLength} characters long.");
        RuleFor(v => v.Url).Must(urlParser.IsUrlSupported);
        RuleFor(v => v.Tags).NotEmpty().Must(BeValidTags);
    }

    private bool BeValidTags(string[] tags)
    {
        if (tags.Length is < 1 or > 5)
        {
            return false;
        }
        
        return tags.All(tag => tag.Length is >= 2 and <= 30);
    }
}
