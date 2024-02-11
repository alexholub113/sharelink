using System.ComponentModel.DataAnnotations;
using ShareLink.Application.Services;

namespace ShareLink.Application.Attributes;

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