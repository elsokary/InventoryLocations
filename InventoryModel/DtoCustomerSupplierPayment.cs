using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;


namespace InventoryModel
{

    public class DtoCustomerSupplierPayment
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

        public int? docId
        {
            get;
            set;
        }
        public int? bankId
        {
            get;
            set;
        }

        public int? customerId
        {
            get;
            set;
        }
        public int? categoryId
        {
            get;
            set;
        }

        public int? supplierId
        {
            get;
            set;
        }

        public string customerName
        {
            get;
            set;
        }

        public string supplierName
        {
            get;
            set;
        }
        public string cateoryName
        {
            get;
            set;
        }

        public double? total { get; set; }
        public string docName
        {
            get;
            set;
        }

        public int? supplierCode { get; set; }
        public int? customerCode { get; set; }
        public int? docType
        {
            get;
            set;
        }

        public int? paymentType
        {
            get;
            set;
        }

        public string paymentTypeTitle
        {
            get;
            set;
        }

        public double? debit
        {
            get;
            set;
        }

        public double? credit
        {
            get;
            set;
        }
        public double? amount
        {
            get;
            set;
        }

        public DateTime? date
        {
            get;
            set;
        }

        public string chequeNo
        {
            get;
            set;
        }

        public DateTime? chequeDate
        {
            get;
            set;
        }
        public DateTime? dueDate
        {
            get;
            set;
        }

        public string description
        {
            get;
            set;
        }

        public string serial
        {
            get;
            set;
        }

        public int createdBy
        {
            get;
            set;
        }

        public DateTime? createdDate
        {
            get;
            set;
        }

        public int LastEditBy
        {
            get;
            set;
        }

        public DateTime? LastEditDate
        {
            get;
            set;
        }

        public int deletedBy
        {
            get;
            set;
        }
         
        public DateTime? deletedDate
        {
            get;
            set;
        }
    }


    public class DtoSupplierPaymentrpt
    {
        public int id
        {
            get;
            set;
        }
         
         
        public string supplierName
        {
            get;
            set;
        }

        public double? total { get; set; }

        public int? supplierCode { get; set; }
        public int? categoryName { get; set; }
       
        public string paymentTypeTitle
        {
            get;
            set;
        }
        public string chequeNo
        {
            get;
            set;
        }
        public DateTime? dueDate
        {
            get;
            set;
        }

        
    }


    public class DtoAccountStatments
    {
        public int id
        {
            get;
            set;
        }

        public string supplierName
        {
            get;
            set;
        }
        public string customerName
        {
            get;
            set;
        }

        public string refNo
        {
            get;
            set;
        }
        public double? debit { get; set; }
        public double? credit { get; set; }
        public double? balanceDebit { get; set; }
        public double? balanceCredit { get; set; }

        public string serial { get; set; }
        public int? invoiceNumber { get; set; }
        public DateTime? date { get; set; }
         


    }

    public class DtoCustomersTotals
    { 

        public string supplierName
        {
            get;
            set;
        }
        public string customerName
        {
            get;
            set;
        }

        public int? customerCode
        {
            get;
            set;
        }
        public int? supplierCode
        {
            get;
            set;
        }
        public double? totalSales { get; set; }
        public double? totalReturnedInvoices { get; set; }
        public double? totalPayments { get; set; }
        public double? balance { get; set; }
        public double? net { get; set; } 

    }
}

