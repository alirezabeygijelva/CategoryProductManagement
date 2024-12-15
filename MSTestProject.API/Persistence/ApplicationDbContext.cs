
using Microsoft.EntityFrameworkCore;
using MSTestProject.API.Entities;
using MSTestProject.API.Persistence.Configurations.EF;

namespace MSTestProject.API.Persistence
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
        }

        public virtual DbSet<Category> Categories { get; protected set; }
        public virtual DbSet<Product> Products { get; protected set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Apply configurations
            modelBuilder.ApplyConfiguration(new CategoryConfiguration());
            modelBuilder.ApplyConfiguration(new ProductConfiguration());
        }
    }
}
