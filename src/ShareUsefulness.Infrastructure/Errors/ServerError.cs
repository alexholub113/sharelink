namespace ShareUsefulness.Infrastructure.Errors;

public class ServerError : Error
{
    public ServerError(string message, string? stackTrace) : base(500)
    {
        Message = message;
        StackTrace = stackTrace;
    }

    public string Message { get; }

    public string? StackTrace { get; }
}
