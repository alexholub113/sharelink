using Microsoft.AspNetCore.Authentication.OAuth;

namespace ShareLink.Identity.Services;

public interface IOAuthEventHandler
{
    Task HandleOnCreating(OAuthCreatingTicketContext context);
}