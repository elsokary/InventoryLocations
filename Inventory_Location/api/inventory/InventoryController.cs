
using Interface.IDataService;
using Inventory_Security;
using Inventory_Security.SecurityModel;
using InventoryContext.Context;
using InventoryDataService.Repository;
using InventoryInterface.IDataService;
using InventoryModel;
using Inventory_Model.DTOModel;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;

namespace Inventory_Location.api.inventory
{
    [RoutePrefix("api/InventoryLocation")]
    public class InventoryLocationController : ApiController
    {

        private readonly ISupplyOrderRepository _supplyOrder;
        private readonly ISupplyOrderItemsRepository _supplyOrderItems;

        private readonly IInvoiceItemsRepository _InvoiceItems;
        private readonly IInvoicesRepository _Invoices;

        private readonly IInventoryRepository _inventory;
        private readonly ITransactionTypesRepository _transactionType;
        private readonly IInventorylogRepository _inventoryHistory;

        private readonly IAccountsRepository _Accounts;
        private readonly IBranchesRepository _Branches;
        private readonly ICustomersRepository _Customers;
        private readonly IGrouppermissionsRepository _Grouppermissions;
        private readonly IGroupsRepository _Groups;
        private readonly IItemsdecriptionRepository _Itemsdecription;
        private readonly ISuppliersRepository _Suppliers;

        private readonly ICashierRepository _Cashier;
        private readonly IDefaultListRepository _defaultList;
        private readonly ICashierItemsRepository _CashierItems;
        private readonly IRefundIemsRepository _RefundIems;
        private readonly IRefundsRepository _Refunds;

        private readonly string _language;

        private readonly int? _accountId;

        private readonly string _contactName;

        private readonly string _userType;

        private readonly int _groupId;

        private readonly int _branchId;

        private readonly int? defaultBranchId;

        public InventoryLocationController(ISupplyOrderRepository supplyOrder, ISupplyOrderItemsRepository supplyOrderItems,
                                    IDefaultListRepository defaultList,
                                    ICashierRepository Cashier,
                                    ICashierItemsRepository CashierItems,
                                    IRefundIemsRepository RefundIems,
                                    IRefundsRepository Refunds,
                                    IInvoiceItemsRepository InvoiceItems,
                                    IInvoicesRepository Invoices,
                                    IInventoryRepository inventory, ITransactionTypesRepository transactionType,
                                    IInventorylogRepository inventoryHistory,
                                    IAccountsRepository Accounts,
                                    IBranchesRepository Branches,
                                    ICustomersRepository Customers,
                                    IGrouppermissionsRepository Grouppermissions, IGroupsRepository Groups,
                                    IItemsdecriptionRepository Itemsdecription, ISuppliersRepository Suppliers
)
        {

            _supplyOrder = supplyOrder;
            _supplyOrderItems = supplyOrderItems;

            _defaultList = defaultList;
            _Cashier = Cashier;
            _CashierItems = CashierItems;
            _RefundIems = RefundIems;
            _Refunds = Refunds;

            _InvoiceItems = InvoiceItems;
            _Invoices = Invoices;

            _inventory = inventory;
            _inventoryHistory = inventoryHistory;
            _transactionType = transactionType;

            _Customers = Customers;
            _Groups = Groups;
            _Itemsdecription = Itemsdecription;
            _Suppliers = Suppliers;
            _Branches = Branches;
            _Accounts = Accounts;
            _Grouppermissions = Grouppermissions;

            var langHeader = HttpContext.Current.Request.Headers.GetValues("Lang");

            if (langHeader != null)
            {
                _language = langHeader[0];
            }
            var tokenHeader = HttpContext.Current.Request.Headers.GetValues("Authorization");

            if (tokenHeader != null)
            {
                var userToken = tokenHeader[0];

                if (userToken != null)
                {

                    _accountId = TokenManager.GetUserIdentity(userToken);

                    _contactName = TokenManager.GetContactName(userToken);

                    _userType = TokenManager.GetUserType(userToken);

                    _branchId = TokenManager.GetBranchId(userToken);
                    defaultBranchId = TokenManager.GetDefaultBranch(userToken);

                    if (_userType.Equals("user") || _userType.Equals("isCashier"))
                    {
                        _groupId = TokenManager.GetGroupId(userToken);
                    }
                }
            }
        }

