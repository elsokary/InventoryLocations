using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace InventoryModel
{
   public class DtoItemSelect
   {
       public int id { get; set; }
       public string subject { get; set; }
       public double? price { get; set; }
       public double? cost { get; set; }
       public string code { get; set; }
       public string name { get; set; }       
    }
}
