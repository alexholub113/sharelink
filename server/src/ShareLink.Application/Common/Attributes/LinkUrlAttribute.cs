using System.ComponentModel.DataAnnotations;
using ShareLink.Application.Common.Services;

namespace ShareLink.Application.Common.Attributes;

public class LinkUrlAttribute : ValidationAttribute
{
    protected override ValidationResult? IsValid(object? value, ValidationContext validationContext)
    {
        if (value is string url)
        {
            if (!UrlParser.IsUrlValid(url))
            {
                return new ValidationResult("Url is not valid.");
            }
        }

        return ValidationResult.Success;
    }
}