using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using ShareLink.Application.Common.Dto;
using ShareLink.Application.CreateLinkHandler;
using ShareLink.Application.GetLinkListHandler;
using ShareLink.Application.PreviewLinkHandler;
using ShareLink.Identity;

namespace ShareLink.Web.Controllers;

[ApiController]
[Route("api/[controller]")]
public class LinksController(ISender sender, UserManager<ApplicationUser> userManager) : ControllerBase
{
    [Authorize]
    [HttpGet("list")]
    public async Task<GetLinkListResponse> GetLinksList([FromQuery] GetLinkListRequest request)
    {
        var user = await userManager.GetUserAsync(User);
        return await sender.Send(request);
    }

    [Authorize]
    [HttpPost("create")]
    public async Task<LinkDto> CreateLink([FromBody] CreateLinkRequest request)
    {
        return await sender.Send(request);
    }

    [HttpPost("preview")]
    public async Task<PreviewLinkResponse> PreviewLink([FromBody] PreviewLinkRequest request)
    {
        return await sender.Send(request);
    }
}
