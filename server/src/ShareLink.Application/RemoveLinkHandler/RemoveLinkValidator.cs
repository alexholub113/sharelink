using FluentValidation;

namespace ShareLink.Application.RemoveLinkHandler;

public class RemoveLinkValidator : AbstractValidator<RemoveLinkRequest>
{
    public RemoveLinkValidator()
    {
        RuleFor(v => v.LinkId).NotEmpty();
    }
}