        [HttpPost]
        [Route("Login")]
        public IHttpActionResult Login([FromBody] Login user)
        {
            const string errorMessage = "Invalid User Name / PassWord";

            //var pass = PasswordHash.CreateHash("admin");

            var response = new HttpResponseMessage();

            var userObject = _Accounts.FindBy(x => x.userName == user.UserName).FirstOrDefault();

            if (userObject != null)
            {
                if (PasswordHash.ValidatePassword(user.UserPassword, userObject.passWord))
                {
                    var currentTime = (long)(DateTime.Now - new DateTime(1970, 1, 1, 0, 0, 0, 0).ToLocalTime()).TotalSeconds;

                    string secret = TokenManager.Base64Encode(SecurityConstants.KeyForHmacSha256);

                    var payload = new JwtPayload
                    {
                        iss = SecurityConstants.TokenIssuer,
                        contactName = userObject.contactName,
                        uty = userObject.userType,
                        exp = currentTime + 86400,
                        gri = userObject.groupId.ToString(),
                        bci = userObject.branchId == null ? "-1" : userObject.branchId.ToString(),
                        acn = userObject.userName,
                        sub = userObject.id.ToString(),
                        dbi = _Branches.getDefaultBranch().ToString()

                    };

                    userObject.loggedTime = DateTime.Now.TimeOfDay;
                    _Accounts.Edit(userObject);
                    _Accounts.Save();

                    string jwt = TokenManager.EncodeToken(payload, secret);

                    response.StatusCode = HttpStatusCode.OK;

                    response.Headers.Add("Authorization", jwt);

                    return ResponseMessage(response);
                }
                else
                {
                    response.StatusCode = HttpStatusCode.Unauthorized;
                    var errorPassword = "Invalid Password";
                    response.ReasonPhrase = errorPassword;
                }
            }
            else
            {
                response.StatusCode = HttpStatusCode.Unauthorized;

                response.ReasonPhrase = errorMessage;
            }

            return ResponseMessage(response);
        }

        [HttpGet]
        [Route("CheckTokenValidity")]
        public IHttpActionResult CheckTokenValidity()
        {
            if (_accountId != null)
            {
                var primeData = _Accounts.GetUserPrimeData(_userType, (int)_groupId, (int)_accountId, _contactName);

                return Ok(primeData);
            }
            return Ok();
        }
        [HttpGet]
        [Route("GetListType")]
        public IHttpActionResult GetListType()
        {
            var primeData = _defaultList.selectAll(_language);

            return Ok(primeData);
        }

        [HttpGet]
        [Route("GetListTypeByType")]
        public IHttpActionResult GetListTypeByType(string type)
        {
            var primeData = _defaultList.selectbyType(type);

            return Ok(primeData);
        }

        #region Branches

        [AuthorizeUser]
        [HttpGet]
        [Route("GetBranchesForListAll")]
        public IHttpActionResult GetBranchesForListAll()
        {
            var result = new List<DtoBranches>();
            result = _Branches.GetBranchesForList(_language);
            return Ok(result);
        }

        [AuthorizeUser]
        [HttpGet]
        [Route("GetBranchesForList")]
        public IHttpActionResult GetBranchesForList()
        {
            var result = new List<DtoBranches>();
            result = _Branches.GetBranchesForListWithoutCurrent(_language, _branchId);
            return Ok(result);
        }

