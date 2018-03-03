using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;


namespace InventoryModel
{

    public class DtoCategories
    {
        public int id
        {
            get;
            set;
        }

        public string code
        {
            get;
            set;
        }

        public string name
        {
            get;
            set;
        }

        public int? parentId
        {
            get;
            set;
        }
        public int? arrange
        {
            get;
            set;
        }
        public string serial
        {
            get;
            set;
        }
        public string prefix
        {
            get;
            set;
        }
        public int? alertDays
        {
            get;
            set;
        }
        public bool? visible { get; set; }
        public string parentName
        {
            get;
            set;
        }

        public List<DtoCategories> trees
        {
            get;
            set;
        }
    }

}

