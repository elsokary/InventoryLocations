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
    
    public partial class transaction
    {
        public int id { get; set; }
        public int branchId { get; set; }
        public int locationItemId { get; set; }
        public int itemId { get; set; }
        public int palltaId { get; set; }
        public int palltaType { get; set; }
        public string resourceCode { get; set; }
        public string description { get; set; }
        public Nullable<double> cost { get; set; }
        public Nullable<int> quantity { get; set; }
        public Nullable<double> price { get; set; }
        public Nullable<double> total { get; set; }
        public Nullable<int> editById { get; set; }
        public Nullable<System.DateTime> editDate { get; set; }
        public string comment { get; set; }
        public Nullable<bool> deleted { get; set; }
    
        public virtual itemsDecription itemsDecription { get; set; }
        public virtual location_items location_items { get; set; }
        public virtual location location { get; set; }
        public virtual transactionType transactionType { get; set; }
    }
}
