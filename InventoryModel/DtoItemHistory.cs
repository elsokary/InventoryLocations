using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace InventoryModel
{
    public class DtoItemHistory
    {
        public int id { get; set; }

        public Nullable<int> inventoryId { get; set; }

        public int branchId { get; set; }

        public int categoryId { get; set; }

        public int itemId { get; set; }
        public string description { get; set; }
        public string resourceCode { get; set; }
        public Nullable<double> price { get; set; }

        public Nullable<double> discount { get; set; }

        public Nullable<System.DateTime> fromDate { get; set; }
        public DateTime? finishDate { get; set; }
        public string comment { get; set; }

        public Nullable<int> openedBy { get; set; }
        public string openedByName { get; set; }
        public string branchName { get; set; }
        public string supplierName { get; set; }
        public Nullable<System.DateTime> creationDate { get; set; }

    }
}
