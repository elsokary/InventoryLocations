using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;


namespace InventoryModel
{

    public class DtoInventorylog
    {
        public int id
        {
            get;
            set;
        }
        public DateTime? creationDate { get; set; }
        public int itemId
        {
            get;
            set;
        }
        public int alertDays
        {
            get;
            set;
        }

        public string itemName
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

        public double? price
        {
            get;
            set;
        }

        public int InventoryId
        {
            get;
            set;
        }

        public int serialNo
        {
            get;
            set;
        }

        public string InventoryName
        {
            get;
            set;
        }

        public int? quantity
        {
            get;
            set;
        }

        public double? cost
        {
            get;
            set;
        }
        public string resourceCod { get; set; }
        public string resourceCode { get; set; }
        public double? costOfTax
        {
            get;
            set;
        }

        public int? transactionId
        {
            get;
            set;
        }

        public string transactionName
        {
            get;
            set;
        }

        public int? fromBranchId
        {
            get;
            set;
        }

        public string fromBranchName
        {
            get;
            set;
        }

        public int? toBranchId
        {
            get;
            set;
        }

        public string toBranchName
        {
            get;
            set;
        }

        public string reason
        {
            get;
            set;
        }

        public double? total
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
        public int?  transNo
        {
            get;
            set;
        }
    }
    public class DtoBrandBalance {

        public string supplierName
        {
            get;
            set;
        }
        public int? quantity
        {
            get;
            set;
        }

        public double? cost
        {
            get;
            set;
        }
        public string resourceCode { get; set; }
        public string description
        {
            get;
            set;
        }

        public string categoryName
        {
            get;
            set;
        }
        public double? price
        {
            get;
            set;
        }
        public double? total
        {
            get;
            set;
        }
        public double? totalCost
        {
            get;
            set;
        }
    }

}

