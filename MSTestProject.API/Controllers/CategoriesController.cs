using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using MSTestProject.API.DTOs;
using MSTestProject.API.Interfaces;

namespace MSTestProject.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CategoriesController : ControllerBase
{
    private readonly ICategoryService categoryService;

    public CategoriesController(ICategoryService categoryService)
    {
        this.categoryService = categoryService;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<CategoryDto>>> GetCategories()
    {
        return Ok(await categoryService.GetAllCategoriesAsync());
    }

    [HttpPost]
    public async Task<ActionResult<CategoryDto>> CreateCategory(CategoryDto category)
    {
        return Ok(await categoryService.CreateCategoryAsync(category));
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<CategoryDto>> GetCategory(int id)
    {
        var category = await categoryService.GetCategoryByIdAsync(id);

        if (category == null)
        {
            return NotFound();
        }

        return Ok(category);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateCategory(int id, CategoryDto category)
    {
        _ = await categoryService.UpdateCategoryAsync(id, category);

        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteCategory(int id)
    {
        bool deleted = await categoryService.DeleteCategoryAsync(id);

        return deleted ? NoContent() : NotFound();
    }

    [HttpPut("swaporder/{id1}/{id2}")]
    public async Task<IActionResult> SwapCategoryDisplayOrder(int id1, int id2)
    {
        await categoryService.SwapDisplayOrder(id1, id2);
        return NoContent();
    }
}
