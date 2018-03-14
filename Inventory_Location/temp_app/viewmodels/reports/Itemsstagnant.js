define(['plugins/router', 'services/dataservice', 'config', 'services/tokenstore'], function (router, dataservice, config, tokenStore) {
    var pageNumber = ko.observable(0);

    var branches = ko.observableArray([]);

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
                }
            },

            messages: {
                branchId: {
                    required: config.language.toBranch[config.currentLanguage()]
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

        dataModelList([]);

        searchCarteria().pageNumber(pageNumber());
        searchCarteria().pageSize(config.pageSize());
        dataservice.getItemsNotTransactions(searchCarteria()).done(function (data) {
            $(e.target).button('reset');

            data.forEach(function (item) {
                dataModelList.push(createData(item));
            });

            vm.koTable.setItems([]);

            vm.koTable.setItems(dataModelList());
        });

    };

    var dtoSearch = function () {
        var self = this;
        self.branchId = ko.observable();
        self.pageSize = ko.observable(1000);
        self.pageNumber = ko.observable(0);
        self.startDate = ko.observable(moment().format());
        self.finishDate = ko.observable(moment().format());
    };

    var searchCarteria = ko.observable(new dtoSearch());

    var dataModel = function () {
        var self = this;
        self.cost = ko.observable();
        self.price = ko.observable();
        self.description = ko.observable();
        self.resourceCode = ko.observable();
        self.credit = ko.observable();
        self.lastRecievedDate = ko.observable(moment().format());
        self.lastQuantity = ko.observable();
        self.lastSaleDate = ko.observable(moment().format());
        self.suplierName = ko.observable();
        self.totalCost = ko.computed(function () {
            return self.cost() * self.credit();
        }, this);
        self.totalPrice = ko.computed(function () {
            return self.price() * self.credit();
        }, this);
    };

    var createData = function (item) {
        var cashierItemObject = new dataModel();

        if (item) {
            cashierItemObject.credit(item.credit);
            cashierItemObject.cost(item.cost);
            cashierItemObject.price(item.price);
            cashierItemObject.description(item.description);
            cashierItemObject.resourceCode(item.resourceCode);
            cashierItemObject.lastQuantity(item.lastQuantity);
            cashierItemObject.suplierName(item.suplierName);
            if (item.lastRecievedDate) {
                cashierItemObject.lastRecievedDate(moment(item.lastRecievedDate).format('DD/MM/YYYYY'));
            }
            else {
                cashierItemObject.lastRecievedDate('');
            }

            if (item.lastSaleDate) {
                cashierItemObject.lastSaleDate(moment(item.lastSaleDate).format('DD/MM/YYYYY'));
            }
            else {
                cashierItemObject.lastSaleDate('');
            }

        }

        return cashierItemObject;
    };

    var dataModelList = ko.observableArray([]);

    var koTableReady = function () {
        if (branchId()) {

            dataModelList([]);

            searchCarteria().pageNumber(pageNumber());
            searchCarteria().pageSize(config.pageSize());
            dataservice.getItemsNotTransactions(searchCarteria()).success(function (data) {

                data.forEach(function (item) {
                    dataModelList.push(createData(item));
                });

                vm.koTable.setItems([]);

                vm.koTable.setItems(dataModelList());

            });

        }
    };

    function activate() {

        if (config.isAllow(41)) {

            showAllBranches(true);

            dataservice.getBranchesForListAll().done(function (result) {
                branches(result);
                var collection = tokenStore.getPayload();

                branchId(collection.bci);

                searchCarteria().branchId(branchId());
            });

        } else {

            var collection = tokenStore.getPayload();

            branchId(collection.bci);

            searchCarteria().branchId(branchId());
            showAllBranches(false);
        }

        exportColumns = [
            new config.ExportColumn(config.language.description[config.currentLanguage()], 'description', 's'),
            new config.ExportColumn(config.language.resourceCode[config.currentLanguage()], 'resourceCode', 's'),
            new config.ExportColumn(config.language.credit[config.currentLanguage()], 'credit', 's'),
            new config.ExportColumn(config.language.cost[config.currentLanguage()], 'cost', 's'),
            new config.ExportColumn(config.language.price[config.currentLanguage()], 'price', 's'),
            new config.ExportColumn(config.language.totalCost[config.currentLanguage()], 'totalCost', 's'),
            new config.ExportColumn(config.language.totalPrice[config.currentLanguage()], 'totalPrice', 's')
        ];


    };

    var exportColumns = [];

    var itemsTable = ko.observableArray([]);

    var itemsColumnDefenition = ko.observable();

    var PrintToExcel = function () {

        config.itemsColumnDefenition.name = "الفواتير";

        config.itemsColumnDefenition.widths = ['10%', '8%', '7%', '7%', '5%', '5%', '5%', '7%', '5%', '5%', '5%'];
        /**
          
         */
        config.itemsColumnDefenition.friendlyNames = [
                                               config.language.description[config.currentLanguage()]
                                             , config.language.resourceCode[config.currentLanguage()]
                                             , config.language.credit[config.currentLanguage()]
                                             , config.language.lastDeliveryDate[config.currentLanguage()]
                                              , config.language.lastQuantity[config.currentLanguage()]

                                             , config.language.supplierName[config.currentLanguage()]
                                             , config.language.lastCashierDate[config.currentLanguage()]
                                             , config.language.cost[config.currentLanguage()]
                                              , config.language.price[config.currentLanguage()]
                                             , config.language.totalCost[config.currentLanguage()]
                                              , config.language.totalPrice[config.currentLanguage()]
        ];

        config.itemsColumnDefenition.fields = ['description', 'resourceCode', 'credit', 'lastRecievedDate', 'lastQuantity', 'suplierName', 'lastSaleDate', 'cost', 'price', 'totalCost', 'totalPrice'];

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

        config.exportJson(exportData, exportColumns, 'excel', 'Itemsstagnant');
    };

    var exportToWord = function () {
        var exportData = ko.toJS(vm.koTable.allItems());
        config.exportJson(exportData, exportColumns, 'word', 'Itemsstagnant');
    };

    function canActivate() {
        if (config.isAllow(109)) {
            return true;
        }
    };

    function canDeActivate() {

        return true;
    };

    var loadMore = function (obj, e) {
        pageNumber(pageNumber() + 1);
        searchCarteria().pageNumber(pageNumber());
        searchCarteria().pageSize(config.pageSize());
        dataservice.getItemsNotTransactions(searchCarteria()).success(function (data) {
            if (data.length > 0) {
                vm.koTable.pushItem(data);
            }

        });

    };

    var vm = {
        loadMore: loadMore,
        itemsTable: itemsTable,
        itemsColumnDefenition: itemsColumnDefenition,
        PrintToExcel: PrintToExcel,
        searchCarteria: searchCarteria,
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
        btnSearch: btnSearch,
        koTableReady: koTableReady
    };

    return vm;

});