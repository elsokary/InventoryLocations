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
        public int? palltaId
        {
            get;
            set;
        }
        public int? palltaTypeId
        {
            get;
            set;
        }
        public int? locationItemId
        {
            get;
            set;
        }
         
        public string locationName
        {
            get;
            set;
        }

        public string locationType
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

        public double? cost
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

        public double? total
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

