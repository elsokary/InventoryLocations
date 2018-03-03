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
        searchCarteria().branchId(branchId());

        if (searchCarteria().branchId()) {
            var collection = tokenStore.getPayload();

            searchCarteria().branchId(parseInt(collection.bci));

        }

        $(e.target).button('loading');


        var odata = ko.toJS(searchCarteria());

        //odata.startDate = moment(odata.startDate, 'DD/MM/YYYY').format();
        //odata.finishDate = moment(odata.finishDate, 'DD/MM/YYYY').format();


        odata.startDate = moment(odata.startDate, 'DD/MM/YYYY').format('YYYY-MM-DD[T]HH:mm:ss.SSS');
        odata.finishDate = moment(odata.finishDate, 'DD/MM/YYYY').format('YYYY-MM-DD[T]HH:mm:ss.SSS');

        dataservice.getSalesAnalysis(odata).done(function (data) {
            $(e.target).button('reset');
             
            vm.koTable.setItems(data);
        });

    };
      
    var koTableReady = function () {

    };

    function activate() {

        var collection = tokenStore.getPayload();

        if (config.isAllow(41)) {

            showAllBranches(true);

            dataservice.getBranchesForListAll().done(function (result) {
                branches(result);
                
            });

        } else {

            showAllBranches(false);

        }


        branchId(parseInt(collection.bci));

        searchCarteria().branchId(branchId());

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

        config.itemsColumnDefenition.widths = ['15%', '20%', '10%', '8%', '8%', '8%', '8%', '7%', '8%', '7%', '7%'];

        config.itemsColumnDefenition.friendlyNames = [
                                               config.language.code[config.currentLanguage()]
                                             , config.language.description[config.currentLanguage()]
                                             , config.language.recievedDate[config.currentLanguage()]
                                             , 'اول المدة'
                                             , 'صافى الاستلامات'
                                             , 'تحويلات'
                                             , 'الرصيد'
                                             , 'ك المبيعات'
                                             , 'ق المبيعات'
                                             , 'متوسط التكلفة'
                                             , 'المجموع'
        ];

        config.itemsColumnDefenition.fields = ['code', 'description', 'recievedDate', 'startDuration', 'netRecieved', 'transfered',
                                                'creditQuantity', 'salesQuantity', 'salesValue', 'avgCost', 'total'];

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