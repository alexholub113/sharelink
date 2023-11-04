using Microsoft.AspNetCore.Http.HttpResults;
using ShareLink.Identity.Dto;

namespace ShareLink.Identity.Services;

public interface IIdentityService
{
    Task<Results<Ok, ValidationProblem>> Register(RegisterRequest request);

    Task<Results<Ok, EmptyHttpResult, ProblemHttpResult>> Login(LoginRequest request);
}
