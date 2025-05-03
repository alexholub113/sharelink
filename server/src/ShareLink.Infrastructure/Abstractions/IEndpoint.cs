using Microsoft.AspNetCore.Routing;

namespace ShareLink.Infrastructure.Abstractions;

public interface IEndpoint
{
    void MapEndpoint(IEndpointRouteBuilder app);
}

