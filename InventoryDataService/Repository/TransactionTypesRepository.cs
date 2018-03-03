
using Interface.IDataService;
using InventoryContext.Context;
using InventoryDataService.Repository;
using InventoryModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataServices.Repository
{
    public class TransactionTypesRepository : GenericRepository<favStoreEntities, transactionType>, ITransactionTypesRepository
    {

        public IQueryable<DtoTransactionTypes> selectAll(string lang)
        {
            var list = new List<DtoTransactionTypes>();
            if (lang == "en")
            {
                list = (from q in Context.transactionTypes.AsNoTracking()
                        select new DtoTransactionTypes
                        {
                            title = q.title,
                            action = q.action,
                            notes = q.notes,
                        }).ToList();
            }
            else
            {
                list = (from q in Context.transactionTypes.AsNoTracking()
                        select new DtoTransactionTypes
                        {
                            title = q.title,
                            action = q.action,
                            notes = q.notes,
                        }).ToList();
            } 
            return list.AsQueryable();
        }

        //WriteMethod2

        public DtoTransactionTypes selectById(int id, string lang)
        {
            var list = new DtoTransactionTypes();
            if (lang == "en")
            {
                list = (from q in Context.transactionTypes.AsNoTracking()
                        where q.id == id
                        select new DtoTransactionTypes
                        {
                            title = q.title,
                            action = q.action,
                            notes = q.notes,
                        }).FirstOrDefault();
            }
            else
            {
                list = (from q in Context.transactionTypes.AsNoTracking()
                        where q.id == id
                        select new DtoTransactionTypes
                        {
                            title = q.title,
                            action = q.action,
                            notes = q.notes,
                        }).FirstOrDefault();
            } return list;
        }




    }
}

