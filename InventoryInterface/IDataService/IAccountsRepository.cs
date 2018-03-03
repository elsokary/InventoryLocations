using System;
using InventoryContext.Context;
using InventoryModel;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace InventoryInterface.IDataService
{
    public interface IAccountsRepository : IGenericRepository<account>
    {
        List<DtoAccounts> selectAll(string lang);
        object GetUserPrimeData(string userType, int groupId, int accountId, string userName);
        DtoAccounts selectById(int id, string lang);
    }
}

