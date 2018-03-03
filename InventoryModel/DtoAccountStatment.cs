using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace InventoryModel
{
    public class DtoAccountStatment
    {
        public DateTime? date { get; set; }
        public string transactionType { get; set; }
        public string description { get; set; }
        public string refDocSupplier { get; set; }
        public int? refDoc { get; set; }
        public double? credit { get; set; }
        public double? debit { get; set; }
        public double? balance { get; set; }
    }
}
