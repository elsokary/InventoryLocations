
using Interface.IDataService;
using InventoryContext.Context;
using InventoryDataService.Repository;
using InventoryModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataServices.Repository
{
    public class InvoicesRepository : GenericRepository<favStoreEntities, invoice>, IInvoicesRepository
    {
        public List<DtoInvoices> selectAllByBranchId(int branchId, int pageSize, int pageNumber)
        {
            var list = (from q in Context.invoices.AsNoTracking()
                    where q.branchId == branchId && q.deletedBy == null
                    select new DtoInvoices
                    {
                        id = q.id,
                        branchId = q.branchId,
                        supplierId = q.supplierId,
                        invoiceDate = q.invoiceDate,
                        refNo = q.refNo,
                        serialNo = q.serialNo,
                        discountCash = q.discountCash,
                        discountCommercial = q.discountCommercial,
                        extraExpenses = q.extraExpenses,
                        totalInvoice = q.totalInvoice,
                        total = q.total,
                        openedBy = q.openedBy,
                        creationDate = q.creationDate
                    }).ToList().OrderByDescending(x => x.id).Skip(pageNumber * pageSize).Take(pageSize).ToList();

            return list;
        }
        public List<DtoInvoices> selectAll(string lang, int pageSize, int pageNumber)
        {
            var list = new List<DtoInvoices>();

            list = (from q in Context.invoices.AsNoTracking()
                    where q.deletedBy == null
                    select new DtoInvoices
                    {
                        id = q.id,
                        branchId = q.branchId,
                        supplierId = q.supplierId,
                        invoiceDate = q.invoiceDate, 
                        userName = q.account.userName,
                        refNo = q.refNo,
                        serialNo = q.serialNo,
                        discountCash = q.discountCash,
                        discountCommercial = q.discountCommercial,
                        extraExpenses = q.extraExpenses,
                        totalInvoice = q.totalInvoice,
                        total = q.total,
                        branchName = q.branch.name,
                        openedBy = q.openedBy,
                        creationDate = q.creationDate
                    }).ToList().OrderByDescending(x => x.id).Skip(pageNumber * pageSize).Take(pageSize).ToList();

            return list;
        }
        public List<DtoInvoices> getInvocesBySpplier(int supplier)
        {
            var list = new List<DtoInvoices>();

            list = (from q in Context.invoices.AsNoTracking()
                    where q.supplierId == supplier && q.deletedBy == null
                    select new DtoInvoices
                    {
                        id = q.id,
                        branchId = q.branchId,
                        supplierId = q.supplierId,
                        invoiceDate = q.invoiceDate,
                        refNo = q.refNo,
                        serialNo = q.serialNo,
                        discountCash = q.discountCash,
                        discountCommercial = q.discountCommercial,
                        extraExpenses = q.extraExpenses,
                        totalInvoice = q.totalInvoice,
                        total = q.total,
                        openedBy = q.openedBy,
                        creationDate = q.creationDate
                    }).ToList();

            return list.OrderByDescending(x => x.id).ToList();
        }

        public DtoInvoices selectById(int id, string lang)
        {
            var list = new DtoInvoices();

            list = (from q in Context.invoices
                    where q.id == id
                    select new DtoInvoices
                    {
                        id = q.id,
                        branchId = q.branchId,
                        supplierId = q.supplierId,
                        invoiceDate = q.invoiceDate,
                        refNo = q.refNo,
                        serialNo = q.serialNo,
                        discountCash = q.discountCash ?? 0,
                        discountCommercial = q.discountCommercial ?? 0,
                        extraExpenses = q.extraExpenses ?? 0,
                        totalInvoice = q.totalInvoice ?? 0,
                        total = q.total ?? 0,
                        openedBy = q.openedBy,
                        creationDate = q.creationDate
                    }).FirstOrDefault();
            return list;
        }

        public int getNextArrange(int branchId)
        {
            var serial = (from q in Context.invoices.AsNoTracking().Where(x => x.branchId == branchId)
                          select q.serialNo).Max();
            try
            {

                return Convert.ToInt32(serial) + 1;
            }
            catch (Exception)
            {

                return 1;
            }
        }

    }
}

