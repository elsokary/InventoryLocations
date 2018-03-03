using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace InventoryInterface.IDataService
{
    public class DtoInvoiceItemsReport
    {
        public int id { get; set; }
        public int invoiceId { get; set; }
        public int branchId { get; set; }
        public int itemId { get; set; }
        public double cost { get; set; }
        public double price { get; set; }
        public double quantity { get; set; }
        public double total { get; set; }
        public DateTime invoiceDate { get; set; }
        public string branchName { get; set; }
        public DateTime creationDate { get; set; }
        public string refNo { get; set; }
        public string supplierName { get; set; }
        public string code { get; set; }
        public string description { get; set; }
        public string notes { get; set; }
    }
}
