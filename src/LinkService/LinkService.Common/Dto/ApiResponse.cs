namespace LinkService.Common.Dto;

public class ApiResponse
{
    public ApiResponse(bool success)
    {
        Success = success;
    }

    public bool Success { get; }
}
