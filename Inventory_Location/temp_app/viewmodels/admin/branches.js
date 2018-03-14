define(['plugins/router', 'services/dataservice', 'config'], function (router, dataservice, config) {

    var pageNumber = ko.observable(0);

    var showDelete = ko.observable(config.isAllow(3));

    var changeStatus = ko.observable(false);

    var exportColumns = [];

    var exportToExcel = function () {
        var exportData = ko.toJS(ko.toJS(vm.koTable.allItems()));

        config.exportJson(exportData, exportColumns, 'excel', 'branches');
    };

    var exportToWord = function () {
        var exportData = ko.toJS(ko.toJS(vm.koTable.allItems()));

        config.exportJson(exportData, exportColumns, 'word', 'branches');
    };

    var branchDto = function (data) {
        var self = this;

        self.id = ko.observable();
        self.name = ko.observable("");
        self.address = ko.observable("");
        self.email = ko.observable("");
        self.phone = ko.observable("");
        self.code = ko.observable();

        if (data) {
            self.id(data.id());
            self.name(data.name());
            self.address(data.address());
            self.email(data.email());
            self.phone(data.phone());
            self.code(data.code());
        }
    };

    var branch = ko.observable(new branchDto());

    var branchEdit = ko.observable(new branchDto());

    var add = function (obj, e) {
        if (config.isAllow(1)) {
            changeStatus(false);
            inAdding(false);
            branch(new branchDto(null));
            dataservice.getNextArrangeBranch().done(function (result) {
                branch().code(result);
                $('#ViewModalList').modal('show');
                $('#code').focus();
            });
        }
    }

    function attached() {

        $('#ViewModalList')
            .on('shown.bs.modal',
                function () {
                    $('#code').focus();
                });

        $('#ViewModalList')
            .on('hidden.bs.modal',
                function () { 
                    branch(new branchDto());
                });

        $(".fixed-action-btn").tooltip();
         
        var isCtrl = false;

        document.onkeydown = function (e) {

            if (e.keyCode == 17) isCtrl = true;

            if (e.keyCode == 83 && isCtrl == true) {

                var isValid = $('#branchForm').valid();

                if (isValid) {
                    if (changeStatus() == false) {

                        var btn = e ? e.target : $("#addRow");
                        var btn = event ? event.target : $("#addRow");

                        $(btn).button('loading');

                        saveAdd(btn);

                        isCtrl = false
                    }
                    else {
                        var btn = e ? e.target : $("#editRow");
                         
                        $(btn).button('loading');

                        saveEdit();
                        isCtrl = false
                    }
                } else {
                    $('#branchForm').validate();
                }
                return false;
            }
        }

        $("#branchForm").validate({
            rules: {
                name: {
                    required: true,
                    minlength: 1
                },
                code: {
                    required: true,
                    minlength: 1
                }
            },
            messages: {
                name: {
                    required: config.language.branch[config.currentLanguage()],
                    minlength: 'برجاء ادخال اسم الفرع'
                },
                code: {
                    required: config.language.referenceCode[config.currentLanguage()],
                    minlength: 'برجاء ادخال كود الفرع'
                }
            },
            errorPlacement: function (error, element) {
                error.insertAfter(element.parent());
            }
        });

    };

    function keydown(e) {

        //var evtobj = window.event ? event : e;

        //if (e.keyCode == 17) isCtrl = true;
        //if (e.keyCode == 83 && isCtrl == true) {

        //    var btn = e ? e.target : $("#addRow");

        //    saveAdd(btn);

        //    return false;
        //}

        //if ((!(evtobj.which == 83 && evtobj.ctrlKey) )) {
        //    alert("ctrl+S");
        //    var btn = event ? event.target : $("#addRow");

        //    event.preventDefault();

        //    return true;
        //}
    }

    function activate() {

        branch(new branchDto());

        exportColumns = [
                 new config.ExportColumn(config.language.Telephone[config.currentLanguage()], 'phone', 's'),
                 new config.ExportColumn(config.language.name[config.currentLanguage()], 'name', 's'),
                 new config.ExportColumn(config.language.Address[config.currentLanguage()], 'address', 's'),
                 new config.ExportColumn(config.language.email[config.currentLanguage()], 'email', 's')
        ];
    };

    var addBranch = function (obj, e) {
        var isValid = $('#branchForm').valid();
        if (isValid) {
            $(e.target).button('loading');
            saveAdd(e);
            $(e.target).button('reset');
            $('#code').tabIndex = 1;
            $('#code').focus();
        } else {
            $('#branchForm').validate();
        }
    }

    var saveAdd = function (e) {

        inAdding(true);
        dataservice.addBranches(ko.toJS(branch())).success(function (data) {

            changeStatus(true);

            vm.koTable.pushItem(data);

            config.alertSuccess();
             
            $('#ViewModalList').modal('hide');

        });

    };

    var inAdding = ko.observable(true);

    var editBranch = function (obj, e) {
        var isValid = $('#branchForm').valid();
        if (isValid) {

            $(e.target).button('loading');

            saveEdit();

            $(e.target).button('reset');
        } else {
            $('#branchForm').validate();
        }
    }

    var saveEdit = function () {
        dataservice.editBranches(ko.toJS(branch())).success(function (data) {
            config.alertSuccess();
            $('#ViewModalList').modal('hide');
        });
    };

    var deleteBranch = function (obj, e) {
        $.SmartMessageBox({
            title: "كن حذر عملية خطرة!",
            content: "هل انت متاكد تريد الحذف؟",
            buttons: '[لا][نعم]'
        }, function (buttonPressed) {
            if (buttonPressed === "نعم") {
                dataservice.deleteBranches(obj.model.id).done(function () {
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

    var viewEditModal = function (obj, e) {
        if (config.isAllow(2)) {

            changeStatus(true);

            config.docId(obj.model.id());

            config.docType('Branches');

            inAdding(false);

            branch(new branchDto(ko.mapping.fromJS(obj.model)));

            $(".fixed-action-btn").tooltip('destroy');
            $(".fixed-action-btn").tooltip({ container: 'body' });

            $('#ViewModalList').modal('show');
        }
    };

    var changeRefCode = ko.computed(function () {
        if (inAdding() == false) {
            if (branch().code()) {
                var exist = false;
                if (changeStatus() === false) {
                    ko.utils.arrayFirst(ko.toJS(vm.koTable.allItems()), function (item) {
                        if (item.code === branch().code()) {
                            exist = true;
                        }
                    });
                } else {
                    ko.utils.arrayFirst(ko.toJS(vm.koTable.allItems()), function (item) {
                        if (item.code === branch().code() && item.id != branch().id()) {
                            exist = true;
                        }
                    });
                }
                if (exist) {
                    branch().code();

                    $.smallBox({
                        title: "تم الغاء العملية",
                        content: "<i class='fa fa-clock-o'></i> <i>كود الفرع موحود من قبل</i>",
                        color: "#C46A69",
                        iconSmall: "fa fa-times fa-2x fadeInRight animated",
                        timeout: 2000
                    });
                }
            }
        }
    });

    var changeBranchName = ko.computed(function () {
        if (inAdding() == false) {
            if (branch().name()) {
                var exist = false;

                if (changeStatus() === false) {
                    ko.utils.arrayFirst(ko.toJS(ko.toJS(vm.koTable.allItems())), function (item) {
                        if (item.name === branch().name()) {
                            exist = true;
                        }
                    });
                } else {
                    ko.utils.arrayFirst(ko.toJS(ko.toJS(vm.koTable.allItems())), function (item) {
                        if (item.name === branch().name() && item.id != branch().id()) {
                            exist = true;
                        }
                    });
                }
                if (exist) {
                    branch().name('');
                    $.smallBox({
                        title: "تم الغاء العملية",
                        content: "<i class='fa fa-clock-o'></i> <i>اسم الفرع موحود من قبل</i>",
                        color: "#C46A69",
                        iconSmall: "fa fa-times fa-2x fadeInRight animated",
                        timeout: 2000
                    });
                }
            }
        }
    });

    function canActivate() {
        if (config.isAllow(4)) {
            return true;
        } else {

            return false;
        }
    };

    var koTableReady = function () {

        vm.koTable.addRowDeleteHandler(deleteBranch);

        vm.koTable.addRowClickedHandler(viewEditModal);

        dataservice.getBranches().success(function (data) {
            vm.koTable.setItems(data);
        });
    };

    var updateDefault = function (obj, e) {

        dataservice.updateDefaultBranchById(obj.id()).success(function (data) {
            vm.koTable.setItems([]);
            vm.koTable.setItems(data);
        });
    };

    var vm = {
        updateDefault: updateDefault,
        showDelete: showDelete,
        canActivate: canActivate,
        changeBranchName: changeBranchName,
        changeRefCode: changeRefCode,
        title: config.language.branch[config.currentLanguage()],
        activate: activate,
        attached: attached,
        language: config.language,
        currentLanguage: config.currentLanguage,
        exportToExcel: exportToExcel,
        exportToWord: exportToWord,
        add: add,
        editBranch: editBranch,
        addBranch: addBranch,
        branch: branch,
        deleteBranch: deleteBranch,
        changeStatus: changeStatus,
        koTableReady: koTableReady
    };

    return vm;
});