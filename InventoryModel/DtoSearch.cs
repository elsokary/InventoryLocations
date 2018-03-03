using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace InventoryModel
{
    public class DtoSearch
    {
        public int? branchId { get; set; }
        public int? categoryId { get; set; }
        public int? itemId { get; set; }
        public int? supplierId { get; set; }
        public int? customerId { get; set; }
        public List<int> suppliersList { get; set; }
        public List<int> paymentTypeList { get; set; }
        public DateTime? startDate { get; set; }
        public DateTime? finishDate { get; set; }
        public DateTime? prevoiuseStartDate { get; set; }
        public DateTime? prevoiuseFinishDate { get; set; }
        public int pageSize { get; set; }
        public int pageNumber { get; set; }
    }
}
