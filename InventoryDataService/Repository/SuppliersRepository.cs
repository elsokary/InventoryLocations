using InventoryContext.Context;
using InventoryModel;
using InventoryInterface.IDataService;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data.Entity.Core.Objects;



namespace InventoryDataService.Repository
{
    public class SuppliersRepository : GenericRepository<favStoreEntities, supplier>, ISuppliersRepository
    {
         
    }
}

