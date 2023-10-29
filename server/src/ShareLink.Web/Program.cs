using System.Text.Json.Serialization;
using ShareLink.Application;
using ShareLink.Dal;
using ShareLink.Web.Infrastructure;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddControllers()
    .AddJsonOptions(opts =>
    {
        var enumConverter = new JsonStringEnumConverter();
        opts.JsonSerializerOptions.Converters.Add(enumConverter);
    });

builder.Services
    .AddSwaggerGen()
    .AddLogging()
    .AddInfrastructureServices(builder.Configuration)
    .AddApplicationServices(builder.Configuration);
builder.Services.AddCors();
builder.Services.AddExceptionHandler<CustomExceptionHandler>();
builder.Services.Configure<RouteOptions>(options => options.LowercaseUrls = true);

var app = builder.Build();

app.UseSwagger();
app.UseCors(x => x
    .WithOrigins("http://127.0.0.1:5173")
    .AllowAnyMethod()
    .AllowAnyHeader());

await app.InitialiseDatabaseAsync();

if (app.Environment.IsDevelopment())
{
    app.UseSwaggerUI();
}

app.UseExceptionHandler(options => { });

app
    .UseRouting()
    .UseEndpoints(endpoints =>
    {
        endpoints.MapControllers();
    });

app.Run();