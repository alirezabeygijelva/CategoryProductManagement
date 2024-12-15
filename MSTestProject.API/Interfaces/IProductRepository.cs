using MSTestProject.API.Entities;

namespace MSTestProject.API.Interfaces
{
    public interface IProductRepository : IGenericRepository<Product>
    {
        Task<IReadOnlyList<Product>> GetProductsByCategoryAsync(int categoryId);
    }
}
