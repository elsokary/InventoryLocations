using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace InventoryModel
{
    public class DtoSalesAnalysis
    {
        public string code { get; set; }
        public string description { get; set; }
        public DateTime? recievedDate { get; set; }
        public int? startDuration { get; set; }
        public double? netRecieved { get; set; }
        public double?  transfered { get; set; }
        public double? sales { get; set; }
        public double? creditQuantity { get; set; }
        public double? salesQuantity { get; set; }
         
        public double? salesValue { get; set; }
        public double? creditValue { get; set; }
        public double? avgCost { get; set; }
        public double? total { get; set; }
    }
}
