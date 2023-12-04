using AutoMapper;
using ShareLink.Application.Common.Dto;
using ShareLink.Domain.Models;

namespace ShareLink.Application.Common.Mapper;

public class UnknownSourceDataProfile : Profile
{
    public UnknownSourceDataProfile()
    {
        CreateMap<UnknownSourceData, UnknownSourceDataDto>();
        CreateMap<UnknownSourceDataDto, UnknownSourceData>();
    }
}