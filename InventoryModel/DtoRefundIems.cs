using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;


namespace Inventory_Model.DTOModel
{

    public class DtoRefundIems
    {
        public int id
        {
            get;
            set;
        }

        public int refundId
        {
            get;
            set;
        }

        public string refundName
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

        public double? quantity
        {
            get;
            set;
        }

        public double? price
        {
            get;
            set;
        }

        public double? cost
        {
            get;
            set;
        }

        public double? total
        {
            get;
            set;
        }
    }

}

