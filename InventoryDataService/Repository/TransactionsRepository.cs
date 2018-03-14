
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
    public class TransactionsRepository : GenericRepository<favStoreEntities, transaction>, ITransactionsRepository
    { 
    }
}

