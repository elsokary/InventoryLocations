define(['plugins/router', 'services/dataservice', 'config', 'services/tokenstore'], function (router, dataservice, config, tokenStore) {

    var branches = ko.observableArray([]);

    var showAllBranches = ko.observable(false);

    var branchId = ko.observable();

    var pageNumber = ko.observable(0);

    var dtoSearch = function () {
        var self = this;
        self.branchId = ko.observable();
        self.categoryId = ko.observable();
        self.pageSize = ko.observable(10000);
        self.pageNumber = ko.observable(0);
        self.startDate = ko.observable(moment().format());
        self.finishDate = ko.observable(moment().format());
        self.prevoiuseStartDate = ko.observable(moment().format());
        self.prevoiuseFinishDate = ko.observable(moment().format());
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

    var categories = ko.observableArray([]);

    function activate() {

        dataservice.getDepartmentList().done(function (result) {
            categories(result);
        });

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

        config.itemsColumnDefenition.name = "تقرير مقارنة مبيعات فترات ";

        config.itemsColumnDefenition.widths = ['20%', '25%', '10%', '15%', '15%', '15%'];

        config.itemsColumnDefenition.friendlyNames = [
                                              config.language.resourceCode[config.currentLanguage()]
                                             , config.language.description[config.currentLanguage()]
                                             , config.language.prevoiuseValue[config.currentLanguage()]
                                             , config.language.currentValue[config.currentLanguage()]
                                             , config.language.totalVariance[config.currentLanguage()]
                                             , config.language.value[config.currentLanguage()]
        ];

        config.itemsColumnDefenition.fields = ['code', 'itemName', 'prevoiuseValue', 'currentValue', 'varianceValue', 'percentage'];

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

        config.exportJson(exportData, exportColumns, 'excel', 'Item Actual Report');
    };

    var btnSearch = function (obj, e) {

        if (branchId()) {

            vm.koTable.setItems([]);

            var odata = ko.toJS(searchCarteria());

            odata.pageNumber = pageNumber();

            odata.startDate = moment(odata.startDate, 'DD/MM/YYYY').format();
            odata.finishDate = moment(odata.finishDate, 'DD/MM/YYYY').format();

            odata.prevoiuseFinishDate = moment(odata.prevoiuseFinishDate, 'DD/MM/YYYY').format();
            odata.prevoiuseStartDate = moment(odata.prevoiuseStartDate, 'DD/MM/YYYY').format();
            $(e.target).button('loading');

            dataservice.getPaymentsCompaisonReport(odata).done(function (data) {

                $(e.target).button('reset');

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
    var loadMore = function (obj, e) {

        pageNumber(pageNumber() + 1);

        var odata = ko.toJS(searchCarteria());

        odata.pageNumber = pageNumber();

        odata.startDate = moment(odata.startDate, 'DD/MM/YYYY').format();
        odata.finishDate = moment(odata.finishDate, 'DD/MM/YYYY').format();

        odata.prevoiuseFinishDate = moment(odata.prevoiuseFinishDate, 'DD/MM/YYYY').format();
        odata.prevoiuseStartDate = moment(odata.prevoiuseStartDate, 'DD/MM/YYYY').format();
        $(e.target).button('loading');

        dataservice.getPaymentsCompaisonReport(odata).done(function (data) {
            if (data.length > 0) {

                vm.koTable.pushItem(data);
            }
        });

    };

    var vm = {
        loadMore: loadMore,
        itemsTable: itemsTable,
        itemsColumnDefenition: itemsColumnDefenition,
        categories: categories,
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
        koTableReady: koTableReady
    };

    return vm;

});