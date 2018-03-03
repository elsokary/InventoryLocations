
using InventoryContext.Context;
using InventoryModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace InventoryInterface.IDataService
{
    public interface IGrouppermissionsRepository : IGenericRepository<groupPermission>
    {
        IQueryable<DtoGrouppermissions> selectAll(int groupId,string lang);

        List<int?> permissionWithNumbersByGroupIdArray(int groupId);
        DtoGrouppermissions selectById(int id, string lang);
    }
}

