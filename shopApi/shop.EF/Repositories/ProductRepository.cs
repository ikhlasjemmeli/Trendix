using shop.Core.Dtos;
using shop.Core.Interfaces;
using shop.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace shop.EF.Repositories
{
   
    public class ProductRepository : BaseRepository<Product>, IProductRepository
    {
        private readonly ApplicationDbContext _context;
        public ProductRepository(ApplicationDbContext context) : base(context)
        {
            _context = context;
        }
        public IEnumerable<Product> GetAllByUserId(int UserId)
        {
            if (UserId != null)
            {
                var Products = _context.Products.Where(p => p.UserId == UserId).ToList();
                return Products;
            }
            return null;
        }

        public async Task<string> AddProduct(int UserId, ProductDto product)
        {
            if (UserId == null)
            {
                return "UserId is null";
            }
            else if (product == null)
            {
                return "ProductDto is null";
            }
            else
            {
                var productToAdd = new Product
                {
                    Title = product.Title ?? "",
                    Price = product.Price ,
                    Category = product.Category ?? "",
                    ImageUrl = product.ImageUrl,
                    Description =product.Description,
                    UserId = UserId

                };
                _context.Products.Add(productToAdd);
                return "Product aded successffuly ";
            }
        }

        public Product GetProductById(int ProductId)
        {
            if ( ProductId !=null)
            {
                var Product = _context.Products.FirstOrDefault(p =>  p.Id == ProductId);
                return Product;
            }
            return null;

        }

        public async Task<string> UpdateProduct(int UserId, ProductDto product)
        {
            try
            {
                if (UserId != null)
                {
                    var productToUpdate =  _context.Products.FirstOrDefault(u => u.UserId == UserId);

                    productToUpdate.Title = product.Title ;
                    productToUpdate.Price = product.Price ;
                    productToUpdate.Category = product.Category ;
                    productToUpdate.ImageUrl = product.ImageUrl ;
                    productToUpdate.Description= product.Description ;
                    productToUpdate.UserId = UserId ;
                    _context.Products.Update(productToUpdate);
                }
                return "Product is successfully updated";

            }
            catch (Exception ex)
            {
                return ex.Message;
            }

        }
    }
}
