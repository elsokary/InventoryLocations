using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;


namespace Inventory_Model.DTOModel
{

    public class DtoCashier
    {
        public string enteredByName { get; set; }
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
        public string customerName
        {
            get;
            set;
        }
        public int? customerId
        {
            get;
            set;
        }
        public string telephone
        {
            get;
            set;
        }

        public int? openedBy
        {
            get;
            set;
        }

        public DateTime? date
        {
            get;
            set;
        }

        public int? serial
        {
            get;
            set;
        }

        public TimeSpan? time
        {
            get;
            set;
        }

        public double? total
        {
            get;
            set;
        }
          
        public string paymentType
        {
            get;
            set;
        }

        public string transactionType { get; set; }
        public List<DtoCashierItems> listItems { get; set; }
    }

}

