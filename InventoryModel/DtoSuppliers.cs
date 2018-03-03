using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace InventoryModel
{

    public class DtoSuppliers
    {
        public int id
        {
            get;
            set;
        }

        public int? code
        {
            get;
            set;
        }

        public string name
        {
            get;
            set;
        }

        public string email
        {
            get;
            set;
        }

        public string phone
        {
            get;
            set;
        }

        public string address
        {
            get;
            set;
        }
         
        public List<int?> selectedAgents { get; set; }
        public List<int?> selectedCategory { get; set; }
    }

}

