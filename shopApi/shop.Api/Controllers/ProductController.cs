using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using shop.Core.Dtos;
using shop.Core.Interfaces;

namespace shop.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        public readonly IUnitOfWork _unitOfWork;
        public ProductController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }
        [HttpGet("GetAllProductsById")]

        public IActionResult GetAllProductByUserId()
        {
            var Products = _unitOfWork.Products.GetAll();
           
            return Ok(Products);
        }

        [HttpGet("GetProductById")]

        public IActionResult GetProductById(int ProductId)
        {
            var Product = _unitOfWork.Products.GetProductById(ProductId);

            return Ok(Product);
        }


        [HttpPost("AddProduct")]
        public async Task<ActionResult> AddProduct([FromBody] ProductDto Product, int UserId)
        {
            var ProductAded = await _unitOfWork.Products.AddProduct(UserId, Product);
            _unitOfWork.complete();
            return Ok(ProductAded);
        }

        [HttpDelete("DeleteProduct")]
        public IActionResult DeleteProduct(int productId)
        {
            _unitOfWork.Products.Delete(productId);
            _unitOfWork.complete();
            return Ok();
        }

        [HttpPut("UpdateProduct")]
        public async Task<ActionResult> UpdateProduct(int userId, [FromBody] ProductDto product)
        {
            var ProductToUpdate = await _unitOfWork.Products.UpdateProduct(userId, product);
            _unitOfWork.complete();
            return Ok(ProductToUpdate);
        }
    }
}
