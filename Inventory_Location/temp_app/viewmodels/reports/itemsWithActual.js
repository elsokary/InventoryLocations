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

        var invenList = []

        var arr = ko.toJS(vm.koTable.allItems());

        arr.forEach(function (result) {
            var inven = {};
            inven.id = result.id;
            inven.itemId = result.itemId;
            inven.branchId = branchId();
            inven.quantity = result.actualQuantity;

            invenList.push(inven);

        });

        if (invenList.length > 0) {

            $(e.target).button('loading');

            dataservice.editInventoryActual(invenList).then(function () {
                $(e.target).button('reset');

            });
        }

    };

    var dataModel = function () {
        var self = this;
        self.supplierName = ko.observable();
        self.categoryName = ko.observable();
        self.itemId = ko.observable();
        self.id = ko.observable();
        self.quantity = ko.observable();
        self.actualQuantity = ko.observable();
        self.price = ko.observable();
        self.cost = ko.observable();
        self.description = ko.observable();
        self.resourceCode = ko.observable();
    };

    var createData = function (item) {
        var cashierItemObject = new dataModel();

        if (item) {
            cashierItemObject.supplierName(item.supplierName);
            cashierItemObject.categoryName(item.categoryName);
            cashierItemObject.itemId(item.itemId);
            cashierItemObject.id(item.id);
            cashierItemObject.quantity(item.quantity);
            cashierItemObject.actualQuantity(item.actualQuantity);
            cashierItemObject.price(item.price);
            cashierItemObject.cost(item.cost);
            cashierItemObject.description(item.description);
            cashierItemObject.resourceCode(item.resourceCode);
        }

        return cashierItemObject;
    };

    var dataModelList = ko.observableArray([]);

    var koTableReady = function () {

        var collection = tokenStore.getPayload();

        branchId(parseInt(collection.bci));

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
            new config.ExportColumn(config.language.description[config.currentLanguage()], 'suplierName', 's'),
            new config.ExportColumn(config.language.resourceCode[config.currentLanguage()], 'totalCost', 's'),
            new config.ExportColumn(config.language.importQnty[config.currentLanguage()], 'totalQuantity', 's')
        ];


    };

    var exportColumns = [];

    var itemsTable = ko.observableArray([]);

    var itemsColumnDefenition = ko.observable();

    var PrintToExcel = function () {

        config.itemsColumnDefenition.name = "الفواتير";

        config.itemsColumnDefenition.widths = ['10%', '5%', '7%', '10%', '10%'];

        config.itemsColumnDefenition.friendlyNames = [
                                               config.language.invoiceDate[config.currentLanguage()]
                                             , config.language.serialNo[config.currentLanguage()]
                                             , config.language.paymentType[config.currentLanguage()]
                                             , config.language.UserName[config.currentLanguage()]
                                              , config.language.branchNameEn[config.currentLanguage()]
        ];

        config.itemsColumnDefenition.fields = ['date', 'serial', 'paymentType', 'enteredByName', 'branchName'];

        itemsColumnDefenition(config.itemsColumnDefenition);

        itemsColumnDefenition(config.itemsColumnDefenition);

        var exportData = vm.koTable.allItems();

        itemsTable(exportData);

        var contents = $("#dvContents").html();
        var frame1 = $('<iframe />');
        frame1[0].name = "frame1";
        frame1.css({ "position": "absolute", "top": "-1000000px" });
        $("body").append(frame1);
        var frameDoc = frame1[0].contentWindow ? frame1[0].contentWindow : frame1[0].contentDocument.document ? frame1[0].contentDocument.document : frame1[0].contentDocument;
        frameDoc.document.open();
        //Create a new HTML document.
        frameDoc.document.write('<html><head><title>DIV Contents</title>');
        frameDoc.document.write('</head><body>');
        //Append the external CSS file.
        frameDoc.document.write('<link href="../css/printStyle.css" rel="stylesheet" type="text/css" /><link href="../css/override.css" rel="stylesheet" type="text/css" />');
        //Append the DIV contents.
        frameDoc.document.write(contents);
        frameDoc.document.write('</body></html>');
        frameDoc.document.close();
        setTimeout(function () {
            window.frames["frame1"].focus();
            window.frames["frame1"].print();
            frame1.remove();
        }, 1000);

    };

    var exportToExcel = function () {
        var exportData = ko.toJS(vm.koTable.allItems());

        config.exportJson(exportData, exportColumns, 'excel', 'Ranking Supliers');
    };

    var exportToWord = function () {
        var exportData = ko.toJS(vm.koTable.allItems());
        config.exportJson(exportData, exportColumns, 'word', 'Ranking Supliers');
    };

    branchId.subscribe(function () {
        if (branchId()) {

            vm.koTable.setItems([]);

            dataModelList([]);

            dataservice.getAllItemInventoryWithActual(branchId(), pageNumber(), config.pageSize()).done(function (data) {

                vm.koTable.setItems(data);

                data.forEach(function (item) {
                    dataModelList.push(createData(item));
                });

                vm.koTable.setItems(dataModelList());
            });

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

    var vm = {
        loadMore: loadMore,
        itemsTable: itemsTable,
        itemsColumnDefenition: itemsColumnDefenition,
        PrintToExcel: PrintToExcel,
        exportToWord: exportToWord,
        exportToExcel: exportToExcel,
        canDeActivate: canDeActivate,
        showAllBranches: showAllBranches,
        showTable: showTable,
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