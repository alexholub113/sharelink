using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using ShareLink.Application.Common.Abstraction;
using ShareLink.Identity.Services;

namespace ShareLink.Identity;

public static class DependencyInjection
{
    public static IServiceCollection AddIdentityServices(
        this IServiceCollection services,
        IConfiguration configuration)
    {
        services.AddScoped<IIdentityContext, IdentityContext>();
        services.AddScoped<IIdentityService, IdentityService>();

        var identityConnectionString = configuration.GetConnectionString("Identity");
        var identityDbOptionsAction = new Action<DbContextOptionsBuilder>(
            options => options.UseNpgsql(identityConnectionString, builder => builder.MigrationsAssembly("ShareLink.Migrations"))
        );

        services.AddDbContext<IdentityDbContext>(identityDbOptionsAction);

        services.AddHttpContextAccessor();
        services.AddAuthentication(options => {
                options.DefaultAuthenticateScheme = IdentityConstants.ApplicationScheme;
                options.DefaultChallengeScheme = IdentityConstants.ApplicationScheme;
                options.DefaultSignInScheme = IdentityConstants.ApplicationScheme;
            })
            .AddBearerToken(IdentityConstants.BearerScheme)
            .AddCookie(IdentityConstants.ApplicationScheme, options =>
            {
                options.Cookie.HttpOnly = true;
                // options.Cookie.SecurePolicy = CookieSecurePolicy.Always; // Enforce HTTPS
                options.Cookie.SameSite = SameSiteMode.Strict; // CSRF protection
                options.SlidingExpiration = true; // Refresh the expiration time if a request is made and the cookie is nearing its expiry
                options.Events = new CookieAuthenticationEvents
                {
                    OnRedirectToLogin = context =>
                    {
                        if (context.Request.Path.StartsWithSegments("/api") && context.Response.StatusCode == 200)
                        {
                            context.Response.StatusCode = 401;
                            return Task.CompletedTask;
                        }

                        context.Response.Redirect(context.RedirectUri);
                        return Task.CompletedTask;
                    },
                    OnRedirectToAccessDenied = context =>
                    {
                        if (context.Request.Path.StartsWithSegments("/api") && context.Response.StatusCode == 200)
                        {
                            context.Response.StatusCode = 403;
                            return Task.CompletedTask;
                        }

                        context.Response.Redirect(context.RedirectUri);
                        return Task.CompletedTask;
                    }
                    // You can handle other redirects if necessary
                };
            });
        services.AddAuthorizationBuilder();
        services.AddIdentityCore<ApplicationUser>()
            .AddEntityFrameworkStores<IdentityDbContext>()
            .AddApiEndpoints();

        return services;
    }
}