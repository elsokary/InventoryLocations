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
    
    public partial class account
    {
        public account()
        {
            this.accounts1 = new HashSet<account>();
            this.accounts11 = new HashSet<account>();
            this.branches = new HashSet<branch>();
            this.cashiers = new HashSet<cashier>();
            this.cashiers1 = new HashSet<cashier>();
            this.customers = new HashSet<customer>();
            this.Groups = new HashSet<Group>();
            this.invoices = new HashSet<invoice>();
            this.invoices1 = new HashSet<invoice>();
            this.itemsDecriptions = new HashSet<itemsDecription>();
            this.refunds = new HashSet<refund>();
            this.suppliers = new HashSet<supplier>();
            this.supplyOrders = new HashSet<supplyOrder>();
            this.supplyOrders1 = new HashSet<supplyOrder>();
        }
    
        public int id { get; set; }
        public string userName { get; set; }
        public string contactName { get; set; }
        public string passWord { get; set; }
        public string address { get; set; }
        public string phone { get; set; }
        public string email { get; set; }
        public Nullable<int> groupId { get; set; }
        public Nullable<int> supervisorId { get; set; }
        public string userType { get; set; }
        public Nullable<int> branchId { get; set; }
        public Nullable<System.TimeSpan> loggedTime { get; set; }
        public Nullable<System.TimeSpan> shiftIn { get; set; }
        public Nullable<System.TimeSpan> shiftOut { get; set; }
        public Nullable<int> deletedBy { get; set; }
    
        public virtual branch branch { get; set; }
        public virtual ICollection<account> accounts1 { get; set; }
        public virtual account account1 { get; set; }
        public virtual ICollection<account> accounts11 { get; set; }
        public virtual account account2 { get; set; }
        public virtual Group Group { get; set; }
        public virtual ICollection<branch> branches { get; set; }
        public virtual ICollection<cashier> cashiers { get; set; }
        public virtual ICollection<cashier> cashiers1 { get; set; }
        public virtual ICollection<customer> customers { get; set; }
        public virtual ICollection<Group> Groups { get; set; }
        public virtual ICollection<invoice> invoices { get; set; }
        public virtual ICollection<invoice> invoices1 { get; set; }
        public virtual ICollection<itemsDecription> itemsDecriptions { get; set; }
        public virtual ICollection<refund> refunds { get; set; }
        public virtual ICollection<supplier> suppliers { get; set; }
        public virtual ICollection<supplyOrder> supplyOrders { get; set; }
        public virtual ICollection<supplyOrder> supplyOrders1 { get; set; }
    }
}
