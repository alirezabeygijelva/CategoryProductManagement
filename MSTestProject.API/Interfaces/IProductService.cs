using MSTestProject.API.DTOs;

namespace MSTestProject.API.Interfaces
{
    public interface IProductService
    {
        Task<ProductDto> CreateProductAsync(ProductDto productDto);
        Task<ProductDto> UpdateProductAsync(int id, ProductDto productDto);
        Task<bool> DeleteProductAsync(int id);
        Task<IReadOnlyList<ProductDto>> GetProductsByCategoryAsync(int categoryId);
        Task<ProductDto> GetProductByIdAsync(int id);
        Task SwapDisplayOrder(int id1, int id2);
    }
}
