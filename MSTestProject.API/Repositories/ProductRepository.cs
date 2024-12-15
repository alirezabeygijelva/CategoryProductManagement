using MSTestProject.API.Entities;
using MSTestProject.API.Interfaces;
using MSTestProject.API.Persistence;

namespace MSTestProject.API.Repositories
{
    public class ProductRepository : GenericRepository<Product>, IProductRepository
    {
        public ProductRepository(ApplicationDbContext context) : base(context) { }

        public async Task<IReadOnlyList<Product>> GetProductsByCategoryAsync(int categoryId)
        {
            return await ListAsync(p => p.CategoryId == categoryId);
        }
    }
}
