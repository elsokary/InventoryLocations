define(['services/dataservice', 'config', 'services/tokenstore'], function (dataservice, config, tokenStore) {

    var branches = ko.observableArray([]);

    var departments = ko.observableArray([]);

    var categories = ko.observableArray([]);

    var suppliers = ko.observableArray([]);

    var showAllBranches = ko.observable(false);

    var branchId = ko.observable();

    var departmentId = ko.observable();

    var categoryId = ko.observable();

    var exportColumns = [];

    var supplierId = ko.observable();

    var itemsTable = ko.observableArray([]);

    var itemsColumnDefenition = ko.observable();

    function attached() {

        $(".fixed-action-btn").tooltip('destroy');

        $(".fixed-action-btn").tooltip({ container: 'body' });

        $('#itemAddForm').validate({

            rules: {
                branchId: {
                    required: true
                },
                supplierId: {
                    required: true
                },
                categoryId: {
                    required: true
                }
            },

            messages: {
                branchId: {
                    required: config.language.toBranch[config.currentLanguage()]
                },
                supplierId: {
                    required: config.language.quantityRequired[config.currentLanguage()]
                },
                categoryId: {
                    required: ''
                }
            },

            // Do not change code below
            errorPlacement: function (error, element) {
                error.insertAfter(element.parent());
            }
        });
    };

    var btnSearch = function (obj, e) {

        if ($('#itemAddForm').valid()) {

            $(e.target).button('loading');

            var objectData = {};

            objectData.branchId = branchId();
            objectData.supplierId = supplierId();
            objectData.departmentId = supplierId();
            objectData.categoryId = categoryId();

            var invoiceToAdd = ko.toJS(objectData);

            vm.koTable.setItems([]);

            dataservice.getItemsBrandRpt(invoiceToAdd).done(function (data) {

                $(e.target).button('reset');

                vm.koTable.setItems(data);

            });

        } else {
            $('#itemAddForm').validate();

        }
    };

    var koTableReady = function () {

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
        exportColumns = [
            new config.ExportColumn(config.language.description[config.currentLanguage()], 'itemName', 's'),
            new config.ExportColumn(config.language.resourceCode[config.currentLanguage()], 'resourceCode', 's'),
            new config.ExportColumn(config.language.quantity[config.currentLanguage()], 'quantity', 's'),
            new config.ExportColumn(config.language.categoryName[config.currentLanguage()], 'categoryName', 's'),
        ];

        dataservice.getSupplierForList().done(function (result) {
            suppliers(result);
        });

        dataservice.getDepartmentList(supplierId()).done(function (result) {
            departments(result);
        });

        var collection = tokenStore.getPayload();

        branchId(parseInt(collection.bci));

        config.branchId(branchId());

    };

    var PrintToExcel = function () {

        config.itemsColumnDefenition.name = "تقرير جرد براندات";

        config.itemsColumnDefenition.widths = ['30%', '15%', '10%', '10%', '10%', '10%', '10%', '10%'];

        config.itemsColumnDefenition.friendlyNames = [
                                                 config.language.description[config.currentLanguage()]
                                               , config.language.resourceCode[config.currentLanguage()]
                                               , config.language.quantity[config.currentLanguage()]
                                               , config.language.categoryName[config.currentLanguage()] 
                                               , config.language.cost[config.currentLanguage()]
                                               , config.language.price[config.currentLanguage()]
                                               , config.language.totalCost[config.currentLanguage()]
                                               , config.language.total[config.currentLanguage()]
        ];

        config.itemsColumnDefenition.fields = ['description', 'resourceCode', 'quantity', 'categoryName', 'cost', 'price', 'totalCost', 'total'];

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

        config.exportJson(exportData, exportColumns, 'excel', 'تقرير جرد براندات');
    };

    var exportToWord = function () {
        var exportData = ko.toJS(vm.koTable.allItems());
        config.exportJson(exportData, exportColumns, 'word', 'تقرير جرد براندات');
    };

    function canActivate() {
        if (config.isAllow(104)) {
            return true;
        }
    };

    function canDeActivate() {

        return true;
    };

    supplierId.subscribe(function () {
        if (supplierId() && departmentId()) {
            dataservice.getCategoriesBysupplierIdAndDepartmetId(supplierId(), departmentId()).done(function (result) {
                categories(result);
            });
        }
    });

    departmentId.subscribe(function () {
        if (supplierId() && departmentId()) {
            dataservice.getCategoriesBysupplierIdAndDepartmetId(supplierId(), departmentId()).done(function (result) {
                categories(result);
            });
        }
    });

    var vm = {
        categoryId: categoryId,
        supplierId: supplierId, suppliers: suppliers,
        departmentId: departmentId,
        departments: departments,
        categories: categories,
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
        btnSearch: btnSearch,
        koTableReady: koTableReady
    };

    return vm;

});