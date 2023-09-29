namespace ShareUsefulness.Infrastructure.Exceptions;

public class RequestValidationException : BusinessException
{
    public RequestValidationException(string[] errors) : base("Request validation failed")
    {
        Errors = errors;
    }
    
    public string[] Errors { get; }
}
