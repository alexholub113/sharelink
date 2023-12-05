using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using ShareLink.Application.Common.Dto;
using ShareLink.Application.CreateLinkHandler;
using ShareLink.Application.DeleteLinkHandler;
using ShareLink.Application.GetLinkListHandler;
using ShareLink.Application.PreviewLinkHandler;
using ShareLink.Application.ToggleLinkDislikeHandler;
using ShareLink.Application.ToggleLinkLikeHandler;
using ShareLink.Application.ToggleLinkSaveHandler;
using ShareLink.Application.UpdateLinkHandler;
using ShareLink.Identity;

namespace ShareLink.Web.Controllers;

[ApiController]
[Route("api/[controller]")]
public class LinksController(ISender sender, UserManager<ApplicationUser> userManager) : ControllerBase
{
    [HttpGet("list")]
    public async Task<GetLinkListResponse> GetLinksList([FromQuery] GetLinkListRequest request)
    {
        var user = await userManager.GetUserAsync(User);
        return await sender.Send(request);
    }

    [HttpPost("preview")]
    public async Task<PreviewLinkResponse> PreviewLink([FromBody] PreviewLinkRequest request)
    {
        return await sender.Send(request);
    }

    [Authorize]
    [HttpPost("create")]
    public async Task<LinkDto> CreateLink([FromBody] CreateLinkRequest request)
    {
        return await sender.Send(request);
    }

    [Authorize]
    [HttpPost("like")]
    public async Task LikeLink([FromBody] ToggleLinkLikeRequest request)
    {
        await sender.Send(request);
    }

    [Authorize]
    [HttpPost("dislike")]
    public async Task DislikeLink([FromBody] ToggleLinkDislikeRequest request)
    {
        await sender.Send(request);
    }

    [Authorize]
    [HttpPost("save")]
    public async Task SaveLink([FromBody] ToggleLinkSaveRequest request)
    {
        await sender.Send(request);
    }

    [Authorize]
    [HttpPost("delete")]
    public async Task DeleteLink([FromBody] DeleteLinkRequest request)
    {
        await sender.Send(request);
    }

    [Authorize]
    [HttpPost("update")]
    public async Task UpdateLink([FromBody] UpdateLinkRequest request)
    {
        await sender.Send(request);
    }
}