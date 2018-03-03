using InventoryContext.Context;
using InventoryModel;
using InventoryInterface.IDataService;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;



namespace InventoryDataService.Repository
{
    public class GrouppermissionsRepository : GenericRepository<favStoreEntities, groupPermission>, IGrouppermissionsRepository
    {
        public IQueryable<DtoGrouppermissions> selectAll(int groupId, string lang)
        {
            var list = new List<DtoGrouppermissions>();
            if (lang == "en")
            {
                list = (from q in Context.groupPermissions.AsNoTracking()
                        select new DtoGrouppermissions
                        {
                            id = q.id,
                            groupId = q.groupId,
                            permissionCode = (int)q.permissionCode,
                            value = q.value,
                        }).ToList();
            }
            else
            {
                list = (from q in Context.groupPermissions.AsNoTracking()
                        select new DtoGrouppermissions
                        {
                            id = q.id,
                            groupId = q.groupId,
                            permissionCode = (int)q.permissionCode,
                            value = q.value,
                        }).ToList();
            } return list.AsQueryable();
        }

        public List<int?> permissionWithNumbersByGroupIdArray(int groupId)
        {
            List<int?> list = new List<int?>();
            list = (from c in Context.groupPermissions.AsNoTracking()
                    join g in Context.Groups on c.groupId equals g.id
                    where c.groupId == groupId && c.value == true

                    select c.permissionCode).ToList();

            return list;
        }
        public DtoGrouppermissions selectById(int id, string lang)
        {
            var list = new DtoGrouppermissions();
            if (lang == "en")
            {
                list = (from q in Context.groupPermissions.AsNoTracking()
                        where q.id == id
                        select new DtoGrouppermissions
                        {
                            groupId = q.groupId,
                            permissionCode = (int)q.permissionCode,
                            value = q.value,
                        }).FirstOrDefault();
            }
            else
            {
                list = (from q in Context.groupPermissions.AsNoTracking()
                        where q.id == id
                        select new DtoGrouppermissions
                        {
                            groupId = q.groupId,
                            permissionCode = (int)q.permissionCode,
                            value = q.value,
                        }).FirstOrDefault();
            } return list;
        }

    }
}

