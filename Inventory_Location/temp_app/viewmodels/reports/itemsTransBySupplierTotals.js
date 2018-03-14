define(['plugins/router', 'services/dataservice', 'config', 'services/tokenstore'], function (router, dataservice, config, tokenStore) {

    var supplierId = ko.observable();

    var branches = ko.observableArray([]);

    var suppliers = ko.observableArray([]);

    var showAllBranches = ko.observable(false);

    var branchId = ko.observable();

    var categoryId = ko.observable();

    var showTable = ko.observable(false);

    var categories = ko.observableArray([]);

    function attached() {

        $(".fixed-action-btn").tooltip('destroy');

        $(".fixed-action-btn").tooltip({ container: 'body' });

        $('#inventoryForm').validate({

            rules: {
                branchId: {
                    required: true
                },
                supplierId: {
                    required: true,
                    digits: true
                },
                categoryId: {
                    required: true,
                    digits: true
                }
            },

            messages: {
                branchId: {
                    required: config.language.toBranch[config.currentLanguage()]
                },
                supplierId: {
                    required: config.language.supplierName[config.currentLanguage()],
                    digits: config.language.supplierName[config.currentLanguage()]
                },
                categoryId: {
                    required: config.language.primaryBrand[config.currentLanguage()],
                    digits: config.language.primaryBrand[config.currentLanguage()]
                }
            },

            // Do not change code below
            errorPlacement: function (error, element) {
                error.insertAfter(element.parent());
            }
        });

    };

    var btnSearch = function (obj, e) {

        if (supplierId() && categoryId()) {

            $(e.target).button('loading');

            dataModelList([]);

            preparePrint();
            dataservice.getTransactionBySupplierTotals(branchId(), supplierId(), categoryId()).done(function (data) {
                $(e.target).button('reset');

                vm.koTable.setItems([]);
                  
                itemsTable(data);

                vm.koTable.setItems(data);
            });
        } else {
            $.smallBox({
                title: "تم الغاء العملية",
                content: "<i class='fa fa-clock-o'></i> <i>.....برجاء اختيار المورد والبراند .......</i>",
                color: "#C46A69",
                iconSmall: "fa fa-times fa-2x fadeInRight animated",
                timeout: 2000
            });
        }

    };

    var btnPrint = function (obj, e) {
        var h = document.getElementById("data").innerHTML;
        var d = $("<div>").addClass("print").html(h).appendTo("html");
        window.print();
        d.remove();
    };

    var dataModel = function () {
        var self = this;
        self.cost = ko.observable();
        self.price = ko.observable();
        self.description = ko.observable();
        self.resourceCode = ko.observable();
        self.credit = ko.observable();
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
            cashierItemObject.cost(item.cost);
            cashierItemObject.price(item.price);
            cashierItemObject.description(item.description);
            cashierItemObject.resourceCode(item.resourceCode);
            cashierItemObject.credit(item.credit);
        }

        return cashierItemObject;
    };

    var dataModelList = ko.observableArray([]);

    var koTableReady = function () {

        var collection = tokenStore.getPayload();

        branchId(parseInt(collection.bci));

        if (branchId() && supplierId()) {

            dataModelList([]);

            dataservice.getTransactionBySupplierTotals(branchId(), supplierId()).success(function (data) {

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

        dataservice.getSupplierForList().done(function (result) {
            suppliers(result);
        });

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

    var preparePrint = function () {

        config.itemsColumnDefenition.widths = ['32%', '22%', '6%', '7%', '7%', '12%', '12%'];

        config.itemsColumnDefenition.friendlyNames = [
                                               config.language.description[config.currentLanguage()]
                                             , config.language.resourceCode[config.currentLanguage()]
                                             , config.language.credit[config.currentLanguage()]
                                             , config.language.cost[config.currentLanguage()]
                                              , config.language.price[config.currentLanguage()]
                                             , config.language.totalCost[config.currentLanguage()]
                                              , config.language.totalPrice[config.currentLanguage()]
        ];

        config.itemsColumnDefenition.fields = ['description', 'resourceCode', 'credit', 'cost', 'price', 'totalCost', 'totalPrice'];

        itemsColumnDefenition(config.itemsColumnDefenition);

        itemsColumnDefenition(config.itemsColumnDefenition);
    };

    var PrintToExcel = function () {


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
        if (config.isAllow(106)) {
            return true;
        }
    };

    function canDeActivate() {

        return true;
    };

    var cost = ko.observable(false);

    var price = ko.observable(false);

    supplierId.subscribe(function () {
        if (supplierId()) {

            dataservice.getCategoriesFirstLevelBysupplierId(supplierId()).done(function (result) {
                categories(result);
            });
        }
    });

    var vm = {
        categories: categories,
        categoryId: categoryId,
        itemsTable: itemsTable,
        itemsColumnDefenition: itemsColumnDefenition,
        PrintToExcel: PrintToExcel,
        btnPrint: btnPrint,
        cost: cost,
        price: price,
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