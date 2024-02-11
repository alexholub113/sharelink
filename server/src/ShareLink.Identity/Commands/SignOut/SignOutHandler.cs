using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Identity;

namespace ShareLink.Identity.Commands.SignOut;

public class SignOutHandler(SignInManager<ApplicationUser> signInManager)
{
    public async Task<Ok> Handle(SignOutRequest _)
    {
        await signInManager.SignOutAsync();
        return TypedResults.Ok();
    }
}