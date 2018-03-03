
using Interface.IDataService;
using InventoryContext.Context;
using InventoryInterface.IDataService;
using InventoryModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;



namespace InventoryDataService.Repository
{
    public class DefaultListRepository : GenericRepository<favStoreEntities, default_list>, IDefaultListRepository
    {
        public List<DtoDefaultList> selectAll(string lang)
        {
            var list = new List<DtoDefaultList>();
            if (lang == "en")
            {
                list = (from q in Context.default_list.AsNoTracking()
                        select new DtoDefaultList
                        {
                            id = q.id,
                            title = q.title,
                            action = q.action,
                            type = q.type,
                        }).ToList();
            }
            else
            {
                list = (from q in Context.default_list.AsNoTracking()
                        select new DtoDefaultList
                        {
                            id = q.id,
                            title = q.title,
                            action = q.action,
                            type = q.type,
                        }).ToList();
            } return list;
        }
        public List<DtoDefaultList> selectbyType(string type)
        {
            var list = new List<DtoDefaultList>();

            list = (from q in Context.default_list.AsNoTracking()
                    where q.type == type
                    select new DtoDefaultList
                    {
                        id = q.id,
                        title = q.title,
                        action = q.action,
                        type = q.type,
                    }).ToList();
            return list;
        }

        public DtoDefaultList selectById(int id, string lang)
        {
            var list = new DtoDefaultList();
            if (lang == "en")
            {
                list = (from q in Context.default_list
                        where q.id == id
                        select new DtoDefaultList
                        {
                            title = q.title,
                            action = q.action,
                            type = q.type,
                        }).FirstOrDefault();
            }
            else
            {
                list = (from q in Context.default_list
                        where q.id == id
                        select new DtoDefaultList
                        {
                            title = q.title,
                            action = q.action,
                            type = q.type,
                        }).FirstOrDefault();
            } return list;
        }

    }
}

