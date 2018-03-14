define(['text!permissions.json', 'plugins/router', 'services/dataservice', 'config'], function (permissions, router, dataservice, config) {

    var selectedDocumentPermissions = ko.observableArray([]);

    var permissions = ko.mapping.fromJS(JSON.parse(permissions)).authorization;

    var documentCurrentPermissions = ko.observableArray([]);

    var documentModule = ko.observable();

    var documentModulePermissions = ko.observableArray([]);

    var selectedDocumentModulePermissions = ko.observableArray([]);

    var groupId = ko.observable();

    documentModule.subscribe(function (value) {
        value = JSON.parse(value);

        var moduleDocuments = value.modules;

        var moduleDocumentsPermissions = [];

        ko.utils.arrayForEach(moduleDocuments, function (document) {
            ko.utils.arrayForEach(document.permissions, function (permission) {
                moduleDocumentsPermissions.push({
                    key: permission.title[config.currentLanguage()],
                    code: permission.code
                });
            });
        });

        var groupedPermissions = Enumerable.From(moduleDocumentsPermissions)
            .GroupBy("$.key", null, function (key, g) {
                var codeArray = [];

                ko.utils.arrayForEach(g.source, function (item) {
                    codeArray.push(item.code);
                });

                return {
                    key: key,
                    codes: codeArray
                };
            }).ToArray();

        documentModulePermissions(groupedPermissions);
    });

    var permissionModulesSelectChanged = function (obj, event) {

        selectedDocumentPermissions([]);

        ko.utils.arrayForEach(obj.permissions(), function (model) {

            ko.utils.arrayForEach(model.modules(), function (document) {

                var selectedValue = $("#userPermissionsDocumentsDropDown").select2("val");

                var selectedDoc = (document.id() == selectedValue) ? document : null;

                if (selectedDoc) {
                    var permissionArray = [];
                    var permissionCodes = [];

                    ko.utils.arrayForEach(selectedDoc.permissions(), function (documentPermissions) {
                        permissionArray.push(documentPermissions);
                        permissionCodes.push(documentPermissions.code());
                    });

                    dataservice.getGroupPermissions(documentCurrentPermissions, permissionCodes, groupId()).done(function () {
                        selectedDocumentPermissions(permissionArray);
                        var selectedValues = [];
                        ko.utils.arrayForEach(documentCurrentPermissions(), function (permission) {
                            if (permission.value) {
                                selectedValues.push(permission.permissionCode.toString());
                            }
                        });

                        $("#userPermissionsPermissionsDropDown").select2("val", selectedValues);
                    });
                }
            });
        });
    };

    var saveUserPermissions = function (obj, e) {

        var selectedPermissions = $("#userPermissionsPermissionsDropDown").select2("val");
        var removedPermissions = [];

        ko.utils.arrayForEach(selectedDocumentPermissions(), function (permission) {
            var code = permission.code().toString();
            var removed = selectedPermissions.indexOf(code) == -1;

            if (removed)
                removedPermissions.push(permission.code());
        });
 
        var editList = [];
        var addList = [];

        ko.utils.arrayForEach(documentCurrentPermissions(), function (permission) {
            var existAlready = (selectedPermissions.indexOf(permission.permissionCode.toString()) >= 0) || (removedPermissions.indexOf(permission.permissionCode) >= 0);

            if (existAlready) {
                if (selectedPermissions.indexOf(permission.permissionCode.toString()) >= 0) {
                    selectedPermissions.splice(selectedPermissions.indexOf(permission.permissionCode.toString()), 1);
                    permission.value = true;
                    permission.groupId = groupId();
                    editList.push(permission);
                } else {
                    permission.value = false;
                    permission.groupId = groupId();
                    editList.push(permission);
                }
            }
        });

        if (selectedPermissions.length > 0) {
            selectedPermissions.forEach(function (permission) {
                addList.push(new permissionModel(permission, true, groupId()));
            });
        }

        if (addList.length > 0) {
            $(e.target).button('loading');
            dataservice.addGroupsPermissions(addList).done(function () {
                $(e.target).button('reset');
            });
        }

        if (editList.length > 0) {
            $(e.target).button('loading');
            dataservice.editGroupsPermissions(editList).done(function () {

                $(e.target).button('reset');

            });
        }

        selectedDocumentPermissions([]);
        $(".select2-container").select2("val", "");
         
    };

    var addModulePermissions = function (obj, e) {
        var selectedPermissions = [];

        ko.utils.arrayForEach(selectedDocumentModulePermissions(), function (codeArray) {
            var parsedCodeArray = JSON.parse(codeArray);

            selectedPermissions = selectedPermissions.concat(parsedCodeArray);
        });

        dataservice.addGroupsPermissionsModule(groupId(), true, selectedPermissions);
    };

    var removeModulePermissions = function (obj, e) {
        var selectedPermissions = [];

        ko.utils.arrayForEach(selectedDocumentModulePermissions(), function (codeArray) {
            var parsedCodeArray = JSON.parse(codeArray);

            selectedPermissions = selectedPermissions.concat(parsedCodeArray);
        });

        dataservice.addGroupsPermissionsModule(groupId(), false, selectedPermissions);
    };

    var permissionModel = function (code, value, groupId) {
        var self = this;
        self.permissionCode = code;
        self.value = value;
        self.groupId = groupId;
    };

    var attached = function () {
        $("#userPermissionsDocumentsDropDown").select2();
        $("#userPermissionsPermissionsDropDown").select2({ closeOnSelect: false });
    };

    var activate = function (id) {
        groupId(parseInt(id));
    };
     
    function canActivate() {
        if (config.isAllow(17)) {
            return true;
        } else {

            $.smallBox({
                title: "Operation was canceled",
                content: config.language.missingPermissions[config.currentLanguage()],
                color: "#C46A69",
                iconSmall: "fa fa-times fa-2x fadeInRight animated",
                timeout: 3000
            });

            return false;
        }
    };

    var vm = {
        canActivate: canActivate,
        title: 'Groups Permissions',
        attached: attached,
        activate: activate,
        permissions: permissions,
        language: config.language,
        currentLanguage: config.currentLanguage,
        permissionModulesSelectChanged: permissionModulesSelectChanged,
        selectedDocumentPermissions: selectedDocumentPermissions,
        saveUserPermissions: saveUserPermissions,
        documentModule: documentModule,
        documentModulePermissions: documentModulePermissions,
        selectedDocumentModulePermissions: selectedDocumentModulePermissions,
        addModulePermissions: addModulePermissions,
        removeModulePermissions: removeModulePermissions
    };

    return vm;
});