using System;
using InventoryContext.Context;
using InventoryModel;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace InventoryInterface.IDataService
{
    public interface ILocationsItemsRepository : IGenericRepository<location_items>
    {
     
    }
}

