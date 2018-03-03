using InventoryContext.Context;
using InventoryModel;
using InventoryInterface.IDataService;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web.Hosting;
using System.Threading.Tasks;
using System.Data.OleDb;
using System.Data;
using System.IO;
using Interface.IDataService;
using DataServices.Repository;

namespace InventoryDataService.Repository
{
    public class ItemsdecriptionRepository : GenericRepository<favStoreEntities, itemsDecription>, IItemsdecriptionRepository
    {
       
    }
}

