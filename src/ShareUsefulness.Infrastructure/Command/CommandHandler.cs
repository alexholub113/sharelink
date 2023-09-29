using ShareUsefulness.Infrastructure.Exceptions;

namespace ShareUsefulness.Infrastructure.Command;

public abstract class CommandHandler<TRequest, TData> : ICommandHandler<TRequest, TData>
    where TRequest : ICommandRequest
    where TData : class
{
    public async Task<CommandResponse<TData>> Handle(TRequest request)
    {
        try
        {
            var data = await HandleInternal(request);
            return CommandResponse<TData>.Ok(data);
        }
        catch (RequestValidationException e)
        {
            return CommandResponse<TData>.Failed(e.Errors);
        }
        catch (Exception e)
        {
            return CommandResponse<TData>.Failed(e.Message);
        }
    }
    
    protected abstract Task<TData> HandleInternal(TRequest request); 
}
