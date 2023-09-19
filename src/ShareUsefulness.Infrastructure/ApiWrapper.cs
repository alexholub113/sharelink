namespace ShareUsefulness.Infrastructure;

public class ApiWrapper<T>
{
    public ApiWrapper(string message, T data)
    {
        Message = message;
        Data = data;
    }

    public string Message { get; set; }
    
    public T Data { get; set; }
}
