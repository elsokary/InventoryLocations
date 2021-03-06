﻿define(['plugins/router', 'services/dataservice', 'config', 'services/tokenstore'], function (router, dataservice, config, tokenStore) {

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

        dataservice.getCustomersList().done(function (result) {
            customers(result);

        });

        dataservice.getDepartmentList().done(function (result) {
            departments(result);
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

    var categories = ko.observableArray([]);

    var departments = ko.observableArray([]);

    var customers = ko.observableArray([]);

    var itemsColumnDefenition = ko.observable();

    var PrintToExcel = function () {

        config.itemsColumnDefenition.name = "كشف حساب استاذ عميل";

        config.itemsColumnDefenition.widths = ['20%', '15%', '7%', '12%', '12%', '12%', '7%', '12%'];

        config.itemsColumnDefenition.friendlyNames = [
                                               config.language.supplierName[config.currentLanguage()]
                                             , config.language.date[config.currentLanguage()]
                                             , config.language.serial[config.currentLanguage()]
                                             , config.language.invoiceNumber[config.currentLanguage()]
                                             , config.language.debitAccount[config.currentLanguage()]
                                             , config.language.creditAccount[config.currentLanguage()]
                                             , config.language.balanceDebit[config.currentLanguage()]
                                             , config.language.balanceCredit[config.currentLanguage()]
        ];

        config.itemsColumnDefenition.fields = ['customerName', 'date', 'serial', 'invoiceNumber', 'debit', 'credit', 'balanceDebit', 'balanceCredit'];

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

        config.exportJson(exportData, exportColumns, 'excel', 'Account Statment customer Report');
    };

    var exportToWord = function () {

        var exportData = ko.toJS(vm.koTable.allItems());

        config.exportJson(exportData, exportColumns, 'word', 'Account Statment customer Report');
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

    var departmentId = ko.observable();

    var customerId = ko.observable();

    var categoryId = ko.observable();

    var startDate = ko.observable(moment().format('DD/MM/YYYY'));
    var finishDate = ko.observable(moment().format('DD/MM/YYYY'));


    departmentId.subscribe(function () {
        if (customerId() && departmentId()) {
            dataservice.getCategoriesByDepartmetId(departmentId()).done(function (result) {
                categories(result);
            });
        }
    });

    categoryId.subscribe(function () {
        if (categoryId()) {
            vm.koTable.setItems([]);
            config.startLoader(true);

            var objectData = {
                startDate: startDate(),
                finishDate: finishDate(),
                branchId: branchId(),
                customerId: customerId(),
                categoryId: categoryId(),
            };

            var invoiceToAdd = ko.toJS(objectData);

            invoiceToAdd.finishDate = moment(invoiceToAdd.finishDate, 'DD/MM/YYYY').format('YYYY-MM-DD[T]HH:mm:ss.SSS');
            invoiceToAdd.startDate = moment(invoiceToAdd.startDate, 'DD/MM/YYYY').format('YYYY-MM-DD[T]HH:mm:ss.SSS');


            dataservice.accountStatmentCustomer(invoiceToAdd).done(function (data) {
                vm.koTable.setItems(data);
                config.startLoader(false);

            });
        }
    });

    var vm = {
        startDate: startDate,
        finishDate: finishDate, itemsTable: itemsTable,

        customers: customers,
        categoryId: categoryId,
        departmentId: departmentId,
        customerId: customerId,
        categories: categories,
        departments: departments,

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