using MSTestProject.API.Extensions;
using MSTestProject.API.Persistence.Seed;

var builder = WebApplication.CreateBuilder(args);
SQLitePCL.Batteries.Init();

builder.Services.AddOpenApi();
builder.Services.AddControllers();
builder.Services.AddInfrastructure();

builder.Services.AddCors(options =>
{
    options.AddPolicy("development", configurePolicy =>
    {
        configurePolicy
            .AllowAnyOrigin()
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

#if DEBUG
builder.Services.AddTransient<RandomDataSeederService>();
#endif

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi("");
}

#if DEBUG
if (args.Any(arg => arg == "--seed"))
{
    IServiceScope serviceScope = app.Services.CreateScope();
    await serviceScope.ServiceProvider.GetRequiredService<RandomDataSeederService>().Seed();
    return;
}
#endif

app.UseCors("development");

app.UseHttpsRedirection();
app.MapControllers();

app.Run();
