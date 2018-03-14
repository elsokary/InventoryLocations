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
         
        exportColumns = [
                new config.ExportColumn(config.language.supplierName[config.currentLanguage()], 'supplierName', 's'),
                new config.ExportColumn(config.language.categoryName[config.currentLanguage()], 'cateoryName', 's'),
                new config.ExportColumn(config.language.percentageValue2[config.currentLanguage()], 'credit', 's'),
                new config.ExportColumn(config.language.date[config.currentLanguage()], 'date', 'd'),
                new config.ExportColumn(config.language.chequeNo[config.currentLanguage()], 'chequeNo', 's')
        ];

        dataservice.getSupplierForList().done(function (result) {
            suppliers(result);
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

    var suppliers = ko.observableArray([]);

    var itemsColumnDefenition = ko.observable();

    var PrintToExcel = function () {

        config.itemsColumnDefenition.name = "تقرير مدفوعات مورد";

        config.itemsColumnDefenition.widths = ['25%', '25%', '15%', '15%', '15%'];

        config.itemsColumnDefenition.friendlyNames = [
                                               config.language.supplierName[config.currentLanguage()]
                                             , config.language.categoryName[config.currentLanguage()]
                                             , config.language.percentageValue2[config.currentLanguage()]
                                             , config.language.date[config.currentLanguage()]
                                             , config.language.chequeNo[config.currentLanguage()]
        ];

        config.itemsColumnDefenition.fields = ['supplierName', 'cateoryName', 'credit', 'date', 'chequeNo'];

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

        config.exportJson(exportData, exportColumns, 'excel', 'Payments Supplier Rport');
    };

    var exportToWord = function () {

        var exportData = ko.toJS(vm.koTable.allItems());

        config.exportJson(exportData, exportColumns, 'word', 'Payments Supplier Rport');
    };

    branchId.subscribe(function () {
        if (branchId()) {
            vm.koTable.setItems([]);
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

    var supplierId = ko.observable();

    var startDate = ko.observable(moment().format('DD/MM/YYYY'));

    var finishDate = ko.observable(moment().format('DD/MM/YYYY'));

    var btnSearch = function (obj, e) {
        if (supplierId()) {
            $(e.target).button('loading');

            var objectData = {
                startDate: startDate(),
                finishDate: finishDate(),
                branchId: branchId(),
                supplierId: supplierId()
            };

            var invoiceToAdd = ko.toJS(objectData);

            invoiceToAdd.finishDate = moment(invoiceToAdd.finishDate, 'DD/MM/YYYY').format('YYYY-MM-DD[T]HH:mm:ss.SSS');
            invoiceToAdd.startDate = moment(invoiceToAdd.startDate, 'DD/MM/YYYY').format('YYYY-MM-DD[T]HH:mm:ss.SSS');

            dataservice.getPaymentsSupplierReport(invoiceToAdd).done(function (data) {
                vm.koTable.setItems([]);

                $(e.target).button('reset');

                vm.koTable.setItems(data);

            });

        }
    }

    var vm = {
        btnSearch: btnSearch,
        startDate: startDate,
        finishDate: finishDate,
        suppliers: suppliers,
        supplierId: supplierId,
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