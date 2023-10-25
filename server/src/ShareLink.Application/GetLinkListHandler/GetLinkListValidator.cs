using FluentValidation;

namespace ShareLink.Application.GetLinkListHandler;

public class GetLinkListValidator : AbstractValidator<GetLinkListRequest>
{
    public GetLinkListValidator()
    {
    }
}
