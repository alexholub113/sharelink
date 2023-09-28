using MongoDB.Driver;
using ShareUsefulness.Links.Api.Dto;
using ShareUsefulness.Links.Core.Data;
using ShareUsefulness.Links.Core.Entities;

namespace ShareUsefulness.Links.Core.Services;

public interface ILinkService
{
    Task<LinkDto[]> GetLinks();
}

public class LinkService : ILinkService
{
    private readonly ILinkContext _context;

    public LinkService(ILinkContext context)
    {
        _context = context;
    }

    public async Task<LinkDto[]> GetLinks()
    {
        var items = await _context.Links.AsQueryable().ToListAsync();
        return items
            .Select(
                l => new LinkDto
                {
                    Id = l.Id,
                    Title = l.Title,
                    Url = l.Url,
                    CreatedDate = l.CreatedDate,
                    Likes = l.Likes,
                    Type = l.Type.ToString(),
                    Tags = l.Tags,
                    ProviderName = l.User.Name
                })
            .ToArray();
    }
}
