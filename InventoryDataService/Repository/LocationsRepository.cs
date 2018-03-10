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
    public class LocationsRepository : GenericRepository<favStoreEntities, location>, ILocationsRepository
    {

        public DtoLocations selectById(int id, string lang)
        {
            var list = new DtoLocations();
            if (lang == "en")
            {
                list = (from q in Context.locations
                        where q.id == id
                        select new DtoLocations
                        {
                            id = q.id,
                            description = q.description,
                            code = q.code,
                            parentId = q.parentId,
                            isPallta = q.isPallta,
                            serial = q.serial
                        }).FirstOrDefault();
            }
            else
            {
                list = (from q in Context.locations
                        where q.id == id
                        select new DtoLocations
                        {
                            id = q.id,
                            description = q.description,
                            code = q.code,
                            parentId = q.parentId,
                            isPallta = q.isPallta,
                            serial = q.serial
                        }).FirstOrDefault();
            } return list;
        }

        public DtoLocations selectPalltaByParentId(int parentId, string lang)
        {
            var list = new DtoLocations();
            if (lang == "en")
            {
                list = (from q in Context.locations
                        where q.parentId == parentId
                        select new DtoLocations
                        {
                            id = q.id,
                            description = q.description,
                            code = q.code,
                            parentId = q.parentId,
                            isPallta = q.isPallta,
                            serial = q.serial
                        }).FirstOrDefault();
            }
            else
            {
                list = (from q in Context.locations
                        where q.parentId == parentId
                        select new DtoLocations
                        {
                            id = q.id,
                            description = q.description,
                            code = q.code,
                            parentId = q.parentId,
                            isPallta = q.isPallta,
                            serial = q.serial
                        }).FirstOrDefault();
            } return list;
        }

        public List<DtoLocations> selectAll(string lang)
        {
            var list = new List<DtoLocations>();

            list = (from q in Context.locations.AsNoTracking().Where(x => x.parentId == null)

                    select new DtoLocations
                    {
                        id = q.id,
                        description = q.description,
                        code = q.code,
                        parentId = q.parentId,
                        isPallta = q.isPallta,
                        serial = q.serial
                    }).ToList();
            return list;
        }

        public List<DtoLocations> selectAllPallta(string lang)
        {
            var list = new List<DtoLocations>();

            list = (from q in Context.locations.AsNoTracking().Where(x => x.parentId != null)

                    select new DtoLocations
                    {
                        id = q.id,
                        description = q.description,
                        code = q.code,
                        parentId = q.parentId,
                        isPallta = q.isPallta,
                        serial = q.serial
                    }).ToList();
            return list;
        }

        public int getNextArrange()
        {
            int arrange = 0;
            var serial = (from q in Context.locations.AsNoTracking().Where(x => x.isPallta == false && x.parentId == null)
                          select q.serial).ToList().Max();
            if (serial != null)
            {
                arrange = Convert.ToInt32(serial);
            }

            return arrange + 1;
        }

        public int getNextArrangePallta()
        {
            int arrange = 0;
            var serial = (from q in Context.locations.AsNoTracking().Where(x => x.isPallta == true && x.parentId != null)
                        select q.serial).ToList().Max();
            if (serial != null)
            {
                arrange = Convert.ToInt32(serial);
            }

            return arrange + 1;
        }




        public DtoLocations selectPalltaById(int id, string lang)
        {
            throw new NotImplementedException();
        }
    }
}

