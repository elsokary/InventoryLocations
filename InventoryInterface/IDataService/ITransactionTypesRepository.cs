
using InventoryContext.Context;
using InventoryInterface.IDataService;
using InventoryModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Interface.IDataService
{
    public interface ITransactionTypesRepository : IGenericRepository<transactionType>
    {
        IQueryable<DtoTransactionTypes> selectAll(string lang);
         
        DtoTransactionTypes selectById(int id, string lang);

        IQueryable<DtoTransactionTypes> selectAllForDrop();

         
    }
}

