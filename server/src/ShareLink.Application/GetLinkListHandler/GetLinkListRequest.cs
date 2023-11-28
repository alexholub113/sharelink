using MediatR;

namespace ShareLink.Application.GetLinkListHandler;

public class GetLinkListRequest : IRequest<GetLinkListResponse>
{
    public int PageNumber { get; init; } = 1;
    public int PageSize { get; init; } = 10;

    public string? Title { get; init; }

    public string? Tags { get; init; }

    public bool Saved { get; init; }

    public bool Liked { get; init; }

    public bool Owned { get; init; }
}