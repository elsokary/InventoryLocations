
using Interface.IDataService;
using InventoryContext.Context;
using InventoryDataService.Repository;
using InventoryInterface.IDataService;
using InventoryModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataServices.Repository
{
    public class SupplyOrderItemsRepository : GenericRepository<favStoreEntities, supplyOrders_items>, ISupplyOrderItemsRepository
    {
        public List<DtoInvoiceItems> getItemsByInvoiceId(int invoiceId, int branchId)
        {
            var list = new List<DtoInvoiceItems>();

            list = (from q in Context.supplyOrders_items.AsNoTracking().Where(x => x.branchId == branchId)
                    where q.supplyOrderId == invoiceId
                    select new DtoInvoiceItems
                    {
                        id = q.id,
                        description = q.itemsDecription.subject,
                        invoiceId = q.supplyOrderId,
                        branchId = q.branchId,
                        itemId = (int)q.itemId,
                        cost = q.cost, 
                        quantity = q.quantity,
                        total = q.total, 
                        resourceCode = q.itemsDecription.code 
                    }).ToList();

            return list;
        }
        public List<DtoInvoiceItemsReport> getItemsByInvoiceIdforReport(int invoiceId, int branchId)
        {
            var list = new List<DtoInvoiceItemsReport>();

            list = (from q in Context.supplyOrders_items.AsNoTracking().Where(x => x.branchId == branchId)
                    where q.supplyOrderId == invoiceId
                    select new DtoInvoiceItemsReport
                    {
                        id = q.id,
                        invoiceId = q.supplyOrderId,
                        branchId = q.branchId,
                        itemId = (int)q.itemId,
                        cost = (double)q.cost, 
                        quantity = (double)q.quantity,
                        total = (double)q.total,  
                        code = q.itemsDecription.code,
                        description = q.itemsDecription.subject
                    }).ToList();

            return list;
        }
        public List<DtoItems> getItemsByitemCode(string itemCode)
        {
            var list = new List<DtoItems>();

            list = (from q in Context.supplyOrders_items.AsNoTracking()
                    where q.itemsDecription.code == itemCode
                    select new DtoItems
                    { 

                    }).ToList();

            return list;
        }

        public DtoInvoiceItems selectById(int id, string lang)
        {
            var list = new DtoInvoiceItems();

            list = (from q in Context.supplyOrders_items.AsNoTracking()
                    where q.id == id
                    select new DtoInvoiceItems
                    {
                        id = q.id,
                        invoiceId = q.supplyOrderId,
                        branchId = q.branchId,
                        itemId = (int)q.itemId,
                        cost = q.cost, 
                        quantity = q.quantity,
                        total = q.total, 
                        resourceCode = q.itemsDecription.code 
                    }).FirstOrDefault();

            return list;
        }

    }
}

