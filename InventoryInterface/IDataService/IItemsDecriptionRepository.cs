
using InventoryContext.Context;
using InventoryModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace InventoryInterface.IDataService
{
    public interface IItemsdecriptionRepository : IGenericRepository<itemsDecription>
    {
        DtoItemsdecription selectById(int id, string lang);
        List<DtoItemsdecription> selectAll(string lang);
        bool? checkCodeExist(string code, int id);

        List<DtoItemsdecription> getChunkDataByBranch(int pageSize, int pageNumber);
    }
}