        [AuthorizeUser]
        [HttpGet]
        [Route("GetTransferBranchesForList")]
        public IHttpActionResult GetTransferBranchesForList()
        {
            var
            result = _Branches.GetBranchesForListTransfer();
            return Ok(result);
        }

        [AuthorizeUser]
        [HttpGet]
        [Route("GetBranches")]
        public IHttpActionResult GetBranches()
        {
            var result = new List<DtoBranches>();
            result = _Branches.selectAll(_language).ToList();
            return Ok(result);
        }

        [AuthorizeUser]
        [HttpGet]
        [Route("GetBranchesById")]
        public IHttpActionResult GetBranchesById(int id)
        {
            var result = _Branches.selectById(id, _language);
            return Ok(result);
        }

        [AuthorizeUser]
        [HttpPost]
        [Route("DeleteBranchesById")]
        public IHttpActionResult DeleteBranchesById(int id)
        {
            var result = _Branches.FindBy(x => x.id == id).SingleOrDefault();
            if (result != null)
            {
                result.deletedBy = _accountId;
                _Branches.Edit(result);
                _Branches.Save();

                #region save in Log Table

                var audit = new DtoLogs
                {
                    docId = id,
                    docName = views.Branch.ToString(),
                    actionBy = _contactName,
                    actionDate = DateTime.Now.Date,
                    action = "Delete"
                };

                commonDataService ds = new commonDataService();
                //ds.saveAudit(audit);

                #endregion

            }
            return Ok();
        }

        [AuthorizeUser]
        [HttpPost]
        [Route("AddBranches")]
        public IHttpActionResult AddBranches(DtoBranches dtoDocument)
        {
            var DocumentNew = new branch
            {
                code = dtoDocument.code,
                name = dtoDocument.name,
                address = dtoDocument.address,
                email = dtoDocument.email,
                phone = dtoDocument.phone,
                isDefault = false
            };

            _Branches.Add(DocumentNew);
            _Branches.Save();

            _Branches.Reload(DocumentNew);

            return Ok(DocumentNew);
        }

        [AuthorizeUser]
        [HttpPost]
        [Route("EditBranch")]
        public IHttpActionResult EditBranch(DtoBranches dtoDocument)
        {
            var branchEntity = _Branches.FindBy(x => x.id == dtoDocument.id).SingleOrDefault();
            if (branchEntity != null)
            {
                branchEntity.code = dtoDocument.code;
                branchEntity.name = dtoDocument.name;
                branchEntity.address = dtoDocument.address;
                branchEntity.email = dtoDocument.email;
                branchEntity.phone = dtoDocument.phone;

            }

            _Branches.Edit(branchEntity);
            _Branches.Save();

            #region save in Log Table

            var audit = new DtoLogs
            {
                docId = dtoDocument.id,
                docName = views.Branch.ToString(),
                actionBy = _contactName,
                actionDate = DateTime.Now.Date,
                action = "Edit"
            };

            #endregion

            return Ok(dtoDocument);
        }

        [AuthorizeUser]
        [HttpPost]
        [Route("UpdateDefaultBranchById")]
        public IHttpActionResult UpdateDefaultBranchById(int id)
        {
            var branchList = _Branches.GetAll().ToList();

            foreach (var item in branchList)
            {
                if (item.id == id)
                {
                    item.isDefault = true;
                    _Branches.Edit(item);
                    _Branches.Save();
                }
                else
                {
                    if (item.isDefault == true)
                    {
                        item.isDefault = false;
                        _Branches.Edit(item);
                        _Branches.Save();
                    }
                }

            }
            var result = new List<DtoBranches>();
            result = _Branches.selectAll(_language).ToList();
            return Ok(result);
        }


        #endregion

        #region accounts
        [AuthorizeUser]
        [HttpPost]
        [Route("AccountDeleteById")]
        public IHttpActionResult AccountDeleteById(int id)
        {
            var result = _Accounts.FindBy(x => x.id == id).SingleOrDefault();

            result.deletedBy = _accountId;
            _Accounts.Edit(result);
            _Accounts.Save();

            return Ok();
        }

