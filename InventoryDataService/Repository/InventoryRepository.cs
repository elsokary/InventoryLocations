
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
       
        
    }
}

