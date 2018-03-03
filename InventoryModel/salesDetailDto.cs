using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace InventoryModel
{
    public class salesDetailDto
    {
        public string contactName { get; set; }
        public string customerName { get; set; }
        public string branchName { get; set; }
        public string paymentType { get; set; }
        public DateTime? date { get; set; }
        public TimeSpan? checkIn { get; set; }
        public double? cash { get; set; }
        public double? visa { get; set; }
        public int? serial { get; set; }
        public double? netSales { get; set; }
        public double? returneds { get; set; }
        public double? total { get; set; }
    }
    public class DtobBarChart {
        public string monthName { get; set; }
        public double? total { get; set; }
        public double? PreviousTotal { get; set; }
        public List<double?> values { get; set; }
        public List<string> categories { get; set; }
    }
}
