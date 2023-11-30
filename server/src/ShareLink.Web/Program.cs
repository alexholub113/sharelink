using System.Text.Json;
using System.Text.Json.Serialization;
using Microsoft.Extensions.Logging.AzureAppServices;
using ShareLink.Application;
using ShareLink.Dal;
using ShareLink.Migrations;
using ShareLink.Identity;
using ShareLink.Identity.Extensions;
using ShareLink.Migrations.Initializers;
using ShareLink.Web.Extensions;
using ShareLink.Web.Infrastructure;

var builder = WebApplication.CreateBuilder(args);
builder.Logging.AddAzureWebAppDiagnostics();
builder.Services.Configure<AzureFileLoggerOptions>(options =>
{
    options.FileName = "azure-diagnostics-";
    options.FileSizeLimit = 50 * 1024;
    options.RetainedFileCountLimit = 5;
});

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddControllers()
    .AddJsonOptions(opts =>
    {
        var enumConverter = new JsonStringEnumConverter();
        opts.JsonSerializerOptions.Converters.Add(enumConverter);
    })
    .ConfigureInvalidModelStateResponseFactory();

builder
    .Services
    .AddLogging()
    .AddApplicationServices(builder.Configuration)
    .AddIdentityServices(builder.Configuration, builder.Environment)
    .AddDalServices(builder.Configuration)
    .AddMigrationsServices(builder.Configuration);

builder.Services.AddHealthChecks();
builder.Services.AddCors();
builder.Services.AddExceptionHandler<CustomExceptionHandler>();
builder.Services.Configure<RouteOptions>(options => options.LowercaseUrls = true);

var app = builder.Build();

await app.RunMigrations();
await app.InitializeIdentity();

app.UseCors(x => x
    .WithOrigins(builder.Configuration["Security:AllowedOrigins"]?.Trim().Split(",") ?? Array.Empty<string>())
    .AllowAnyMethod()
    .AllowAnyHeader()
    .AllowCredentials());

if (!app.Environment.IsDevelopment())
{
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseExceptionHandler(options => { });

app
    .UseRouting()
    .UseAuthentication()
    .UseAuthorization()
    .UseEndpoints(endpoints =>
    {
        endpoints.MapControllers();
    });

app.MapHealthChecks("/healthz");

app.Run();