
using Interface.IDataService;
using InventoryContext.Context;
using InventoryDataService.Repository;
using InventoryModel;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataServices.Repository
{
    public class InventorylogRepository : GenericRepository<favStoreEntities, transactionsHistory>, IInventorylogRepository
    {
        public IQueryable<DtoInventorylog> GetItemFromBranch(string lang, int pageNumber, int pageSize)
        {
            var list = new List<DtoInventorylog>();
            if (lang == "en")
            {
                list = (from q in Context.transactionsHistories.AsNoTracking()
                        where q.transactionId == 1
                        select new DtoInventorylog
                        {
                            id = q.id,
                            itemId = q.itemId,
                            resourceCod = q.itemsDecription.code,
                            price = q.price,
                            quantity = q.quantity,
                            cost = q.cost,
                            transactionId = q.transactionId,
                            fromBranchName = q.branch.name,
                            fromBranchId = q.fromBranchId,
                            toBranchId = q.toBranchId,
                            toBranchName = q.branch1.name,
                            reason = q.reason,
                            total = q.total,
                            creationDate = q.creationDate
                        }).ToList();
            }
            else
            {
                list = (from q in Context.transactionsHistories.AsNoTracking()
                        where q.transactionId == 1
                        select new DtoInventorylog
                        {
                            id = q.id,
                            itemId = q.itemId,
                            resourceCod = q.itemsDecription.code,
                            price = q.price,
                            quantity = q.quantity,
                            cost = q.cost,
                            transactionId = q.transactionId,
                            fromBranchId = q.fromBranchId,
                            fromBranchName = q.branch.name,
                            toBranchId = q.toBranchId,
                            toBranchName = q.branch1.name,
                            reason = q.reason,
                            total = q.total,
                            creationDate = q.creationDate
                        }).ToList().OrderByDescending(x => x.id).Skip(pageNumber * pageSize).Take(pageSize).ToList();
            }
            return list.AsQueryable();
        }



    }
}

