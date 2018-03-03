
using Interface.IDataService;
using InventoryContext.Context;
using InventoryDataService.Repository;
using InventoryModel;
using Inventory_Model.DTOModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;



namespace DataServices.Repository
{
    public class CashierRepository : GenericRepository<favStoreEntities, cashier>, ICashierRepository
    {
        public List<DtoCashier> selectAll(string lang)
        {
            var list = new List<DtoCashier>();
            if (lang == "en")
            {
                list = (from q in Context.cashiers.AsNoTracking()
                        where q.deletedBy == null
                        select new DtoCashier
                        {
                            id = q.id,
                            branchName = q.branch.name,
                            enteredByName = q.account.userName,
                            branchId = q.branchId,
                            openedBy = q.openedBy,
                            date = q.date,
                            serial = q.serial,
                            time = q.time,
                            total = q.total,
                            paymentType = q.paymentType
                        }).ToList();
            }
            else
            {
                list = (from q in Context.cashiers.AsNoTracking()
                        where q.deletedBy == null
                        select new DtoCashier
                        {
                            id = q.id,
                            branchName = q.branch.name,
                            enteredByName = q.account.userName,
                            branchId = q.branchId,
                            openedBy = q.openedBy,
                            date = q.date,
                            serial = q.serial,
                            time = q.time,
                            total = q.total,
                            paymentType = q.paymentType
                        }).ToList();
            } return list;
        }

        public List<DtoCashier> selectCustomersData(string lang, int pageNumber, int pageSize)
        {
            var list = new List<DtoCashier>();

            list = (from q in Context.cashiers.AsNoTracking()
                    where q.customerId != null && q.deletedBy == null
                    select new DtoCashier
                    {
                        id = q.id,
                        branchName = q.branch.name,
                        enteredByName = q.account.userName,
                        branchId = q.branchId,
                        openedBy = q.openedBy,
                        date = q.date,
                        serial = q.serial,
                        time = q.time,
                        total = q.total,
                        paymentType = q.paymentType,
                        customerName = q.customer.name
                    }).ToList().OrderByDescending(x => x.id).Skip(pageNumber * pageSize).Take(pageSize).ToList();
            return list;
        }

        public List<DtoCashier> selectCustomersDataByBranch(int branchId, int pageNumber, int pageSize)
        {
            var list = (from q in Context.cashiers.AsNoTracking().Where(x => x.deletedBy == null)
                        where q.branchId == branchId && q.customerId != null
                        select new DtoCashier
                        {
                            id = q.id,
                            branchId = q.branchId,
                            branchName = q.branch.name,
                            enteredByName = q.account.userName,
                            openedBy = q.openedBy,
                            date = q.date,
                            serial = q.serial,
                            time = q.time,
                            total = q.total,
                            paymentType = q.paymentType,
                            customerName = q.customer.name
                        }).ToList().OrderByDescending(x => x.id).Skip(pageNumber * pageSize).Take(pageSize).ToList();
            return list;
        }
        public DtoCashier selectById(int id, string lang, int branchId)
        {
            var list = new DtoCashier();

            list = (from q in Context.cashiers.Where(x => x.deletedBy == null)
                    where q.id == id && q.branchId == branchId
                    select new DtoCashier
                    {
                        id = q.id,
                        branchId = q.branchId,
                        branchName = q.branch.name,
                        telephone = q.branch.phone,
                        openedBy = q.openedBy,
                        enteredByName = q.account.userName,
                        date = q.date,
                        serial = q.serial,
                        time = q.time,
                        total = q.total,
                        customerId = q.customerId,
                        paymentType = q.paymentType
                    }).FirstOrDefault();
            return list;
        }

