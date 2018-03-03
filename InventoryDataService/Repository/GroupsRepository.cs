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
    public class GroupsRepository : GenericRepository<favStoreEntities, Group>, IGroupsRepository
    {
        public List<DtoGroups> selectAll(string lang)
        {
            var list = new List<DtoGroups>();
            if (lang == "en")
            {
                list = (from q in Context.Groups
                        where q.deletedBy == null
                        select new DtoGroups
                        {
                            id = q.id,
                            groupName = q.groupName,
                        }).ToList();
            }
            else
            {
                list = (from q in Context.Groups
                        where q.deletedBy == null
                        select new DtoGroups
                        {
                            id = q.id,
                            groupName = q.groupName,
                        }).ToList();
            } return list;
        }
         
        public DtoGroups selectById(int id, string lang)
        {
            var list = new DtoGroups();
            if (lang == "en")
            {
                list = (from q in Context.Groups
                        where q.id == id
                        select new DtoGroups
                        {
                            id = q.id,
                            groupName = q.groupName,
                        }).FirstOrDefault();
            }
            else
            {
                list = (from q in Context.Groups
                        where q.id == id
                        select new DtoGroups
                        {
                            id = q.id,
                            groupName = q.groupName,
                        }).FirstOrDefault();
            } return list;
        }

    }
}

