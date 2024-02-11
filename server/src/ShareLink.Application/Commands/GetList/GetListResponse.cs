using ShareLink.Application.Dto;

namespace ShareLink.Application.Commands.GetList;

public class GetListResponse(PaginatedList<LinkDto> paginatedList, TagDto[] tags)
    : PaginatedList<LinkDto>(paginatedList.Items, paginatedList.TotalCount, paginatedList.PageNumber, paginatedList.TotalPages)
{
    public TagDto[] Tags { get; } = tags;
}