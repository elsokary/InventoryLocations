define(['plugins/router', 'services/dataservice', 'config', 'services/tokenstore'], function (router, dataservice, config, tokenStore) {

    var branches = ko.observableArray([]);

    var customers = ko.observableArray([]);

    var types = ko.observableArray([]);

    var ListTypes = ko.observableArray([]);

    var showAllBranches = ko.observable(false);

    var branchId = ko.observable();

    var showTable = ko.observable(false);

    var dtoSearch = function () {
        var self = this;
        self.branchId = ko.observable();
        self.suppliersList = ko.observableArray([]);
        self.paymentTypeList = ko.observableArray([]);
        self.startDate = ko.observable(moment().format());
        self.finishDate = ko.observable(moment().format());
    };

    var searchCarteria = ko.observable(new dtoSearch());

    var dataArray = ko.observableArray([]);

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

    var btnSearch = function (obj, e) {

        var isValid = $('#itemAddForm').valid();

        if (isValid) {

            $(e.target).button('loading');

            var arr = [];

            var objData = ko.toJS(searchCarteria());

            objData.startDate = moment(objData.startDate, 'DD/MM/YYYY').format();

            dataservice.getPaymentsCustomers(objData).then(function (data) {

                $(e.target).button('reset');
                var datail = JSON.parse(data.response);

                dataArray(ko.toJS(datail));
                
                showTable(true);

            });
        } else {
            $('#itemAddForm').validate();
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

            showAllBranches(false);
            var collection = tokenStore.getPayload();
            branchId(collection.bci);
            searchCarteria().branchId(branchId());

        }

        dataservice.getCustomersList().done(function (result) {
            customers(result);

        });

        dataservice.getListType().done(function (result) {
            types(result);
        });

        exportColumns = [
            new config.ExportColumn(config.language.customerName[config.currentLanguage()], 'customerName', 's'),
            new config.ExportColumn(config.language.referenceCode[config.currentLanguage()], 'customerCode', 's'),
            new config.ExportColumn(config.language.paymentType[config.currentLanguage()], 'paymentTypeTitle', 's'),
            new config.ExportColumn(config.language.total[config.currentLanguage()], 'total', 's')
        ];


    };

    var exportColumns = [];

    var itemsTable = ko.observableArray([]);

    var itemsColumnDefenition = ko.observable();

    var PrintToExcel = function () {

        config.itemsColumnDefenition.name = "تقرير مدفوعات العملاء خلال فترة";

        config.itemsColumnDefenition.widths = ['25%', '25%', '25%', '25%'];

        config.itemsColumnDefenition.friendlyNames = [
                                               config.language.customerName[config.currentLanguage()]
                                             , config.language.referenceCode[config.currentLanguage()]
                                             , config.language.totalQuantity[config.currentLanguage()]
                                             , config.language.total[config.currentLanguage()]
        ];

        config.itemsColumnDefenition.fields = ['customerName', 'customerCode', 'paymentTypeTitle', 'total'];

        itemsColumnDefenition(config.itemsColumnDefenition);

        var exportData = dataArray();

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

        config.exportJson(exportData, exportColumns, 'excel', 'rpt Customer Pyments');
    };

    var exportToWord = function () {
        var exportData = ko.toJS(vm.koTable.allItems());
        config.exportJson(exportData, exportColumns, 'word', ' rpt Customer Pyments  ');
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
        dataArray: dataArray,
        ListTypes: ListTypes,
        customers: customers,
        types: types,
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
        btnSearch: btnSearch 
    };

    return vm;

});