        public List<DtoCashier> selectByBranch(int branchId)
        {
            var list = (from q in Context.cashiers.AsNoTracking().Where(x => x.deletedBy == null)
                        where q.branchId == branchId
                        select new DtoCashier
                        {
                            id = q.id,
                            branchId = q.branchId,
                            branchName = q.branch.name,
                            enteredByName = q.account.userName,
                            openedBy = q.openedBy,
                            date = q.date,
                            serial = q.serial,
                            time = q.time,
                            total = q.total,
                            paymentType = q.paymentType
                        }).ToList();
            return list;
        }
        public List<DtoCashier> selectByBranchList(int branchId)
        {
            var list = (from q in Context.cashiers.AsNoTracking().Where(x => x.deletedBy == null)
                        where q.branchId == branchId
                        select new DtoCashier
                        {
                            id = q.id,
                            serial = q.serial,
                            
                        }).ToList();

            return list;
        }
        public List<DtoCashier> selectByBranchLimit(int branchId)
        {
            var currentDate = DateTime.Now.Date.AddDays(-3);

            var list = (from q in Context.cashiers.AsNoTracking().Where(x => x.deletedBy == null)
                        where q.branchId == branchId && q.date >= currentDate
                        select new DtoCashier
                        {
                            id = q.id,
                            branchId = q.branchId,
                            branchName = q.branch.name,
                            enteredByName = q.account.userName,
                            openedBy = q.openedBy,
                            date = q.date,
                            serial = q.serial,
                            time = q.time,
                            total = q.total,
                            paymentType = q.paymentType
                        }).ToList();
            return list;
        }
        public List<DtoCashier> getTransactionsbyOpenedBy(int openedBy)
        {
            var list = new List<DtoCashier>();

            var resultsale = (from q in Context.cashiers.AsNoTracking().Where(x => x.deletedBy == null)
                              where q.openedBy == openedBy
                              select new DtoCashier
                              {
                                  id = q.id,
                                  branchId = q.branchId,
                                  branchName = q.branch.name,
                                  enteredByName = q.account.userName,
                                  openedBy = q.openedBy,
                                  date = q.date,
                                  serial = q.serial,
                                  time = q.time,
                                  total = q.total,
                                  paymentType = q.paymentType,
                                  transactionType = "بيع"
                              }).ToList();

            list.AddRange(resultsale);

            var resultrefuund = (from q in Context.refunds.AsNoTracking().Where(x => x.deletedBy == null)
                                 where q.openedBy == openedBy
                                 select new DtoCashier
                                 {
                                     id = q.id,
                                     branchId = q.branchId,
                                     branchName = q.branch.name,
                                     enteredByName = q.account.userName,
                                     openedBy = q.openedBy,
                                     date = q.date,
                                     serial = q.serial,
                                     time = q.time,
                                     total = q.total,
                                     transactionType = "مرتجع"
                                 }).ToList();

            list.AddRange(resultrefuund);

            return list;
        }

        public salesDetailDto getUserCashier(int openedBy)
        {
            var currentDate = DateTime.Now.Date;

            var resultsale = (from q in Context.accounts.AsNoTracking().Where(x => x.deletedBy == null && x.id == openedBy)
                              let totalSales = Context.cashiers.Where(x => x.deletedBy == null && x.customerId == null && x.date == currentDate && x.openedBy == openedBy).ToList()
                              
                              let totalRefunds = Context.refunds.Where(x => x.deletedBy == null && x.date == currentDate && x.openedBy == openedBy).ToList()

                              select new salesDetailDto
                              {
                                  checkIn = q.loggedTime,
                                  cash = totalSales.Where(x => x.paymentType == "نقدى").Sum(x => x.total) ?? 0,
                                  visa = totalSales.Where(x => x.paymentType == "اجل").Sum(x => x.total) ?? 0,
                                  netSales = totalSales.Sum(x => x.total) ?? 0 + totalSales.Sum(x => x.total) ?? 0,
                                  returneds = totalRefunds.Sum(x => x.total) ?? 0,
                                  total = (totalSales.Sum(x => x.total) ?? 0 + totalSales.Sum(x => x.total) ?? 0) - totalRefunds.Sum(x => x.total) ?? 0,
                                  contactName = q.contactName,
                                  date = currentDate,
                                  branchName = q.branch.name

                              }).FirstOrDefault();


            return resultsale;
        }

        public int GetNextSerial(int branchId)
        {
            int arrange = 0;
            var lastArrange = (from q in Context.cashiers.AsNoTracking().Where(x => x.deletedBy == null)
                               where q.branchId == branchId
                               select q.serial).Max();
            if (lastArrange != null)
            {
                arrange = (int)lastArrange;

            }
            return arrange + 1;
        }
    }
}

