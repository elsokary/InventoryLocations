using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using EntityFramework.Extensions;
using InventoryInterface.IDataService;

namespace InventoryDataService.Repository
{
    public abstract class GenericRepository<C, T> : IGenericRepository<T>
        where T : class
        where C : DbContext, new()
    {
        private C _entities = new C();


        public C Context
        {
            get { return _entities; }
            set { _entities = value; }
        }

        public virtual IQueryable<T> GetAll()
        {
            _entities.Configuration.AutoDetectChangesEnabled = true;
            IQueryable<T> query = _entities.Set<T>();
            return query;
        }

        public IQueryable<T> FindBy(Expression<Func<T, bool>> predicate)
        {
            _entities.Configuration.AutoDetectChangesEnabled = true;
            var query = _entities.Set<T>().Where(predicate);
            return query;
        }

        public virtual void Add(T entity)
        {
            _entities.Set<T>().Add(entity);
        }

        public virtual void AddRange(List<T> entities)
        {
            _entities.Set<T>().AddRange(entities);
        }

        public virtual void Delete(T entity)
        {
            _entities.Set<T>().Remove(entity);
        }

        public virtual void DeleteRange(Expression<Func<T, bool>> predicate)
        {
          //  _entities.Set<T>().Where(predicate).Delete();
        }

        public virtual async Task<int> DeleteRangeExistingList(List<T> deleteList)
        {
            _entities.Set<T>().RemoveRange(deleteList);

            return await _entities.SaveChangesAsync();
        }

        public virtual void Edit(T entity)
        {
            _entities.Entry(entity).State = EntityState.Modified;
        }

        public virtual void Save()
        {
            try
            {
                _entities.Configuration.AutoDetectChangesEnabled = true;
                _entities.SaveChanges();
                _entities.Configuration.AutoDetectChangesEnabled = false;
            }
            catch (Exception e)
            {
                _entities.Configuration.AutoDetectChangesEnabled = false;
                throw e;

            }
        }

        public virtual async Task<int> SaveAsync()
        {
            return await _entities.SaveChangesAsync();
        }

        public virtual void Reload(T entity)
        {
            _entities.Entry(entity).GetDatabaseValues();
        }
    }
}