namespace ShareUsefulness.Infrastructure.Errors;

public class Error
{
    public Error(int code)
    {
        Code = code;
    }

    public int Code { get; }
}
