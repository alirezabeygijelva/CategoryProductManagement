using AutoMapper;
using MSTestProject.API.DTOs;
using MSTestProject.API.Entities;
using MSTestProject.API.Exceptions;
using MSTestProject.API.Interfaces;
using MSTestProject.API.Repositories;

namespace MSTestProject.API.Services
{
    public class ProductService : IProductService
    {
        private readonly IGenericRepository<Product> _productRepository;
        private readonly IMapper _mapper;

        public ProductService(
            IGenericRepository<Product> productRepository,
            IMapper mapper)
        {
            _productRepository = productRepository;
            _mapper = mapper;
        }

        public async Task<ProductDto> CreateProductAsync(ProductDto productDto)
        {
            var product = _mapper.Map<Product>(productDto);
            product.Id = 0;
            product.DisplayOrder = await GetNextDisplayOrderForCategory(product.CategoryId);

            var createdProduct = await _productRepository.AddAsync(product);
            return _mapper.Map<ProductDto>(createdProduct);
        }

        private async Task<int> GetNextDisplayOrderForCategory(int categoryId)
        {
            var productCount = await _productRepository.CountAsync(p => p.CategoryId == categoryId);
            return productCount + 1;
        }

        public async Task<ProductDto> UpdateProductAsync(int id, ProductDto productDto)
        {
            var existingProduct = await _productRepository.GetByIdAsync(id);

            if (existingProduct == null)
                throw new NotFoundException($"Product with ID {id} not found");

            _mapper.Map(productDto, existingProduct);
            await _productRepository.UpdateAsync(existingProduct);

            return _mapper.Map<ProductDto>(existingProduct);
        }

        public async Task<bool> DeleteProductAsync(int id)
        {
            var product = await _productRepository.GetByIdAsync(id);

            if (product == null)
                return false;

            await _productRepository.DeleteAsync(product);
            return true;
        }

        public async Task<IReadOnlyList<ProductDto>> GetProductsByCategoryAsync(int categoryId)
        {
            var products = await _productRepository
                .ListAsync(p => p.CategoryId == categoryId);

            return _mapper.Map<IReadOnlyList<ProductDto>>(products.OrderBy(p => p.DisplayOrder));
        }

        public async Task<ProductDto> GetProductByIdAsync(int id)
        {
            var product = await _productRepository.GetByIdAsync(id);

            if (product == null)
                throw new NotFoundException($"Product with ID {id} not found");

            return _mapper.Map<ProductDto>(product);
        }

        public async Task SwapDisplayOrder(int id1, int id2)
        {
            Product? p1 = await _productRepository.GetByIdAsync(id1);
            Product? p2 = await _productRepository.GetByIdAsync(id2);

            if (p1 == null || p2 == null)
            {
                return;
            }

            (p1.DisplayOrder, p2.DisplayOrder) = (p2.DisplayOrder, p1.DisplayOrder);

            await _productRepository.UpdateAsync(p1);
            await _productRepository.UpdateAsync(p2);
        }
    }
}
