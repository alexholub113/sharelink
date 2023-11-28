using FluentValidation;

namespace ShareLink.Application.CreateLinkHandler;

public class CreateLinkValidator : AbstractValidator<CreateLinkRequest>
{
    public CreateLinkValidator()
    {
    }
}