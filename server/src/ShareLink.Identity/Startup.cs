using System.Text.RegularExpressions;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using ShareLink.Application.Abstraction;
using ShareLink.Identity.Services;
using ShareLink.Infrastructure.Commands;

namespace ShareLink.Identity;

public class Startup
{
    public static void ConfigureServices(IServiceCollection services, IConfiguration configuration)
    {
        services.Configure<AuthenticationConfiguration>(configuration.GetSection(AuthenticationConfiguration.SectionName));
        services.AddScoped<IUserContext, UserContext>();

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
                options.ExpireTimeSpan = TimeSpan.FromDays(15);
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
        services.AddIdentityCore<ApplicationUser>()
            .AddRoles<IdentityRole>()
            .AddEntityFrameworkStores<AppIdentityDbContext>();

        services.AddCommandsFromAssembly<Startup>((type, builder) =>
        {
            var name = Regex.Replace(type.Name, @"Handler$", string.Empty).ToLowerInvariant();
            builder.Route = $"/api/v1/identity/{name}";
        });
    }
}