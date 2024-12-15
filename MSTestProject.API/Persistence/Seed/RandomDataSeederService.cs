using MSTestProject.API.DTOs;
using MSTestProject.API.Interfaces;

namespace MSTestProject.API.Persistence.Seed;

public class RandomDataSeederService
{
    private readonly ICategoryService categoryService;
    private readonly IProductService productService;

    public RandomDataSeederService(ICategoryService categoryService, IProductService productService)
    {
        this.categoryService = categoryService;
        this.productService = productService;
    }

    public async Task Seed()
    {
        foreach (CategoryDto categoryToAdd in GenerateCategories())
        {
            CategoryDto dbCategory = await categoryService.CreateCategoryAsync(categoryToAdd);

            foreach (ProductDto productToAdd in GenerateProducts(dbCategory.Id))
            {
                _ = await productService.CreateProductAsync(productToAdd);
            }
        }
    }


    private IEnumerable<CategoryDto> GenerateCategories()
    {
        return Enumerable.Range(0, Random.Shared.Next(10, 15)).Select(i => new CategoryDto()
        {
            Name = $"Category {i} {DateTime.Now.Ticks}",
            Description = $"Category {i} Description"
        });
    }

    private IEnumerable<ProductDto> GenerateProducts(int categoryId)
    {
        return Enumerable.Range(0, Random.Shared.Next(10, 15)).Select(i => new ProductDto()
        {
            Name = $"Product {i} Category {categoryId}",
            Description = $"Product {i} Description",
            CategoryId = categoryId,
            Price = (decimal)(Random.Shared.NextDouble() * 100.0D)
        });
    }
}
