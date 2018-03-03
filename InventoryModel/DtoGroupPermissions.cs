using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;


namespace InventoryModel
{

    public class DtoGrouppermissions
    {
        public int id
        {
            get;
            set;
        }

        public int? groupId
        {
            get;
            set;
        }

        public string groupName
        {
            get;
            set;
        }

        public int permissionCode
        {
            get;
            set;
        }

        public bool? value
        {
            get;
            set;
        }
    }

}

