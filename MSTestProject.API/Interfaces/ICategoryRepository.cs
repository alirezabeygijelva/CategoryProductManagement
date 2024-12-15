using MSTestProject.API.Entities;

namespace MSTestProject.API.Interfaces
{
    public interface ICategoryRepository : IGenericRepository<Category>
    {
        Task<Category?> GetCategoryWithProductsAsync(int categoryId);
    }
}
