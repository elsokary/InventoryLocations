define(['plugins/router', 'services/dataservice', 'config', 'services/tokenstore'], function (router, dataservice, config, tokenStore) {

    var supplierId = ko.observable();

    var branches = ko.observableArray([]);

    var suppliers = ko.observableArray([]);

    var showAllBranches = ko.observable(false);

    var branchId = ko.observable();

    var showTable = ko.observable(false);

    function attached() {

        $(".fixed-action-btn").tooltip('destroy');

        $(".fixed-action-btn").tooltip({ container: 'body' });

        $('#inventoryForm').validate({

            rules: {
                branchId: {
                    required: true
                }, 
                supplierId: {
                    required: true
                } 
            },

            messages: {
                branchId: {
                    required: config.language.toBranch[config.currentLanguage()]
                }, 
                supplierId: {
                    required: config.language.quantityRequired[config.currentLanguage()]
                } 
            },

            // Do not change code below
            errorPlacement: function (error, element) {
                error.insertAfter(element.parent());
            }
        });
    };

    var btnSearch = function (obj, e) {

        $(e.target).button('loading');

        dataservice.getTransactionBySupplier(branchId(), supplierId()).done(function (data) {
            $(e.target).button('reset');
            vm.koTable.setItems(data);

            data.forEach(function (item) {
                dataModelList.push(createData(item));
            });

            vm.koTable.setItems(dataModelList());
        });

    };

    var dataModel = function () {
        var self = this;
        self.cost = ko.observable();
        self.price = ko.observable();
        self.description = ko.observable();
        self.resourceCode = ko.observable();
        self.credit = ko.observable();
        self.importQnty = ko.observable();
        self.executeQnty = ko.observable();
        self.totalCost = ko.computed(function () {
            return self.cost() * self.credit();
        }, this);
        self.totalPrice = ko.computed(function () {
            return self.price() * self.executeQnty();
        }, this);
    };

    var createData = function (item) {
        var cashierItemObject = new dataModel();

        if (item) {
            cashierItemObject.cost(item.cost);
            cashierItemObject.price(item.price);
            cashierItemObject.description(item.description);
            cashierItemObject.resourceCode(item.resourceCode);
            cashierItemObject.credit(item.credit);
            cashierItemObject.importQnty(item.importQnty);
            cashierItemObject.executeQnty(item.executeQnty);
        }

        return cashierItemObject;
    };

    var dataModelList = ko.observableArray([]);

    var koTableReady = function () {
        if (branchId() && supplierId()) {

            dataservice.getTransactionBySupplier(branchId(), supplierId()).success(function (data) {
                $(e.target).button('reset');
                data.forEach(function (item) {
                    dataModelList.push(createData(item));
                });

                vm.koTable.setItems(dataModelList());

            });

        }
    };

    function activate() {

        if (config.isAllow(41)) {
            showAllBranches(true);
            dataservice.getBranchesForListAll().done(function (result) {
                branches(result);
            });

        } else {

            showAllBranches(false);
        }

        exportColumns = [
            new config.ExportColumn(config.language.description[config.currentLanguage()], 'description', 's'),
            new config.ExportColumn(config.language.resourceCode[config.currentLanguage()], 'resourceCode', 's'),
            new config.ExportColumn(config.language.importQnty[config.currentLanguage()], 'importQnty', 's'),
            new config.ExportColumn(config.language.excuteQnty[config.currentLanguage()], 'executeQnty', 's'),
            new config.ExportColumn(config.language.credit[config.currentLanguage()], 'credit', 's'),
            new config.ExportColumn(config.language.cost[config.currentLanguage()], 'cost', 's'),
            new config.ExportColumn(config.language.price[config.currentLanguage()], 'price', 's'),
            new config.ExportColumn(config.language.totalCost[config.currentLanguage()], 'totalCost', 's'),
            new config.ExportColumn(config.language.totalPrice[config.currentLanguage()], 'totalPrice', 's')
        ];

        var collection = tokenStore.getPayload();

        branchId(collection.bci);
        
        dataservice.getSupplierForList().done(function (result) {
            suppliers(result);
        });
    };

    var exportColumns = [];

    var itemsTable = ko.observableArray([]);

    var itemsColumnDefenition = ko.observable();

    var PrintToExcel = function () {

        config.itemsColumnDefenition.name = config.language.rptAccountSupplier[config.currentLanguage()];

        config.itemsColumnDefenition.widths = ['10%', '5%', '7%', '10%', '10%'];
        /*  
        */
        config.itemsColumnDefenition.friendlyNames = [
                                               config.language.date[config.currentLanguage()]
                                             , config.language.transactionType[config.currentLanguage()]
                                             , config.language.descriptionTransaction[config.currentLanguage()]
                                             , config.language.refDoc[config.currentLanguage()]
                                             , config.language.creditAccount[config.currentLanguage()]
                                             , config.language.debitAccount[config.currentLanguage()]
                                             , config.language.credit[config.currentLanguage()]
        ];

        config.itemsColumnDefenition.fields = ['date', 'transactionType', 'refDocSupplier', 'refDoc', 'credit', 'debit', 'balance'];

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

        config.exportJson(exportData, exportColumns, 'excel', 'cashier');
    };

    var exportToWord = function () {
        var exportData = ko.toJS(vm.koTable.allItems());
        config.exportJson(exportData, exportColumns, 'word', 'cashier');
    };

    function canActivate() {
        if (config.isAllow(33)) {
            return true;
        }
    };

    function canDeActivate() {

        return true;
    };

    var vm = {
        itemsTable: itemsTable,
        itemsColumnDefenition: itemsColumnDefenition,
        PrintToExcel: PrintToExcel,
        exportToWord: exportToWord,
        exportToExcel: exportToExcel,
        supplierId: supplierId,
        canDeActivate: canDeActivate,
        showAllBranches: showAllBranches,
        showTable: showTable,
        branchId: branchId,
        suppliers: suppliers,
        branches: branches,
        canActivate: canActivate,
        title: config.language.items[config.currentLanguage()],
        activate: activate,
        attached: attached,
        language: config.language,
        currentLanguage: config.currentLanguage,
        btnSearch: btnSearch,
        koTableReady: koTableReady
    };

    return vm;

});