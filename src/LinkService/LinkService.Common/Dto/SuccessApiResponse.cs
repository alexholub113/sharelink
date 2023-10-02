namespace LinkService.Common.Dto;

public class SuccessApiResponse<T> : ApiResponse
    where T : class
{
    public SuccessApiResponse(T data) : base(true)
    {
        Data = data;
    }

    public T Data { get; }
}
