using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace InventoryModel
{

    public class DtoItemsdecription
    {
        public int id
        {
            get;
            set;
        }

        public string subject
        {
            get;
            set;
        }

        public int? categoryId
        {
            get;
            set;
        }

        public int? categoryChildId
        {
            get;
            set;
        }
        public string categoryName
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

        public int? supplierId
        {
            get;
            set;
        }
        public int? quantity
        {
            get;
            set;
        }

        public string supplierName
        {
            get;
            set;
        }

        public string code { get; set; }

    }

}

