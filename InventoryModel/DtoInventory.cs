using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;


namespace InventoryModel
{

    public class DtoInventory
    {
        public int id
        {
            get;
            set;
        }

        public int? itemId
        {
            get;
            set;
        }

        public string itemName
        {
            get;
            set;
        }

        public string resourceCode
        {
            get;
            set;
        }

        public string department
        {
            get;
            set;
        }

        public string description
        {
            get;
            set;
        }

        public double? cost
        {
            get;
            set;
        }
        public double? price
        {
            get;
            set;
        }

        public double? lastCost
        {
            get;
            set;
        }

        public double? avgCost
        {
            get;
            set;
        }
        public double? totalCost
        {
            get;
            set;
        }

        public int? quantity
        {
            get;
            set;
        }
        public int? variance
        {
            get;
            set;
        }

        public int? branchId
        {
            get;
            set;
        }

        public string branchName
        {
            get;
            set;
        }
        public string supplierName
        {
            get;
            set;
        }
        public string categoryName
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
        public int? categoryId
        {
            get;
            set;
        }

        public int? actualQuantity
        {
            get;
            set;
        }
    }

}
