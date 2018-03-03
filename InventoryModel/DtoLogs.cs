using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace InventoryModel
{
    public class DtoLogs
    {
        public int id { get; set; }
        public string action { get; set; }
        public Nullable<System.DateTime> actionDate { get; set; }
        public string actionBy { get; set; }
        public string docName { get; set; }
        public int? docId { get; set; }
        public string descriptionValues { get; set; }
    }
}
