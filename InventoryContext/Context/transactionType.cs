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
    
    public partial class transactionType
    {
        public transactionType()
        {
            this.transactionsHistories = new HashSet<transactionsHistory>();
            this.location_items = new HashSet<location_items>();
            this.transactions = new HashSet<transaction>();
        }
    
        public int id { get; set; }
        public string title { get; set; }
        public Nullable<int> action { get; set; }
        public string notes { get; set; }
    
        public virtual ICollection<transactionsHistory> transactionsHistories { get; set; }
        public virtual ICollection<location_items> location_items { get; set; }
        public virtual ICollection<transaction> transactions { get; set; }
    }
}
