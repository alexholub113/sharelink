using FluentValidation;

namespace ShareLink.Application.DeleteLinkHandler;

public class DeleteLinkValidator : AbstractValidator<DeleteLinkRequest>
{
    public DeleteLinkValidator()
    {
        RuleFor(v => v.LinkId).NotEmpty();
    }
}