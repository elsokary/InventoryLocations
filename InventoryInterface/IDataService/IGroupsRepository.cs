
using InventoryContext.Context;
using InventoryModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace InventoryInterface.IDataService
{
    public interface IGroupsRepository : IGenericRepository<Group>
    {
        List<DtoGroups> selectAll(string lang);

        //WriteMethode4

        DtoGroups selectById(int id, string lang);
    }
}