        [AuthorizeUser]
        [HttpPost]
        [Route("Addaccount")]
        public IHttpActionResult Addaccount(DtoAccounts newaccount)
        {

            var accounts = new account
            {
                userName = newaccount.userName,
                passWord = PasswordHash.CreateHash(newaccount.passWord),
                supervisorId = newaccount.supervisorId,
                groupId = newaccount.groupId,
                userType = newaccount.userType,
                address = newaccount.address,
                phone = newaccount.phone,
                email = newaccount.email,
                contactName = newaccount.contactName,
                branchId = newaccount.branchId
            };

            _Accounts.Add(accounts);
            _Accounts.Save();

            return Ok(accounts);
        }



        [AuthorizeUser]
        [HttpPost]
        [Route("ResetPassword")]
        public IHttpActionResult ResetPassword(int accountId)
        {
            var obj = _Accounts.FindBy(x => x.id == accountId).FirstOrDefault();
            if (obj != null)
            {
                obj.passWord = PasswordHash.CreateHash("12345");
                _Accounts.Edit(obj);
                _Accounts.Save();

            }
            return Ok(obj);
        }

        [AuthorizeUser]
        [HttpPost]
        [Route("Editaccount")]
        public IHttpActionResult Editaccount(DtoAccounts editaccount)
        {
            var accounts = _Accounts.FindBy(x => x.id == editaccount.id).SingleOrDefault();

            if (accounts != null)
            {
                accounts.userName = editaccount.userName;
                accounts.supervisorId = editaccount.supervisorId;
                accounts.groupId = editaccount.groupId;
                accounts.address = editaccount.address;
                accounts.phone = editaccount.phone;
                accounts.email = editaccount.email;
                accounts.branchId = editaccount.branchId;
                accounts.contactName = editaccount.contactName;
                _Accounts.Edit(accounts);
                _Accounts.Save();
            }


            return Ok(editaccount);
        }

        [AuthorizeUser]
        [HttpGet]
        [Route("GetAccounts")]
        public IHttpActionResult GetAccounts()
        {
            List<DtoAccounts> result = _Accounts.selectAll(_language).ToList();

            return Ok(result);
        }

        [AuthorizeUser]
        [HttpGet]
        [Route("GetAccountById")]
        public IHttpActionResult GetAccountById(int id)
        {
            DtoAccounts result = _Accounts.selectById(id, _language);

            return Ok(result);
        }

        [AuthorizeUser]
        [HttpGet]
        [Route("GetAccountInfo")]
        public IHttpActionResult GetAccountInfo()
        {
            DtoAccounts result = _Accounts.selectById((int)_accountId, _language);

            return Ok(result);
        }

        #endregion

        #region Group Permissions

        [AuthorizeUser]
        [HttpGet]
        [Route("GetGroupsPermissions")]
        public IHttpActionResult GetGroupsPermissions(int groupId, [FromUri] List<int> documentPermissions)
        {
            IQueryable<DtoGrouppermissions> result = _Grouppermissions.selectAll(groupId, _language).Where(x => documentPermissions.Contains(x.permissionCode));
            return Ok(result);
        }

        [AuthorizeUser]
        [HttpGet]
        [Route("GetGroupPermissionsById")]
        public IHttpActionResult GetGroupPermissionsById(int id)
        {
            var result = _Grouppermissions.selectById(id, _language);

            return Ok(result);
        }


        [AuthorizeUser]
        [HttpPost]
        [Route("AddGroupsPermissions")]
        public IHttpActionResult AddGroupsPermissions([FromBody] List<DtoGrouppermissions> documentPermissions)
        {
            int? groupId = 0;
            foreach (var permission in documentPermissions)
            {
                groupId = permission.groupId;

                var permissionEntity = new groupPermission()
                {
                    permissionCode = permission.permissionCode,
                    value = permission.value,
                    groupId = permission.groupId
                };

                _Grouppermissions.Add(permissionEntity);
            }

            _Grouppermissions.Save();

            return Ok();
        }


