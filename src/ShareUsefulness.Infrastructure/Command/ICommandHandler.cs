namespace ShareUsefulness.Infrastructure.Command;

public interface ICommandHandler<in TRequest, TResponse>
    where TRequest : ICommandRequest
    where TResponse : ICommandResponse
{
    Task<TResponse> Handle(TRequest request);
}
