using System.Text.Json.Serialization;
using Microsoft.Extensions.Logging.AzureAppServices;
using ShareLink.Identity.Extensions;
using ShareLink.Infrastructure.Commands;
using ShareLink.Migrations.Initializers;
using ShareLink.Web;

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

builder.Services.AddLogging();

ShareLink.Application.Startup.ConfigureServices(builder.Services, builder.Configuration);
ShareLink.Dal.Startup.ConfigureServices(builder.Services, builder.Configuration);
ShareLink.Identity.Startup.ConfigureServices(builder.Services, builder.Configuration);
ShareLink.Migrations.Startup.ConfigureServices(builder.Services, builder.Configuration);

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

app.UseAuthentication();
app.UseRouting();
app.UseAuthorization();
#pragma warning disable ASP0014
app.UseEndpoints(
    endpoints =>
    {
        endpoints.MapCommands();
        endpoints.MapControllers();
    });
#pragma warning restore ASP0014

app.MapHealthChecks("/healthz");

app.Run();