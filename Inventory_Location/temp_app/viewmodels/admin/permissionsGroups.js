define(['plugins/router', 'services/dataservice', 'config'], function (router, dataservice, config) {
    var permissionGroup = ko.observable();

    var changeStatus = ko.observable(false);

    var exportColumns = [];

    var exportToExcel = function () {
        var exportData = ko.toJS(vm.koTable.allItems());
        config.exportJson(ko.toJS(exportData), exportColumns, 'excel', '  Permssion');
    };

    var exportToWord = function () {
        var exportData = ko.toJS(vm.koTable.allItems());
        config.exportJson(ko.toJS(exportData), exportColumns, 'word', '  Permssion');
    };

    var permissionGroupDto = function () {
        var self = this;
        self.groupName = "";
    };

    var add = function (obj, e) {
        if (config.isAllow(20)) {
            changeStatus(false);

            permissionGroup(new permissionGroupDto());

            $("#AccountsPermssionGroupModal").modal("show");
        }
    };

    function editPermissionGroup(obj, event) {
        var isValid = $('#accountsPermissionGroupForm').valid();

        if (isValid) {
            dataservice.permissionsGroupsEdit(permissionGroup()).done(function (result) {

                permissionGroup(null);

                $('#AccountsPermssionGroupModal').modal('hide');
            });
        } else {
            $('#accountsPermissionGroupForm').validate();
        }
    };

    function addPermissionGroup() {
        var isValid = $('#accountsPermissionGroupForm').valid();

        if (isValid) {
            dataservice.addGroups(permissionGroup()).done(function (data) {

                vm.koTable.pushItem(data);

                permissionGroup(null);

                $('#AccountsPermssionGroupModal').modal('hide');

                config.alertSuccess();
            });
        } else {
            $('#accountsPermissionGroupForm').validate();
        }
    };

    function attached() {

        $(".fixed-action-btn").tooltip({ container: 'body' });

        $('#accountsPermissionGroupForm').validate({
            // Rules for form validation
            rules: {
                groupName: {
                    required: true
                }
            },

            // Messages for form validation
            messages: {
                groupName: {
                    required: config.language.GroupName[config.currentLanguage()]
                }
            },

            // Do not change code below
            errorPlacement: function (error, element) {
                error.insertAfter(element.parent());
            }
        });


    };

    var addPeremissionGroup = function (obj, e) {
        var id = obj.id();

        router.navigate("permissionsGroupsPermissions/" + id);
    };
     
    function activate() {
        exportColumns = [
            new config.ExportColumn(config.language.GroupName[config.currentLanguage()], 'groupName', 's')];
    };

    function canActivate() {
        if (config.isAllow(20)) {
            return true;
        } else {
             
            return false;
        }
    };

    var koTableReady = function () {
        vm.koTable.addRowDeleteHandler(deletePermission);
        vm.koTable.addRowClickedHandler(editMe);

        dataservice.getGroups().success(function (data) {
            vm.koTable.setItems(data);
        });
    };

    var editMe = function (obj, e) {
        permissionGroup(obj.model);

        changeStatus(true);

        $('#AccountsPermssionGroupModal').modal("show");
    };

    var deletePermission = function (obj, e) {
        $.SmartMessageBox({
            title: "كن حذر عملية خطرة!",
            content: "هل انت متاكد تريد الحذف؟",
            buttons: '[لا][نعم]'
        }, function (buttonPressed) {
            if (buttonPressed === "نعم") {

                dataservice.deleteGroupsById(obj.model.id).done(function () {
                    var itemToDelete = vm.koTable.findItem("id", obj.model.id);

                    vm.koTable.removeItem(itemToDelete[0]);

                    $.smallBox({
                        title: "تمت العملية بنجاح",
                        content: "<i class='fa fa-clock-o'></i> <i>تم حذف البيانات بنجاح...</i>",
                        color: "#659265",
                        iconSmall: "fa fa-check fa-2x fadeInRight animated",
                        timeout: 2000
                    })
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


    var vm = {
        canActivate: canActivate,
        title: config.language.groupsPermissions[config.currentLanguage()],
        attached: attached,
        editPermissionGroup: editPermissionGroup,
        addPermissionGroup: addPermissionGroup,
        permissionGroup: permissionGroup,
        changeStatus: changeStatus,
        activate: activate,
        language: config.language,
        currentLanguage: config.currentLanguage,
        add: add,
        exportToExcel: exportToExcel,
        exportToWord: exportToWord,
        deletePermission: deletePermission,
        addPeremissionGroup: addPeremissionGroup,
        editMe: editMe,
        koTableReady: koTableReady
    };

    return vm;
});