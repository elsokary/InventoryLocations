using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace InventoryModel
{
   public class DtoSupplliersStatus
   {
       public int? supplierCode { get; set; }
       public string supplierName { get; set; }
       public double? purcahse { get; set; }
       public double? returnedPurchase { get; set; }
       public double? diffPurchase { get; set; }
       public double? sales { get; set; }
       public double? returnedSales { get; set; }
       public double? diffSales { get; set; }
       public double? payment { get; set; }
       public double? credit { get; set; }
       public double? netPurchase { get; set; }
       public double? netSales { get; set; }

    }
}
