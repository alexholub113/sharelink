using FluentValidation;
using ShareLink.Application.Common.Services;

namespace ShareLink.Application.UpdateLinkHandler;

public class UpdateLinkValidator : AbstractValidator<UpdateLinkRequest>
{
    public UpdateLinkValidator(IContentModerator contentModerator)
    {
        RuleFor(request => request)
            .MustAsync(async (request, _, context, _) =>
            {
                var terms = await contentModerator.ModerateText(request.Title + " " + string.Join(" ", request.Tags));
                if (terms.Length == 0) return true;
                context.MessageFormatter.AppendArgument("terms", string.Join(", ", terms));
                return false;

            })
            .WithMessage("Title or tags have inappropriate words: {terms}.");
    }
}