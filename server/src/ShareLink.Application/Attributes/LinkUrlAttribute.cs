using System.ComponentModel.DataAnnotations;
using ShareLink.Links.Api.Services;

namespace ShareLink.Links.Api.Attributes;

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