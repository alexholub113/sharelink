using FluentValidation;
using ShareLink.Application.Common.Services;

namespace ShareLink.Application.PreviewLinkHandler;

public class PreviewLinkValidator : AbstractValidator<PreviewLinkRequest>
{
    public PreviewLinkValidator(IUrlParser urlParser)
    {
        RuleFor(x => x.Url)
            .NotEmpty()
            .Must(urlParser.IsUrlSupported)
            .WithMessage("Url is not supported.");
    }
}
