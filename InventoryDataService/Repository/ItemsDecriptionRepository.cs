using InventoryContext.Context;
using InventoryModel;
using InventoryInterface.IDataService;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web.Hosting;
using System.Threading.Tasks;
using System.Data.OleDb;
using System.Data;
using System.IO;
using Interface.IDataService;
using DataServices.Repository;

namespace InventoryDataService.Repository
{
    public class ItemsdecriptionRepository : GenericRepository<favStoreEntities, itemsDecription>, IItemsdecriptionRepository
    {

        public List<DtoItemsdecription> getChunkDataByBranch(int pageSize, int pageNumber)
        {
            var list = new List<DtoItemsdecription>();

            list = (from q in Context.itemsDecriptions.AsNoTracking()
                    where q.deletedBy == null
                    select new DtoItemsdecription
                    {
                        subject = q.subject,

                        cost = q.cost,
                        price = q.price,
                        supplierId = q.supplierId,
                        code = q.code,
                        id = q.id
                    }).ToList();


            return list.OrderByDescending(x => x.id).ToList();
        }
        public DtoItemsdecription selectById(int id, string lang)
        {
            var list = new DtoItemsdecription();
            if (lang == "en")
            {
                list = (from q in Context.itemsDecriptions
                        where q.id == id
                        select new DtoItemsdecription
                        {
                            subject = q.subject,
                            cost = q.cost,
                            price = q.price,
                            supplierId = q.supplierId,
                            code = q.code,
                            id = q.id
                        }).FirstOrDefault();
            }
            else
            {
                list = (from q in Context.itemsDecriptions
                        where q.id == id
                        select new DtoItemsdecription
                        {
                            subject = q.subject,
                            cost = q.cost,
                            price = q.price,
                            supplierId = q.supplierId,
                            code = q.code,
                            id = q.id
                        }).FirstOrDefault();
            } return list;
        }
        public List<DtoItemsdecription> selectAll(string lang)
        {
            var list = new List<DtoItemsdecription>();
            if (lang == "en")
            {
                list = (from q in Context.itemsDecriptions.AsNoTracking()
                        where q.deletedBy == null
                        select new DtoItemsdecription
                        {
                            subject = q.subject,
                            cost = q.cost,
                            price = q.price,
                            supplierId = q.supplierId,
                            code = q.code,
                            id = q.id,
                            quantity = 0
                        }).ToList();
            }
            else
            {
                list = (from q in Context.itemsDecriptions.AsNoTracking()
                        where q.deletedBy == null
                        select new DtoItemsdecription
                        {
                            subject = q.subject,
                            cost = q.cost,
                            price = q.price,
                            supplierId = q.supplierId,
                            code = q.code,
                            id = q.id,
                            quantity = 0

                        }).ToList();
            }

            return list.OrderByDescending(x => x.id).ToList();
        }
        public bool? checkCodeExist(string code, int id)
        {
            var exist = false;
            if (id != 0)
            {
                var obj = FindBy(x => x.code == code && x.id != id && x.deletedBy == null).ToList();
                if (obj.Count > 0)
                {
                    exist = true;
                }
            }
            else
            {
                var obj = FindBy(x => x.code == code && x.deletedBy == null).ToList();
                if (obj.Count > 0)
                {
                    exist = true;
                }
            }
            return exist;
        }
    }
}

