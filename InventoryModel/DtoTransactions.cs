using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;


namespace InventoryModel
{

    public class DtoTransactions
    {
        public int branchId
        {
            get;
            set;
        }

        public int locationItemId
        {
            get;
            set;
        }

        public int itemId
        {
            get;
            set;
        }

        public int palltaId
        {
            get;
            set;
        }

        public int palltaType
        {
            get;
            set;
        }

        public string resourceCode
        {
            get;
            set;
        }
        public string description
        {
            get;
            set;
        }
        public int? cost
        {
            get;
            set;
        }
        public int? quantity
        {
            get;
            set;
        }
        public int price
        {
            get;
            set;
        }
        public int? editById
        {
            get;
            set;
        }
        public string comment
        {
            get;
            set;
        }
        public bool? deleted
        {
            get;
            set;
        }
        public DateTime? editDate
        {
            get;
            set;
        }
    }
}