        [AuthorizeUser]
        [HttpPost]
        [Route("EditGroupsPermissions")]
        public IHttpActionResult EditGroupsPermissions([FromBody] List<DtoGrouppermissions> documentPermissions)
        {
            int? groupId = 0;
            foreach (var permission in documentPermissions)
            {
                var obj = _Grouppermissions.FindBy(x => x.id == permission.id).FirstOrDefault();
                if (obj != null)
                {
                    obj.permissionCode = permission.permissionCode;
                    obj.value = permission.value;

                    _Grouppermissions.Edit(obj);
                    _Grouppermissions.Save();
                }
                else
                {
                    groupId = permission.groupId;
                    var permissionEntity = new groupPermission()
                    {
                        permissionCode = permission.permissionCode,
                        value = permission.value,
                        groupId = permission.groupId
                    };
                    _Grouppermissions.Add(permissionEntity);
                    _Grouppermissions.Save();
                }
            }

            return Ok();
        }


        [AuthorizeUser]
        [HttpGet]
        [Route("GetGroups")]
        public IHttpActionResult GetGroups()
        {
            var result = _Groups.selectAll(_language).ToList();

            return Ok(result);
        }

        [AuthorizeUser]
        [HttpGet]
        [Route("GetGroupsById")]
        public IHttpActionResult GetGroupsById(int id)
        {
            var result = _Groups.selectById(id, _language);

            return Ok(result);
        }

        [AuthorizeUser]
        [HttpGet]
        [Route("DeleteGroupsById")]
        public IHttpActionResult DeleteGroupsById(int id)
        {
            var result = _Groups.FindBy(x => x.id == id).SingleOrDefault();
            if (result != null)
            {
                result.deletedBy = _accountId;
                _Groups.Edit(result);
                _Groups.Save();

            }
            return Ok(id);
        }

        [AuthorizeUser]
        [HttpPost]
        [Route("AddGroups")]
        public IHttpActionResult AddGroups(DtoGroups dtoDocument)
        {
            var documentNew = new InventoryContext.Context.Group
            {
                groupName = dtoDocument.groupName

            };

            _Groups.Add(documentNew);
            _Groups.Save();
            _Groups.Reload(documentNew);

            return Ok(documentNew);
        }
        [AuthorizeUser]
        [HttpPost]
        [Route("EditGroups")]
        public IHttpActionResult EditGroups(DtoGroups dtoDocument)
        {
            var obj = _Groups.FindBy(x => x.id == dtoDocument.id).FirstOrDefault();
            if (obj != null)
            {
                obj.groupName = dtoDocument.groupName;
                _Groups.Edit(obj);
            }
            _Groups.Save();

            return Ok();
        }
        #endregion


        [AuthorizeUser]
        [HttpGet]
        [Route("GetNextArrangeBranch")]
        public IHttpActionResult GetNextArrangeBranch()
        {
            var result = _Branches.getNextArrange();
            return Ok(result);
        }

        #region items

        [AuthorizeUser]
        [HttpPost]
        [Route("AddItemsdecription")]
        public IHttpActionResult AddItemsdecription(DtoItemsdecription dtoDocument)
        {


            var DocumentNew = new itemsDecription
            {
                code = dtoDocument.code,
                subject = dtoDocument.subject,
                cost = dtoDocument.cost,
            };

            _Itemsdecription.Add(DocumentNew);

            if (_Itemsdecription.checkCodeExist(dtoDocument.code, dtoDocument.id) == false)
            {
                try
                {
                    _Itemsdecription.Save();

                    _Itemsdecription.Reload(DocumentNew);


                }
                catch (Exception e)
                {
                    dtoDocument.subject = e.InnerException.ToString();
                }
            }
            return Ok(dtoDocument);
        }


