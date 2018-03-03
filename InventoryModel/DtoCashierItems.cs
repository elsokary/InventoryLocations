using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;


namespace Inventory_Model.DTOModel
{

    public class DtoCashierItems
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
        public string phone
        {
            get;
            set;
        }
        public string description
        {
            get;
            set;
        }
        public string paymentType
        {
            get;
            set;
        }
        public string address
        {
            get;
            set;
        }
  
        public string customerName
        {
            get;
            set;
        }

        public int cashierId
        {
            get;
            set;
        }

        public string cashierName
        {
            get;
            set;
        }

        public int itemId
        {
            get;
            set;
        }
        public int serial
        {
            get;
            set;
        }

        public string itemName
        {
            get;
            set;
        }

        public double quantity
        {
            get;
            set;
        }

        public double price
        {
            get;
            set;
        }

        public double total
        {
            get;
            set;
        }
        public double invoiceTotal
        {
            get;
            set;
        }
        public DateTime date
        {
            get;
            set;
        }
        public DateTime purchaseDate
        {
            get;
            set;
        }

        public string resourceCode { get; set; }
        public string code { get; set; }  
    }

}

