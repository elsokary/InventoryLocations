define(['plugins/router', 'services/dataservice', 'config', 'services/tokenstore'], function (router, dataservice, config, tokenStore) {

    var branches = ko.observableArray([]);

    var showAllBranches = ko.observable(false);

    var branchId = ko.observable();

    var exportColumns = [];

    var dtoSearch = function () {
        var self = this;
        self.branchId = ko.observable();
        self.startDate = ko.observable(moment().format());
        self.finishDate = ko.observable(moment().format());
    };

    var searchCarteria = ko.observable(new dtoSearch());

    var showTable = ko.observable(false);

    function attached() {

        $(".fixed-action-btn").tooltip('destroy');

        $(".fixed-action-btn").tooltip({ container: 'body' });

        $('#itemAddForm').validate({
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

    var koTableReady = function () {

        var collection = tokenStore.getPayload();

        branchId(parseInt(collection.bci));

        var objData = { branchId: branchId() };

        dataservice.getSuppliersTotals(objData).success(function (data) {

            vm.koTable.setItems(data);

            showTable(true);

        });

    };

    function activate() {

        var collection = tokenStore.getPayload();

        if (config.isAllow(41)) {
            showAllBranches(true);
            dataservice.getBranchesForListAll().done(function (result) {
                branches(result);
                branchId(collection.bci);
                searchCarteria().branchId(branchId());
            });
        } else {

            showAllBranches(false);
            branchId(collection.bci);
            searchCarteria().branchId(branchId());
        }


        exportColumns = [
            new config.ExportColumn(config.language.supplierName[config.currentLanguage()], 'supplierName', 's'),
            new config.ExportColumn(config.language.referenceCode[config.currentLanguage()], 'supplierCode', 's'),
            new config.ExportColumn(config.language.procurement[config.currentLanguage()], 'totalSales', 's'),
            new config.ExportColumn(config.language.returneds[config.currentLanguage()], 'totalReturnedInvoices', 's'),
            new config.ExportColumn(config.language.netPurchase[config.currentLanguage()], 'net', 's'),
            new config.ExportColumn(config.language.totalPayment[config.currentLanguage()], 'totalPayment', 's'),
            new config.ExportColumn(config.language.balance[config.currentLanguage()], 'balance', 's')
        ];

    };

    var itemsTable = ko.observableArray([]);

    var itemsColumnDefenition = ko.observable();

    var PrintToExcel = function () {

        config.itemsColumnDefenition.name = "تقرير اجمالى الموردين";

        config.itemsColumnDefenition.widths = ['5%', '20%', '15%', '15%', '15%', '15%', '15%'];

        config.itemsColumnDefenition.friendlyNames = [
                                               config.language.referenceCode[config.currentLanguage()]
                                             , config.language.supplierName[config.currentLanguage()]
                                             , config.language.procurement[config.currentLanguage()]
                                             , config.language.returneds[config.currentLanguage()]
                                             , config.language.netPurchase[config.currentLanguage()]
                                             , config.language.totalPayment[config.currentLanguage()]
                                             , config.language.balance[config.currentLanguage()]
        ];

        config.itemsColumnDefenition.fields = ['supplierCode', 'supplierName', 'totalSales', 'totalReturnedInvoices','net', 'totalPayments', 'balance'];

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

        config.exportJson(exportData, exportColumns, 'excel', 'تقرير اجمالى الموردين');
    };

    var exportToWord = function () {
        var exportData = ko.toJS(vm.koTable.allItems());
        config.exportJson(exportData, exportColumns, 'word', ' تقرير اجمالى الموردين');
    };

    function canActivate() {
        if (config.isAllow(1015)) {
            return true;
        }
    };

    function canDeActivate() {

        return true;
    };

    var btnSearch = function (obj, e) {

        var isValid = $('#itemAddForm').valid();

        if (isValid) {

            $(e.target).button('loading');

            var objData = ko.toJS(searchCarteria());

            dataservice.getSuppliersTotals(objData).success(function (data) {

                $(e.target).button('reset');
                vm.koTable.setItems(data);
                showTable(true);

            });
        } else {
            $('#itemAddForm').validate();
        }

    };

    var vm = {
        btnSearch: btnSearch,
        showTable: showTable,
        searchCarteria: searchCarteria,
        itemsTable: itemsTable,
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