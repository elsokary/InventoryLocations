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
    public interface ISupplyOrderRepository : IGenericRepository<supplyOrder>
    {
        List<DtoInvoices> selectAll(string lang, int pageSize, int pageNumber);
        List<DtoInvoices> selectAllByBranchId(int branchId, int pageSize, int pageNumber);
        List<DtoInvoices> getInvocesBySpplier(int supplier);
        DtoInvoices selectById(int id, string lang);
        int getNextArrange(int branchId);
    }
}

