namespace ShareUsefulness.Infrastructure.Command;

public interface ICommandHandler<in TRequest, TData>
    where TRequest : ICommandRequest
    where TData : class
{
    Task<CommandResponse<TData>> Handle(TRequest request);
}
