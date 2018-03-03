
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
        

    }
}

