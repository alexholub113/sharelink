using System.Text.Json.Serialization;

namespace ShareUsefulness.Lambda.Infrastructure.Models;

public class FailedApiResponse : ApiResponse
{
    public FailedApiResponse(string error) : base(false)
    {
        Errors = new[] {error};
    }

    public FailedApiResponse(string[] errors) : base(true)
    {
        Errors = errors;
    }

    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string[] Errors { get; }
}
