using System;
using InventoryContext.Context;
using InventoryModel;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace InventoryInterface.IDataService
{
    public interface ILocationsRepository : IGenericRepository<location>
    {
        List<DtoLocations> selectAll(string lang);
        List<DtoLocations> selectAllForDrop(string lang);

        DtoLocations selectById(int id, string lang);
        List<DtoLocations> selectAllPallta(string lang);
        DtoLocations selectPalltaById(int id, string lang);

        DtoLocations selectPalltaByParentId(int parentId, string lang);
        int getNextArrange();
        int getNextArrangePallta();
    }
}

