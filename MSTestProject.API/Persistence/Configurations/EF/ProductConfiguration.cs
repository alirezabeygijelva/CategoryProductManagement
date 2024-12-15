
using System.Reflection.Emit;
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using MSTestProject.API.Entities;

namespace MSTestProject.API.Persistence.Configurations.EF
{
    public class ProductConfiguration : IEntityTypeConfiguration<Product>
    {
        public void Configure(EntityTypeBuilder<Product> builder)
        {
            // Table configuration
            builder.HasKey(p => p.Id);
            builder.Property(p => p.Name)
                   .IsRequired()
                   .HasMaxLength(100);
            builder.Property(p => p.Description)
                   .HasMaxLength(500);
            builder.Property(p => p.Price)
                   .HasColumnType("decimal(18,2)");
        }
    }
}
