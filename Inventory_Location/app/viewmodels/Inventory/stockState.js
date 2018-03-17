define(['plugins/router', 'services/dataservice', 'config', 'services/tokenstore'], function (router, dataservice, config, tokenStore) {
    var pageNumber = ko.observable(0);

    var showTable = ko.observable(false);

    var maxQuantity = ko.observable(0);

    var itemDto = function (data) {
        var self = this;

        self.id = ko.observable();
        self.resourceCode = ko.observable();
        self.description = ko.observable("");
        self.palltaId = ko.observable();
        self.locationItemId = ko.observable();
        self.palltaTypeId = ko.observable();
        self.quantity = ko.observable(0).extend({ required: true, min: 0, max: maxQuantity(), step: 1 });
        self.itemId = ko.observable();
        if (data) {
            self.id = data.id;
            self.itemId = data.itemId;
            self.resourceCode = data.resourceCode;
            self.description = data.description;
            self.palltaId = data.palltaId;
            self.palltaTypeId = data.palltaTypeId;
        }
    };

    var item = ko.observable(new itemDto());

    function attached() {

        $(".fixed-action-btn").tooltip('destroy');

        $(".fixed-action-btn").tooltip({ container: 'body' });


    };

    var dataModel = function () {
        var self = this;
        self.itemId = ko.observable();
        self.id = ko.observable();
        self.quantity = ko.observable();
        self.locationName = ko.observable('');
        self.locationType = ko.observable('');
        self.price = ko.observable();
        self.locationItemId = ko.observable();
        self.palltaTypeId = ko.observable();
        self.palltaId = ko.observable();
        self.cost = ko.observable();
        self.description = ko.observable();
        self.resourceCode = ko.observable();
    };

    var createData = function (item) {
        var cashierItemObject = new dataModel();

        if (item) {
            cashierItemObject.locationName(item.locationName);
            cashierItemObject.locationType(item.locationType);
            cashierItemObject.id(item.id);
            cashierItemObject.quantity(item.quantity);
            cashierItemObject.cost(item.cost);
            cashierItemObject.description(item.description);
            cashierItemObject.resourceCode(item.resourceCode); 

            cashierItemObject.palltaId(item.palltaId);
            cashierItemObject.itemId(item.itemId);
            cashierItemObject.palltaTypeId(item.palltaTypeId);
            cashierItemObject.locationItemId(item.locationItemId);
        }

        return cashierItemObject;
    };

    var dataModelList = ko.observableArray([]);

    var locationTypes = ko.observableArray([]);

    var koTableReady = function () {

        dataModelList([]);

        dataservice.getStockState().done(function (data) {

            vm.koTable.setItems(data);

            data.forEach(function (item) {
                dataModelList.push(createData(item));
            });

            vm.koTable.setItems(dataModelList());
        });

    };

    function activate() {

        dataservice.getPalltaForDorp().done(function (result) {
            locations(result);
        });

        //dataservice.getPalltaTypes().done(function (result) {
        //    locationTypes(result);
        //});

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

        itemsColumnDefenition(config.itemsColumnDefenition);

        var exportData = vm.koTable.allItems();

        itemsTable(exportData);

        var contents = $("#dvContents").html();
        var frame1 = $('<iframe />');
        frame1[0].name = "frame1";
        frame1.css({ "position": "absolute", "top": "-1000000px" });
        $("body").append(frame1);
        var frameDoc = frame1[0].contentWindow ? frame1[0].contentWindow : frame1[0].contentDocument.document ? frame1[0].contentDocument.document : frame1[0].contentDocument;
        frameDoc.document.open();
        //Create a new HTML document.
        frameDoc.document.write('<html><head><title>DIV Contents</title>');
        frameDoc.document.write('</head><body>');
        //Append the external CSS file.
        frameDoc.document.write('<link href="../css/printStyle.css" rel="stylesheet" type="text/css" /><link href="../css/override.css" rel="stylesheet" type="text/css" />');
        //Append the DIV contents.
        frameDoc.document.write(contents);
        frameDoc.document.write('</body></html>');
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

    function canActivate() {
        if (config.isAllow(107)) {
            return true;
        }
    };

    var locations = ko.observableArray([]);

    function canDeActivate() {

        return true;
    };

    var loadMore = function (obj, e) {
        pageNumber(pageNumber() + 1);

        dataservice.getStockState().success(function (data) {
            if (data.length > 0) {

                vm.koTable.pushItem(data);
            }
        });

    };

    var transferToPallta = function (obj, e) {

        maxQuantity(obj.quantity());

        item(new itemDto());

        item().locationItemId(obj.locationItemId());
        item().id(obj.id());
        item().itemId(obj.itemId());
        item().resourceCode(obj.resourceCode());
        item().description(obj.description());

        $('#transferQuantityToLocation').modal('show');
    };

    var saveAssignToLocation = function (obj, e) {
        var isValid = $('#itemEditForm').valid();

        if (isValid) {

            $(e.target).button('loading');

            dataservice.transferItemQuantityToAnotherLocation(ko.toJS(item())).success(function (data) {
                config.alertSuccess();

                $('#transferQuantityToLocation').modal('hide');

                $(e.target).button('reset');
            });

        } else {
            $('#itemEditForm').validate();
        }
    };

    var vm = {
        maxQuantity: maxQuantity,
        locationTypes: locationTypes,
        saveAssignToLocation: saveAssignToLocation,
        item: item,
        transferToPallta: transferToPallta,
        locations: locations,
        loadMore: loadMore,
        itemsTable: itemsTable,
        itemsColumnDefenition: itemsColumnDefenition,
        PrintToExcel: PrintToExcel,
        exportToExcel: exportToExcel,
        canDeActivate: canDeActivate,
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