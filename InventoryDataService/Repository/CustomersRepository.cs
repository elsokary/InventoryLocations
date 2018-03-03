using InventoryContext.Context;
using InventoryModel;
using InventoryInterface.IDataService;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data.Entity;

namespace InventoryDataService.Repository
{
    public class CustomersRepository : GenericRepository<favStoreEntities, customer>, ICustomersRepository
    {
        
    }
}

