using System.Security.Claims;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Identity;

namespace ShareLink.Identity.Commands.SignUp;

public class SignUpHandler(UserManager<ApplicationUser> userManager, IUserStore<ApplicationUser> userStore)
{
    public async Task<Results<Ok, ValidationProblem>> Handle(SignUpRequest request)
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