define(['plugins/router', 'services/dataservice', 'config'], function (router, dataservice, config) {
    var pageNumber = ko.observable(0);

    var showDelete = ko.observable(config.isAllow(35));

    var changeStatus = ko.observable(false);

    var exportColumns = [];

    var exportToExcel = function () {
        var exportData = ko.toJS(vm.koTable.allItems());

        config.exportJson(exportData, exportColumns, 'excel', 'Items');
    };

    var exportToWord = function () {
        var exportData = ko.toJS(vm.koTable.allItems());
        config.exportJson(exportData, exportColumns, 'word', 'Items');
    };

    var add = function (obj, e) {
        if (config.isAllow(33)) {
            router.navigate("itemAddEdit/0");
        }
    }

    function attached() {
        $(".fixed-action-btn").tooltip();
    };

    function activate() {
        exportColumns = [
                 new config.ExportColumn(config.language.referenceCode[config.currentLanguage()], 'resourceCod', 's'),
                 new config.ExportColumn(config.language.quantity[config.currentLanguage()], 'quantity', 's'),
                 new config.ExportColumn(config.language.price[config.currentLanguage()], 'price', 's'),
                 new config.ExportColumn(config.language.cost[config.currentLanguage()], 'cost', 's'),
                 new config.ExportColumn(config.language.branchNameEn[config.currentLanguage()], 'toBranchName', 's'),
                 new config.ExportColumn(config.language.Notes[config.currentLanguage()], 'reason', 's')
        ];
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

    function canActivate() {
        if (config.isAllow(36)) {
            return true;
        } else {
            return false;
        }
    };

    var koTableReady = function () {
        vm.koTable.addRowDeleteHandler(deleteCustomer);

        dataservice.getTransferItems(config.pageSize(), pageNumber()).success(function (data) {
            vm.koTable.setItems(data);
        });
    };

    var loadMore = function (obj, e) {

        pageNumber(pageNumber() + 1);

        dataservice.getTransferItems(config.pageSize(), pageNumber()).success(function (data) {
            if (data.length > 0) {

                vm.koTable.pushItem(data);
            }

        });
    };

    var vm = {
        loadMore: loadMore,
        showDelete: showDelete,
        canActivate: canActivate,
        title: config.language.customers[config.currentLanguage()],
        activate: activate,
        attached: attached,
        language: config.language,
        currentLanguage: config.currentLanguage,
        exportToExcel: exportToExcel,
        exportToWord: exportToWord,
        add: add,
        deleteCustomer: deleteCustomer,
        koTableReady: koTableReady
    };

    return vm;
});