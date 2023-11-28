using Microsoft.AspNetCore.Mvc;
using ShareLink.Web.Errors;

namespace ShareLink.Web.Extensions;

public static class MvcBuilderExtensions
{
    public static IMvcBuilder ConfigureInvalidModelStateResponseFactory(this IMvcBuilder builder)
    {
        return builder.ConfigureApiBehaviorOptions(options =>
        {
            options.InvalidModelStateResponseFactory = context =>
            {
                var errorMessages = context.ModelState
                    .Where(e =>e.Value is { Errors.Count: > 0 })
                    .SelectMany(x => x.Value!.Errors)
                    .Select(x => x.ErrorMessage)
                    .ToArray();

                return new BadRequestObjectResult(new ValidationError(errorMessages));
            };
        });
    }
}