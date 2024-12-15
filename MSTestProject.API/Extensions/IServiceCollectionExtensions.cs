using System.Reflection;
using Microsoft.EntityFrameworkCore;
using MSTestProject.API.Interfaces;
using MSTestProject.API.Persistence;
using MSTestProject.API.Repositories;
using MSTestProject.API.Services;

namespace MSTestProject.API.Extensions;

public static class IServiceCollectionExtensions
{
    public static IServiceCollection AddInfrastructure(this IServiceCollection services)
    {
        // Configure Database Context
        services.AddDbContext<ApplicationDbContext>(options =>
            {
                options.UseSqlite(
                    "Data Source=app.db;",
                    b => b.MigrationsAssembly(typeof(ApplicationDbContext).Assembly.FullName)
                );
            }
        );

        // Register Repositories
        services.AddScoped(typeof(IGenericRepository<>), typeof(GenericRepository<>));
        services.AddScoped<ICategoryRepository, CategoryRepository>();
        services.AddScoped<IProductRepository, ProductRepository>();

        // Register Services
        services.AddScoped<ICategoryService, CategoryService>();
        services.AddScoped<IProductService, ProductService>();

        // AutoMapper Configuration
        services.AddAutoMapper(Assembly.GetExecutingAssembly());

        return services;
    }
}
