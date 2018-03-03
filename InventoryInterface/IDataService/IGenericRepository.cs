using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace InventoryInterface.IDataService
{
 
        public interface IGenericRepository<T> where T : class
        {
            IQueryable<T> GetAll();
            IQueryable<T> FindBy(Expression<Func<T, bool>> predicate);
            void Add(T entity);
            void AddRange(List<T> entities);
            void Delete(T entity);
            void Edit(T entity);
            void Save();
            Task<int> SaveAsync();
            void DeleteRange(Expression<Func<T, bool>> predicate); 
            Task<int> DeleteRangeExistingList(List<T> deleteList);
            void Reload(T entity);
        }
    
}
