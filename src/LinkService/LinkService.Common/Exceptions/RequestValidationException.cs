namespace LinkService.Common.Exceptions;

public class RequestValidationException : Exception
{
    public RequestValidationException(string[] errors)
    {
        Errors = errors;
    }
    
    public string[] Errors { get; }
}
