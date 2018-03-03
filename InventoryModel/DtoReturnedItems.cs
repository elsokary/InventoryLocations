using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;


namespace InventoryModel
{

    public class DtoReturnedItems
    {
        public int id
        {
            get;
            set;
        }

        public int returnedId
        {
            get;
            set;
        }

        public string returnedName
        {
            get;
            set;
        }
        public string description
        {
            get;
            set;
        }

        public int branchId
        {
            get;
            set;
        }

        public int? supplierId
        {
            get;
            set;
        }
        public string branchName
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

        public double? quantity
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

        public double? total
        {
            get;
            set;
        }
        public string resourceCode { get; set; }
        public string notes
        {
            get;
            set;
        }
    }

}

