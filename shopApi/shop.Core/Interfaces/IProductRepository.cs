using Microsoft.VisualBasic;
using shop.Core.Dtos;
using shop.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace shop.Core.Interfaces
{
    public interface IProductRepository : IBaseRepository<Product>
    {
        IEnumerable<Product> GetAllByUserId(int UserId);
        Task<string> AddProduct(int UserId, ProductDto product);
        Task<string> UpdateProduct(int UserId, ProductDto product);
        Product GetProductById(int ProductId);
    }
}
