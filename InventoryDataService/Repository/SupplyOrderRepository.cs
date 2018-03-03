
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
    public class SupplyOrderRepository : GenericRepository<favStoreEntities, supplyOrder>, ISupplyOrderRepository
    {
        public List<DtoInvoices> selectAllByBranchId(int branchId, int pageSize, int pageNumber)
        {
            var list = (from q in Context.supplyOrders.AsNoTracking()
                        let supplierName = Context.suppliers.FirstOrDefault(x => x.id == q.supplierId).name ?? ""
                        where q.branchId == branchId && q.deletedBy == null
                        select new DtoInvoices
                        {
                            id = q.id,
                            branchId = q.branchId,
                            supplierId = q.supplierId,
                            invoiceDate = q.OrderDate,
                            serialNo = q.serialNo,
                            total = q.total,
                            supplierName = supplierName,
                            branchName = q.branch.name,
                            userName = q.account.contactName,
                            openedBy = q.openedBy,
                            creationDate = q.creationDate
                        }).ToList().OrderByDescending(x => x.id).Skip(pageNumber * pageSize).Take(pageSize).ToList();

            return list;
        }
        public List<DtoInvoices> selectAll(string lang, int pageSize, int pageNumber)
        {
            var list = new List<DtoInvoices>();

            list = (from q in Context.supplyOrders.AsNoTracking()
                    let supplierName = Context.suppliers.FirstOrDefault(x => x.id == q.supplierId).name ?? ""
                    where q.deletedBy == null
                    select new DtoInvoices
                    {
                        id = q.id,
                        branchId = q.branchId,
                        supplierName = supplierName,
                        branchName = q.branch.name,
                        userName = q.account.contactName,
                        supplierId = q.supplierId,
                        invoiceDate = q.OrderDate,
                        serialNo = q.serialNo,
                        total = q.total,
                        openedBy = q.openedBy,
                        creationDate = q.creationDate
                    }).ToList().OrderByDescending(x => x.id).Skip(pageNumber * pageSize).Take(pageSize).ToList();

            return list;
        }
        public List<DtoInvoices> getInvocesBySpplier(int supplier)
        {
            var list = new List<DtoInvoices>();

            list = (from q in Context.supplyOrders.AsNoTracking()
                    let supplierName = Context.suppliers.FirstOrDefault(x => x.id == q.supplierId).name ?? ""
                    where q.supplierId == supplier && q.deletedBy == null
                    select new DtoInvoices
                    {
                        id = q.id,
                        branchId = q.branchId,
                        supplierId = q.supplierId,

                        supplierName = supplierName,
                        branchName = q.branch.name,
                        userName = q.account.contactName,
                        invoiceDate = q.OrderDate,
                        serialNo = q.serialNo,
                        total = q.total,
                        openedBy = q.openedBy,
                        creationDate = q.creationDate
                    }).ToList();

            return list.OrderByDescending(x => x.id).ToList();
        }

        public DtoInvoices selectById(int id, string lang)
        {
            var list = new DtoInvoices();

            list = (from q in Context.supplyOrders
                    where q.id == id
                    select new DtoInvoices
                    {
                        id = q.id,
                        branchId = q.branchId,
                        supplierId = q.supplierId,
                        invoiceDate = q.OrderDate,
                        serialNo = q.serialNo,
                        total = q.total ?? 0,
                        openedBy = q.openedBy,
                        creationDate = q.creationDate
                    }).FirstOrDefault();
            return list;
        }

        public int getNextArrange(int branchId)
        {
            var serial = (from q in Context.supplyOrders.AsNoTracking().Where(x => x.branchId == branchId)
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

