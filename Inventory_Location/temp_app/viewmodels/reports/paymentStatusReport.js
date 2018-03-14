define(['plugins/router', 'services/dataservice', 'config', 'services/tokenstore'], function (router, dataservice, config, tokenStore) {

    var branches = ko.observableArray([]);

    var showAllBranches = ko.observable(false);

    var branchId = ko.observable();

    var dtoSearch = function () {
        var self = this;
        self.branchId = ko.observable();
        self.startDate = ko.observable(moment().format("DD/MM/YYYY"));
        self.finishDate = ko.observable(moment().format("DD/MM/YYYY"));
    };

    var searchCarteria = ko.observable(new dtoSearch());

    function attached() {

        $(".fixed-action-btn").tooltip('destroy');

        $(".fixed-action-btn").tooltip({ container: 'body' });

    };

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
        var collection = tokenStore.getPayload();

        branchId(collection.bci);

        searchCarteria().branchId(branchId());
    };

    var exportColumns = [];

    var itemsTable = ko.observableArray([]);

    var itemsColumnDefenition = ko.observable();

    var PrintToExcel = function () {

        config.itemsColumnDefenition.name = "تقرير حالة الموردين";

        config.itemsColumnDefenition.widths = ['15%', '10%', '7%', '10%', '10%', '10%', '10%', '7%', '15%', '10%'];

        config.itemsColumnDefenition.friendlyNames = [
                                               config.language.supplierName[config.currentLanguage()]
                                             , config.language.code[config.currentLanguage()]
                                             , config.language.purchases[config.currentLanguage()]
                                             , config.language.returneds[config.currentLanguage()]
                                             , config.language.netPurchase[config.currentLanguage()]
                                             , config.language.sales[config.currentLanguage()]
                                             , config.language.refunds[config.currentLanguage()]
                                             , config.language.netSales[config.currentLanguage()]
                                             , config.language.payments[config.currentLanguage()]
                                             , config.language.credit[config.currentLanguage()]
        ];

        config.itemsColumnDefenition.fields = ['supplierName', 'supplierCode', 'purcahse', 'returnedPurchase', 'netPurchase', 'sales', 'returnedSales', 'netSales', 'payment', 'credit'];

        itemsColumnDefenition(config.itemsColumnDefenition);

        itemsColumnDefenition(config.itemsColumnDefenition);

        var exportData = ko.toJS(vm.koTable.allItems());

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

    var btnSearch = function (obj, e) {

        if (branchId()) {

            vm.koTable.setItems([]);

            var odata = ko.toJS(searchCarteria());

            //odata.startDate = moment(odata.startDate, 'DD/MM/YYYY').format();
            //odata.finishDate = moment(odata.finishDate, 'DD/MM/YYYY').format();

            odata.startDate = moment(odata.startDate, 'DD/MM/YYYY').format('YYYY-MM-DD[T]HH:mm:ss.SSS');
            odata.finishDate = moment(odata.finishDate, 'DD/MM/YYYY').format('YYYY-MM-DD[T]HH:mm:ss.SSS');
            dataservice.getPaymentsStatusReport(odata).done(function (data) {

                vm.koTable.setItems(data);

            });
        }
    };

    function canActivate() {
        if (config.isAllow(107)) {
            return true;
        }
    }

    function canDeActivate() {

        return true;
    };

    var vm = {
        searchCarteria: searchCarteria,
        btnSearch: btnSearch,
        PrintToExcel: PrintToExcel,
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
        koTableReady: koTableReady,
        itemsTable: itemsTable,
        itemsColumnDefenition: itemsColumnDefenition
    };

    return vm;

});