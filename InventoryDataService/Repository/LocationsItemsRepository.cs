using InventoryContext.Context;
using InventoryModel;
using InventoryInterface.IDataService;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace InventoryDataService.Repository
{
    public class LocationsItemsRepository : GenericRepository<favStoreEntities, location_items>, ILocationsItemsRepository
    {

    }
}

