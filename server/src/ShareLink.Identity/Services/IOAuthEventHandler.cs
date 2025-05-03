using Microsoft.AspNetCore.Authentication.OAuth;

namespace ShareLink.Identity.Api.Services;

public interface IOAuthEventHandler
{
    Task HandleOnCreating(OAuthCreatingTicketContext context);
}