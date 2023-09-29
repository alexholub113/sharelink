using System.Text.Json.Serialization;

namespace ShareUsefulness.Infrastructure.Command;

public class CommandResponse<T>
    where T : class 
{
    public CommandResponse(T data)
    {
        Data = data;
        Success = true;
    }
    
    public CommandResponse(string error)
    {
        Success = false;
        Errors = new [] { error };
    }
    
    public CommandResponse(string[] errors)
    {
        Success = false;
        Errors = errors;
    }
    
    public bool Success { get; }

    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public T Data { get; }

    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string[] Errors { get; }

    public static CommandResponse<T> Ok(T data) => new(data);
    
    public static CommandResponse<T> Failed(string error) => new(error);
    
    public static CommandResponse<T> Failed(string[] errors) => new(errors);
}
