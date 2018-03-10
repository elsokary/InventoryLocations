define(['durandal/system', 'config'], function (system, config) {

    var addAgent = function (newAccount) {
        return $.post(config.remoteServerName + "/AddAgents", newAccount).success(function (data) { });
    };

    var getAgents = function () {
        return $.getJSON(config.remoteServerName + "/GetAgents");
    };

    var addAccount = function (newAccount) {
        return $.post(config.remoteServerName + "/Addaccount", newAccount);
    };

    var getAccounts = function () {
        return $.getJSON(config.remoteServerName + "/GetAccounts");
    };

    var getNextArrangeBranch = function () {
        return $.getJSON(config.remoteServerName + "/GetNextArrangeBranch");
    };

    var getNextArrangeSupplier = function () {
        return $.getJSON(config.remoteServerName + "/GetNextArrangeSupplier");
    };

    var getNextArrangeCustomer = function () {
        return $.getJSON(config.remoteServerName + "/GetNextArrangeCustomer");
    };

    var getListType = function () {
        return $.getJSON(config.remoteServerName + "/GetListType");
    };

    var getListTypeByTitle = function (type) {
        return $.getJSON(config.remoteServerName + "/GetListTypeByType?type=" + type);
    };

    var getItemsByItemCode = function (code) {//from invoice
        return $.getJSON(config.remoteServerName + "/GetItemsByItemCode?code=" + code);
    };

    var getItemByResourceCode = function (code) {
        return $.getJSON(config.remoteServerName + "/GetItemByResourceCode?code=" + code);
    };

    var getItemByResourceCodeByBranchId = function (code, branchId) {
        return $.getJSON(config.remoteServerName + "/GetItemByResourceCodeByBranchId?code=" + code + "&branchId=" + branchId);
    };

    var getItemsForListByResourceCode = function (code, branchId) {
        return $.getJSON(config.remoteServerName + "/GetItemsForListByResourceCode?resourceCode=" + code + "&branchId=" + branchId);
    };

    var getItemsForListByPrice = function (branchId, price) {
        return $.getJSON(config.remoteServerName + "/GetItemsForListByPrice?branchId=" + branchId + "&price=" + price);
    };

    var getItemByResourceCodeSupplierId = function (code, supplierId, branchId) {
        return $.getJSON(config.remoteServerName + "/GetItemByResourceCodeSupplierId?code=" + code + "&SupplierId=" + supplierId + "&branchId=" + branchId);
    };

    var getItemsForSearch = function (code, supplierId, branchId) {
        return $.getJSON(config.remoteServerName + "/GetItemsForSearch?code=" + code + "&SupplierId=" + supplierId + "&branchId=" + branchId);
    };

    var getGroup = function (groupsObservable) {
        return $.getJSON(config.remoteServerName + "/GetGroups").done(function (data) {
            if (groupsObservable) {
                groupsObservable(data);
            }
        });
    };

    var getHistoryForDoc = function (docId, docName) {
        return $.getJSON(config.remoteServerName + "/GetHistoryForDoc?docId=" + docId + "&docName=" + docName)

    };

    var getGroups = function (documnetObservable) {
        return $.getJSON(config.remoteServerName + "/GetGroups").done(function (data) {
            if (documnetObservable) {
                documnetObservable(data);
            }
        });
    };

    var getGroupsById = function (documnetObservable, id) {
        return $.getJSON(config.remoteServerName + "/GetGroupsById", { id: id }).done(function (data) {
            documnetObservable(data);
        });
    };

    var permissionsGroupsEdit = function (documnetObservable) {
        return $.post(config.remoteServerName + "/EditGroups", documnetObservable);
    };

    var addGroups = function (documnetObservable) {
        return $.post(config.remoteServerName + "/AddGroups", documnetObservable);
    };

    var deleteGroupsById = function (id) {
        return $.getJSON(config.remoteServerName + "/DeleteGroupsById?id=" + id);
    };

    var login = function (userName, userPassword) {
        var user = {
            userName: userName,
            userPassword: userPassword
        };
        return config.postJson(config.remoteServerName + "/Login", user);

    };

    var checkTokenValidity = function () {
        return $.getJSON(config.remoteServerName + "/CheckTokenValidity");
    };

    var getPaymentsComparisonBarChart = function () {
        return $.getJSON(config.remoteServerName + "/GetPaymentsComparisonBarChart");
    };

    var getPaymentsBarChart = function () {
        return $.getJSON(config.remoteServerName + "/GetPaymentsBarChart");
    };

    var getBranches = function () {
        return $.getJSON(config.remoteServerName + "/GetBranches");
    };

    var getBranchesForList = function () {
        return $.getJSON(config.remoteServerName + "/GetBranchesForList");
    };

    var getTransferBranchesForList = function () {
        return $.getJSON(config.remoteServerName + "/GetTransferBranchesForList");
    };

    var getBranchesForListAll = function () {
        return $.getJSON(config.remoteServerName + "/GetBranchesForListAll");
    };

    var getBranchesById = function (documnetObservable, id) {
        return $.getJSON(config.remoteServerName + "/GetBranchesById?id=" + id).done(function (data) {
            documnetObservable(data);
        });
    };

    var editBranches = function (documnetObservable) {
        return $.post(config.remoteServerName + "/EditBranch", documnetObservable);
    };

    var addBranches = function (documnetObservable) {
        return $.post(config.remoteServerName + "/AddBranches", documnetObservable);
    };

    var deleteBranches = function (id) {
        return $.post(config.remoteServerName + "/DeleteBranchesById?id=" + id);
    };

    var updateDefaultBranchById = function (id) {
        return $.post(config.remoteServerName + "/UpdateDefaultBranchById?id=" + id);
    };

    var getChunckCustomersData = function (pageSize, pageNumber) {
        return $.getJSON(config.remoteServerName + "/GetChunckCustomersData?pageSize=" + pageSize + "&pageNumber=" + pageNumber);

    };

    var getCustomers = function () {
        return $.getJSON(config.remoteServerName + "/GetCustomers");

    };

    var getCustomersList = function () {
        return $.getJSON(config.remoteServerName + "/GetCustomersList");

    };

    var getCustomersById = function (documnetObservable, id) {
        return $.getJSON(config.remoteServerName + "/GetCustomersById?id=" + id).done(function (data) {
            documnetObservable(data);
        });
    };

    var editCustomers = function (documnetObservable) {
        return $.post(config.remoteServerName + "/EditCustomer", documnetObservable);
    };

    var addCustomers = function (documnetObservable) {
        return $.post(config.remoteServerName + "/AddCustomers", documnetObservable);
    };

    var deleteCustomers = function (id) {
        return $.post(config.remoteServerName + "/DeleteCustomersById?id=" + id);
    };


    var getSuppliers = function () {
        return $.getJSON(config.remoteServerName + "/GetSuppliers");
    };
    var getSupplierForList = function () {
        return $.getJSON(config.remoteServerName + "/GetSupplierForList");
    };

    var getSuppliersById = function (documnetObservable, id) {
        return $.getJSON(config.remoteServerName + "/GetSuppliersById?id=" + id).done(function (data) {
            documnetObservable(data);
        });
    };

    var editSuppliers = function (documnetObservable) {
        return $.post(config.remoteServerName + "/EditSupplier", documnetObservable);
    };

    var addSuppliers = function (documnetObservable) {
        return $.post(config.remoteServerName + "/AddSuppliers", documnetObservable);
    };

    var deleteSuppliers = function (id) {
        return $.post(config.remoteServerName + "/DeleteSuppliersById?id=" + id);
    };


    var getCategories = function () {
        return $.getJSON(config.remoteServerName + "/GetCategories");
    };

    var getCategoriesForExport = function () {
        return $.getJSON(config.remoteServerName + "/GetCategoriesForExport");
    };

    var getCategoriesListRetail = function (list) {
        return $.getJSON(config.remoteServerName + "/GetCategoriesListRetail").done(function (result) {
            list(result);
        });
    };

    var getCategoriesNotInSettingList = function (branchId, list) {
        return $.getJSON(config.remoteServerName + "/GetCategoriesNotInSettingList?branchId=" + branchId).done(function (result) {
            list(result);
        });
    };

    var getChildsCategories = function (parentId) {
        return $.getJSON(config.remoteServerName + "/GetChildsCategories?parentId=" + parentId);
    };

    var getCategoriesFirstLevel = function () {
        return $.getJSON(config.remoteServerName + "/GetCategoriesFirstLevel");
    };

    var getCategoriesFirstLevelBysupplierId = function (supplierId) {
        return $.getJSON(config.remoteServerName + "/GetCategoriesFirstLevelBysupplierId?supplierId=" + supplierId);
    };

    var getCategoriesBysupplierIdAndDepartmetId = function (supplierId, departmentId) {
        return $.getJSON(config.remoteServerName + "/GetCategoriesBysupplierIdAndDepartmetId?supplierId=" + supplierId + "&departmentId=" + departmentId);
    };

    var getCategoriesByDepartmetId = function (departmentId) {
        return $.getJSON(config.remoteServerName + "/GetCategoriesByDepartmetId?departmentId=" + departmentId);
    };

    var getFirstLevelCategoryBySupplierIdByDepartmentId = function (supplierId, departmentId) {
        return $.getJSON(config.remoteServerName + "/GetFirstLevelCategoryBySupplierIdByDepartmentId?supplierId=" + supplierId + "&departmentId=" + departmentId);
    };

    var getCategoriesById = function (documnetObservable, id) {
        return $.getJSON(config.remoteServerName + "/GetCategoriesById?id=" + id);

    };

    var editCategories = function (documnetObservable) {
        return $.post(config.remoteServerName + "/EditCategories", documnetObservable);
    };

    var addCategories = function (documnetObservable) {
        return $.post(config.remoteServerName + "/AddCategories", documnetObservable);
    };

    var deleteCategories = function (id) {
        return $.post(config.remoteServerName + "/DeleteCategoriesById?id=" + id);
    };


    var getItemByBranchId = function (branchId) {
        return $.getJSON(config.remoteServerName + "/GetItemByBranchId?branchId=" + branchId);
    };

    var getItemBySupplierId = function (supplierId) {
        return $.getJSON(config.remoteServerName + "/GetItemBySupplierId?supplierId=" + supplierId);
    };

    var getAllForListByresourceCode = function (supplierId, resourceCode) {
        return $.getJSON(config.remoteServerName + "/GetAllForListByresourceCode?supplierId=" + supplierId + "&resourceCode=" + resourceCode);
    };

    var getItemInMainBranch = function () {
        return $.getJSON(config.remoteServerName + "/GetItemInMainBranch");
    };

    var getItemsdecription = function () {
        return $.getJSON(config.remoteServerName + "/GetItemsdecription");
    };

    var getItemsdecriptionPagination = function (pageNumber, pageSize) {
        return $.getJSON(config.remoteServerName + "/GetItemsdecriptionPagination?pageNumber=" + pageNumber + "&pageSize=" + pageSize);
    };

    var getItemsdecriptionByCategoryId = function (supplierId, categoryId, pageNumber, pageSize) {
        return $.getJSON(config.remoteServerName + "/GetItemsdecriptionByCategoryId?supplierId=" + supplierId + "&categoryId=" + categoryId + "&pageNumber=" + pageNumber + "&pageSize=" + pageSize);
    };

    var getItemsdecriptionByDepartment = function (supplierId, deptId, pageNumber, pageSize) {
        return $.getJSON(config.remoteServerName + "/GetItemsdecriptionByDepartment?supplierId=" + supplierId + "&deptId=" + deptId + "&pageNumber=" + pageNumber + "&pageSize=" + pageSize);
    };

    var getItemsSupplierByCategoryId = function (supplierId, categoryId, branchId) {
        return $.getJSON(config.remoteServerName + "/GetItemsSupplierByCategoryId?supplierId=" + supplierId + "&categoryId=" + categoryId + "&branchId=" + branchId);
    };

    var getItemsSupplierByCategoryIdForGard = function (supplierId, categoryId, branchId) {
        return $.getJSON(config.remoteServerName + "/getItemsSupplierByCategoryIdForGard?supplierId=" + supplierId + "&categoryId=" + categoryId + "&branchId=" + branchId);
    };

    var getItemsdecriptionBySupplierId = function (supplierId) {
        return $.getJSON(config.remoteServerName + "/GetItemsdecriptionBySupplierId?supplierId=" + supplierId);
    };

    var getItemsdecriptionForList = function () {
        return $.getJSON(config.remoteServerName + "/GetItemsdecriptionForList");
    };

    var getItemsdecriptionForListBranchId = function () {
        return $.getJSON(config.remoteServerName + "/GetItemsdecriptionForListBranch");
    };

    var getItemsForListBranch = function () {
        return $.getJSON(config.remoteServerName + "/GetItemsForListBranch");
    };

    var getItemsdecriptionById = function (documnetObservable, id) {
        return $.getJSON(config.remoteServerName + "/GetItemsdecriptionById", { id: id }).done(function (data) {
            if (documnetObservable) {

                documnetObservable(data);
            }
        });
    };

    var editItemsdecription = function (documnetObservable) {
        return $.post(config.remoteServerName + "/EditItemsdecription", documnetObservable);
    };

    var addItemsdecription = function (documnetObservable) {
        return $.post(config.remoteServerName + "/AddItemsdecription", documnetObservable);
    };

    var deleteItemsdecription = function (id) {
        return $.post(config.remoteServerName + "/DeleteItemsdecriptionById?id=" + id);
    };


    var getAgants = function () {
        return $.getJSON(config.remoteServerName + "/GetAgants");
    };

    var getAgantsById = function (documnetObservable, id) {
        return $.getJSON(config.remoteServerName + "/GetAgantsById?id=" + id).done(function (data) {
            documnetObservable(data);
        });
    };

    var editAgant = function (documnetObservable) {
        return $.post(config.remoteServerName + "/EditAgant", documnetObservable);
    };

    var addAgants = function (documnetObservable) {
        return $.post(config.remoteServerName + "/AddAgants", documnetObservable);
    };

    var deleteAgantsById = function (id) {
        return $.post(config.remoteServerName + "/DeleteAgantsById?id=" + id);
    };


    var checkCategoryNameExist = function (word, id) {
        return $.getJSON(config.remoteServerName + "/CheckCategoryNameExist?word=" + word + "&id=" + id);
    };

    var checkCategoryCodeExist = function (word, id, arrange) {
        return $.getJSON(config.remoteServerName + "/CheckCategoryCodeExist?code=" + word + "&id=" + id + "&arrange=" + arrange);
    };

    var checkCodeExist = function (word, id) {
        return $.getJSON(config.remoteServerName + "/CheckItemCodeExist?code=" + word + "&id=" + id);
    };

    var accountDeleteById = function (id) {
        return $.post(config.remoteServerName + "/AccountDeleteById?id=" + id);
    };

    var resetPassword = function (id) {
        return $.post(config.remoteServerName + "/ResetPassword?accountId=" + id);
    };

    var editAccount = function (editAccountObservable) {
        return $.post(config.remoteServerName + "/EditAccount", editAccountObservable);
    };

    var getAccountForedit = function (editAccountObservable, id) {
        return $.getJSON(config.remoteServerName + "/GetAccountById", { id: id }).done(function (data) {
            editAccountObservable(ko.mapping.fromJS(data));

        });
    };

    var getGroupPermissions = function (permissionsObservable, documentPermissions, groupId) {
        return $.getJSON(config.remoteServerName + "/GetGroupsPermissions?groupId=" + groupId, { documentPermissions: documentPermissions }).success(function (data) {
            permissionsObservable(data);
        });
    };

    var addGroupsPermissions = function (documentPermissions) {
        return $.post(config.remoteServerName + "/AddGroupsPermissions", { '': documentPermissions });
    };

    var editGroupsPermissions = function (documentPermissions) {
        return $.post(config.remoteServerName + "/EditGroupsPermissions", { '': documentPermissions });
    };


    var getItems = function () {
        return $.getJSON(config.remoteServerName + "/GetItems");
    };

    var getItemsForListCard = function () {
        return $.getJSON(config.remoteServerName + "/GetItemsForListCard");
    };

    var getItemsForPagination = function (pageSize, pageNumber) {
        return $.getJSON(config.remoteServerName + "/GetItemsForPagination?pageSize=" + pageSize + "&pageNumber=" + pageNumber);
    };

    var getTransferItems = function (pageSize, pageNumber) {
        return $.getJSON(config.remoteServerName + "/GetTransferItems?pageNumber=" + pageNumber + "&pageSize=" + pageSize);
    };

    var getTransferItemsFromMain = function (pageSize, pageNumber) {
        return $.getJSON(config.remoteServerName + "/GetTransferItemsFromMain?pageNumber=" + pageNumber + "&pageSize=" + pageSize);
    };

    var getTransferItemsToMain = function (pageSize, pageNumber) {
        return $.getJSON(config.remoteServerName + "/GetTransferItemsToMain?pageNumber=" + pageNumber + "&pageSize=" + pageSize);
    };

    var transferItemToBranch = function (editAccountObservable) {
        return $.post(config.remoteServerName + "/TransferItemToBranch", editAccountObservable);
    };

    var transferItemToMainBranch = function (editAccountObservable) {
        return $.post(config.remoteServerName + "/TransferItemToMainBranch", editAccountObservable);
    };

    var transferItemFromMainBranch = function (editAccountObservable) {
        return $.post(config.remoteServerName + "/TransferItemFromMainBranch", editAccountObservable);
    };

    var editTransferItemToBranch = function (editAccountObservable) {
        return $.post(config.remoteServerName + "/EditTransferItemToBranch", editAccountObservable);
    };

    var deleteItemInventory = function (id) {
        return $.post(config.remoteServerName + "/DeleteItemInventory?id=" + id);
    };

    var ExportReport = function (invoiceId, branchId) {
        return $.post(config.remoteServerName + "/ExportReport?invoiceId=" + invoiceId + "&branchId=" + branchId);

    };


    var getInvoiceItems = function (invoiceId, branchId) {
        return $.getJSON(config.remoteServerName + "/GetInvoiceItems?invoiceId=" + invoiceId + "&branchId=" + branchId);

    };

    var getInvoiceItemsById = function (documnetObservable, id) {
        return $.getJSON(config.remoteServerName + "/GetInvoiceItemsById", { id: id }).done(function (data) {
            documnetObservable(data);
        });
    };

    var editInvoiceItems = function (documnetObservable) {
        return $.post(config.remoteServerName + "/EditInvoiceItems", documnetObservable);
    };

    var addInvoiceItems = function (documnetObservable) {
        return $.post(config.remoteServerName + "/AddInvoiceItems", documnetObservable);
    };

    var deleteInvoiceItems = function (id, invoiceId, branchId) {
        return $.post(config.remoteServerName + "/DeleteInvoiceItemsById?id=" + id + "&invoiceId=" + invoiceId + "&branchId=" + branchId);
    };

    var getInvoices = function (pageSize, pageNumber) {
        return $.getJSON(config.remoteServerName + "/GetInvoices?pageSize=" + pageSize + "&pageNumber=" + pageNumber);
    };

    var getInvoicesByBranchId = function (pageSize, pageNumber) {
        return $.getJSON(config.remoteServerName + "/GetInvoicesByBranchId?pageSize=" + pageSize + "&pageNumber=" + pageNumber);
    };

    var getInvoicesById = function (documnetObservable, id) {
        return $.getJSON(config.remoteServerName + "/GetInvoicesById", { id: id }).done(function (data) {
            if (documnetObservable) {

                documnetObservable(data);
            }
        });
    };

    var deleteInvoices = function (id, branchId) {
        return $.post(config.remoteServerName + "/DeleteInvoicesById?id=" + id + "&branchId=" + branchId);
    };

    var editInvoices = function (documnetObservable) {
        return $.post(config.remoteServerName + "/EditInvoices", documnetObservable);
    };

    var addInvoices = function (documnetObservable) {
        return $.post(config.remoteServerName + "/AddInvoices", documnetObservable);
    };

    var addInvoicesWithItem = function (documnetObservable) {
        return config.postJson(config.remoteServerName + "/AddInvoicesWithItem", documnetObservable);
    };

    var getPaymentsSuppliers = function (documnetObservable) {
        return config.postJson(config.remoteServerName + "/GetPaymentsSuppliers", documnetObservable);
    };

    var getPaymentsCustomers = function (documnetObservable) {
        return config.postJson(config.remoteServerName + "/GetPaymentsCustomers", documnetObservable);
    };

    var getCustomersTotals = function (documnetObservable) {
        return $.post(config.remoteServerName + "/GetCustomersTotals", documnetObservable);
    };

    var getSuppliersTotals = function (documnetObservable) {
        return $.post(config.remoteServerName + "/GetSuppliersTotals", documnetObservable);
    };

    var getRetailSetting = function (branchId) {
        return $.getJSON(config.remoteServerName + "/GetRetailSetting?branchId=" + branchId);
    };

    var addRetailSetting = function (documnetObservable) {
        return config.postJson(config.remoteServerName + "/AddRetailSetting", documnetObservable);
    };

    var editRetailSetting = function (documnetObservable) {
        return $.post(config.remoteServerName + "/EditRetailSetting", documnetObservable);
    };

    var getReturnedinvoices = function (documnetObservable) {
        return $.getJSON(config.remoteServerName + "/GetReturnedinvoices");
    };

    var getReturnedinvoicesByBranch = function (documnetObservable) {
        return $.getJSON(config.remoteServerName + "/GetReturnedinvoices");
    };

    var getReturnedinvoicesById = function (documnetObservable, id) {
        return $.getJSON(config.remoteServerName + "/GetReturnedinvoicesById", { id: id }).done(function (data) {
            if (documnetObservable) {
                documnetObservable(data);
            }
        });
    };

    var editReturnedinvoices = function (documnetObservable) {
        return $.post(config.remoteServerName + "/EditReturnedinvoices", documnetObservable);
    };

    var addReturnedinvoices = function (documnetObservable) {
        return $.post(config.remoteServerName + "/AddReturnedinvoices", documnetObservable);
    };


    var getReturnedInvoicesItems = function (returnedId) {
        return $.getJSON(config.remoteServerName + "/GetReturnedInvoicesItems?returnedId=" + returnedId);
    };

    var getReturnedInvoicesItemsById = function (documnetObservable, id) {
        return $.getJSON(config.remoteServerName + "/GetReturnedInvoicesItemsById", { id: id }).done(function (data) {
            documnetObservable(data);
        });
    };

    var editReturnedInvoicesItems = function (documnetObservable) {
        return $.post(config.remoteServerName + "/EditReturnedInvoicesItems", documnetObservable);
    };

    var addReturnedInvoicesItems = function (documnetObservable) {
        return $.post(config.remoteServerName + "/AddReturnedInvoicesItems", documnetObservable);
    };

    var addReturnedInvoicesItemsList = function (documnetObservable) {

        var objList = ko.toJS(documnetObservable);

        return config.postJson(config.remoteServerName + "/AddReturnedInvoicesItemsList", objList);
    };

    var updateCostItems = function (documnetObservable) {

        var objList = ko.toJS(documnetObservable);

        return config.postJson(config.remoteServerName + "/UpdateCostItems", objList);
    };


    var updatePriceItems = function (documnetObservable) {

        var objList = ko.toJS(documnetObservable);

        return config.postJson(config.remoteServerName + "/UpdatePriceItems", objList);
    };

    var updateCost = function (id, cost) {

        return config.postJson(config.remoteServerName + "/UpdateCost?id=" + id + "&cost=" + cost);
    };

    var updatePrice = function (id, price) {

        return config.postJson(config.remoteServerName + "/UpdatePrice?id=" + id + "&price=" + price);
    };

    var getTransactionsOnItem = function (branchId, itemId) {
        return $.getJSON(config.remoteServerName + "/GetTransactionsOnItem?branchId=" + branchId + "&itemId=" + itemId);
    };


    var getCountToday = function () {
        return $.getJSON(config.remoteServerName + "/GetCountToday");
    };

    var getCountTodayDetails = function () {
        return $.getJSON(config.remoteServerName + "/GetCountTodayDetails");
    };

    var getCountCostGreaterPrice = function () {
        return $.getJSON(config.remoteServerName + "/GetCountCostGreaterPrice");
    };


    var getCountCostGreaterPriceDetails = function () {
        return $.getJSON(config.remoteServerName + "/GetCountCostGreaterPriceDetails");
    };


    var getAllItemInventoryWithActual = function (branchId, pageNumber, pageSize) {
        return $.getJSON(config.remoteServerName + "/GetAllItemInventoryWithActual?branchId=" + branchId + "&pageNumber=" + pageNumber + "&pageSize=" + pageSize);
    };

    var getAllItemInventoryStoreQuantities = function (branchId, supplierId, categoryId, pageNumber, pageSize) {
        return $.getJSON(config.remoteServerName + "/GetAllItemInventoryStoreQuantities?branchId=" + branchId + "&supplierId=" + supplierId + "&categoryId=" + categoryId + "&pageNumber=" + pageNumber + "&pageSize=" + pageSize);
    };

    var accountStatmentSupplier = function (objSearch) {
        return $.post(config.remoteServerName + "/AccountStatmentSupplier", objSearch);
    };
    var accountStatmentCustomer = function (objSearch) {
        return $.post(config.remoteServerName + "/AccountStatmentCustomer", objSearch);
    };
    var getPaymentsSupplierReport = function (objSearch) {
        return $.post(config.remoteServerName + "/GetPaymentsSupplierReport", objSearch);
    };
    var getAllItemBySupplierForStore = function (branchId, supplierId) {
        return $.getJSON(config.remoteServerName + "/GetAllItemBySupplierForStore?branchId=" + branchId + "&supplierId=" + supplierId);
    };

    var getCountNegativeQuantity = function () {
        return $.getJSON(config.remoteServerName + "/GetCountNegativeQuantity");
    };

    var getCountNegativeQuantityDetails = function () {
        return $.getJSON(config.remoteServerName + "/GetCountNegativeQuantityDetails");
    };


    var getCountNoTransactions = function () {
        return $.getJSON(config.remoteServerName + "/GetCountNoTransactions");
    };

    var getCountNoTransactionsDetails = function () {
        return $.getJSON(config.remoteServerName + "/GetCountNoTransactionsDetails");
    };

    var getTransactionsOnItemObject = function (objData) {
        return $.post(config.remoteServerName + "/getTransactionsOnItemObject", objData);
    };

    var getItemsBalanceBrand = function (objData) {
        return $.post(config.remoteServerName + "/GetItemsBalanceBrand", objData);
    };

    var getItemsBrandRpt = function (objData) {
        return $.post(config.remoteServerName + "/GetItemsBrandRpt", objData);
    };

    var getTransactionBySupplier = function (branchId, supplierId) {
        return $.getJSON(config.remoteServerName + "/GetTransactionBySupplier?branchId=" + branchId + "&supplierId=" + supplierId);
    };


    var getTransactionBySupplierTotals = function (branchId, supplierId, categoryId) {
        return $.getJSON(config.remoteServerName + "/GetTransactionBySupplierTotals?branchId=" + branchId + "&supplierId=" + supplierId + "&categoryId=" + categoryId);
    };

    var getItemsNotTransactions = function (DtoObj) {
        return $.post(config.remoteServerName + "/GetItemsNotTransactions", ko.toJS(DtoObj));
    };



    var getDepartmentList = function () {
        return $.getJSON(config.remoteServerName + "/GetDepartmentList");
    };

    var getPaymentsById = function (documnetObservable, id, branchId) {
        return $.getJSON(config.remoteServerName + "/GetPaymentsById?id=" + id + "&branchId=" + branchId).done(function (data) {
            if (documnetObservable) {
                documnetObservable(data);
            }
        });
    };

    var getPaymentsStatusReport = function (documnetObservable) {
        //var odata = ko.toJS(documnetObservable);

        return $.post(config.remoteServerName + "/GetPaymentsStatusReport", documnetObservable);
    };

    var getPaymentsCompaisonReport = function (documnetObservable) {

        return $.post(config.remoteServerName + "/GetPaymentsCompaisonReport", documnetObservable);
    };
    var addPaymentCustomer = function (documnetObservable) {

        return $.post(config.remoteServerName + "/AddPaymentCustomer", documnetObservable);
    };

    var addPaymentSupplier = function (documnetObservable) {

        return $.post(config.remoteServerName + "/AddPaymentSupplier", documnetObservable);
    };

    var getAllPayments = function (docType, pageNumber, pageSize) {
        return $.getJSON(config.remoteServerName + "/GetAllPayments?docType=" + docType + "&pageNumber=" + pageNumber + "&pageSize=" + pageSize);
    };

    var getBranchPayments = function (docType, pageNumber, pageSize) {
        return $.getJSON(config.remoteServerName + "/GetBranchPayments?docType=" + docType + "&pageNumber=" + pageNumber + "&pageSize=" + pageSize);
    };

    var deletePaymentsById = function (id, branchId) {
        return $.post(config.remoteServerName + "/DeletePaymentsById?id=" + id + "&branchId=" + branchId);
    };


    var deletePaymentSupplierById = function (id, branchId) {
        return $.post(config.remoteServerName + "/DeletePaymentSupplierById?id=" + id + "&branchId=" + branchId);
    };

    var getRankingSupliers = function (DtoObj) {
        return $.post(config.remoteServerName + "/GetRankingSupliers", ko.toJS(DtoObj));
    };

    var getRankingCustomers = function (DtoObj) {
        return $.post(config.remoteServerName + "/GetRankingCustomers", ko.toJS(DtoObj));
    };


    var getSalesByCustomer = function (DtoObj) {
        return $.post(config.remoteServerName + "/GetSalesByCustomer", ko.toJS(DtoObj));
    };

    var getSalesAnalysis = function (DtoObj) {
        return $.post(config.remoteServerName + "/GetSalesAnalysis", ko.toJS(DtoObj));
    };

    var getTransactionsOnUser = function () {
        return $.getJSON(config.remoteServerName + "/GetTransactionsOnUser");
    };

    var getTransactionsUserDetail = function () {
        return $.getJSON(config.remoteServerName + "/GetTransactionsUserDetail");
    };

    var getCashier = function () {
        return $.getJSON(config.remoteServerName + "/GetCashier");
    };

    var getCashierByBranch = function () {
        return $.getJSON(config.remoteServerName + "/GetCashierByBranch");
    };

    var getCashierCustomers = function (pageNumber, pageSize) {
        return $.getJSON(config.remoteServerName + "/GetCashierCustomers?pageNumber=" + pageNumber + "&pageSize=" + pageSize);
    };

    var getCashierCustomersByBranch = function (pageNumber, pageSize) {
        return $.getJSON(config.remoteServerName + "/GetCashierCustomersByBranch?pageNumber=" + pageNumber + "&pageSize=" + pageSize);
    };


    var getCashierByBranchList = function () {
        return $.getJSON(config.remoteServerName + "/GetCashierByBranchList");
    };

    var getCashierByBranchLimit = function () {
        return $.getJSON(config.remoteServerName + "/GetCashierByBranchLimit");
    };

    var getCashierById = function (documnetObservable, id) {
        return $.getJSON(config.remoteServerName + "/GetCashierById", { id: id }).done(function (data) {
            if (documnetObservable) {

                documnetObservable(data);
            }
        });
    };

    var editCashier = function (documnetObservable) {
        return config.postJson(config.remoteServerName + "/EditCashier", ko.toJS(documnetObservable));
    };

    var addCashier = function (documnetObservable) {

        return config.postJson(config.remoteServerName + "/AddCashier", ko.toJS(documnetObservable));
    };

    var addCashierForCustomer = function (documnetObservable) {

        return config.postJson(config.remoteServerName + "/AddCashierForCustomer", ko.toJS(documnetObservable));
    };

    var editInventoryActual = function (documnetObservable) {

        return config.postJson(config.remoteServerName + "/EditInventoryActual", ko.toJS(documnetObservable));
    };

    var deleteCashier = function (id, branchId) {
        return $.post(config.remoteServerName + "/DeleteCashierById?id=" + id + "&branchId=" + branchId);
    };

    var getCashierItems = function (documnetObservable, cashierId, branchhId) {
        return $.getJSON(config.remoteServerName + "/GetCashierItems?cashierId=" + cashierId + "&branchId=" + branchhId).done(function (data) {
            if (documnetObservable) {
                documnetObservable(data);
            }
        });
    };

    var getCashierItemsById = function (documnetObservable, id) {
        return $.getJSON(config.remoteServerName + "/GetCashierItemsById", { id: id }).done(function (data) {
            documnetObservable(data);
        });
    };

    var editCashierItems = function (documnetObservable) {
        return
        $.post(config.remoteServerName + "/EditCashierItems", documnetObservable);
    };

    var addCashierItems = function (documnetObservable) {
        return $.post(config.remoteServerName + "/AddCashierItems", documnetObservable);
    };

    var deleteCashierItems = function (id) {
        return $.post(config.remoteServerName + "/DeleteCashierItemsById", { id: id });
    };

    var getReturned = function (pageNumber, pageSize) {
        return $.getJSON(config.remoteServerName + "/GetReturned?pageNumber=" + pageNumber + "&pageSize=" + pageSize);
    };

    var getReturnedByBranch = function (pageNumber, pageSize) {
        return $.getJSON(config.remoteServerName + "/GetReturnedByBranch?pageNumber=" + pageNumber + "&pageSize=" + pageSize);
    };

    var getReturnedById = function (documnetObservable, id) {
        return $.getJSON(config.remoteServerName + "/GetReturnedById", { id: id }).done(function (data) {
            if (documnetObservable) {
                documnetObservable(data);
            }
        });
    };

    var editReturned = function (documnetObservable) {
        return $.post(config.remoteServerName + "/EditReturned", documnetObservable);
    };

    var addReturned = function (documnetObservable) {

        return config.postJson(config.remoteServerName + "/AddReturned", ko.toJS(documnetObservable));
    };

    var deleteReturned = function (id, branchId) {
        return $.get(config.remoteServerName + "/DeleteReturnedById?id=" + id + "&branchId=" + branchId);
    };

    var getReturnedItems = function (documnetObservable, returnedId, branchId) {
        return $.getJSON(config.remoteServerName + "/GetReturnedItems?returnedId=" + returnedId + "&branchId=" + branchId).done(function (data) {
            if (documnetObservable) {
                documnetObservable(data);
            }
        });
    };

    var getReturnedItemsById = function (documnetObservable, id) {
        return $.getJSON(config.remoteServerName + "/GetReturnedItemsById", { id: id }).done(function (data) {
            documnetObservable(data);
        });
    };

    var editReturnedItems = function (documnetObservable) {
        return $.post(config.remoteServerName + "/EditReturnedItems", documnetObservable);
    };

    var addReturnedItems = function (documnetObservable) {
        return $.post(config.remoteServerName + "/AddReturnedItems", documnetObservable);
    };

    var deleteReturnedItems = function (id, rettturnId, branchId) {
        return $.post(config.remoteServerName + "/DeleteReturnedItemsById?id=" + id + "&rettturnId=" + rettturnId + "&branchId=" + branchId);
    };

    var getRefundIems = function (documnetObservable, refundId, branchhId) {
        return $.getJSON(config.remoteServerName + "/GetRefundIems?refundId=" + refundId + "&branchId=" + branchhId).done(function (data) {
            if (documnetObservable) {
                documnetObservable(data);

            }
        });
    };

    var getRefundIemsById = function (documnetObservable, id) {
        return $.getJSON(config.remoteServerName + "/GetRefundIemsById", { id: id }).done(function (data) {
            documnetObservable(data);
        });
    };

    var editRefundIems = function (documnetObservable) {
        return $.post(config.remoteServerName + "/EditRefundIems", documnetObservable);
    };

    var addRefundIems = function (documnetObservable) {
        return $.post(config.remoteServerName + "/AddRefundIems", documnetObservable);
    };

    var deleteRefundIems = function (id, refundId, branchId) {
        return $.post(config.remoteServerName + "/DeleteRefundIemsById?id=" + id + "&refundId=" + refundId + "&branchId=" + branchId);
    };

    var getRefunds = function (pageNumber, pageSize) {
        return $.getJSON(config.remoteServerName + "/GetRefunds?pageNumber=" + pageNumber + "&pageSize=" + pageSize);
    };

    var getRefundsBranchId = function (pageNumber, pageSize) {
        return $.getJSON(config.remoteServerName + "/GetRefundsByBranchId?pageNumber=" + pageNumber + "&pageSize=" + pageSize);
    };

    var getTransactionsbyOpenedBy = function () {
        return $.getJSON(config.remoteServerName + "/GetTransactionsbyOpenedBy");
    };

    var getNextSerial = function () {
        return $.getJSON(config.remoteServerName + "/GetNextSerial");
    };

    var getNextInvoiceArrange = function (branchId) {
        return $.getJSON(config.remoteServerName + "/GetNextInvoiceArrange?branchId=" + branchId);
    };

    var getNextReturnedinvoiceArrange = function (branchId) {
        return $.getJSON(config.remoteServerName + "/GetNextReturnedinvoiceArrange?branchId=" + branchId);
    };

    var getNextSerialCustomer = function (branchId) {
        return $.getJSON(config.remoteServerName + "/GetNextSerialCustomer?branchId=" + branchId);
    };

    var getNextSerialSupplier = function (branchId) {
        return $.getJSON(config.remoteServerName + "/GetNextSerialSupplier?branchId=" + branchId);
    };

    var getRefundsById = function (documnetObservable, id) {
        return $.getJSON(config.remoteServerName + "/GetRefundsById", { id: id }).done(function (data) {
            if (documnetObservable) {
                documnetObservable(data);
            }
        });
    };

    var selectAllDataDiscount = function () {
        return $.getJSON(config.remoteServerName + "/SelectAllDataDiscount");
    };

    var editRefunds = function (documnetObservable) {
        return $.post(config.remoteServerName + "/EditRefunds", documnetObservable);
    };

    var addRefunds = function (documnetObservable) {
        return config.postJson(config.remoteServerName + "/AddRefunds", ko.toJS(documnetObservable));
    };

    var addItemHistory = function (documnetObservable) {
        return config.postJson(config.remoteServerName + "/AddItemHistory", ko.toJS(documnetObservable));
    };

    var deleteRefunds = function (id, branchhId) {
        return $.post(config.remoteServerName + "/DeleteRefundsById?id=" + id + "&branchhId=" + branchhId);
    };

    var addExpense = function (newAccount) {
        return $.post(config.remoteServerName + "/AddExpense", newAccount);
    };

    var editExpense = function (newAccount) {
        return $.post(config.remoteServerName + "/EditExpense", newAccount);
    };

    var getExpense = function () {
        return $.getJSON(config.remoteServerName + "/GetExpense");
    };

    var getExpenseByBranchId = function () {
        return $.getJSON(config.remoteServerName + "/GetExpenseByBranchId");
    };

    var deleteExpense = function (id) {
        return $.getJSON(config.remoteServerName + "/DeleteExpense?id=" + id);
    };

    var getExpenseById = function (documnetObservable, id) {
        return $.getJSON(config.remoteServerName + "/GetExpenseById?id=" + id).done(function (data) {
            documnetObservable(data);
        });
    };

    var getExpenseByExpenseType = function (documnetObservable, categoryId) {
        return $.getJSON(config.remoteServerName + "/GetExpenseByExpenseType?categoryId=" + categoryId).done(function (data) {
            documnetObservable(data);
        });
    };

    var addSupplyOrdersItems = function (documnetObservable) {
        return $.post(config.remoteServerName + "/AddSupplyOrdersItems", documnetObservable);
    };

    var getSupplyOrdersItems = function (invoiceId, branchId) {
        return $.getJSON(config.remoteServerName + "/GetSupplyOrdersItems?invoiceId=" + invoiceId + "&branchId=" + branchId);

    };

    var deleteSupplyOrdersById = function (id, branchId) {
        return $.post(config.remoteServerName + "/DeleteSupplyOrdersById?id=" + id + "&branchId=" + branchId);
    };

    var getSupplyOrders = function (pageSize, pageNumber) {
        return $.getJSON(config.remoteServerName + "/GetSupplyOrders?pageSize=" + pageSize + "&pageNumber=" + pageNumber);
    };

    var getSupplyOrdersByBranchId = function (pageSize, pageNumber) {
        return $.getJSON(config.remoteServerName + "/GetSupplyOrdersByBranchId?pageSize=" + pageSize + "&pageNumber=" + pageNumber);
    };

    var getSupplyOrdersById = function (documnetObservable, id) {
        return $.getJSON(config.remoteServerName + "/GetSupplyOrdersById", { id: id }).done(function (data) {
            if (documnetObservable) {

                documnetObservable(data);
            }
        });
    };

    var editSupplyOrders = function (documnetObservable) {
        return $.post(config.remoteServerName + "/EditSupplyOrders", documnetObservable);
    };

    var addSupplyOrders = function (documnetObservable) {
        return $.post(config.remoteServerName + "/AddSupplyOrders", documnetObservable);
    };

    var getNextSupplyOrdersArrange = function (invoiceId, branchId) {
        return $.getJSON(config.remoteServerName + "/GetNextSupplyOrdersArrange?branchId=" + branchId);
    };

    var addSupplyOrdersWithItem = function (documnetObservable) {
        return config.postJson(config.remoteServerName + "/AddSupplyOrdersWithItem", documnetObservable);
    };
    ///////////////////////////////////....Inventory Store.///////

    var getInventoryStoreItems = function (InventoryStoreId, branchId) {
        return $.getJSON(config.remoteServerName + "/GetInventoryStoreItems?invoiceId=" + InventoryStoreId + "&branchId=" + branchId);

    };

    var getInventoryStoreItemsById = function (documnetObservable, id) {
        return $.getJSON(config.remoteServerName + "/GetInventoryStoreItemsById", { id: id }).done(function (data) {
            documnetObservable(data);
        });
    };

    var editInventoryStoreItems = function (documnetObservable) {
        return $.post(config.remoteServerName + "/EditInventoryStoreItems", documnetObservable);
    };

    var addInventoryStoreItems = function (documnetObservable) {
        return $.post(config.remoteServerName + "/AddInventoryStoreItems", documnetObservable);
    };

    var deleteInventoryStoreItems = function (id, InventoryStoreId, branchId) {
        return $.post(config.remoteServerName + "/DeleteInventoryStoreItemsById?id=" + id + "&InventoryStoreId=" + InventoryStoreId + "&branchId=" + branchId);
    };

    var getInventoryStores = function (pageSize, pageNumber) {
        return $.getJSON(config.remoteServerName + "/GetInventoryStore?pageSize=" + pageSize + "&pageNumber=" + pageNumber);
    };

    var getInventoryStoresByBranchId = function (pageSize, pageNumber) {
        return $.getJSON(config.remoteServerName + "/GetInventoryStoreByBranchId?pageSize=" + pageSize + "&pageNumber=" + pageNumber);
    };

    var getInventoryStoresById = function (documnetObservable, id, branchId) {
        return $.getJSON(config.remoteServerName + "/GetInventoryStoreById?id=" + id + "&branchId=" + branchId).done(function (data) {
            if (documnetObservable) {
                documnetObservable(data);
            }
        });
    };

    var getNextInventoryStoreArrange = function (branchId) {
        return $.getJSON(config.remoteServerName + "/GetNextInventoryStoreArrange?branchId=" + branchId);
    };
    var deleteInventoryStores = function (id, branchId) {
        return $.post(config.remoteServerName + "/DeleteInventoryStoreById?id=" + id + "&branchId=" + branchId);
    };

    var editInventoryStores = function (documnetObservable) {
        return $.post(config.remoteServerName + "/EditInventoryStore", documnetObservable);
    };

    var addInventoryStores = function (documnetObservable) {
        return $.post(config.remoteServerName + "/AddInventoryStores", documnetObservable);
    };

    var addInventoryStoresWithItem = function (documnetObservable) {
        return config.postJson(config.remoteServerName + "/AddInventoryStoreWithItem", documnetObservable);
    };

    var getStockState = function () {
        return $.getJSON(config.remoteServerName + "/GetStockState");
    };
  
    var getLocations = function () {
        return $.getJSON(config.remoteServerName + "/GetLocations");
    }; 
    var getPallta = function () {
        return $.getJSON(config.remoteServerName + "/GetPallta");
    }; 
    var getNextArrangePallta = function () {
        return $.getJSON(config.remoteServerName + "/GetNextArrangePallta");
    };   
    var getNextArrangeLocation = function () {
        return $.getJSON(config.remoteServerName + "/GetNextArrangeLocation");
    };
    var getLocationsById = function (documnetObservable, id) {
        return $.getJSON(config.remoteServerName + "/GetLocationsById?id=" + id).done(function (data) {
            documnetObservable(data);
        });
    };
    var deleteLocationsById = function (id) {
        return $.getJSON(config.remoteServerName + "/DeleteLocationsById?id=" + id);
    };

    var editLocations = function (documnetObservable) {
        return $.post(config.remoteServerName + "/EditLocations", documnetObservable);
    };

    var addLocations = function (documnetObservable) {
        return $.post(config.remoteServerName + "/AddLocations", documnetObservable);
    };
    var deletePalltaById = function (id) {
        return $.getJSON(config.remoteServerName + "/DeletePalltaById?id=" + id);
    };

    var editPallta = function (documnetObservable) {
        return $.post(config.remoteServerName + "/EditPallta", documnetObservable);
    };

    var addPallta = function (documnetObservable) {
        return $.post(config.remoteServerName + "/AddPallta", documnetObservable);
    };
    ///////////////////////////////////
    var dataservice = {
        getStockState: getStockState,
        getNextInventoryStoreArrange: getNextInventoryStoreArrange,

        getInventoryStoreItems: getInventoryStoreItems,
        getInventoryStoreItemsById: getInventoryStoreItemsById,
        editInventoryStoreItems: editInventoryStoreItems,
        addInventoryStoreItems: addInventoryStoreItems,
        deleteInventoryStoreItems: deleteInventoryStoreItems,
        getInventoryStores: getInventoryStores,
        getInventoryStoresByBranchId: getInventoryStoresByBranchId,
        getInventoryStoresById: getInventoryStoresById,
        deleteInventoryStores: deleteInventoryStores,
        editInventoryStores: editInventoryStores,
        addInventoryStores: addInventoryStores,
        addInventoryStoresWithItem: addInventoryStoresWithItem,

        getCategoriesForExport: getCategoriesForExport,

        addSupplyOrdersItems: addSupplyOrdersItems,
        addSupplyOrdersWithItem: addSupplyOrdersWithItem,
        getSupplyOrdersItems: getSupplyOrdersItems,
        deleteSupplyOrdersById: deleteSupplyOrdersById,
        getSupplyOrders: getSupplyOrders,
        getSupplyOrdersByBranchId: getSupplyOrdersByBranchId,
        getSupplyOrdersById: getSupplyOrdersById,
        editSupplyOrders: editSupplyOrders,
        addSupplyOrders: addSupplyOrders,
        getNextSupplyOrdersArrange: getNextSupplyOrdersArrange,

        addExpense: addExpense,
        editExpense: editExpense,
        getExpense: getExpense,
        getExpenseByBranchId: getExpenseByBranchId,
        deleteExpense: deleteExpense,
        getExpenseById: getExpenseById,
        getExpenseByExpenseType: getExpenseByExpenseType,

        getNextArrangeBranch: getNextArrangeBranch,
        getNextArrangeSupplier: getNextArrangeSupplier,
        getNextArrangeCustomer: getNextArrangeCustomer,

        getPaymentsCompaisonReport: getPaymentsCompaisonReport,
        getDepartmentList: getDepartmentList,
        getPaymentsStatusReport: getPaymentsStatusReport,
        getNextSerialSupplier: getNextSerialSupplier,
        getNextSerialCustomer: getNextSerialCustomer,
        getNextInvoiceArrange: getNextInvoiceArrange,
        getNextReturnedinvoiceArrange: getNextReturnedinvoiceArrange,

        addPaymentCustomer: addPaymentCustomer,
        addPaymentSupplier: addPaymentSupplier,
        getAllPayments: getAllPayments,
        getBranchPayments: getBranchPayments,
        deletePaymentsById: deletePaymentsById,
        deletePaymentSupplierById: deletePaymentSupplierById,
        getAllItemBySupplierForStore: getAllItemBySupplierForStore,

        getAllItemInventoryStoreQuantities: getAllItemInventoryStoreQuantities,
        accountStatmentSupplier: accountStatmentSupplier,

        accountStatmentCustomer: accountStatmentCustomer,

        getPaymentsSupplierReport: getPaymentsSupplierReport,
        getAllItemInventoryWithActual: getAllItemInventoryWithActual,
        getCountCostGreaterPrice: getCountCostGreaterPrice,
        getCountCostGreaterPriceDetails: getCountCostGreaterPriceDetails,
        getCountToday: getCountToday,
        getCountNegativeQuantity: getCountNegativeQuantity,
        getCountNegativeQuantityDetails: getCountNegativeQuantityDetails,
        getCountTodayDetails: getCountTodayDetails,


        getCountNoTransactionsDetails: getCountNoTransactionsDetails,
        getCountNoTransactions: getCountNoTransactions,

        selectAllDataDiscount: selectAllDataDiscount,
        addItemHistory: addItemHistory,
        getRetailSetting: getRetailSetting,
        addRetailSetting: addRetailSetting,
        editRetailSetting: editRetailSetting,

        getItemsForListCard: getItemsForListCard,
        getItemsForPagination: getItemsForPagination,
        getSalesByCustomer: getSalesByCustomer,
        getRankingCustomers: getRankingCustomers,
        getRankingSupliers: getRankingSupliers, getSalesAnalysis: getSalesAnalysis,
        getItemsNotTransactions: getItemsNotTransactions,
        getTransactionBySupplierTotals: getTransactionBySupplierTotals,
        getTransactionBySupplier: getTransactionBySupplier,


        updateCost: updateCost,
        updatePrice: updatePrice,
        updatePriceItems: updatePriceItems,
        updateCostItems: updateCostItems,
        getTransactionsOnItem: getTransactionsOnItem,
        getTransactionsOnItemObject: getTransactionsOnItemObject,
        getItemsBalanceBrand: getItemsBalanceBrand,
        getItemsBrandRpt: getItemsBrandRpt,
        getTransactionsOnUser: getTransactionsOnUser,
        getTransactionsUserDetail: getTransactionsUserDetail,

        getReturnedinvoices: getReturnedinvoices,
        getReturnedinvoicesByBranch: getReturnedinvoicesByBranch,

        editInventoryActual: editInventoryActual,
        getNextSerial: getNextSerial,
        getCashierByBranchList: getCashierByBranchList,
        getCashierByBranch: getCashierByBranch,
        getCashierByBranchLimit: getCashierByBranchLimit,

        getCashierCustomers: getCashierCustomers,
        getCashierCustomersByBranch: getCashierCustomersByBranch,
        getCashier: getCashier,
        getCashierById: getCashierById,
        editCashier: editCashier,
        addCashierForCustomer: addCashierForCustomer,
        addCashier: addCashier,
        deleteCashier: deleteCashier,
        getCashierItems: getCashierItems,
        getCashierItemsById: getCashierItemsById,
        editCashierItems: editCashierItems,
        addCashierItems: addCashierItems,
        deleteCashierItems: deleteCashierItems,
        getRefundIems: getRefundIems,
        getRefundIemsById: getRefundIemsById,
        editRefundIems: editRefundIems,
        addRefundIems: addRefundIems,
        deleteRefundIems: deleteRefundIems,
        getRefunds: getRefunds, getRefundsBranchId: getRefundsBranchId,
        getTransactionsbyOpenedBy: getTransactionsbyOpenedBy,
        getRefundsById: getRefundsById,
        editRefunds: editRefunds,
        addRefunds: addRefunds,
        deleteRefunds: deleteRefunds,

        getReturnedByBranch: getReturnedByBranch,
        getReturned: getReturned,
        getReturnedById: getReturnedById,
        editReturned: editReturned,
        addReturned: addReturned,
        deleteReturned: deleteReturned,
        getReturnedItems: getReturnedItems,
        getReturnedItemsById: getReturnedItemsById,
        editReturnedItems: editReturnedItems,
        addReturnedItems: addReturnedItems,
        deleteReturnedItems: deleteReturnedItems,

        getInvoiceItems: getInvoiceItems,
        getInvoiceItemsById: getInvoiceItemsById,
        editInvoiceItems: editInvoiceItems,
        addInvoiceItems: addInvoiceItems,
        deleteInvoiceItems: deleteInvoiceItems,
        getInvoices: getInvoices,
        getInvoicesByBranchId: getInvoicesByBranchId,
        getInvoicesById: getInvoicesById,
        editInvoices: editInvoices,
        addInvoices: addInvoices,
        addInvoicesWithItem: addInvoicesWithItem,
        getPaymentsSuppliers: getPaymentsSuppliers,
        getPaymentsCustomers: getPaymentsCustomers,
        getCustomersTotals: getCustomersTotals,
        getSuppliersTotals: getSuppliersTotals,
        deleteInvoices: deleteInvoices,

        getItemInMainBranch: getItemInMainBranch,
        transferItemFromMainBranch: transferItemFromMainBranch,
        transferItemToMainBranch: transferItemToMainBranch,

        getItemByBranchId: getItemByBranchId, getItemBySupplierId: getItemBySupplierId,
        getAllForListByresourceCode: getAllForListByresourceCode,

        getTransferItemsFromMain: getTransferItemsFromMain,
        getTransferItemsToMain: getTransferItemsToMain,
        getItems: getItems,
        getTransferItems: getTransferItems,
        transferItemToBranch: transferItemToBranch,
        editTransferItemToBranch: editTransferItemToBranch,
        deleteItemInventory: deleteItemInventory,

        getGroupPermissions: getGroupPermissions,
        addGroupsPermissions: addGroupsPermissions,
        editGroupsPermissions: editGroupsPermissions,
        getBranchesForList: getBranchesForList,
        getTransferBranchesForList: getTransferBranchesForList,
        getBranchesForListAll: getBranchesForListAll,

        addAgent: addAgent, getAgents: getAgents,

        accountDeleteById: accountDeleteById,
        resetPassword: resetPassword,
        getHistoryForDoc: getHistoryForDoc,
        checkCategoryNameExist: checkCategoryNameExist,
        checkCategoryCodeExist: checkCategoryCodeExist,
        checkCodeExist: checkCodeExist,
        getAgants: getAgants,
        getAgantsById: getAgantsById,
        editAgant: editAgant,
        addAgants: addAgants,
        deleteAgantsById: deleteAgantsById,

        getCategoriesFirstLevelBysupplierId: getCategoriesFirstLevelBysupplierId,
        getCategoriesBysupplierIdAndDepartmetId: getCategoriesBysupplierIdAndDepartmetId,
        getCategoriesByDepartmetId: getCategoriesByDepartmetId,
        getFirstLevelCategoryBySupplierIdByDepartmentId: getFirstLevelCategoryBySupplierIdByDepartmentId,
        getCategoriesFirstLevel: getCategoriesFirstLevel,
        getChildsCategories: getChildsCategories,

        getItemsdecriptionPagination: getItemsdecriptionPagination,
        getItemsdecription: getItemsdecription,
        getItemsdecriptionByCategoryId: getItemsdecriptionByCategoryId,
        getItemsdecriptionByDepartment: getItemsdecriptionByDepartment,

        getItemsSupplierByCategoryId: getItemsSupplierByCategoryId,
        getItemsSupplierByCategoryIdForGard: getItemsSupplierByCategoryIdForGard,
        getItemsdecriptionBySupplierId: getItemsdecriptionBySupplierId,

        getItemsdecriptionForList: getItemsdecriptionForList,
        getItemsdecriptionForListBranchId: getItemsdecriptionForListBranchId,
        getItemsForListBranch: getItemsForListBranch,
        getItemsdecriptionById: getItemsdecriptionById,
        editItemsdecription: editItemsdecription,
        addItemsdecription: addItemsdecription,
        deleteItemsdecription: deleteItemsdecription,
        getCategoriesListRetail: getCategoriesListRetail,
        getCategoriesNotInSettingList: getCategoriesNotInSettingList,
        getCategories: getCategories,
        getCategoriesById: getCategoriesById,
        editCategories: editCategories,
        addCategories: addCategories,
        deleteCategories: deleteCategories,

        getSupplierForList: getSupplierForList,
        getSuppliers: getSuppliers,
        getSuppliersById: getSuppliersById,
        editSuppliers: editSuppliers,
        addSuppliers: addSuppliers,
        deleteSuppliers: deleteSuppliers,

        getCustomersList: getCustomersList,
        getCustomers: getCustomers,
        getChunckCustomersData: getChunckCustomersData,
        getCustomersById: getCustomersById,
        editCustomers: editCustomers,
        addCustomers: addCustomers,
        deleteCustomers: deleteCustomers,

        getGroups: getGroups,
        getGroupsById: getGroupsById,
        permissionsGroupsEdit: permissionsGroupsEdit,
        addGroups: addGroups,
        deleteGroupsById: deleteGroupsById,
        getAccounts: getAccounts,
        getListType: getListType, getListTypeByTitle: getListTypeByTitle,
        checkTokenValidity: checkTokenValidity,
        login: login,
        addAccount: addAccount,
        editAccount: editAccount,
        getAccountForedit: getAccountForedit,
        getGroup: getGroup,

        getPaymentsComparisonBarChart: getPaymentsComparisonBarChart,
        getPaymentsBarChart: getPaymentsBarChart,

        getBranches: getBranches,
        getBranchesById: getBranchesById,
        editBranches: editBranches,
        addBranches: addBranches,
        deleteBranches: deleteBranches,
        updateDefaultBranchById: updateDefaultBranchById,
        getItemsByItemCode: getItemsByItemCode,
        getItemByResourceCode: getItemByResourceCode,
        getItemsForListByResourceCode: getItemsForListByResourceCode,
        getItemByResourceCodeByBranchId: getItemByResourceCodeByBranchId,
        getItemsForListByPrice: getItemsForListByPrice,
        getItemByResourceCodeSupplierId: getItemByResourceCodeSupplierId,
        getItemsForSearch: getItemsForSearch,
        ExportReport: ExportReport,

        getLocations:getLocations,
        addLocations:addLocations,
        editLocations:editLocations,
        deleteLocationsById:deleteLocationsById,
        getLocationsById: getLocationsById,
        getNextArrangePallta:getNextArrangePallta,
        getNextArrangeLocation:getNextArrangeLocation,
        getPallta:getPallta,
        addPallta:addPallta,
        editPallta:editPallta,
        deletePalltaById: deletePalltaById
    };

    return dataservice;
});