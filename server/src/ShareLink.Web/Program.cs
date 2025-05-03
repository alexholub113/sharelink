using Microsoft.Extensions.Logging.AzureAppServices;
using ShareLink.Identity.Api.Extensions;
using ShareLink.Infrastructure.Extensions;
using ShareLink.Migrations.Initializers;
using ShareLink.Web;
using System.Text.Json.Serialization;

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
builder.Services.AddSwaggerGen();

builder.Services.AddLogging();

ShareLink.Links.Api.Startup.ConfigureServices(builder.Services, builder.Configuration);
ShareLink.Dal.Startup.ConfigureServices(builder.Services, builder.Configuration);
ShareLink.Identity.Api.Startup.ConfigureServices(builder.Services, builder.Configuration);
ShareLink.Migrations.Startup.ConfigureServices(builder.Services, builder.Configuration);

builder.Services.AddHealthChecks();
builder.Services.AddCors();
builder.Services.AddExceptionHandler<CustomExceptionHandler>();
builder.Services.Configure<RouteOptions>(options => options.LowercaseUrls = true);

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

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
app.MapEndpoints();
#pragma warning disable ASP0014
app.UseEndpoints(
    endpoints =>
    {
        endpoints.MapControllers();
    });
#pragma warning restore ASP0014

app.MapHealthChecks("/healthz");

app.Run();