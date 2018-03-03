using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;


namespace InventoryModel
{

    public class DtoInvoiceItems
    {
        public int id
        {
            get;
            set;
        }

        public int invoiceId
        {
            get;
            set;
        }

        public string invoiceName
        {
            get;
            set;
        }
        public string resourceCode
        {
            get;
            set;
        }

        public int branchId
        {
            get;
            set;
        }

        public string branchName
        {
            get;
            set;
        }
        public string categoryName
        {
            get;
            set;
        }
        public string description
        {
            get;
            set;
        }

        public int itemId
        {
            get;
            set;
        }

        public string itemName
        {
            get;
            set;
        }

        public double? cost
        {
            get;
            set;
        }
        public double? balance
        {
            get;
            set;
        }
        public double? tax
        {
            get;
            set;
        }
        public double? taxValue
        {
            get;
            set;
        }
        public double? totalWithTax
        {
            get;
            set;
        }

        public double? price
        {
            get;
            set;
        }

        public double? quantity
        {
            get;
            set;
        }
        public double? actualQuantity
        {
            get;
            set;
        }
        public double? actualQnty
        {
            get;
            set;
        }

        public double? total
        {
            get;
            set;
        }

        public double? totalPrice
        {
            get;
            set;
        }
        public string notes
        {
            get;
            set;
        }

        public int? supplierId { get; set; }
        public DateTime? invoiceDate { get; set; }
        public DateTime? creationDate { get; set; }
        public string supplierName { get; set; }
        public string refNo { get; set; }
        public string code
        {
            get;
            set;
        } 
    }
    public class DtoItems
    {
        public string supplierName { get; set; }
        public string code { get; set; }
        public string invoiceNo { get; set; }
        public double? cost { get; set; }
        public double? price { get; set; }
        public DateTime? date { get; set; }
    }
}

