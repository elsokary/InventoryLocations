define(['plugins/router', 'services/dataservice', 'config'], function (router, dataservice, config) {

    var exportColumns = [];

    var showDelete = ko.observable(config.isAllow(124));

    var exportToExcel = function () {
        var exportData = ko.toJS(ko.toJS(vm.koTable.allItems()));

        config.exportJson(exportData, exportColumns, 'excel', 'Locations');
    };

    var exportToWord = function () {
        var exportData = ko.toJS(ko.toJS(vm.koTable.allItems()));

        config.exportJson(exportData, exportColumns, 'word', 'Locations');
    };

    var add = function (obj, e) {
        router.navigate("locationAddEdit/" + 0);
    };

    var deleteLocation = function (obj, e) {
        $.SmartMessageBox({
            title: "كن حذر عملية خطرة!",
            content: "هل انت متاكد تريد الحذف؟",
            buttons: '[لا][نعم]'
        }, function (buttonPressed) {
            if (buttonPressed === "نعم") {
                dataservice.deleteLocationsById(obj.model.id).success(function () {
                    var itemToDelete = vm.koTable.findItem("id", obj.model.id);

                    vm.koTable.removeItem(itemToDelete[0]);
                });

                $.smallBox({
                    title: "تمت العملية بنجاح",
                    content: "<i class='fa fa-clock-o'></i> <i>تم حذف البيانات بنجاح...</i>",
                    color: "#659265",
                    iconSmall: "fa fa-check fa-2x fadeInRight animated",
                    timeout: 2000
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

    function compositionComplete() {
        $(".fixed-action-btn").tooltip({ container: 'body' });
    };

    function activate() {
        exportColumns = [
            new config.ExportColumn(config.language.description[config.currentLanguage()], 'description', 's'),
            new config.ExportColumn(config.language.code[config.currentLanguage()], 'code', 's'),
            new config.ExportColumn(config.language.serial[config.currentLanguage()], 'serial', 's')
        ];
    };

    function canActivate() {
        if (config.isAllow(125)) {
            return true;
        } else {

            return false;
        }
    };

    var goToEditLocation = function (obj, e) {
        router.navigate("locationAddEdit/" + obj.model.id());
    };

    var koTableReady = function () {
        vm.koTable.addRowDeleteHandler(deleteLocation);
        vm.koTable.addRowClickedHandler(goToEditLocation);

        dataservice.getLocations().success(function (data) {
            vm.koTable.setItems(data);
        });
    };


    var vm = {
        showDelete: showDelete,
        canActivate: canActivate,
        title: 'المواقع',
        activate: activate,
        compositionComplete: compositionComplete,
        language: config.language,
        currentLanguage: config.currentLanguage,
        add: add,
        deleteLocation: deleteLocation,
        exportToExcel: exportToExcel,
        exportToWord: exportToWord,
        koTableReady: koTableReady
    };

    return vm;
});