using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace shop.Core.Interfaces
{
    public interface IUnitOfWork : IDisposable
    {
        public IUserRepository Users { get; set; }
        public IProductRepository Products { get; set; }
        int complete();
    }
}
