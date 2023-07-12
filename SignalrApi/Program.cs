using SignalrApi.Models;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddSignalR().AddNewtonsoftJsonProtocol();
builder.Services.AddCors();
builder.Services.AddSingleton<GameState, GameState>();
//const string CORSPolicy = "CorsPolicy";
//builder.Services.AddCors(options => {
//    options.AddPolicy(name: CORSPolicy,
//                      policy => {
//                          policy.WithOrigins("http://localhost:3000")
//                          .AllowAnyMethod()
//                          .AllowAnyOrigin()
//                          .AllowCredentials();
//                      });
//});

var app = builder.Build();

// Configure the HTTP request pipeline.

app.UseHttpsRedirection();

app.UseCors(builder => builder
    .AllowAnyMethod()
    .AllowAnyHeader()
    .WithOrigins("http://localhost:3000")
    .AllowCredentials());

app.UseAuthorization();

app.MapControllers();
app.MapHub<ChatHub>("/chathub");
app.MapHub<GameHub>("/gamehub");

app.Run();
