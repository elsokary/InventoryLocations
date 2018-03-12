using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;


namespace InventoryModel
{

    public class DtoLocations
    {
        public int id
        {
            get;
            set;
        }
        public string description
        {
            get;
            set;
        }
        public string location
        {
            get;
            set;
        }
        public string code
        {
            get;
            set;
        }
        public int? parentId
        {
            get;
            set;
        }
        public int? serial
        {
            get;
            set;
        }

        public bool? isPallta
        {
            get;
            set;
        }

    }

    public class assignItemToLocation
    {
        public int locationId
        {
            get;
            set;
        }
        public List<int> itemIds
        {
            get;
            set;
        }
    }

}

