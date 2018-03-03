using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace InventoryModel
{
    public class DtoRetailSetting
    {
        public int id { get; set; }

        public int branchId { get; set; }

        public string branchName { get; set; }

        public string categoryName { get; set; }

        public Nullable<int> categoryId { get; set; }

        public Nullable<int> days { get; set; }
        public List<int> selectedValues { get; set; }

    }
}
