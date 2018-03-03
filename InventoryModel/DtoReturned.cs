using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;


namespace InventoryModel
{

    public class DtoReturned
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

        public int? supplierId
        {
            get;
            set;
        }

        public string supplierName
        {
            get;
            set;
        }

        public DateTime? returnedInvoiceDate
        {
            get;
            set;
        }
        public DateTime? creationDate
        {
            get;
            set;
        }
        public int? refNo
        {
            get;
            set;
        }
        public int? openedBy
        {
            get;
            set;
        }
        public string enteredByName { get; set; }
        public int? deletedBy
        {
            get;
            set;
        }

        public string deletedByUserName
        {
            get;
            set;
        }

        public DateTime? deletedDate
        {
            get;
            set;
        }

        public List<DtoReturnedItems> listItems { get; set; }
    }

}

