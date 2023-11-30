using FluentValidation;
using ShareLink.Application.Common.Services;

namespace ShareLink.Application.UpdateLinkHandler;

public class UpdateLinkValidator : AbstractValidator<UpdateLinkRequest>
{
    public UpdateLinkValidator(IContentModerator contentModerator)
    {
        RuleFor(request => request)
            .MustAsync((request, _) => contentModerator.ModerateText(request.Title + " " + string.Join(" ", request.Tags)))
            .WithMessage("Title or tags have inappropriate words.");
    }
}