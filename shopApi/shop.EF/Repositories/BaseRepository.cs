using Microsoft.EntityFrameworkCore;
using shop.Core.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace shop.EF.Repositories
{
    public class BaseRepository<T> : IBaseRepository<T> where T : class
    {
        public readonly ApplicationDbContext _context;

        public BaseRepository(ApplicationDbContext context)
        {
            _context = context;

        }
        public IEnumerable<T> GetAll()
        {
            return _context.Set<T>().ToArray();
        }
        public void Add(T entity)
        {
            _context.Set<T>().Add(entity);
        }
        public void Delete(int id)
        {
            T itemToDelete = _context.Set<T>().Find(id);
            _context.Set<T>().Remove(itemToDelete);
        }
    }
}
