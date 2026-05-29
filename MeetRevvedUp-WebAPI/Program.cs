using Microsoft.EntityFrameworkCore;
using MeetRevvedUp_WebAPI.Models;
using MeetRevvedUp_WebAPI.Controllers;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddOpenApi();
builder.Services.AddHttpClient();
builder.Services.AddScoped<MeetRevvedUp_WebAPI.Interfaces.IClientService, MeetRevvedUp_WebAPI.Services.ClientService>();
builder.Services.AddScoped<MeetRevvedUp_WebAPI.Interfaces.ICarService, MeetRevvedUp_WebAPI.Services.CarService>();
builder.Services.AddScoped<MeetRevvedUp_WebAPI.Interfaces.IGaragesService, MeetRevvedUp_WebAPI.Services.GaragesService>();
builder.Services.AddScoped<MeetRevvedUp_WebAPI.Interfaces.ICarMeetService, MeetRevvedUp_WebAPI.Services.CarMeetService>();
builder.Services.AddDbContext<RevvedUpContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddIdentity<IdentityUser, IdentityRole>()
    .AddEntityFrameworkStores<RevvedUpContext>()
    .AddDefaultTokenProviders();

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = builder.Configuration["Jwt:Issuer"],
        ValidAudience = builder.Configuration["Jwt:Audience"],
        IssuerSigningKey = new SymmetricSecurityKey(
            Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]!))
    };
});

var corsOrigins = builder.Configuration.GetSection("CorsOrigins").Get<string[]>() ?? [];
builder.Services.AddCors(options =>
{
    options.AddPolicy("AngularApp", policy =>
    {
        policy.WithOrigins(corsOrigins)
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();
app.UseCors("AngularApp");
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();
//app.MapCarEndpoints();

app.Run();
