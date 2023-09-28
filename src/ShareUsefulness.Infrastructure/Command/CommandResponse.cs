namespace ShareUsefulness.Infrastructure.Command;

public class CommandResponse : ICommandResponse
{
    public CommandResponse()
    {
        Success = true;
    }
    
    public CommandResponse(string message)
    {
        Success = false;
        Message = message;
    }
    
    public bool Success { get; }
    public string? Message { get; }
}
