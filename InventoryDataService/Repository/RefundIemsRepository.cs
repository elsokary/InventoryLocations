
using Interface.IDataService;
using InventoryContext.Context;
using InventoryDataService.Repository;
using Inventory_Model.DTOModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;



namespace DataServices.Repository
{
    public class RefundIemsRepository : GenericRepository<favStoreEntities, refund_iems>, IRefundIemsRepository
    {
        public List<DtoRefundIems> selectAllById(int refundId, int branchId)
        {
            var list = new List<DtoRefundIems>();

            list = (from q in Context.refund_iems.AsNoTracking()
                    where q.refundId == refundId && q.branchId == branchId
                    select new DtoRefundIems
                    {
                        refundId = q.refundId,
                        itemName = q.itemsDecription.subject,
                        resourceCode = q.itemsDecription.code,
                        branchId = q.branchId,
                        itemId = q.itemId,
                        quantity = q.quantity,
                        price = q.price,
                        total = q.total,
                    }).ToList();
            return list;
        }

        public DtoRefundIems selectById(int id, string lang)
        {
            var list = new DtoRefundIems();

            list = (from q in Context.refund_iems.AsNoTracking()
                    where q.id == id
                    select new DtoRefundIems
                    {
                        refundId = q.refundId,
                        branchId = q.branchId,
                        itemId = q.itemId,
                        quantity = q.quantity,
                        price = q.price,
                        total = q.total,
                    }).FirstOrDefault();

            return list;
        }
    }
}

