
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
    public interface ICashierItemsRepository:IGenericRepository<cashier_items>
    {
        List<DtoCashierItems> selectAll(int cahierId, int branchId);
        List<DtoCashierItems> getItemsBySalesforReport(int cahierId, int branchId); 
        //WriteMethode4

        DtoCashierItems selectById(int id, string lang); 
    }
}

