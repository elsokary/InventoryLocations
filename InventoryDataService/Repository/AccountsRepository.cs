using InventoryContext.Context;
using InventoryModel;
using InventoryInterface.IDataService;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace InventoryDataService.Repository
{
    public class AccountsRepository : GenericRepository<favStoreEntities, account>, IAccountsRepository
    {
        private readonly IGrouppermissionsRepository _accountsPermissionRepository;
        private readonly IBranchesRepository _branches;
        public AccountsRepository()
        {
            _accountsPermissionRepository = new GrouppermissionsRepository();
            _branches = new BranchesRepository();
        }

        public List<DtoAccounts> selectAll(string lang)
        {
            var list = new List<DtoAccounts>();

            list = (from q in Context.accounts.AsNoTracking()
                    where q.deletedBy == null && q.userType != "company"
                    select new DtoAccounts
                    {
                        id = q.id,
                        userName = q.userName,
                        address = q.address,
                        phone = q.phone,
                        email = q.email,
                        contactName = q.contactName,
                        groupName = q.Group.groupName,
                        supervisorName = q.account2.contactName,
                        branchName = q.branch.name,
                        userType = q.userType,
                    }).ToList();
            return list;
        }

        public DtoAccounts selectById(int id, string lang)
        {
            var list = new DtoAccounts();
            if (lang == "en")
            {
                list = (from q in Context.accounts
                        where q.id == id
                        select new DtoAccounts
                        {
                            id = q.id,
                            userName = q.userName,
                            passWord = q.passWord,
                            address = q.address,
                            branchId = q.branchId,
                            phone = q.phone,
                            email = q.email,
                            contactName = q.contactName,
                            groupId = q.groupId,
                            supervisorId = q.supervisorId,
                            userType = q.userType,
                        }).FirstOrDefault();
            }
            else
            {
                list = (from q in Context.accounts
                        where q.id == id
                        select new DtoAccounts
                        {
                            id = q.id,
                            userName = q.userName,
                            passWord = q.passWord,
                            address = q.address,
                            phone = q.phone,
                            branchId = q.branchId,
                            email = q.email,
                            contactName = q.contactName,
                            groupId = q.groupId,
                            supervisorId = q.supervisorId,
                            userType = q.userType,
                        }).FirstOrDefault();
            } return list;
        }
        public object GetUserPrimeData(string userType, int groupId, int accountId, string userName)
        {
            var permissions = new List<int?>();

            var contactName = "Administrator";

            var branchName = "Primary";

            var phone = "0";

            var branchId = 0;

            var isCompany = false;
            var isAdmin = false;

            var accountObj = FindBy(x => x.id == accountId).SingleOrDefault();

            var branchObj = _branches.FindBy(x => x.id == accountObj.branchId).SingleOrDefault();
            if (branchObj != null)
            {
                branchName = branchObj.name;
                branchId = branchObj.id;
                phone = branchObj.phone;
            }
            if (userType.Equals("user") || userType.Equals("isCashier"))
            {
                permissions = _accountsPermissionRepository.permissionWithNumbersByGroupIdArray(groupId);

            }
            else if (userType.Equals("company"))
            {
                isCompany = true;
                isAdmin = true;
            }


            contactName = userName;

            var primeData = new
            {
                groupId = groupId,
                accountId = accountId,
                userType = userType,

                branchId = branchId,
                Permissions = permissions,
                isCompany = isCompany,
                branchName = branchName,
                contactName = contactName,
                phone = phone,
                isAdmin = isAdmin,
                profilePath = "downloads/contacts/photo/img_s_" + accountId + ".gif"
            };

            return primeData;
        }

    }
}

