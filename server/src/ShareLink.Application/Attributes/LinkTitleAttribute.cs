using ShareLink.Links.Api.Constants;
using System.ComponentModel.DataAnnotations;

namespace ShareLink.Links.Api.Attributes;

public class LinkTitleAttribute : ValidationAttribute
{
    protected override ValidationResult? IsValid(object? value, ValidationContext validationContext)
    {
        if (value is string { Length: < ValidationRules.LinkTitle.MinLength or > ValidationRules.LinkTitle.MaxLength })
        {
            return new ValidationResult($"Title must be at least {ValidationRules.LinkTitle.MinLength} and at most {ValidationRules.LinkTitle.MaxLength} characters long.");
        }

        return ValidationResult.Success;
    }
}