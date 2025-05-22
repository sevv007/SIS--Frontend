using CleanArchitecture.Infrastructure;
using CleanArchitecture.WebApi.Services;
using CleanArchitecture.WebApi.Extensions;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container
builder.Services.AddScoped<DataService>();
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();

// Add Swagger with extended configuration
builder.Services.AddSwaggerExtension();

// Add CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll",
        builder =>
        {
            builder.WithOrigins("http://localhost:4200") // Angular default port
                   .AllowAnyMethod()
                   .AllowAnyHeader()
                   .AllowCredentials();
        });
});

var app = builder.Build();

// Configure the HTTP request pipeline
app.UseSwagger();
app.UseSwaggerUI(c =>
{
    c.SwaggerEndpoint("/swagger/v1/swagger.json", "Clean Architecture API V1");
    c.RoutePrefix = string.Empty; // This will serve the Swagger UI at the root URL
});

// Use CORS
app.UseCors("AllowAll");

app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();

app.Run();