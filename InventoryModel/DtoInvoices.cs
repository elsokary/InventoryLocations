using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;


namespace InventoryModel
{

    public class DtoInvoices
    {
        public int id
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

        public int? supplierId
        {
            get;
            set;
        }

        public string supplierName
        {
            get;
            set;
        }

        public DateTime? invoiceDate
        {
            get;
            set;
        }

        public string refNo
        {
            get;
            set;
        }

        public int? serialNo
        {
            get;
            set;
        }
        public string userName { get; set; }
        public double? discountCash
        {
            get;
            set;
        }

        public double? discountCommercial
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
        public double? extraExpenses
        {
            get;
            set;
        }

        public double? totalInvoice
        {
            get;
            set;
        }

        public double? total
        {
            get;
            set;
        }

        public int? openedBy
        {
            get;
            set;
        }

        public DateTime? creationDate
        {
            get;
            set;
        }

        public int? deletedBy
        {
            get;
            set;
        }

        public string deletedByUserName
        {
            get;
            set;
        }

        public DateTime? deletedDate
        {
            get;
            set;
        }
        public List<DtoInvoiceItems> items { get; set; }
    }

}

