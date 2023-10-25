using MediatR;
using Microsoft.AspNetCore.Mvc;
using ShareLink.Application.CreateLinkHandler;
using ShareLink.Application.GetLinkListHandler;
using ShareLink.Application.PreviewLinkHandler;

namespace ShareLink.Web.Controllers;

[ApiController]
[Route("[controller]")]
public class LinksController(ISender sender) : ControllerBase
{
    [HttpGet("list")]
    public async Task<GetLinkListResponse> GetLinksList([FromQuery] GetLinkListRequest request)
    {
        return await sender.Send(request);
    }
    
    [HttpPost("create")]
    public async Task<CreateLinkResponse> CreateLink([FromBody] CreateLinkRequest request)
    {
        return await sender.Send(request);
    }
    
    [HttpPost("preview")]
    public async Task<PreviewLinkResponse> PreviewLink([FromBody] PreviewLinkRequest request)
    {
        return await sender.Send(request);
    }
}
