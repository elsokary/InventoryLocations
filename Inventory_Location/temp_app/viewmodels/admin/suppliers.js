define(['plugins/router', 'services/dataservice', 'config'], function (router, dataservice, config) {

    var pageNumber = ko.observable(0);

    var showDelete = ko.observable(config.isAllow(35));

    var changeStatus = ko.observable(false);

    var exportColumns = [];

    var exportToExcel = function () {
        var exportData = ko.toJS(vm.koTable.allItems());

        config.exportJson(exportData, exportColumns, 'excel', 'suppliers');
    };

    var exportToWord = function () {
        var exportData = ko.toJS(vm.koTable.allItems());

        config.exportJson(exportData, exportColumns, 'word', 'suppliers');
    };

    var supplierDto = function () {
        var self = this;

        self.id = ko.observable();
        self.name = ko.observable("");
        self.address = ko.observable("");
        self.email = ko.observable("");
        self.phone = ko.observable("");
        self.code = ko.observable();
        self.selectedAgents = ko.observableArray([]);
        self.selectedCategory = ko.observableArray([]);
    };

    var supplier = ko.observable(new supplierDto());

    var add = function (obj, e) {
        if (config.isAllow(5)) {

            changeStatus(false);

            supplier(new supplierDto);

            supplier().selectedAgents([]);

            supplier().selectedCategory([]);

            supplier().name("");

            supplier().address("");

            supplier().email("");

            supplier().phone("");
             
            dataservice.getNextArrangeSupplier().done(function (result) {

                supplier().code(result);
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
            supplier(new supplierDto);
        })

        //$('input,select').on('keypress', function (e) {
        //    if (e.which == 13) {
        //        e.preventDefault();
        //        var $next = $('[tabIndex=' + (+this.tabIndex + 1) + ']');

        //        console.log($next.length);

        //        if (!$next.length) {
        //            $next = $('[tabIndex=1]');
        //        }
        //        $next.focus();
        //    }
        //});

        $("#supplierForm").validate({
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
                    required: config.language.name[config.currentLanguage()]
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

    var categories = ko.observableArray([]);

    var agents = ko.observableArray([]);

    function activate() {

        supplier(new supplierDto());

        exportColumns = [
                 new config.ExportColumn(config.language.Telephone[config.currentLanguage()], 'phone', 's'),
                 new config.ExportColumn(config.language.name[config.currentLanguage()], 'name', 's'),
                 new config.ExportColumn(config.language.Address[config.currentLanguage()], 'address', 's'),
                 new config.ExportColumn(config.language.email[config.currentLanguage()], 'email', 's'),
                 new config.ExportColumn(config.language.referenceCode[config.currentLanguage()], 'code', 's')
        ];

        dataservice.getAgants().success(function (result) {
            agents(result);
        });

        dataservice.getCategoriesFirstLevel().success(function (result) {
            categories(result);
        });
    };

    var addSupplier = function (obj, e) {

        var isValid = $('#supplierForm').valid();

        if (isValid) {
            $(e.target).button('loading');

            dataservice.addSuppliers(ko.toJS(supplier())).done(function (data) {

                changeStatus(true);

                vm.koTable.pushItem(data);

                supplier().id(data["id"]);

                config.alertSuccess();

                $(e.target).button('reset');

                $('#ViewModalList').modal('hide');

                //supplier(new supplierDto());

                changeStatus(false);
            });

        } else {
            $('#supplierForm').validate();
        }
    }

    var editSupplier = function (obj, e) {
        var isValid = $('#supplierForm').valid();

        if (isValid) {
            $(e.target).button('loading');

            dataservice.editSuppliers(ko.toJS(supplier())).done(function (data) {

                config.alertSuccess();

                $(e.target).button('reset');

                $('#ViewModalList').modal('hide');

                // supplier(new supplierDto());
            });

        } else {
            $('#supplierForm').validate();
        }
    }

    var deleteSupplier = function (obj, e) {
        $.SmartMessageBox({
            title: "كن حذر عملية خطرة!",
            content: "هل انت متاكد تريد الحذف؟",
            buttons: '[لا][نعم]'
        }, function (buttonPressed) {
            if (buttonPressed === "نعم") {
                dataservice.deleteSuppliers(obj.model.id).done(function () {
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

        if (supplier().code()) {

            var exist = false;
            if (changeStatus() === false) {

                ko.utils.arrayFirst(ko.toJS(vm.koTable.allItems()), function (item) {
                    if (item.code === supplier().code()) {
                        exist = true;
                    }
                });
            }
            else {
                ko.utils.arrayFirst(ko.toJS(vm.koTable.allItems()), function (item) {
                    if (item.code === supplier().code() && item.id != supplier().id()) {
                        exist = true;
                    }
                });
            }
            if (exist) {
                supplier().code('');
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

    var changeSupplierName = ko.computed(function () {

        if (supplier().name()) {

            var exist = false;
            if (changeStatus() === false) {

                ko.utils.arrayFirst(ko.toJS(vm.koTable.allItems()), function (item) {
                    if (item.name === supplier().name()) {
                        exist = true;
                    }
                });
            }
            else {
                ko.utils.arrayFirst(ko.toJS(vm.koTable.allItems()), function (item) {
                    if (item.name === supplier().name() && item.id != supplier().id()) {
                        exist = true;
                    }
                });
            }
            if (exist) {
                supplier().name('');
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

    var viewEditModal = function (obj, e) {
        if (config.isAllow(6)) {
            changeStatus(true);

            config.docId(obj.model.id());

            config.docType('supplier');

            supplier(ko.mapping.fromJS(obj.model));

            $('#ViewModalList').modal('show');

            supplier().selectedAgents(obj.model.selectedAgents());

            supplier().selectedCategory(obj.model.selectedCategory());
        }
    };

    function canActivate() {
        if (config.isAllow(8)) {
            return true;
        } else {

            return false;
        }
    };

    var koTableReady = function () {
        vm.koTable.addRowDeleteHandler(deleteSupplier);
        vm.koTable.addRowClickedHandler(viewEditModal);

        dataservice.getSuppliers().success(function (data) {
            vm.koTable.setItems(data);
        });
    };

    var vm = {
        categories: categories,
        showDelete: showDelete,
        canActivate: canActivate,
        changeSupplierName: changeSupplierName,
        changeRefCode: changeRefCode,
        agents: agents,
        title: config.language.suppliers[config.currentLanguage()],
        activate: activate,
        attached: attached,
        language: config.language,
        currentLanguage: config.currentLanguage,
        exportToExcel: exportToExcel,
        exportToWord: exportToWord,
        add: add,
        editSupplier: editSupplier,
        addSupplier: addSupplier,
        supplier: supplier,
        deleteSupplier: deleteSupplier,
        changeStatus: changeStatus,
        koTableReady: koTableReady
    };

    return vm;
});