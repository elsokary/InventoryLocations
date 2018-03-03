define(['plugins/router', 'services/dataservice', 'config'], function (router, dataservice, config) {
    var exportColumns = [];

    var showDelete = ko.observable(config.isAllow(23));

    var exportToExcel = function () {
        var exportData = ko.toJS(ko.toJS(vm.koTable.allItems()));

        config.exportJson(exportData, exportColumns, 'excel', 'Agents');
    };

    var exportToWord = function () {
        var exportData = ko.toJS(ko.toJS(vm.koTable.allItems()));

        config.exportJson(exportData, exportColumns, 'word', 'Agents');
    };

    var add = function (obj, e) {
        router.navigate("accountsAdd/" + 0);
    };

    var deleteAccount = function (obj, e) {
        $.SmartMessageBox({
            title: "كن حذر عملية خطرة!",
            content: "هل انت متاكد تريد الحذف؟",
            buttons: '[لا][نعم]'
        }, function (buttonPressed) {
            if (buttonPressed === "نعم") {
                dataservice.accountDeleteById(obj.model.id).success(function () {
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
            new config.ExportColumn(config.language.UserName[config.currentLanguage()], 'userName', 's'),
            new config.ExportColumn(config.language.Address[config.currentLanguage()], 'address', 's'),
            new config.ExportColumn(config.language.Supervisor[config.currentLanguage()], 'supervisorName', 's'),
            new config.ExportColumn(config.language.branchNameEn[config.currentLanguage()], 'branchName', 's'),
            new config.ExportColumn(config.language.GroupName[config.currentLanguage()], 'groupName', 's'),
            new config.ExportColumn(config.language.userType[config.currentLanguage()], 'userType', 's')
        ];
    };

    function canActivate() {
        if (config.isAllow(24)) {
            return true;
        } else {

            return false;
        }
    };

    var goToEditAccount = function (obj, e) {
        router.navigate("accountsAdd/" + obj.model.id());
    };

    var koTableReady = function () {
        vm.koTable.addRowDeleteHandler(deleteAccount);
        vm.koTable.addRowClickedHandler(goToEditAccount);

        dataservice.getAccounts().success(function (data) {
            vm.koTable.setItems(data);
        });
    };

    var resetPassword = function (obj, e) {
        dataservice.resetPassword(obj.id()).done(function () { })
    };

    var vm = {
        resetPassword: resetPassword,
        showDelete: showDelete,
        canActivate: canActivate,
        title: 'المستخدمين',
        activate: activate,
        compositionComplete: compositionComplete,
        language: config.language,
        currentLanguage: config.currentLanguage,
        add: add,
        deleteAccount: deleteAccount,
        exportToExcel: exportToExcel,
        exportToWord: exportToWord,
        koTableReady: koTableReady
    };

    return vm;
});