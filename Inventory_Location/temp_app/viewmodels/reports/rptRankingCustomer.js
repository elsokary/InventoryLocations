define(['plugins/router', 'services/dataservice', 'config', 'services/tokenstore'], function (router, dataservice, config, tokenStore) {

    var branches = ko.observableArray([]);

    var showAllBranches = ko.observable(false);

    var branchId = ko.observable();

    var showTable = ko.observable(false);

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
        var objData = ko.toJS(searchCarteria());

        objData.startDate = moment(objData.startDate, 'DD/MM/YYYY').format('YYYY-MM-DD[T]HH:mm:ss.SSS');
        objData.finishDate = moment(objData.finishDate, 'DD/MM/YYYY').format('YYYY-MM-DD[T]HH:mm:ss.SSS');

        dataservice.getRankingCustomers(objData).done(function (data) {
            $(e.target).button('reset');

            dataModelList([]);

            data.forEach(function (item) {
                dataModelList.push(createData(item));
            });

            vm.koTable.setItems([]);

            vm.koTable.setItems(dataModelList());
        });

    };

    var dataModel = function () {
        var self = this;
        self.suplierId = ko.observable();
        self.customerName = ko.observable();
        self.totalCost = ko.observable();
        self.totalQuantity = ko.observable();
    };

    var createData = function (item) {
        var cashierItemObject = new dataModel();

        if (item) {
            cashierItemObject.suplierId(item.suplierId);
            cashierItemObject.customerName(item.customerName);
            cashierItemObject.totalCost(item.totalCost);
            cashierItemObject.totalQuantity(item.totalQuantity);
        }

        return cashierItemObject;
    };

    var dataModelList = ko.observableArray([]);

    var koTableReady = function () {

    };

    function activate() {

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
            new config.ExportColumn(config.language.customerName[config.currentLanguage()], 'customerName', 's'),
            new config.ExportColumn(config.language.importQnty[config.currentLanguage()], 'totalQuantity', 's'),
            new config.ExportColumn(config.language.resourceCode[config.currentLanguage()], 'totalCost', 's')
        ];

       
    };

    var exportColumns = [];

    var itemsTable = ko.observableArray([]);

    var itemsColumnDefenition = ko.observable();

    var PrintToExcel = function () {

        config.itemsColumnDefenition.name = config.language.rptRankingCustomer[config.currentLanguage()];

        config.itemsColumnDefenition.widths = ['30%', '30%', '30%'];
      
        config.itemsColumnDefenition.friendlyNames = [
                                               config.language.customerName[config.currentLanguage()]
                                             , config.language.totalQuantity[config.currentLanguage()] 
                                             , config.language.totalPrice[config.currentLanguage()]
        ];

        config.itemsColumnDefenition.fields = ['customerName', 'totalQuantity', 'totalCost'];

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