using System.ComponentModel.DataAnnotations;
using ShareLink.Application.Common.Services;

namespace ShareLink.Application.Common.Attributes;

public class LinkUrlAttribute : ValidationAttribute
{
    protected override ValidationResult? IsValid(object? value, ValidationContext validationContext)
    {
        if (value is string url)
        {
            if (!UrlParser.IsUrlSupported(url))
            {
                return new ValidationResult("Provided URL is not supported.");
            }
        }

        return ValidationResult.Success;
    }
}