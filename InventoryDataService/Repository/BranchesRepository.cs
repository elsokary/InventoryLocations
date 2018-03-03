using InventoryContext.Context;
using InventoryModel;
using InventoryInterface.IDataService;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace InventoryDataService.Repository
{
    public class BranchesRepository : GenericRepository<favStoreEntities, branch>, IBranchesRepository
    {
        public List<DtoBranches> selectAll(string lang)
        {
            var list = new List<DtoBranches>();
            if (lang == "en")
            {
                list = (from q in Context.branches.AsNoTracking()
                        where q.deletedBy == null //&& q.isDefault != true
                        select new DtoBranches
                        {
                            id = q.id,
                            code = q.code,
                            name = q.name,
                            address = q.address,
                            email = q.email,
                            phone = q.phone,
                            isDefault = q.isDefault
                        }).ToList();
            }
            else
            {
                list = (from q in Context.branches.AsNoTracking()
                        where q.deletedBy == null //&& q.isDefault != true
                        select new DtoBranches
                        {
                            id = q.id,
                            code = q.code,
                            name = q.name,
                            address = q.address,
                            email = q.email,
                            phone = q.phone,
                            isDefault = q.isDefault
                        }).ToList();
            } return list;
        }

        public List<DtoBranches> GetBranchesForList(string lang)
        {
            var list = new List<DtoBranches>();
            if (lang == "en")
            {
                list = (from q in Context.branches.AsNoTracking()
                        where q.deletedBy == null //&& q.isDefault != true
                        select new DtoBranches
                        {
                            id = q.id,
                            name = q.name + "-" + q.code,
                        }).ToList();
            }
            else
            {
                list = (from q in Context.branches.AsNoTracking()
                        where q.deletedBy == null //&& q.isDefault != true
                        select new DtoBranches
                        {
                            id = q.id,
                            name = q.name + "-" + q.code,
                        }).ToList();
            } return list;
        }

        public List<DtoBranches> GetBranchesForListWithoutCurrent(string lang, int branchId)
        {
            var list = new List<DtoBranches>();
            if (lang == "en")
            {
                list = (from q in Context.branches.AsNoTracking()
                        where q.deletedBy == null && q.id != branchId //&& q.isDefault != true
                        select new DtoBranches
                        {
                            id = q.id,
                            name = q.name + "-" + q.code,
                        }).ToList();
            }
            else
            {
                list = (from q in Context.branches.AsNoTracking()
                        where q.deletedBy == null && q.id != branchId //&& q.isDefault != true
                        select new DtoBranches
                        {
                            id = q.id,
                            name = q.name + "-" + q.code,
                        }).ToList();
            } return list;
        }

        public List<DtoBranches> GetBranchesForListTransfer()
        {
            var list = new List<DtoBranches>();

            list = (from q in Context.branches.AsNoTracking()
                    where q.deletedBy == null && q.isDefault != true
                    select new DtoBranches
                    {
                        id = q.id,
                        name = q.name + "-" + q.code,
                    }).ToList();

            return list;
        }

        public DtoBranches selectById(int id, string lang)
        {
            var list = new DtoBranches();
            if (lang == "en")
            {
                list = (from q in Context.branches.AsNoTracking()
                        where q.id == id
                        select new DtoBranches
                        {
                            id = q.id,
                            code = q.code,
                            name = q.name,
                            address = q.address,
                            email = q.email,
                            phone = q.phone
                        }).FirstOrDefault();
            }
            else
            {
                list = (from q in Context.branches.AsNoTracking()
                        where q.id == id
                        select new DtoBranches
                        {
                            id = q.id,
                            code = q.code,
                            name = q.name,
                            address = q.address,
                            email = q.email,
                            phone = q.phone
                        }).FirstOrDefault();
            } return list;
        }

        public int? getDefaultBranch()
        {
            var defaultBranchId = 0;
            var obj = FindBy(x => x.isDefault == true).FirstOrDefault();
            if (obj != null)
            {
                defaultBranchId = obj.id;
            }
            return defaultBranchId;
        }

        public int getNextArrange()
        {
            int arrange = 0;
            var code = (from q in Context.branches.AsNoTracking().Where(x => x.deletedBy == null)
                        select q.code).ToList().Max();
            if (code != null)
            {
                arrange = Convert.ToInt32(code);
            }

            return arrange + 1;
        }
    }
}

