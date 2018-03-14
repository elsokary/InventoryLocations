define(['plugins/router', 'services/dataservice', 'config'], function (router, dataservice, config) {

    var pageNumber = ko.observable(0);

    var showDelete = ko.observable(config.isAllow(15));

    var changeStatus = ko.observable(false);

    var selectedRows = ko.observableArray([]); 

    var locations = ko.observableArray([]);
     
    var transactionTypes = ko.observableArray([]);

    var locationId = ko.observable();

    var transactionTypesId = ko.observable();
     
    var locationId = ko.observable();
     
    var exportColumns = [];

    var exportToExcel = function () {
        var exportData = ko.toJS(ko.toJS(vm.koTable.allItems()));

        config.exportJson(exportData, exportColumns, 'excel', 'Items');
    };
     
    var itemDto = function (data) {
        var self = this;

        self.id = ko.observable();
        self.code = ko.observable();
        self.subject = ko.observable("");
        self.cost = ko.observable(0);
        self.price = ko.observable(0); 
        self.alertDays = ko.observable();

        if (data) {
            self.id = data.id;
            self.code = data.code;
            self.subject = data.subject;
            self.cost = data.cost;
            self.price = data.price; 
        }
    };
     
    var item = ko.observable(new itemDto());

    item().value.subscribe(function () {
        if (item().value()) {
            item().price(item().value() + item().cost());
        }
    });

    var itemEdit = ko.observable(new itemDto());
     
    function attached() {

        $(".fixed-action-btn").tooltip();

        $('#code').focus();
         
        $("#itemAddForm").validate({
            rules: {
                name: {
                    required: true,
                    maxlength: 100
                },
                cost: {
                    required: true,
                    number: true
                }, 
                code: {
                    required: true,
                    //digits: true
                } 
            },
            messages: {
                name: {
                    required: config.language.name[config.currentLanguage()],
                    maxlength: 'Max Length 100'
                },
                cost: {
                    required: config.language.cost[config.currentLanguage()],
                    number: config.language.onlyNumbers[config.currentLanguage()]
                } ,
                code: {
                    required: config.language.referenceCode[config.currentLanguage()],
                    // digits: config.language.onlyNumbers[config.currentLanguage()]
                } 
            },
            errorPlacement: function (error, element) {
                error.insertAfter(element.parent());
            }
        });
         
        $("#viewModalMultipleItemsForm").validate({
            rules: {
                subject: {
                    required: true
                },
                cost: {
                    required: true,
                    number: true
                } ,
                code: {
                    required: true,
                    digits: true
                }
            },
            messages: {
                subject: {
                    required: config.language.name[config.currentLanguage()]
                },
                cost: {
                    required: config.language.Address[config.currentLanguage()],
                    number: config.language.onlyNumbers[config.currentLanguage()]
                } ,
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

        dataservice.getPalltaForDorp().done(function (result) {
            locations(result);
        });
        
        dataservice.getTransactionTypesForDrop().done(function (result) {
            transactionTypes(result);
        });

        item(new itemDto());

        exportColumns = [
                 new config.ExportColumn(config.language.name[config.currentLanguage()], 'subject', 's'),
                 new config.ExportColumn(config.language.referenceCode[config.currentLanguage()], 'code', 's'),
                 new config.ExportColumn(config.language.cost[config.currentLanguage()], 'cost', 's') 
        ];

    };

    var addItem = function (obj, e) {

        var isValid = $('#itemAddForm').valid();

        if (isValid) {

            $(e.target).button('loading');

            dataservice.addItemsdecription(ko.toJS(item())).done(function (data) {

                item(new itemDto());

                vm.koTable.pushItem(data);

                config.alertSuccess();

                showChild(false);

                supplierId(undefined);

                categoryId(undefined);

                categoryChildId(undefined);

                $('#code').tabIndex = 1;

                $('#code').focus();

                $(e.target).button('reset');

            });

        } else {
            $('#itemAddForm').validate();
        }
    }

    var toolTipDone = function () {
        $('.btn-floating').tooltip({
            container: 'body'
        });
        return true;
    };

    var selectRecord = function () {
        $('.btn-floating').tooltip({
            container: 'body'
        });
        return true;
    };

    var saveData = function () {

        dataservice.addItemsdecription(ko.toJS(item())).done(function (data) {

            item(new itemDto());

            vm.koTable.pushItem(data);

            config.alertSuccess();

            showChild(false);

        });

        supplierId(undefined);

        categoryId(undefined);

        categoryChildId(undefined);
        $('#code').tabIndex = 1;

        $('#code').focus();
    };

    var editItem = function (obj, e) {
        var isValid = $('#itemEditForm').valid();

        if (isValid) {

            $(e.target).button('loading');

            dataservice.editItemsdecription(ko.toJS(itemEdit())).success(function (data) {
                config.alertSuccess();
                $('#ViewModalList').modal('hide');
                $(e.target).button('reset');


            });

        } else {
            $('#itemEditForm').validate();
        }
    }

    var saveEdit = function () {

        dataservice.editItemsdecription(ko.toJS(itemEdit())).success(function (data) {
            config.alertSuccess();
            $('#ViewModalList').modal('hide');

        });
    };

    var deleteItem = function (obj, e) {
        $.SmartMessageBox({
            title: "كن حذر عملية خطرة!",
            content: "هل انت متاكد تريد الحذف؟",
            buttons: '[لا][نعم]'
        }, function (buttonPressed) {
            if (buttonPressed === "نعم") {
                dataservice.deleteItemsdecription(obj.model.id).success(function () {
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

        if (item().code()) {

            var exist = false;

            dataservice.checkCodeExist(item().code(), 0).done(function (result) {
                exist = result;
                if (exist) {
                    item().code("");

                    $.smallBox({
                        title: "تم الغاء العملية",
                        content: "<i class='fa fa-clock-o'></i> <i>كود الصنف موحود من قبل</i>",
                        color: "#C46A69",
                        iconSmall: "fa fa-times fa-2x fadeInRight animated",
                        timeout: 2000
                    });
                }
            });

        }
    });

    var changeValue = ko.computed(function () {

        if (item().value()) {
            item().price(parseFloat(item().value()) + parseFloat(item().cost()));
        }
    });

    var changeRefCodeEdit = ko.computed(function () {

        if (itemEdit().code()) {

            var exist = false;

            dataservice.checkCodeExist(itemEdit().code(), itemEdit().id()).done(function (result) {
                exist = result;
                if (exist) {

                    itemEdit().code("");

                    $.smallBox({
                        title: "تم الغاء العملية",
                        content: "<i class='fa fa-clock-o'></i> <i>كود الصنف موحود من قبل</i>",
                        color: "#C46A69",
                        iconSmall: "fa fa-times fa-2x fadeInRight animated",
                        timeout: 2000
                    });
                }
            });

        }
    });

    function canActivate() {
        if (config.isAllow(16)) {
            return true;
        } else {

            return false;
        }
    };

    var keyUpControl = function (data, event) {

        if (event.keyCode == 13 || event.which == 13) {

            if (event.currentTarget.tagName == "SELECT") {

                switch (event.currentTarget.name) {
                    case "supplierId":
                        $('#categoryId').tabIndex = 6;
                        $('#categoryId').focus();
                        break;
                    case "categoryId":
                        $('#categoryIdItemId').tabIndex = 7;
                        $('#categoryIdItemId').focus();
                        break;
                    case "categoryIdItemId":
                        var isValid = $('#itemAddForm').valid();
                        if (isValid) {

                            $('#addRow').tabIndex = 8;
                            $('#addRow').focus();
                        }
                        else { $('#itemAddForm').validate(); }
                        break;
                }
            } else {
                switch (event.currentTarget.tabIndex) {
                    case 1:
                        $('#name').tabIndex = 2;
                        $('#name').focus();
                        break;
                    case 2:
                        $('#cost').tabIndex = 3;
                        $('#cost').focus();
                        break;
                    case 3:
                        $('#price').tabIndex = 4;
                        $('#price').focus();
                        break;
                    case 4:
                        $('#supplierId').tabIndex = 5;
                        $('#supplierId').focus();
                        break;

                    case 8:
                        $('#code').tabIndex = 1;
                        $('#code').focus();
                        break;
                }
            }
        }
        event.stopPropagation();
        //  return event.keyCode;

    };
     
    var koTableReady = function () {

        vm.koTable.addRowDeleteHandler(deleteItem);
    //    vm.koTable.addRowClickedHandler(viewEditModal);

        dataservice.getItemsdecriptionPagination(pageNumber(), config.pageSize()).success(function (data) {
            vm.koTable.setItems(data); 
        });
    };
      
    var onSubmit = function () {

        if (primaryBrand() != "") {

            searchByCategoryName();
        } else {
            if (supplierName() != "") {

                searchBySupplierName();

            } else {
                filteredData(currentFilteredData());

                vm.koTable.setItems(currentFilteredData());
            }
        }
    };
     
    var showCategory = ko.observable(false);
 
    function upload(obj, e) {
        var isValid = $('#viewModalMultipleItemsForm').valid();

        if (isValid) {
            var formData = new FormData();
            //viewModalMultipleItemsForm
            var files = $("#file1").get(0).files;
            if (files.length > 0) {

                $(e.target).button('Loading');

                for (i = 0; i < files.length; i++) {
                    formData.append("file" + i, files[i]);
                }
                if (secondaryId()) {
                    brandId(secondaryId());
                }

                if (supplierIdMulti() || brandId()) {
                    $.ajax({
                        type: "POST",
                        url: config.remoteServerName + "/UploadExcelFiles?suplierId=" + supplierIdMulti() + "&categoryId=" + brandId(),
                        contentType: false,
                        processData: false,
                        data: formData,
                        beforeSend: function (xhr) {
                            xhr.setRequestHeader('Authorization', config.getAuthenticationHeader());
                            xhr.setRequestHeader("docType", "items");
                        },
                        success: function (messages) {
                            $(e.target).button('reset');
                            $.smallBox({
                                title: config.language.smartDeleteMessage[config.currentLanguage()].successTitle,
                                content: "Add Items Successfully",
                                color: "#659265",
                                iconSmall: "fa fa-check fa-2x fadeInRight animated",
                                timeout: 2000
                            });
                            dataservice.getItemsdecription().success(function (data) {
                                vm.koTable.setItems(data);
                                currentFilteredData(data);
                                filteredData(data);

                            });
                        },
                        error: function (e) {
                            $(e.target).button('reset');
                            $.smallBox({
                                title: config.language.smartDeleteMessage[config.currentLanguage()].failureTitle,
                                content: "Add Items Failure",
                                color: "#C46A69",
                                iconSmall: "fa fa-times fa-2x fadeInRight animated",
                                timeout: 2000
                            });
                        }
                    });
                }
                else {
                    $.smallBox({
                        title: "Cancel Operations",
                        content: "برجاء اختيار المورد والصنف",
                        color: "#C46A69",
                        iconSmall: "fa fa-times fa-2x fadeInRight animated",
                        timeout: 2000
                    });
                }

            }
        } else {
            $('#viewModalMultipleItemsForm').validate();
        }
    };

    var addMultipleItems = function (obj, e) {

        $('#viewModalMultipleItems').modal('show');

    }

    var loadMore = function (obj, e) {
        pageNumber(pageNumber() + 1);

        dataservice.getItemsdecriptionPagination(pageNumber(), config.pageSize()).success(function (data) {
            if (data.length > 0) {

                vm.koTable.pushItem(data);

                currentFilteredData(vm.koTable.allItems());

                filteredData(vm.koTable.allItems());
            }


        });
    };
    var assignToItem = function (obj, e) {
         

        $('#assignToLocationModalList').modal('show');
    };
    var saveAssignToLocation = function (obj, e) {
 
        dataservice.assignItemToLocation(selectedRows(), locationId(), transactionTypesId()).then(function (data) {
            
            $('#assignToLocationModalList').modal('hide');

        });
    };
    var viewEditModal = function (obj, e) {

        changeStatus(true);

        config.docType('cardDescription');

        config.docId(obj.model.id());

        itemEdit(new itemDto(obj.model));
           
        $('#ViewModalList').modal('show');
    };
 
    var vm = {
        saveAssignToLocation:saveAssignToLocation,
        assignToItem:assignToItem,
        changeValue: changeValue,
        changeRefCodeEdit: changeRefCodeEdit,
        itemEdit: itemEdit,
        loadMore: loadMore,
        addMultipleItems: addMultipleItems,
        upload: upload, 
        onSubmit: onSubmit, 
        showDelete: showDelete,
        keyUpControl: keyUpControl,
        canActivate: canActivate,
        changeRefCode: changeRefCode,   
        title: config.language.itemDescription[config.currentLanguage()],
        activate: activate,
        attached: attached,
        language: config.language,
        currentLanguage: config.currentLanguage,
        exportToExcel: exportToExcel, 
        editItem: editItem,
        addItem: addItem,
        item: item,
        deleteItem: deleteItem,
        changeStatus: changeStatus,
        koTableReady: koTableReady,
        selectRecord: selectRecord,
        selectedRows: selectedRows,
        transactionTypes:transactionTypes,
        locations: locations,
        locationId: locationId,
        transactionTypesId: transactionTypesId

    };

    return vm;
});
