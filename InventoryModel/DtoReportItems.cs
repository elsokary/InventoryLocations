using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace InventoryModel
{
    public class DtoReportItems
    {
        public string resourceCode { get; set; }
        public string description { get; set; }
        public double? importQnty { get; set; }
        public double? executeQnty { get; set; }
        public double? credit { get; set; }
        public double? cost { get; set; }
        public double? price { get; set; }
        public double? totalCost { get; set; }
        public double? totalQuantity { get; set; }
        public double? totalPrice { get; set; }
        public DateTime? lastRecievedDate { get; set; }
        public DateTime? lastSaleDate { get; set; }
        public double? lastQuantity { get; set; }
        public string suplierName { get; set; }
        public string customerName { get; set; }
        public int suplierId { get; set; }
    }
}
