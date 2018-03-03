
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
    public interface IRefundsRepository:IGenericRepository<refund>
    {
        List<DtoRefunds> selectAll(string lang, int pageNumber, int pageSize);

        List<DtoRefunds> selectAllByBranchId(int branchId, int pageNumber, int pageSize); 
         
        DtoRefunds selectById(int id, string lang); 
    }
}

