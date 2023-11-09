using FluentValidation;

namespace ShareLink.Application.ToggleLinkLikeHandler;

public class LikeLinkValidator : AbstractValidator<ToggleLinkLikeRequest>
{
    public LikeLinkValidator()
    {
        RuleFor(v => v.LinkId).NotEmpty();
    }
}
