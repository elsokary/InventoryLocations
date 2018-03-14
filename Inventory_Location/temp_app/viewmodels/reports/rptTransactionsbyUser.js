define(['plugins/router', 'services/dataservice', 'config', 'services/tokenstore'], function (router, dataservice, config, tokenStore) {
     
    var showAllBranches = ko.observable(false);
     
    var showTable = ko.observable(false);

    function attached() {

        $(".fixed-action-btn").tooltip('destroy');

        $(".fixed-action-btn").tooltip({ container: 'body' });

    };
     
    var koTableReady = function () {

        dataservice.getTransactionsOnUser().success(function (data) {

            vm.koTable.setItems(data);
        });

    };

    function activate() {

        if (config.isAllow(41)) {
            showAllBranches(true);
        }

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
        canDeActivate: canDeActivate,
        showAllBranches: showAllBranches,
        showTable: showTable, 
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