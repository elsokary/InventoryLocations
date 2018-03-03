
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
    public interface IRefundIemsRepository:IGenericRepository<refund_iems>
    {
        List<DtoRefundIems> selectAllById(int refundId, int branchId);
         
        DtoRefundIems selectById(int id, string lang); 
    }
}

