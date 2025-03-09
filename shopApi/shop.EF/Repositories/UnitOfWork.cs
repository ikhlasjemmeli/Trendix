using shop.Core.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace shop.EF.Repositories
{
    public class UnitOfWork : IUnitOfWork
    {
        public readonly ApplicationDbContext _context;
        public IUserRepository Users { get; set; }
        public IProductRepository Products { get; set; }
        public UnitOfWork(ApplicationDbContext context)
        {

            _context = context;
            Products = new ProductRepository(_context);
            Users = new UserRepository(_context);
          
        }
        public void Dispose()
        {
            _context.Dispose();
        }
        public int complete()
        {
            return _context.SaveChanges();
        }

    }

}
