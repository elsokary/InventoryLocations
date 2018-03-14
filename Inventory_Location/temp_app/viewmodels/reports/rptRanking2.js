define(['plugins/router', 'services/dataservice', 'config', 'services/tokenstore'], function (router, dataservice, config, tokenStore) {

    var branches = ko.observableArray([]);

    var showAllBranches = ko.observable(false);

    var branchId = ko.observable();

    var showTable = ko.observable(false);

    var dtoSearch = function () {
        var self = this;
        self.branchId = ko.observable();
        self.startDate = ko.observable(moment().format());
        self.finishDate = ko.observable(moment().format());
    };

    var searchCarteria = ko.observable(new dtoSearch());
    var grid = ko.observable({});
    var loader = new Slick.Data.RemoteModel();
    var storyTitleFormatter = function (row, cell, value, columnDef, dataContext) {
        s = "<b><a href='" + dataContext["url"] + "' target=_blank>" +
                  dataContext["title"] + "</a></b><br/>";
        desc = dataContext["text"];
        if (desc) { // on Hackernews many stories don't have a description
            s += desc;
        }
        return s;
    };

    var dateFormatter = function (row, cell, value, columnDef, dataContext) {
        return (value.getMonth() + 1) + "/" + value.getDate() + "/" + value.getFullYear();
    };


    var columns = [
      { id: "num", name: "#", field: "index", width: 40 },
      { id: "suplierName", name: "suplierName", width: 520, formatter: storyTitleFormatter, cssClass: "cell-story" },
      { id: "totalCost", name: "totalCost", field: "totalCost", width: 60, formatter: dateFormatter, sortable: true },
      { id: "totalQuantity", name: "totalQuantity", field: "totalQuantity", width: 60, sortable: true }
    ];


    var options = {
        rowHeight: 64,
        editable: false,
        enableAddRow: false,
        enableCellNavigation: false
    };


    var loadingIndicator = null;

    //grid.onViewportChanged.subscribe(function (e, args) {
    //    var vp = grid.getViewport();
    //    loader.ensureData(vp.top, vp.bottom);
    //});

    //grid.onSort.subscribe(function (e, args) {
    //    loader.setSort(args.sortCol.field, args.sortAsc ? 1 : -1);
    //    var vp = grid.getViewport();
    //    loader.ensureData(vp.top, vp.bottom);
    //});

    //loader.onDataLoading.subscribe(function () {
    //    if (!loadingIndicator) {
    //        loadingIndicator = $("<span class='loading-indicator'><label>Buffering...</label></span>")
    //            .appendTo(document.body);
    //        var $g = $("#myGrid");

    //        loadingIndicator
    //            .css("position", "absolute")
    //            .css("top", $g.position().top + $g.height() / 2 - loadingIndicator.height() / 2)
    //            .css("left", $g.position().left + $g.width() / 2 - loadingIndicator.width() / 2);
    //    }

    //    loadingIndicator.show();
    //});

    //loader.onDataLoaded.subscribe(function (e, args) {
    //    for (var i = args.from; i <= args.to; i++) {
    //        grid.invalidateRow(i);
    //    }

    //    grid.updateRowCount();
    //    grid.render();

    //    loadingIndicator.fadeOut();
    //});

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


        $("#txtSearch")
            .keyup(function (e) {
                if (e.which == 13) {
                    loader.setSearch($(this).val());
                    var vp = grid.getViewport();
                    loader.ensureData(vp.top, vp.bottom);
                }
            });

        loader.setSearch($("#txtSearch").val());
        loader.setSort("create_ts", -1);
        grid.setSortColumn("date", false);

        // load the first page
        grid.onViewportChanged.notify();

    };

    var btnSearch = function (obj, e) {

        $(e.target).button('loading');

        dataservice.getRankingSupliers(searchCarteria()).done(function (data) {
            $(e.target).button('reset');

            grid = new Slick.Grid("#myGrid", loader.data, columns, options);


            vm.koTable.setItems(data);
        });

    };

    var dataModel = function () {
        var self = this;
        self.suplierId = ko.observable();
        self.suplierName = ko.observable();
        self.totalCost = ko.observable();
        self.totalQuantity = ko.observable();
    };

    var createData = function (item) {
        var cashierItemObject = new dataModel();

        if (item) {
            cashierItemObject.suplierId(item.suplierId);
            cashierItemObject.suplierName(item.suplierName);
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
            new config.ExportColumn(config.language.description[config.currentLanguage()], 'suplierName', 's'),
            new config.ExportColumn(config.language.resourceCode[config.currentLanguage()], 'totalCost', 's'),
            new config.ExportColumn(config.language.importQnty[config.currentLanguage()], 'totalQuantity', 's')
        ];


    };

    var exportColumns = [];

    var itemsTable = ko.observableArray([]);

    var itemsColumnDefenition = ko.observable();

    var PrintToExcel = function () {

        config.itemsColumnDefenition.name = "الفواتير";

        config.itemsColumnDefenition.widths = ['30%', '30%', '30%'];

        config.itemsColumnDefenition.friendlyNames = [
                                               config.language.supplierName[config.currentLanguage()]
                                             , config.language.totalPrice[config.currentLanguage()]
                                             , config.language.totalQuantity[config.currentLanguage()]
        ];

        config.itemsColumnDefenition.fields = ['suplierName', 'totalCost', 'totalQuantity'];

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