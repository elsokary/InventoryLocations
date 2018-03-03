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
    public interface ISupplyOrderItemsRepository : IGenericRepository<supplyOrders_items>
    {
        List<DtoInvoiceItemsReport> getItemsByInvoiceIdforReport(int invoiceId, int branchId);
        List<DtoItems> getItemsByitemCode(string itemCode);
        List<DtoInvoiceItems> getItemsByInvoiceId(int invoiceId, int branchId);
        DtoInvoiceItems selectById(int id, string lang);
    }
}

