define(['plugins/router', 'services/dataservice', 'config', 'services/tokenstore'], function (router, dataservice, config, tokenStore) {

    var pageNumber = ko.observable(0);

    var branches = ko.observableArray([]);

    var showAllBranches = ko.observable(false);

    var branchId = ko.observable();

    var showTable = ko.observable(false);

    function attached() {

        $(".fixed-action-btn").tooltip('destroy');

        $(".fixed-action-btn").tooltip({ container: 'body' });

    };

    var koTableReady = function () {

        var collection = tokenStore.getPayload();

        branchId(parseInt(collection.bci));

    };

    function activate() {

        dataservice.getSupplierForList().done(function (result) {
            suppliers(result);
        });

        dataservice.getDepartmentList().done(function (result) {
            departments(result);
        });

        if (config.isAllow(41)) {
            showAllBranches(true);
            dataservice.getBranchesForListAll().done(function (result) {
                branches(result);
            });
        } else {
            showAllBranches(false);
        }

    };

    var exportColumns = [];

    var itemsTable = ko.observableArray([]);

    var categories = ko.observableArray([]);

    var departments = ko.observableArray([]);

    var suppliers = ko.observableArray([]);

    var itemsColumnDefenition = ko.observable();

    var PrintToExcel = function () {

        config.itemsColumnDefenition.name = "تقرير فروقات الجرد الفعلى";

        config.itemsColumnDefenition.widths = ['15%', '15%', '7%', '15%', '15%'];

        config.itemsColumnDefenition.friendlyNames = [
                                               config.language.description[config.currentLanguage()]
                                             , config.language.resourceCode[config.currentLanguage()]
                                             , config.language.quantity[config.currentLanguage()]
                                             , config.language.supplierName[config.currentLanguage()]
                                             , config.language.categoryName[config.currentLanguage()]
        ];

        config.itemsColumnDefenition.fields = ['description', 'resourceCode', 'quantity', 'supplierName', 'categoryName'];

        itemsColumnDefenition(config.itemsColumnDefenition);

        itemsColumnDefenition(config.itemsColumnDefenition);

        var exportData = vm.koTable.allItems();

        itemsTable(exportData);


        var contents = $("#invoice").html();
        var frame1 = $('<iframe />');
        frame1[0].name = "frame1";
        $("body").append(frame1);
        var frameDoc = frame1[0].contentWindow ? frame1[0].contentWindow : frame1[0].contentDocument.document ? frame1[0].contentDocument.document : frame1[0].contentDocument;
        frameDoc.document.open();
        frameDoc.document.write('<link href="../css/printStyle.css" rel="stylesheet" type="text/css" />');

        frameDoc.document.write(contents);
        frameDoc.document.close();
        setTimeout(function () {
            window.frames["frame1"].focus();
            window.frames["frame1"].print();
            frame1.remove();
        }, 1000);

    };

    var exportToExcel = function () {

        var exportData = ko.toJS(vm.koTable.allItems());

        config.exportJson(exportData, exportColumns, 'excel', 'Item Actual Report');
    };

    var exportToWord = function () {

        var exportData = ko.toJS(vm.koTable.allItems());

        config.exportJson(exportData, exportColumns, 'word', 'Item Actual Report');
    };

    branchId.subscribe(function () {
        if (branchId()) {

            vm.koTable.setItems([]);

            //dataservice.getAllItemInventoryWithActual(branchId(), pageNumber(), config.pageSize()).done(function (data) {

            //    vm.koTable.setItems(data);

            //});

        }
    });

    function canActivate() {
        if (config.isAllow(107)) {
            return true;
        }
    };

    function canDeActivate() {

        return true;
    };

    var loadMore = function (obj, e) {

        pageNumber(pageNumber() + 1);

        dataservice.getAllItemInventoryWithActual(branchId(), pageNumber(), config.pageSize()).success(function (data) {
            if (data.length > 0) {

                vm.koTable.pushItem(data);
            }

        });
    };

    var departmentId = ko.observable();

    var supplierId = ko.observable();

    var categoryId = ko.observable();

    supplierId.subscribe(function () {
        if (supplierId() && departmentId()) {
            dataservice.getFirstLevelCategoryBySupplierIdByDepartmentId(supplierId(), departmentId()).done(function (result) {
                categories(result);
            });

        }
    });

    departmentId.subscribe(function () {
        if (supplierId() && departmentId()) {
            dataservice.getCategoriesBysupplierIdAndDepartmetId(supplierId(), departmentId()).done(function (result) {
                categories(result);
            });
        }
    });

    categoryId.subscribe(function () {
        if (categoryId()) {
            vm.koTable.setItems([]);
            dataservice.getAllItemInventoryStoreQuantities(branchId(), supplierId(), categoryId(), pageNumber(), config.pageSize()).done(function (data) {
                vm.koTable.setItems(data);
            });
        }
    });

    var vm = {
        suppliers: suppliers,
        categoryId: categoryId,
        departmentId: departmentId,
        supplierId: supplierId,
        categories: categories,
        departments: departments,


        loadMore: loadMore,
        itemsColumnDefenition: itemsColumnDefenition,
        PrintToExcel: PrintToExcel,
        exportToWord: exportToWord,
        exportToExcel: exportToExcel,
        canDeActivate: canDeActivate,
        showAllBranches: showAllBranches,
        branchId: branchId,
        branches: branches,
        canActivate: canActivate,
        title: config.language.items[config.currentLanguage()],
        activate: activate,
        attached: attached,
        language: config.language,
        currentLanguage: config.currentLanguage,
        koTableReady: koTableReady
    };

    return vm;

});