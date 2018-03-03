
using InventoryContext.Context;
using InventoryModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace InventoryInterface.IDataService
{
    public interface IBranchesRepository : IGenericRepository<branch>
    {
        List<DtoBranches> selectAll(string lang);
        List<DtoBranches> GetBranchesForList(string lang);
        List<DtoBranches> GetBranchesForListWithoutCurrent(string lang, int branchId);
        List<DtoBranches> GetBranchesForListTransfer();
        int? getDefaultBranch();
        DtoBranches selectById(int id, string lang);
        int getNextArrange();
    }
}

