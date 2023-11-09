using FluentValidation;

namespace ShareLink.Application.ToggleLinkSaveHandler;

public class ToggleSaveValidator : AbstractValidator<ToggleLinkSaveRequest>
{
    public ToggleSaveValidator()
    {
        RuleFor(v => v.LinkId).NotEmpty();
    }
}
