using AutoMapper;
using MSTestProject.API.DTOs;
using MSTestProject.API.Entities;
using MSTestProject.API.Exceptions;
using MSTestProject.API.Interfaces;

namespace MSTestProject.API.Services
{
    public class CategoryService : ICategoryService
    {
        private readonly ICategoryRepository _categoryRepository;
        private readonly IMapper _mapper;

        public CategoryService(
            ICategoryRepository categoryRepository,
            IMapper mapper)
        {
            _categoryRepository = categoryRepository;
            _mapper = mapper;
        }

        public async Task<CategoryDto> CreateCategoryAsync(CategoryDto categoryDto)
        {
            var category = _mapper.Map<Category>(categoryDto);
            category.Id = 0;
            category.DisplayOrder = await GetNextDisplayOrderForCategory();

            var createdCategory = await _categoryRepository.AddAsync(category);
            return _mapper.Map<CategoryDto>(createdCategory);
        }

        private async Task<int> GetNextDisplayOrderForCategory()
        {
            var categoryCount = await _categoryRepository.CountAsync(_ => true);
            return categoryCount + 1;
        }

        public async Task<CategoryDto> UpdateCategoryAsync(int id, CategoryDto categoryDto)
        {
            var existingCategory = await _categoryRepository.GetByIdAsync(id);

            if (existingCategory == null)
                throw new NotFoundException($"Category with ID {id} not found");

            _mapper.Map(categoryDto, existingCategory);
            await _categoryRepository.UpdateAsync(existingCategory);

            return _mapper.Map<CategoryDto>(existingCategory);
        }

        public async Task<bool> DeleteCategoryAsync(int id)
        {
            var category = await _categoryRepository.GetByIdAsync(id);

            if (category == null)
                return false;

            await _categoryRepository.DeleteAsync(category);
            return true;
        }

        public async Task<IReadOnlyList<CategoryDto>> GetAllCategoriesAsync()
        {
            var categories = await _categoryRepository.ListAllAsync();
            return _mapper.Map<IReadOnlyList<CategoryDto>>(categories.OrderBy(c => c.DisplayOrder));
        }

        public async Task<CategoryDto> GetCategoryByIdAsync(int id)
        {
            var category = await _categoryRepository.GetByIdAsync(id);

            if (category == null)
                throw new NotFoundException($"Category with ID {id} not found");

            return _mapper.Map<CategoryDto>(category);
        }

        public async Task SwapDisplayOrder(int id1 , int id2)
        {
            Category? category1 = await _categoryRepository.GetByIdAsync(id1);
            Category? category2 = await _categoryRepository.GetByIdAsync(id2);

            if(category1 == null || category2 == null)
            {
                return;
            }

            (category1.DisplayOrder , category2.DisplayOrder) = (category2.DisplayOrder, category1.DisplayOrder);

            await _categoryRepository.UpdateAsync(category1);
            await _categoryRepository.UpdateAsync(category2);
        }
    }
}
