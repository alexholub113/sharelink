using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Hosting;
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
        IConfiguration configuration,
        IWebHostEnvironment environment)
    {
        services.Configure<AuthenticationConfiguration>(configuration.GetSection(AuthenticationConfiguration.SectionName));
        services.AddScoped<IUserContext, UserContext>();
        services.AddScoped<IIdentityService, IdentityService>();
        services.AddTransient<IOAuthEventHandler, OAuthEventHandler>();
        services.AddTransient<IdentityInitializer>();

        var identityConnectionString = configuration.GetConnectionString("Identity");
        var identityDbOptionsAction = new Action<DbContextOptionsBuilder>(
            options => options.UseNpgsql(identityConnectionString, builder => builder.MigrationsAssembly("ShareLink.Migrations"))
        );

        services.AddDbContext<AppIdentityDbContext>(identityDbOptionsAction);

        services.AddHttpContextAccessor();
        services.AddAuthentication(options => {
                options.DefaultAuthenticateScheme = IdentityConstants.ApplicationScheme;
                options.DefaultChallengeScheme = IdentityConstants.ApplicationScheme;
                options.DefaultSignInScheme = IdentityConstants.ApplicationScheme;
            })
            .AddGoogle(googleOptions =>
            {
                googleOptions.ClientId = configuration["Authentication:Google:ClientId"];
                googleOptions.ClientSecret = configuration["Authentication:Google:ClientSecret"];
                googleOptions.CallbackPath = new PathString("/signing-google");
            })
            .AddGitHub(githubOptions =>
            {
                githubOptions.ClientId = configuration["Authentication:GitHub:ClientId"];
                githubOptions.ClientSecret = configuration["Authentication:GitHub:ClientSecret"];
                githubOptions.CallbackPath = new PathString("/signing-github");
            })
            .AddBearerToken(IdentityConstants.BearerScheme)
            .AddCookie(IdentityConstants.ApplicationScheme, options =>
            {
                options.Cookie.HttpOnly = true;
                options.Cookie.SecurePolicy = CookieSecurePolicy.Always;
                options.Cookie.SameSite = SameSiteMode.None;
                options.SlidingExpiration = true;
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
        services.AddIdentity<ApplicationUser, IdentityRole>()
            .AddEntityFrameworkStores<AppIdentityDbContext>()
            .AddApiEndpoints()
            .AddDefaultTokenProviders();

        return services;
    }
}