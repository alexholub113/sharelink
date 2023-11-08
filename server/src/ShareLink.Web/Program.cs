using System.Text.Json.Serialization;
using ShareLink.Application;
using ShareLink.Dal;
using ShareLink.Migrations;
using ShareLink.Identity;
using ShareLink.Web.Infrastructure;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddControllers()
    .AddJsonOptions(opts =>
    {
        var enumConverter = new JsonStringEnumConverter();
        opts.JsonSerializerOptions.Converters.Add(enumConverter);
    });

builder
    .Services
    .AddSwaggerGen()
    .AddLogging()
    .AddApplicationServices(builder.Configuration)
    .AddIdentityServices(builder.Configuration)
    .AddDalServices(builder.Configuration)
    .AddMigrationsServices(builder.Configuration);
builder.Services.AddCors();
builder.Services.AddExceptionHandler<CustomExceptionHandler>();
builder.Services.Configure<RouteOptions>(options => options.LowercaseUrls = true);

var app = builder.Build();

app.UseSwagger();

// app.MapGroup("/temp-identity").MapIdentityApi<ApplicationUser>();

if (app.Environment.IsDevelopment())
{
    app.UseSwaggerUI();
    app.UseCors(x => x
        .WithOrigins("http://127.0.0.1:5173", "http://localhost:5173")
        .AllowAnyMethod()
        .AllowAnyHeader()
        .AllowCredentials());
}

app.UseExceptionHandler(options => { });

app
    .UseRouting()
    .UseEndpoints(endpoints =>
    {
        endpoints.MapControllers();
    });


app.Run();
