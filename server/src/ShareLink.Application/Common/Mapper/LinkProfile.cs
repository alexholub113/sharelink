using AutoMapper;
using ShareLink.Application.Common.Dto;
using ShareLink.Application.GetLinkListHandler;
using ShareLink.Domain.Models;

namespace ShareLink.Application.Common.Mapper;

public class LinkProfile : Profile
{
    public LinkProfile()
    {
        CreateMap<Link, LinkDto>()
            .ForMember(x => x.Tags, x => x.MapFrom(y => y.Tags.Select(z => z.Name)))
            .ForMember(x => x.User, x => x.MapFrom(y => y.UserDisplayName));
    }
}
