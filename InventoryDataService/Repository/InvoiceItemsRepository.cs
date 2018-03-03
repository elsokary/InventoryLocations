
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
    public class InvoiceItemsRepository : GenericRepository<favStoreEntities, invoice_items>, IInvoiceItemsRepository
    {
        public List<DtoInvoiceItems> getItemsByInvoiceId(int invoiceId, int branchId)
        {
            var list = new List<DtoInvoiceItems>();

            list = (from q in Context.invoice_items.AsNoTracking().Where(x => x.branchId == branchId)
                    where q.invoiceId == invoiceId
                    select new DtoInvoiceItems
                    {
                        id = q.id,
                        description = q.itemsDecription.subject,
                        invoiceId = q.invoiceId,
                        branchId = q.branchId,
                        itemId = (int)q.itemId,
                        cost = q.cost,
                        price = q.price,
                        quantity = q.quantity,
                        total = q.total,
                        totalPrice = q.quantity * q.price,
                        resourceCode = q.itemsDecription.code,
                        tax = q.tax,
                        taxValue = q.taxValue,
                        totalWithTax = q.totalWithTax + q.taxValue,
                        notes = q.notes
                    }).ToList();

            return list;
        }
        public List<DtoInvoiceItemsReport> getItemsByInvoiceIdforReport(int invoiceId, int branchId)
        {
            var list = new List<DtoInvoiceItemsReport>();

            list = (from q in Context.invoice_items.AsNoTracking().Where(x => x.branchId == branchId)
                    where q.invoiceId == invoiceId
                    select new DtoInvoiceItemsReport
                    {
                        id = q.id,
                        invoiceId = q.invoiceId,
                        branchId = q.branchId,
                        itemId = (int)q.itemId,
                        cost = (double)q.cost,
                        price = (double)q.price,
                        quantity = (double)q.quantity,
                        total = (double)q.total,
                        notes = q.notes,
                        invoiceDate = (DateTime)q.invoice.invoiceDate,
                        branchName = q.invoice.branch.name,
                        //  creationDate = (DateTime)q.invoice.creationDate,
                        refNo = q.invoice.refNo, 
                        code = q.itemsDecription.code,
                        description = q.itemsDecription.subject
                    }).ToList();

            return list;
        }
        public List<DtoItems> getItemsByitemCode(string itemCode)
        {
            var list = new List<DtoItems>();

            list = (from q in Context.invoice_items.AsNoTracking()
                    where q.itemsDecription.code == itemCode
                    select new DtoItems
                    { 
                        code = q.itemsDecription.code,
                        cost = q.cost,
                        price = q.price,
                        invoiceNo = q.invoice.refNo,
                        date = q.invoice.invoiceDate,

                    }).ToList();

            return list;
        }

        public DtoInvoiceItems selectById(int id, string lang)
        {
            var list = new DtoInvoiceItems();

            list = (from q in Context.invoice_items.AsNoTracking()
                    where q.id == id
                    select new DtoInvoiceItems
                    {
                        id = q.id,
                        invoiceId = q.invoiceId,
                        branchId = q.branchId,
                        itemId = (int)q.itemId,
                        cost = q.cost,
                        price = q.price,
                        quantity = q.quantity,
                        total = q.total,
                        totalPrice = q.quantity * q.price,
                        resourceCode = q.itemsDecription.code,
                        notes = q.notes
                    }).FirstOrDefault();

            return list;
        }

    }
}

