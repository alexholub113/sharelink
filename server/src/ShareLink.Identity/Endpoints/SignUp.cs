using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Routing;
using ShareLink.Infrastructure.Abstractions;
using System.ComponentModel.DataAnnotations;
using System.Security.Claims;

namespace ShareLink.Identity.Api.Endpoints;

public class SignUpRequest
{
    [Required]
    [EmailAddress]
    public string Email { get; init; } = null!;

    [Required]
    public string Password { get; init; } = null!;

    [Required]
    [MinLength(3)]
    [MaxLength(50)]
    public string Nickname { get; init; } = null!;
}

public class SignUp : IEndpoint
{
    public void MapEndpoint(IEndpointRouteBuilder app)
    {
        app.MapPost("api/v1/identity/signup", Handle).WithTags("Identity");
    }

    private static async Task<Results<Ok, ValidationProblem>> Handle(
        SignUpRequest request, UserManager<ApplicationUser> userManager, IUserStore<ApplicationUser> userStore)
    {
        var emailStore = (IUserEmailStore<ApplicationUser>)userStore;
        var user = new ApplicationUser();
        await userStore.SetUserNameAsync(user, request.Email, CancellationToken.None);
        await emailStore.SetEmailAsync(user, request.Email, CancellationToken.None);

        var result = await userManager.CreateAsync(user, request.Password);
        if (!result.Succeeded)
        {
            return CreateValidationProblem(result);
        }

        await userManager.AddClaimAsync(user, new Claim(ClaimsNames.Nickname, request.Nickname));

        return TypedResults.Ok();
    }

    private static ValidationProblem CreateValidationProblem(IdentityResult result)
    {
        var errorDictionary = new Dictionary<string, string[]>(1);

        foreach (var error in result.Errors)
        {
            string[] newDescriptions;

            if (errorDictionary.TryGetValue(error.Code, out var descriptions))
            {
                newDescriptions = new string[descriptions.Length + 1];
                Array.Copy(descriptions, newDescriptions, descriptions.Length);
                newDescriptions[descriptions.Length] = error.Description;
            }
            else
            {
                newDescriptions = new[] { error.Description };
            }

            errorDictionary[error.Code] = newDescriptions;
        }

        return TypedResults.ValidationProblem(errorDictionary);
    }
}
