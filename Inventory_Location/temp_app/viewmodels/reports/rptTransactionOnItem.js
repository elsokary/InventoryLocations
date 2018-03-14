define(['plugins/router', 'services/dataservice', 'config', 'services/tokenstore'], function (router, dataservice, config, tokenStore) {

    var itemId = ko.observable();

    var branches = ko.observableArray([]);

    var suppliers = ko.observableArray([]);

    var categories = ko.observableArray([]);

    var items = ko.observableArray([]);

    var showAllBranches = ko.observable(false);

    var branchId = ko.observable();

    var categoryId = ko.observable();

    var startDate = ko.observable(moment().format('DD/MM/YYYY'));
    var finishDate = ko.observable(moment().format('DD/MM/YYYY'));

    var showTable = ko.observable(false);

    var exportColumns = [];

    var description = ko.observable('');
    var resourceCode = ko.observable();
    var supplierId = ko.observable();

    var itemsTable = ko.observableArray([]);

    var itemsColumnDefenition = ko.observable();
    function attached() {

        $(".fixed-action-btn").tooltip('destroy');

        $(".fixed-action-btn").tooltip({ container: 'body' });

        $('#inventoryForm').validate({

            rules: {
                branchId: {
                    required: true
                },
                refNo: {
                    required: true
                },
                serialNo: {
                    required: true
                },
                resourceCode: {
                    required: true,
                    number: true
                },
                supplierId: {
                    required: true
                },
                invoiceDate: {
                    required: true
                }
            },

            messages: {
                branchId: {
                    required: config.language.toBranch[config.currentLanguage()]
                },
                refNo: {
                    required: ''
                },
                serialNo: {
                    required: ''
                },
                resourceCode: {
                    required: config.language.resourceCode[config.currentLanguage()],
                    number: config.language.onlyNumbers[config.currentLanguage()]
                },
                supplierId: {
                    required: config.language.quantityRequired[config.currentLanguage()]
                },
                invoiceDate: {
                    required: ''
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

        var objectData = {
            startDate: startDate(),
            finishDate: finishDate(),
            branchId: branchId(),
            itemId: itemId(),
            supplierId: supplierId(),
            categoryId: categoryId(),
        };
         
        var invoiceToAdd = ko.toJS(objectData);
         
        invoiceToAdd.finishDate = moment(invoiceToAdd.finishDate, 'DD/MM/YYYY').format('YYYY-MM-DD[T]HH:mm:ss.SSS');
        invoiceToAdd.startDate = moment(invoiceToAdd.startDate, 'DD/MM/YYYY').format('YYYY-MM-DD[T]HH:mm:ss.SSS');

        dataservice.getTransactionsOnItemObject(invoiceToAdd).done(function (data) {
            vm.koTable.setItems([]);

            $(e.target).button('reset');

            vm.koTable.setItems(data);

        });

    };

    var koTableReady = function () {
        if (branchId() && itemId()) {

            dataservice.getTransactionsOnItem(branchId(), itemId()).success(function (data) {
                $(e.target).button('reset');
                vm.koTable.setItems(data);
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
            new config.ExportColumn(config.language.resourceCode[config.currentLanguage()], 'itemName', 's'),
            new config.ExportColumn(config.language.quantity[config.currentLanguage()], 'quantity', 's'),
            new config.ExportColumn(config.language.cost[config.currentLanguage()], 'cost', 's'),
            new config.ExportColumn(config.language.price[config.currentLanguage()], 'price', 's'),
            new config.ExportColumn(config.language.date[config.currentLanguage()], 'creationDate', 'd'),
            new config.ExportColumn(config.language.transactionType[config.currentLanguage()], 'transactionName', 's')
        ];

        dataservice.getSupplierForList().done(function (result) {
            suppliers(result);
        });
        var collection = tokenStore.getPayload();

        branchId(parseInt(collection.bci));

        config.branchId(branchId());

    };

    var PrintToExcel = function () {

        config.itemsColumnDefenition.name = "الفواتير";

        config.itemsColumnDefenition.widths = ['10%', '10%', '7%', '10%', '10%', '10%', '10%'];

        config.itemsColumnDefenition.friendlyNames = [
                                                 config.language.resourceCode[config.currentLanguage()]
                                               , config.language.date[config.currentLanguage()]
                                               , config.language.supplierName[config.currentLanguage()]
                                               , config.language.quantity[config.currentLanguage()]
                                               , config.language.cost[config.currentLanguage()]
                                               , config.language.price[config.currentLanguage()]
                                               , config.language.transactionType[config.currentLanguage()]
        ];

        config.itemsColumnDefenition.fields = ['resourceCode', 'creationDate', 'supplierName', 'quantity', 'cost', 'price', 'transactionName'];

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
        if (config.isAllow(104)) {
            return true;
        }
    };

    function canDeActivate() {

        return true;
    };

    branchId.subscribe(function () {

        if (branchId()) {

            config.branchId(branchId());
        }
    });

    config.isComplet.subscribe(function () {

        if (config.isComplet()) {

            itemId(config.item().id);

            resourceCode(config.item().code);
            description(config.item().subject);

            $('#searchItem').modal('hide');

            config.isComplet(false);
        }
    });

    var showItemModal = function (data, index) {

        $('#searchItem').modal('show');

    };

    var changeItem = function (data, index) {

        dataservice.getItemByResourceCodeByBranchId(ko.toJS(data.resourceCode), branchId()).done(function (result) {
            if (result) {
                resourceCode(result.code);
                itemId(result.id);
            }
        });
    };

    supplierId.subscribe(function () {
        if (supplierId()) {
            dataservice.getCategoriesFirstLevelBysupplierId(supplierId()).done(function (result) {
                categories(result);
            });
        }
    });

    var vm = {
        categoryId: categoryId,
        supplierId: supplierId,
        suppliers: suppliers,
        categories: categories,
        description: description,
        changeItem: changeItem,
        resourceCode: resourceCode,
        showItemModal: showItemModal,
        itemsTable: itemsTable,
        itemsColumnDefenition: itemsColumnDefenition,
        PrintToExcel: PrintToExcel,
        startDate: startDate,
        finishDate: finishDate,
        exportToWord: exportToWord,
        exportToExcel: exportToExcel,
        itemId: itemId,
        canDeActivate: canDeActivate,
        showAllBranches: showAllBranches,
        showTable: showTable,
        branchId: branchId,
        items: items,
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