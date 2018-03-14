define(['plugins/router', 'services/dataservice', 'config'], function (router, dataservice, config) {

    var pageNumber = ko.observable(0);

    var showDelete = ko.observable(config.isAllow(11));

    var changeStatus = ko.observable(false);

    var exportColumns = [];

    var agents = ko.observableArray([]);

    var exportToExcel = function () {
        var exportData = ko.toJS(vm.koTable.allItems());

        config.exportJson(exportData, exportColumns, 'excel', 'customers');
    };

    var exportToWord = function () {
        var exportData = ko.toJS(vm.koTable.allItems());

        config.exportJson(exportData, exportColumns, 'word', 'customers');
    };

    var customerDto = function () {
        var self = this;

        self.id = ko.observable();
        self.name = ko.observable("");
        self.address = ko.observable("");
        self.email = ko.observable("");
        self.phone = ko.observable("");
        self.code = ko.observable();
        self.isCash = ko.observable(true);
        self.selectedAgents = ko.observableArray([]);
    };

    var customer = ko.observable(new customerDto());

    var add = function (obj, e) {
        if (config.isAllow(9)) {

            changeStatus(false);

            customer(new customerDto());

            dataservice.getNextArrangeCustomer().done(function (result) {

                customer().code(result);
            });

            $('#ViewModalList').modal('show');
        }
    }

    function attached() {

        $(".fixed-action-btn").tooltip();

        $('#ViewModalList').on('shown.bs.modal', function () {
            $('#code').focus();
        })

        $('#ViewModalList').on('hidden.bs.modal', function () {
            customer(new customerDto());
        })

        var isCtrl = false;

        document.onkeydown = function (e) {

            if (e.keyCode == 17) isCtrl = true;

            if (e.keyCode == 83 && isCtrl == true) {

                var isValid = $('#customerForm').valid();

                if (isValid) {

                    saveAdd();

                    isCtrl = false

                } else {
                    $('#customerForm').validate();
                }
                return false;
            }
        }

        $("#customerForm").validate({
            rules: {
                name: {
                    required: true
                },
                code: {
                    required: true,
                    digits: true
                }
            },
            messages: {
                name: {
                    required: config.language.customerName[config.currentLanguage()]
                },
                code: {
                    required: config.language.referenceCode[config.currentLanguage()],
                    digits: config.language.onlyNumbers[config.currentLanguage()]
                }
            },
            errorPlacement: function (error, element) {
                error.insertAfter(element.parent());
            }
        });

    };

    function activate() {
        customer(new customerDto());

        exportColumns = [
                 new config.ExportColumn(config.language.Telephone[config.currentLanguage()], 'phone', 's'),
                 new config.ExportColumn(config.language.customerName[config.currentLanguage()], 'name', 's'),
                 new config.ExportColumn(config.language.Address[config.currentLanguage()], 'address', 's'),
                 new config.ExportColumn(config.language.email[config.currentLanguage()], 'email', 's'),
                 new config.ExportColumn(config.language.referenceCode[config.currentLanguage()], 'code', 's'),
                 new config.ExportColumn(config.language.isCash[config.currentLanguage()], 'isCash', 's')
        ];

        dataservice.getAgants().success(function (result) {
            agents(result);
        });
    };

    var saveAdd = function () {
        if (changeStatus() == false) {
            dataservice.addCustomers(ko.toJS(customer())).done(function (data) {

                changeStatus(true);

                vm.koTable.pushItem(data);

                config.alertSuccess();

                $('#ViewModalList').modal('hide');

                changeStatus(false);

            });
        }
        else {

            dataservice.editCustomers(ko.toJS(customer())).done(function (data) {
                config.alertSuccess();

                $('#ViewModalList').modal('hide');

            });
        }
    };

    var addCustomer = function (obj, e) {

        var isValid = $('#customerForm').valid();

        if (isValid) {

            $(e.target).button('loading');

            saveAdd();

            $(e.target).button('reset');

        } else {
            $('#customerForm').validate();
        }
    }

    var editCustomer = function (obj, e) {
        var isValid = $('#customerForm').valid();

        if (isValid) {

            $(e.target).button('loading');

            saveAdd();

            $(e.target).button('reset');

        } else {
            $('#customerForm').validate();
        }
    }

    var deleteCustomer = function (obj, e) {
        $.SmartMessageBox({
            title: "كن حذر عملية خطرة!",
            content: "هل انت متاكد تريد الحذف؟",
            buttons: '[لا][نعم]'
        }, function (buttonPressed) {
            if (buttonPressed === "نعم") {
                dataservice.deleteCustomers(obj.model.id).done(function () {
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

    var changeRefCode = ko.computed(function () {

        if (customer().code()) {

            var exist = false;
            if (changeStatus() === false) {

                ko.utils.arrayFirst(ko.toJS(vm.koTable.allItems()), function (item) {
                    if (item.code === customer().code()) {
                        exist = true;
                    }
                });
            }
            else {
                ko.utils.arrayFirst(ko.toJS(vm.koTable.allItems()), function (item) {
                    if (item.code === customer().code() && item.id != customer().id()) {
                        exist = true;
                    }
                });
            }
            if (exist) {
                customer().code('');
                $.smallBox({
                    title: "تم الغاء العملية",
                    content: "<i class='fa fa-clock-o'></i> <i>كود الفرع موحود من قبل</i>",
                    color: "#C46A69",
                    iconSmall: "fa fa-times fa-2x fadeInRight animated",
                    timeout: 2000
                });
            }
        }
    });

    var changeCustomerName = ko.computed(function () {

        if (customer().name()) {

            var exist = false;
            if (changeStatus() === false) {

                ko.utils.arrayFirst(ko.toJS(vm.koTable.allItems()), function (item) {
                    if (item.name === customer().name()) {
                        exist = true;
                    }
                });
            }
            else {
                ko.utils.arrayFirst(ko.toJS(vm.koTable.allItems()), function (item) {
                    if (item.name === customer().name() && item.id != customer().id()) {
                        exist = true;
                    }
                });
            }
            if (exist) {
                customer().name('');
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
        if (config.isAllow(12)) {
            return true;
        } else {
            return false;
        }
    };

    var viewEditModal = function (obj, e) {
        if (config.isAllow(9)) {
            changeStatus(true);

            config.docId(obj.model.id());

            config.docType('customer');

            customer(ko.mapping.fromJS(ko.toJS(obj.model)));

            $('#ViewModalList').modal('show');

            customer().selectedAgents(obj.model.selectedAgents());
        }
    };

    var koTableReady = function () {
        vm.koTable.addRowDeleteHandler(deleteCustomer);
        vm.koTable.addRowClickedHandler(viewEditModal);

        dataservice.getChunckCustomersData(config.pageSize(), pageNumber()).success(function (data) {
            vm.koTable.setItems(data);
        });
    };

    var loadMore = function (obj, e) {

        pageNumber(pageNumber() + 1);

        dataservice.getChunckCustomersData(config.pageSize(), pageNumber()).success(function (data) {
            if (data.length > 0) {

                vm.koTable.pushItem(data);
            }

        });
    };

    var vm = {
        loadMore: loadMore,
        showDelete: showDelete,
        canActivate: canActivate,
        changeCustomerName: changeCustomerName,
        changeRefCode: changeRefCode,
        agents: agents,
        title: config.language.customers[config.currentLanguage()],
        activate: activate,
        attached: attached,
        language: config.language,
        currentLanguage: config.currentLanguage,
        exportToExcel: exportToExcel,
        exportToWord: exportToWord,
        add: add,
        editCustomer: editCustomer,
        addCustomer: addCustomer,
        customer: customer,
        deleteCustomer: deleteCustomer,
        changeStatus: changeStatus,
        koTableReady: koTableReady
    };

    return vm;
});