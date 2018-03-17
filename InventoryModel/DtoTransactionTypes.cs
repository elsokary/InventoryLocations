using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;


namespace InventoryModel
{

    public class DtoTransactionTypes
    {
        public int id
        {
            get;
            set;
        }
        public int locationId
        {
            get;
            set;
        }
        public string title
        {
            get;
            set;
        }

        public int? action
        {
            get;
            set;
        }

        public string notes
        {
            get;
            set;
        }
    }
    public enum transactionsType
    {
        transfer = 1,
        reverse = 2,
        purchase = 3,
        sale = 4,
        refund = 5,
        inventory = 6,
        store = 7
    }
}

