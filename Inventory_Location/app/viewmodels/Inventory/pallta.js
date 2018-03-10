define(['plugins/router', 'services/dataservice', 'config'], function (router, dataservice, config) {

    var exportColumns = [];

    var showDelete = ko.observable(config.isAllow(128));

    var exportToExcel = function () {
        var exportData = ko.toJS(ko.toJS(vm.koTable.allItems()));

        config.exportJson(exportData, exportColumns, 'excel', 'Pallta');
    };

    var exportToWord = function () {
        var exportData = ko.toJS(ko.toJS(vm.koTable.allItems()));

        config.exportJson(exportData, exportColumns, 'word', 'Pallta');
    };

    var add = function (obj, e) {
        router.navigate("palltaAddEdit/" + 0);
    };

    var deletePallta = function (obj, e) {
        $.SmartMessageBox({
            title: "كن حذر عملية خطرة!",
            content: "هل انت متاكد تريد الحذف؟",
            buttons: '[لا][نعم]'
        }, function (buttonPressed) {
            if (buttonPressed === "نعم") {
                dataservice.deletePalltaById(obj.model.id).success(function () {
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
            new config.ExportColumn(config.language.location[config.currentLanguage()], 'location', 's'),
            new config.ExportColumn(config.language.code[config.currentLanguage()], 'code', 's'),
            new config.ExportColumn(config.language.serial[config.currentLanguage()], 'serial', 's') 
        ];
    };

    function canActivate() {
        if (config.isAllow(129)) {
            return true;
        } else {

            return false;
        }
    };

    var goToEditPallta = function (obj, e) {
        router.navigate("palltaAddEdit/" + obj.model.id());
    };

    var koTableReady = function () {
        vm.koTable.addRowDeleteHandler(deletePallta);
        vm.koTable.addRowClickedHandler(goToEditPallta);

        dataservice.getPallta().success(function (data) {
            vm.koTable.setItems(data);
        });
    };
     

    var vm = {
         showDelete: showDelete,
        canActivate: canActivate,
        title: 'البليتات',
        activate: activate,
        compositionComplete: compositionComplete,
        language: config.language,
        currentLanguage: config.currentLanguage,
        add: add,
        deletePallta: deletePallta,
        exportToExcel: exportToExcel,
        exportToWord: exportToWord,
        koTableReady: koTableReady
    };

    return vm;
});