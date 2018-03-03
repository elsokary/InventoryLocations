using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace InventoryModel
{
    public class DtoComparisonSales
    {
        public string code { get; set; }
        public string itemName { get; set; }
        public double? prevoiuseValue { get; set; }
        public double? currentValue { get; set; }
        public double? varianceValue { get; set; }
        public double? percentage { get; set; }
    }

}
