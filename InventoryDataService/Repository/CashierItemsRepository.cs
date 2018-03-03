
using Interface.IDataService;
using InventoryContext.Context;
using InventoryDataService.Repository;
using Inventory_Model.DTOModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataServices.Repository
{
    public class CashierItemsRepository : GenericRepository<favStoreEntities, cashier_items>, ICashierItemsRepository
    {
        public List<DtoCashierItems> selectAll(int cahierId, int branchId)
        {
            var list = new List<DtoCashierItems>();

            list = (from q in Context.cashier_items.AsNoTracking()

                    where q.cashierId == cahierId && q.branchId == branchId

                    select new DtoCashierItems
                    {
                        id = q.id,
                        code = q.itemsDecription.code,
                        itemName = q.itemsDecription.subject,
                        branchId = q.branchId,
                        cashierId = q.cashierId,
                        itemId = (int)q.itemId,
                        quantity = (double)q.quantity,
                        price = (double)q.price,
                        total = (double)q.total,
                        resourceCode = q.itemsDecription.code
                    }).ToList();
            return list;
        }
        public List<DtoCashierItems> getItemsBySalesforReport(int cahierId, int branchId)
        {
            var list = new List<DtoCashierItems>();

            list = (from q in Context.cashier_items.AsNoTracking()

                    where q.cashierId == cahierId && q.branchId == branchId

                    select new DtoCashierItems
                    {
                        code = q.itemsDecription.code,
                        phone = q.cashier.branch.phone,
                        description = q.itemsDecription.subject,
                        branchName = q.cashier.branch.name,
                        itemId = (int)q.itemId,
                        customerName = q.cashier.customer.name,
                        address = q.cashier.customer.name,
                        date = (DateTime)q.cashier.date,
                        purchaseDate = (DateTime)q.cashier.date,
                        invoiceTotal = (double)q.total,
                        paymentType = q.cashier.paymentType,
                        quantity = (double)q.quantity,
                        price = (double)q.price,
                        total = (double)q.total,
                        serial = (int)q.cashier.serial
                    }).ToList();
            return list;
        }
        public DtoCashierItems selectById(int id, string lang)
        {
            var list = new DtoCashierItems();
            if (lang == "en")
            {
                list = (from q in Context.cashier_items.AsNoTracking()
                        where q.id == id
                        select new DtoCashierItems
                        {
                            id = q.id,
                            branchId = q.branchId,
                            cashierId = q.cashierId,
                            itemId = (int)q.itemId,
                            quantity = (double)q.quantity,
                            price = (double)q.price,
                            total = (double)q.total,
                        }).FirstOrDefault();
            }
            else
            {
                list = (from q in Context.cashier_items
                        where q.id == id
                        select new DtoCashierItems
                        {
                            id = q.id,
                            branchId = q.branchId,
                            cashierId = q.cashierId,
                            itemId = (int)q.itemId,
                            quantity = (double)q.quantity,
                            price = (double)q.price,
                            total = (double)q.total,
                        }).FirstOrDefault();
            }
            return list;
        }

    }
}