        [AuthorizeUser]
        [HttpGet]
        [Route("CheckItemCodeExist")]
        public IHttpActionResult CheckItemCodeExist(string code, int id)
        {
            var result = _Itemsdecription.checkCodeExist(code, id);
            return Ok(result);
        }


        [AuthorizeUser]
        [HttpGet]
        [Route("GetItemsdecription")]
        public IHttpActionResult GetItemsdecription()
        {
            var result = new List<DtoItemsdecription>();
            result = _Itemsdecription.selectAll(_language);
            return Ok(result);
        }

        [AuthorizeUser]
        [HttpGet]
        [Route("GetItemsdecriptionPagination")]
        public IHttpActionResult GetItemsdecriptionPagination(int pageNumber, int pageSize)
        {
            var
            result = _Itemsdecription.getChunkDataByBranch(pageSize, pageNumber);
            return Ok(result);
        }

        #endregion

        #region store

        [AuthorizeUser]
        [HttpGet]
        [Route("GetTransferItemsFromMain")]
        public IHttpActionResult GetTransferItemsFromMain(int pageNumber, int pageSize)
        {
            var result = _inventoryHistory.GetItemFromBranch(_language, pageNumber, pageSize).ToList();

            return Ok(result);
        }

        [AuthorizeUser]
        [HttpPost]
        [Route("transferItemFromMainBranch")]
        public IHttpActionResult transferItemFromMainBranch(DtoInventorylog item)
        {
            item.fromBranchId = defaultBranchId;
            item.toBranchId = item.toBranchId;
            AddItemItemToInventory(item);

            return Ok();
        }
        private void AddItemItemToInventory(DtoInventorylog item)
        {
            var itemInven = _inventory.FindBy(x => x.itemId == item.itemId && x.branchId == item.toBranchId).FirstOrDefault();

            if (itemInven != null)
            {
                #region update Inventory that related to this branch

                item.InventoryId = itemInven.id;

                itemInven.quantity = itemInven.quantity + item.quantity;
                _inventory.Edit(itemInven);
                _inventory.Save();

                #endregion
            }
            else
            {
                #region add this item to inventory that will related to branch

                itemInven = new InventoryContext.Context.transaction
                {
                    itemId = item.itemId,
                    quantity = item.quantity,
                    resourceCode = item.resourceCod,
                    cost = item.cost,
                    branchId = (int)item.toBranchId,
                    description = item.description,
                    discount = 0,
                    price = item.price
                };

                _inventory.Add(itemInven);
                _inventory.Save();
                _inventory.Reload(itemInven);


                item.InventoryId = itemInven.id;

                #endregion

            }

            #region will descrease credit from current branch to another branch

            var currItem = _inventory.FindBy(x => x.itemId == item.itemId && x.branchId == item.fromBranchId).FirstOrDefault();

            if (currItem != null)
            {
                #region update Inventory that related to this branch

                currItem.quantity = itemInven.quantity - item.quantity;
                _inventory.Edit(currItem);
                _inventory.Save();

                #endregion
            }

            #endregion

            var serial = _inventory.GetNextArrange();
            var obj = new transactionsHistory
            {
                itemId = item.itemId,
                reason = item.reason,
                fromBranchId = item.fromBranchId,
                price = item.price,
                cost = item.cost,
                quantity = item.quantity,
                toBranchId = item.toBranchId,
                transactionTypeId = (int)transactionsType.transfer,
                transactionId = item.InventoryId,
                creationDate = DateTime.Now.Date,
                currentBranchId = _branchId,
                serialNo = serial
            };

            _inventoryHistory.Add(obj);
            _inventoryHistory.Save();
            _inventoryHistory.Reload(obj);

            #region save in Log Table

            #endregion
        }

        #endregion

    }
}
