namespace ShareUsefulness.Lambda.Infrastructure.Models;

public class ApiResponse
{
    public ApiResponse(bool success)
    {
        Success = success;
    }

    public bool Success { get; }
}
