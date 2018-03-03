using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;


namespace Inventory_Model.DTOModel
{

    public class DtoRefunds
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

        public int? openedBy
        {
            get;
            set;
        }

        public string openedByName
        {
            get;
            set;
        }

        public int? serial
        {
            get;
            set;
        }

        public double? total
        {
            get;
            set;
        }

        public DateTime? date
        {
            get;
            set;
        }
         
        public TimeSpan? time
        {
            get;
            set;
        }
        public List<DtoRefundIems> listItems { get; set; }
    }

}

