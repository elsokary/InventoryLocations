
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
    public class RefundsRepository : GenericRepository<favStoreEntities, refund>, IRefundsRepository
    {
        public List<DtoRefunds> selectAll(string lang, int pageNumber, int pageSize)
        {
            var list = new List<DtoRefunds>();

            list = (from q in Context.refunds.AsNoTracking().Where(x => x.deletedBy == null)
                    select new DtoRefunds
                    {
                        id = q.id,
                        branchId = q.branchId,
                        openedBy = q.openedBy,
                        branchName = q.branch.name,
                        openedByName = q.account.userName,
                        serial = q.serial,
                        total = q.total,
                        date = q.date,
                        time = q.time,
                    }).ToList().OrderByDescending(x => x.id).Skip(pageNumber * pageSize).Take(pageSize).ToList();
            return list;
        }
        public List<DtoRefunds> selectAllByBranchId(int branchId, int pageNumber, int pageSize)
        {
            var list = new List<DtoRefunds>();

            list = (from q in Context.refunds.AsNoTracking().Where(x => x.deletedBy == null)
                    where q.branchId == branchId
                    select new DtoRefunds
                    {
                        id = q.id,
                        branchName = q.branch.name,
                        openedByName = q.account.userName,
                        branchId = q.branchId,
                        openedBy = q.openedBy,
                        serial = q.serial,
                        total = q.total,
                        date = q.date,
                        time = q.time,
                    }).ToList().OrderByDescending(x => x.id).Skip(pageNumber * pageSize).Take(pageSize).ToList();
            return list;
        }

        public DtoRefunds selectById(int id, string lang)
        {
            var list = new DtoRefunds();
            if (lang == "en")
            {
                list = (from q in Context.refunds
                        where q.id == id
                        select new DtoRefunds
                        {
                            id = q.id,
                            branchId = q.branchId,
                            openedBy = q.openedBy,
                            serial = q.serial,
                            total = q.total,
                            date = q.date,
                            time = q.time,
                        }).FirstOrDefault();
            }
            else
            {
                list = (from q in Context.refunds
                        where q.id == id
                        select new DtoRefunds
                        {
                            id = q.id,
                            branchId = q.branchId,
                            openedBy = q.openedBy,
                            serial = q.serial,
                            total = q.total,
                            date = q.date,
                            time = q.time
                        }).FirstOrDefault();
            }
            return list;
        }

    }
}

