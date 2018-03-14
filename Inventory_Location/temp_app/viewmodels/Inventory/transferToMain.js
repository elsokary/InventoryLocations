define(['plugins/router', 'services/dataservice', 'config'], function (router, dataservice, config) {

    var showDelete = ko.observable(config.isAllow(31));

    var pageNumber = ko.observable(0);

    var exportToExcel = function () {
        var exportData = ko.toJS(vm.koTable.allItems());

        config.exportJson(exportData, exportColumns, 'excel', 'Items');
    };

    var exportToWord = function () {
        var exportData = ko.toJS(vm.koTable.allItems());
        config.exportJson(exportData, exportColumns, 'word', 'Items');
    };

    var deleteCustomer = function (obj, e) {
        $.SmartMessageBox({
            title: "كن حذر عملية خطرة!",
            content: "هل انت متاكد تريد الحذف؟",
            buttons: '[لا][نعم]'
        }, function (buttonPressed) {
            if (buttonPressed === "نعم") {
                dataservice.deleteItemInventory(obj.model.id).done(function () {
                    var itemToDelete = vm.koTable.findItem("id", obj.model.id);

                    vm.koTable.removeItem(itemToDelete[0]);

                    $.smallBox({
                        title: "تمت العملية بنجاح",
                        content: "<i class='fa fa-clock-o'></i> <i>تم حذف البيانات بنجاح...</i>",
                        color: "#659265",
                        iconSmall: "fa fa-check fa-2x fadeInRight animated",
                        timeout: 2000
                    });
                });
            }
            if (buttonPressed === "لا") {
                $.smallBox({
                    title: "تم الغاء العملية",
                    content: "<i class='fa fa-clock-o'></i> <i>تم الغاء الحذف...</i>",
                    color: "#C46A69",
                    iconSmall: "fa fa-times fa-2x fadeInRight animated",
                    timeout: 2000
                });
            }
        });
    };

    var koTableReady = function () {
        exportColumns = [
                 new config.ExportColumn(config.language.referenceCode[config.currentLanguage()], 'resourceCod', 's'),
                 new config.ExportColumn(config.language.quantity[config.currentLanguage()], 'quantity', 's'),
                 new config.ExportColumn(config.language.price[config.currentLanguage()], 'price', 's'),
                 new config.ExportColumn(config.language.cost[config.currentLanguage()], 'cost', 's'),
                 new config.ExportColumn(config.language.branchNameEn[config.currentLanguage()], 'toBranchName', 's'),
                 new config.ExportColumn(config.language.Notes[config.currentLanguage()], 'reason', 's')
        ];

        vm.koTable.addRowDeleteHandler(deleteCustomer);

        dataservice.getTransferItemsToMain(config.pageSize(), pageNumber()).success(function (data) {
            vm.koTable.setItems(data);
        });
    };

    var loadMore = function (obj, e) {

        pageNumber(pageNumber() + 1);

        dataservice.getTransferItemsToMain(config.pageSize(), pageNumber()).success(function (data) {
            if (data.length > 0) {

                vm.koTable.pushItem(data);
            }

        });
    };

    var vm = {
        loadMore: loadMore,
        showDelete: showDelete,
        language: config.language,
        currentLanguage: config.currentLanguage,
        exportToExcel: exportToExcel,
        exportToWord: exportToWord,
        deleteCustomer: deleteCustomer,
        koTableReady: koTableReady
    };

    return vm;
});