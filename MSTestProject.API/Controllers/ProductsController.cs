using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MSTestProject.API.DTOs;
using MSTestProject.API.Entities;
using MSTestProject.API.Interfaces;
using MSTestProject.API.Persistence;
using MSTestProject.API.Services;

namespace MSTestProject.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProductsController : ControllerBase
{
    private readonly IProductService productService;

    public ProductsController(IProductService productService)
    {
        this.productService = productService;
    }

    [HttpGet("category/{categoryId}")]
    public async Task<ActionResult<IEnumerable<ProductDto>>> GetProductsByCategory(int categoryId)
    {
        return Ok(await productService.GetProductsByCategoryAsync(categoryId));
    }

    [HttpPost]
    public async Task<ActionResult<ProductDto>> CreateProduct(ProductDto product)
    {
        return Ok(await productService.CreateProductAsync(product));
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<ProductDto>> GetProduct(int id)
    {
        var product = await productService.GetProductByIdAsync(id);

        if (product == null)
        {
            return NotFound();
        }

        return product;
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateProduct(int id, ProductDto product)
    {
        if (id != product.Id)
        {
            return BadRequest();
        }

        await productService.UpdateProductAsync(id, product);

        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteProduct(int id)
    {
        bool deleted = await productService.DeleteProductAsync(id);

        return deleted ? NoContent() : NotFound();
    }

    [HttpPut("swaporder/{id1}/{id2}")]
    public async Task<IActionResult> SwapCategoryDisplayOrder(int id1, int id2)
    {
        await productService.SwapDisplayOrder(id1, id2);
        return NoContent();
    }
}
