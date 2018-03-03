using InventoryContext.Context;
using InventoryModel;
using System.Collections.Generic;
using System;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace InventoryInterface.IDataService
{
    public interface IDefaultListRepository:IGenericRepository<default_list>
    {
        List<DtoDefaultList> selectAll( string lang);
        List<DtoDefaultList> selectbyType(string type); 
         
        DtoDefaultList selectById(int id, string lang); 
    }
}

