using AutoMapper;
using ShareLink.Application.Common.Dto;
using ShareLink.Domain.Models;

namespace ShareLink.Application.Common.Mapper;

public class YoutubeDataProfile : Profile
{
    public YoutubeDataProfile()
    {
        CreateMap<YoutubeData, YoutubeDataDto>();
        CreateMap<YoutubeDataDto, YoutubeData>();
    }
}
