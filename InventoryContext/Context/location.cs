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
    
    public partial class location
    {
        public location()
        {
            this.location_items = new HashSet<location_items>();
            this.transactions = new HashSet<transaction>();
        }
    
        public int id { get; set; }
        public string description { get; set; }
        public string code { get; set; }
        public Nullable<int> parentId { get; set; }
        public Nullable<bool> isPallta { get; set; }
        public Nullable<int> serial { get; set; }
    
        public virtual ICollection<location_items> location_items { get; set; }
        public virtual ICollection<transaction> transactions { get; set; }
    }
}
