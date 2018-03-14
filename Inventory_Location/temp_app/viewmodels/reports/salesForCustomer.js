define(['plugins/router', 'services/dataservice', 'config', 'services/tokenstore'], function (router, dataservice, config, tokenStore) {

    var branches = ko.observableArray([]);

    var showAllBranches = ko.observable(false);

    var branchId = ko.observable();

    var showTable = ko.observable(false);

    var dtoSearch = function () {
        var self = this;
        self.branchId = ko.observable();
        self.customerId = ko.observable();
        self.startDate = ko.observable(moment().format("DD/MM/YYYY"));
        self.finishDate = ko.observable(moment().format("DD/MM/YYYY"));
    };

    var searchCarteria = ko.observable(new dtoSearch());

    function attached() {

        $(".fixed-action-btn").tooltip('destroy');

        $(".fixed-action-btn").tooltip({ container: 'body' });

        $('#inventoryForm').validate({

            rules: {
                branchId: {
                    required: true
                },
                customerId: {
                    required: true
                }
            },

            messages: {
                branchId: {
                    required: config.language.toBranch[config.currentLanguage()]
                },
                customerId: {
                    required: config.language.customerName[config.currentLanguage()]
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
        var objData = ko.toJS(searchCarteria());

        objData.startDate = moment(objData.startDate, 'DD/MM/YYYY').format('YYYY-MM-DD[T]HH:mm:ss.SSS');
        objData.finishDate = moment(objData.finishDate, 'DD/MM/YYYY').format('YYYY-MM-DD[T]HH:mm:ss.SSS');

        dataservice.getSalesByCustomer(objData).done(function (data) {
            $(e.target).button('reset');

            dataModelList([]);

            data.forEach(function (item) {
                dataModelList.push(createData(item));
            });

            vm.koTable.setItems([]);

            vm.koTable.setItems(dataModelList());
        });

    };

    var customers = ko.observableArray([]);

    var dataModel = function () {
        var self = this;
        self.date = ko.observable();
        self.serial = ko.observable();
        self.customerName = ko.observable();
        self.branchName = ko.observable();
        self.total = ko.observable();
        self.paymentType = ko.observable();
    };

    var createData = function (item) {
        var cashierItemObject = new dataModel();

        if (item) {
            cashierItemObject.serial(item.serial);
            cashierItemObject.customerName(item.customerName);
            cashierItemObject.branchName(item.branchName);
            cashierItemObject.total(item.total);
            cashierItemObject.paymentType(item.paymentType);
            cashierItemObject.date(item.date);
        }

        return cashierItemObject;
    };

    var dataModelList = ko.observableArray([]);

    var koTableReady = function () {

    };

    function activate() {

        dataservice.getCustomersList().done(function (result) {
            customers(result);

        });

        if (config.isAllow(41)) {
            showAllBranches(true);
            dataservice.getBranchesForListAll().done(function (result) {
                branches(result);
                var collection = tokenStore.getPayload();

                branchId(collection.bci);

            });

        } else {

            showAllBranches(false);
            var collection = tokenStore.getPayload();

            branchId(collection.bci);

        }

        exportColumns = [
            new config.ExportColumn(config.language.invoiceNumber[config.currentLanguage()], 'serial', 's'),
            new config.ExportColumn(config.language.customerName[config.currentLanguage()], 'customerName', 's'),
            new config.ExportColumn(config.language.branchNameEn[config.currentLanguage()], 'branchName', 's'),
            new config.ExportColumn(config.language.date[config.currentLanguage()], 'date', 's'),
            new config.ExportColumn(config.language.total[config.currentLanguage()], 'total', 's'),
            new config.ExportColumn(config.language.paymentType[config.currentLanguage()], 'paymentType', 's')
        ];


    };

    var exportColumns = [];

    var itemsTable = ko.observableArray([]);

    var itemsColumnDefenition = ko.observable();

    var PrintToExcel = function () {

        config.itemsColumnDefenition.name = config.language.salesCustomer[config.currentLanguage()];

        config.itemsColumnDefenition.widths = ['10%', '20%', '10%', '15%', '15%', '15%'];

        config.itemsColumnDefenition.friendlyNames = [
                                               config.language.invoiceNumber[config.currentLanguage()]
                                             , config.language.customerName[config.currentLanguage()]
                                             , config.language.total[config.currentLanguage()]
                                             , config.language.date[config.currentLanguage()]
                                             , config.language.branchNameEn[config.currentLanguage()]
                                             , config.language.paymentType[config.currentLanguage()]
        ];

        config.itemsColumnDefenition.fields = ['serial', 'customerName', 'total', 'date', 'branchName', 'paymentType'];

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

        config.exportJson(exportData, exportColumns, 'excel', 'Ranking Supliers');
    };

    var exportToWord = function () {
        var exportData = ko.toJS(vm.koTable.allItems());
        config.exportJson(exportData, exportColumns, 'word', 'Ranking Supliers');
    };

    function canActivate() {
        if (config.isAllow(108)) {
            return true;
        }
    };

    function canDeActivate() {

        return true;
    };

    var vm = {
        customers: customers,
        itemsTable: itemsTable,
        itemsColumnDefenition: itemsColumnDefenition,
        PrintToExcel: PrintToExcel,
        searchCarteria: searchCarteria,
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