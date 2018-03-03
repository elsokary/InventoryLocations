using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace InventoryModel
{
    public class DtoExpenses
    {
        public int id { get; set; }

        public int branchId { get; set; }

        public string subject { get; set; }

        public Nullable<System.DateTime> date { get; set; }

        public Nullable<int> expensetpeId { get; set; }
        public string   expenseType{ get; set; }

        public Nullable<double> value { get; set; }

        public Nullable<int> toAccountId { get; set; }

        public Nullable<int> createdBy { get; set; }
        public string createBy { get; set; }

        public DateTime? createdDate { get; set; } 
        public string notes { get; set; }
    }
}
