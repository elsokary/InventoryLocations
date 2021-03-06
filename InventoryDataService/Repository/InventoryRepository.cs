
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
    public class InventoryRepository : GenericRepository<favStoreEntities, transaction>, IInventoryRepository
    {

        public int GetNextArrange()
        {
            var serial = 0;
            var list = (from q in Context.transactionsHistories.AsNoTracking()

                        select q.serialNo ?? 0).ToList();

            if (list.Count > 0)
            {
                serial = list.Max();
            }

            return serial + 1;
        }


        public List<DtoInventory> GetStockState()
        {
            var result = (from q in Context.transactions.AsNoTracking()
                          select new DtoInventory
                          {
                              id = q.id,
                              itemId = q.itemId,
                              palltaId = q.palltaId,
                              locationItemId = q.locationItemId,
                              palltaTypeId = q.palltaType,

                              description = q.description,
                              resourceCode = q.resourceCode,
                              quantity = q.quantity,
                              locationName = q.location.description,
                              locationType = q.transactionType.title
                          }).ToList();
            return result;
        }

    }
}

