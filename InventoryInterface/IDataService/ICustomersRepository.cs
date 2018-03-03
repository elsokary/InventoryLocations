
using InventoryContext.Context;
using InventoryModel;
using System.Collections.Generic;
using System;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace InventoryInterface.IDataService
{
    public interface ICustomersRepository : IGenericRepository<customer>
    {
        
    }
}

