using ShareLink.Links.Api.Constants;
using System.ComponentModel.DataAnnotations;

namespace ShareLink.Links.Api.Attributes;

public class LinkTagCollectionAttribute : ValidationAttribute
{
    protected override ValidationResult? IsValid(object? value, ValidationContext validationContext)
    {
        if (value is string[] tags)
        {
            if (tags.Length is < ValidationRules.Tag.MinTagsCount or > ValidationRules.Tag.MaxTagsCount)
            {
                return new ValidationResult(
                    $"Tags count must be at least {ValidationRules.Tag.MinTagsCount} and at most {ValidationRules.Tag.MaxTagsCount}");
            }

            if (tags.Any(tag => tag.Trim().Length is < ValidationRules.Tag.MinTagLength or > ValidationRules.Tag.MaxTagLength))
            {
                return new ValidationResult(
                    $"Tag length must be at least {ValidationRules.Tag.MinTagLength} and at most {ValidationRules.Tag.MaxTagLength} characters long");
            }
        }

        return ValidationResult.Success;
    }
}