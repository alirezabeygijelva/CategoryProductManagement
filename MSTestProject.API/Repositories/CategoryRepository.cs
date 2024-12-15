using MSTestProject.API.Entities;
using MSTestProject.API.Interfaces;
using MSTestProject.API.Persistence;
using MSTestProject.API.Specifications;

namespace MSTestProject.API.Repositories
{
    public class CategoryRepository : GenericRepository<Category>, ICategoryRepository
    {
        public CategoryRepository(ApplicationDbContext context) : base(context) { }

        public async Task<Category?> GetCategoryWithProductsAsync(int categoryId)
        {
            var spec = new CategoryWithProductsSpecification(categoryId);
            return (await ListAsync(spec)).FirstOrDefault();
        }
    }
}
