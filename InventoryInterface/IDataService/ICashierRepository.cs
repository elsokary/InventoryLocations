
using Interface.IDataService;
using InventoryContext.Context; 
using InventoryInterface.IDataService;
using InventoryModel;
using Inventory_Model.DTOModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;




namespace Interface.IDataService
{
    public interface ICashierRepository:IGenericRepository<cashier>
    {
        int GetNextSerial(int branchId);
        List<DtoCashier> selectAll(string lang);

        List<DtoCashier> selectByBranch(int branchId);

        List<DtoCashier> selectCustomersData(string lang, int pageNumber, int pageSize);

        List<DtoCashier> selectCustomersDataByBranch(int branchId,int pageNumber,int pageSize);

        List<DtoCashier> selectByBranchLimit(int branchId);

        DtoCashier selectById(int id, string lang, int branchId);
        List<DtoCashier> getTransactionsbyOpenedBy(int openedBy);

        salesDetailDto getUserCashier(int openedBy);
        List<DtoCashier> selectByBranchList(int branchId);
    }
}

