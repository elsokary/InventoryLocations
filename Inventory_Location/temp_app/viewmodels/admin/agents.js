define(['plugins/router', 'services/dataservice', 'config'], function (router, dataservice, config) {
    var accountDto = function () {
        var self = this;
        self.id = ko.observable();
        self.contactName = ko.observable("");
        self.address = ko.observable('');
        self.phone = ko.observable();
        self.email = ko.observable();
        self.code = ko.observable();
        self.userType = ko.observable("user");
    };

    var showDelete = ko.observable(config.isAllow(35));

    var account = ko.observable(new accountDto());

    var selectedRowId = ko.observable();

    var exportColumns = [];

    var exportToExcel = function () {
        var exportData = ko.toJS(vm.koTable.allItems());

        config.exportJson(exportData, exportColumns, 'excel', 'Agents');
    };

    var exportToWord = function () {
        var exportData = ko.toJS(vm.koTable.allItems());

        config.exportJson(exportData, exportColumns, 'word', 'Agents');
    };

    var changeStatus = ko.observable(false);

    var add = function (obj, e) {

        changeStatus(false);

        account(new accountDto());

        account().code(config.CreateGuid());

        $('#addArea').modal('show');
    };

    var deleteAccount = function (obj, e) {
        $.SmartMessageBox({
            title: "كن حذر عملية خطرة!",
            content: "هل انت متاكد تريد الحذف؟",
            buttons: '[لا][نعم]'
        }, function (buttonPressed) {
            if (buttonPressed === "نعم") {

                dataservice.deleteAgantsById(obj.model.id).done(function () {
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

    function compositionComplete() {
        $(".fixed-action-btn").tooltip({ container: 'body' });

        $('#addArea').on('shown.bs.modal', function () {
            $('#code').focus();
        })

        $('#ViewModalList').on('hidden.bs.modal', function () {
            account(new accountDto());
        })

        $('#EPSFormTree').validate({
            // Rules for form validation
            rules: {
                code: {
                    required: true,
                    digits: true
                },
                contactName: {
                    required: true,
                    minlength: 4
                },
                email: {
                    required: true,
                    email: true
                },
                phone: {
                    required: true,
                    number: 4
                }

            },

            // Messages for form validation
            messages: {
                code: {
                    required: 'Please enter a Employee Code',
                    digits: 'Only digits accepted'
                },
                contactName: {
                    required: 'Please enter a contact Name',
                    minlength: 'user name '
                },
                phone: {
                    required: 'رقم التليقون ',
                    number: 'ارقام فقط'
                },
                email: {
                    required: config.language.email[config.currentLanguage()],
                    email: 'صيعه خاط'
                }

            },

            // Do not change code below
            errorPlacement: function (error, element) {
                error.insertAfter(element.parent());
            }
        });
    };

    function activate() {
        exportColumns = [
            new config.ExportColumn(config.language.ContactName[config.currentLanguage()], 'contactName', 's'),
            new config.ExportColumn(config.language.referenceCode[config.currentLanguage()], 'code', 'n'),
            new config.ExportColumn(config.language.Address[config.currentLanguage()], 'address', 's'),
            new config.ExportColumn(config.language.Telephone[config.currentLanguage()], 'phone', 's')];
    };

    function addAccount(obj, e) {
        var isValid = $('#EPSFormTree').valid();

        if (isValid) {

            $(e.target).button('loading');

            if (changeStatus()) {

                dataservice.editAgant(account()).done(function (data) {
                      
                    $(e.target).button('reset');

                    account(new accountDto());

                    $('#addArea').modal('hide');

                    config.alertSuccess();

                }).fail(function () {
                    $('#addArea').modal('hide');

                    $(e.target).button('reset');

                    account(new accountDto());

                    config.alertFail();
                });
            }
            else {

                dataservice.addAgants(account()).done(function (data) {
                    vm.koTable.pushItem(data);

                    account(new accountDto());

                    $(e.target).button('reset');

                    $('#addArea').modal('hide');

                    config.alertSuccess();

                }).fail(function () {

                    $(e.target).button('reset');

                    $('#addArea').modal('hide');

                    account(new accountDto());

                    config.alertFail();
                });
            }
        } else {

            $('#AccountEditForm').validate();

        }
    };

    var changeRefCode = ko.computed(function () {

        if (account().code()) {

            var exist = false;

            ko.utils.arrayFirst(ko.toJS(vm.koTable.allItems()), function (item) {
                if (item.code === account().code()) {
                    exist = true;
                }
            });

            if (exist) {
                account().code('');

                $.smallBox({
                    title: "تم الغاء العملية",
                    content: "<i class='fa fa-clock-o'></i> <i>كود المندوب موحود من قبل</i>",
                    color: "#C46A69",
                    iconSmall: "fa fa-times fa-2x fadeInRight animated",
                    timeout: 2000
                });
            }
        }
    });

    var changeAgentName = ko.computed(function () {

        if (account().contactName()) {

            var exist = false;
            if (changeStatus() === false) {

                ko.utils.arrayFirst(ko.toJS(vm.koTable.allItems()), function (item) {
                    if (item.contactName === account().contactName()) {
                        exist = true;
                    }
                });
            }
            else {
                ko.utils.arrayFirst(ko.toJS(vm.koTable.allItems()), function (item) {
                    if (item.contactName === account().contactName() && item.id != account().id()) {
                        exist = true;
                    }
                });
            }
            if (exist) {
                account().contactName('');

                $.smallBox({
                    title: "تم الغاء العملية",
                    content: "<i class='fa fa-clock-o'></i> <i>اسم الفرع موحود من قبل</i>",
                    color: "#C46A69",
                    iconSmall: "fa fa-times fa-2x fadeInRight animated",
                    timeout: 2000
                });
            }
        }
    });

    function canActivate() {
        if (config.isAllow(24)) {
            return true;
        } else {
            return false;
        }
    };

    var viewEditModal = function (obj, e) {
            changeStatus(true);

            account(ko.mapping.fromJS(ko.toJS(obj.model)));

            $('#addArea').modal('show');
    };

    var koTableReady = function () {
        vm.koTable.addRowDeleteHandler(deleteAccount);
        vm.koTable.addRowClickedHandler(viewEditModal);

        dataservice.getAgants().success(function (data) {
            vm.koTable.setItems(data);
        });
    };

    var vm = {
        showDelete: showDelete,
        canActivate: canActivate,
        changeAgentName: changeAgentName,
        changeRefCode: changeRefCode,
        title: 'Agents',
        activate: activate,
        compositionComplete: compositionComplete,
        language: config.language,
        currentLanguage: config.currentLanguage,
        changeStatus: changeStatus,
        add: add,
        account: account,
        addAccount: addAccount,
        deleteAccount: deleteAccount,
        selectedRowId: selectedRowId,
        exportToExcel: exportToExcel,
        exportToWord: exportToWord,
        koTableReady: koTableReady
    };

    return vm;
});