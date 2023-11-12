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
            .Must(title => title.Trim().Length >= ValidationRules.LinkTitle.MinLength || title.Trim().Length <= ValidationRules.LinkTitle.MaxLength)
            .WithMessage($"Title must be at least {ValidationRules.LinkTitle.MinLength} and at most {ValidationRules.LinkTitle.MaxLength} characters long");
        RuleFor(v => v.Url).Must(urlParser.IsUrlSupported);
        RuleFor(v => v.Tags).NotEmpty()
            .Must(x => x.Length is >= ValidationRules.Tag.MinTagsCount and <= ValidationRules.Tag.MaxTagsCount)
            .WithMessage($"Tags count must be at least {ValidationRules.Tag.MinTagsCount} and at most {ValidationRules.Tag.MaxTagsCount}")
            .Must(x => x.All(tag => tag.Length is >= ValidationRules.Tag.MinTagLength and <= ValidationRules.Tag.MaxTagLength))
            .WithMessage($"Tag length must be at least {ValidationRules.Tag.MinTagLength} and at most {ValidationRules.Tag.MaxTagLength} characters long");
    }
}