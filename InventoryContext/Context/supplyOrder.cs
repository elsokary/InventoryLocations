//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace InventoryContext.Context
{
    using System;
    using System.Collections.Generic;
    
    public partial class supplyOrder
    {
        public supplyOrder()
        {
            this.supplyOrders_items = new HashSet<supplyOrders_items>();
        }
    
        public int id { get; set; }
        public int branchId { get; set; }
        public Nullable<int> supplierId { get; set; }
        public Nullable<System.DateTime> OrderDate { get; set; }
        public Nullable<int> CategoryId { get; set; }
        public Nullable<int> serialNo { get; set; }
        public Nullable<double> total { get; set; }
        public Nullable<int> openedBy { get; set; }
        public Nullable<System.DateTime> creationDate { get; set; }
        public Nullable<int> deletedBy { get; set; }
        public Nullable<System.DateTime> deletedDate { get; set; }
    
        public virtual account account { get; set; }
        public virtual account account1 { get; set; }
        public virtual branch branch { get; set; }
        public virtual ICollection<supplyOrders_items> supplyOrders_items { get; set; }
    }
}