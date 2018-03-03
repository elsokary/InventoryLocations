define(['services/dataservice', 'config'], function (dataservice, config) {
    var pageNumber = ko.observable(0);

    var itemDto = function (data) {
        var self = this;

        self.id = ko.observable();
        self.code = ko.observable();
        self.name = ko.observable("");
        self.cost = ko.observable(0);
        self.price = ko.observable(0);
        self.supplierId = ko.observable();
        self.categoryId = ko.observable();
        self.categoryChildId = ko.observable();
        self.supplierName = ko.observable("");
        self.categoryName = ko.observable("");
        if (data) {
            self.id = data.id;
            self.code = data.code;
            self.subject = data.subject;
            self.cost = data.cost;
            self.price = data.price;
            self.supplierId = data.supplierId;
            self.categoryChildId = data.categoryChildId;
            self.categoryId = data.categoryId;
        }
    };
    var itemEdit = ko.observable(new itemDto());

    var arraySelected = ko.observableArray([]);

    var categoriesChilds = ko.observableArray([]);

    var suppliers = ko.observableArray([]);

    var categories = ko.observableArray([]);

    var departments = ko.observableArray([]);

    var item = ko.observable(new itemDto());

    var isValue = ko.observable('true');

    isValue.subscribe(function (value) {
        if (value == 'true') {
            isValue('true');
        }
        else {
            isValue('false');
        }
    });

    var categoryId = ko.observable();

    var categoryChildId = ko.observable();

    function attached() {

        $(".fixed-action-btn").tooltip();

        $("#itemEditCost").validate({
            rules: {
                cost: {
                    required: true,
                    digits: true
                }
            },
            messages: {

                cost: {
                    required: config.language.cost[config.currentLanguage()],
                    digits: config.language.onlyNumbers[config.currentLanguage()]
                }
            },
            errorPlacement: function (error, element) {
                error.insertAfter(element.parent());
            }
        });

        $("#supplierForm").validate({
            rules: {
                name: {
                    required: true
                },
                address: {
                    required: true
                },
                email: {
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
                address: {
                    required: config.language.Address[config.currentLanguage()]
                },
                email: {
                    required: config.language.email[config.currentLanguage()]
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

        $("#itemAddForm").validate({
            rules: {
                supplierId: {
                    required: true
                }
            },
            messages: {
                supplierId: {
                    required: config.language.supplierName[config.currentLanguage()]
                }
            },
            errorPlacement: function (error, element) {
                error.insertAfter(element.parent());
            }
        });

    };

    var items = ko.observableArray([]);

    var showChild = ko.observable(false);

    var departmentId = ko.observable();

    var supplierId = ko.observable();

    supplierId.subscribe(function () {
        if (supplierId()) {

            item().supplierId(supplierId());

            //dataservice.getCategoriesFirstLevelBysupplierId(supplierId()).done(function (result) {
            //    categories(result);

            //});

            dataservice.getFirstLevelCategoryBySupplierIdByDepartmentId(supplierId(), departmentId()).done(function (result) {
                categories(result);
            });

            //dataservice.getItemsdecriptionBySupplierId(supplierId()).done(function (result) {
            //    if (result.length > 0) {
            //        items(result);
            //        getDataOfItems();
            //    }
            //});

        }
    });

    departmentId.subscribe(function () {
        if (supplierId() && departmentId()) {
            dataservice.getCategoriesBysupplierIdAndDepartmetId(supplierId(), departmentId()).done(function (result) {
                categories(result);
            });
        }
    });

    categoryId.subscribe(function () {
        if (categoryId()) {
            item().categoryId(categoryId());
            dataservice.getChildsCategories(categoryId()).done(function (result) {
                categoriesChilds(result);
                if (categoriesChilds().length > 0) {

                    showChild(true);
                }
            });
        }
    });

    categoryChildId.subscribe(function () {
        if (categoryChildId()) {
            item().categoryId(categoryChildId());
        }
    });

    function activate() {

        item(new itemDto());

        arraySelected([]);

        exportColumns = [
               new config.ExportColumn(config.language.name[config.currentLanguage()], 'description', 's'),
               new config.ExportColumn(config.language.referenceCode[config.currentLanguage()], 'resourceCode', 's'),
               new config.ExportColumn(config.language.cost[config.currentLanguage()], 'cost', 's'),
               new config.ExportColumn(config.language.price[config.currentLanguage()], 'price', 's'),
               new config.ExportColumn(config.language.categoryName[config.currentLanguage()], 'categoryName', 's'),
               new config.ExportColumn(config.language.supplierName[config.currentLanguage()], 'supplierName', 's')
        ];

        dataservice.getSupplierForList().done(function (result) {
            suppliers(result);
        });

        dataservice.getDepartmentList().done(function (result) {
            departments(result);
        });
    };

    var getDataOfItems = function () {

        var deferred = $.Deferred();

        if (items().length > 0) {

            var mappedData = ko.mapping.fromJS(items);

            ko.utils.arrayForEach(mappedData(), function (result) {

                result.cost.subscribe(function (newValue) {
                    var id = result.id();
                    var data = result;

                    var currentObj = ko.mapping.fromJS(data);

                    if (!isNaN(newValue)) {

                        currentObj.cost(parseInt(newValue));

                        var itemToEdit = vm.koTable.findItem("id", currentObj.id());

                        vm.koTable.removeItem(itemToEdit[0]);
                        vm.koTable.pushItem(ko.toJS(currentObj));

                    }
                    else {
                        $.smallBox({
                            title: config.language.smartAddMessage[config.currentLanguage()].failureTitle,
                            content: config.language.onlyNumbers[config.currentLanguage()],
                            color: "#C46A69",
                            iconSmall: "fa fa-thumbs-down bounce animated",
                            timeout: 3000
                        });
                        currentObj.cost(currentObj.cost());

                        var itemToEdit = vm.koTable.findItem("id", currentObj.id());

                        vm.koTable.removeItem(itemToEdit[0]);
                        vm.koTable.pushItem(ko.toJS(currentObj));
                    }
                });

                result.price.subscribe(function (newValue) {
                    var id = result.id();
                    var data = result;

                    var currentObj = ko.mapping.fromJS(data);

                    if (!isNaN(newValue)) {

                        currentObj.price(parseInt(newValue));

                        var itemToEdit = vm.koTable.findItem("id", currentObj.id());

                        vm.koTable.removeItem(itemToEdit[0]);
                        vm.koTable.pushItem(ko.toJS(currentObj));

                    }
                    else {
                        $.smallBox({
                            title: config.language.smartAddMessage[config.currentLanguage()].failureTitle,
                            content: config.language.onlyNumbers[config.currentLanguage()],
                            color: "#C46A69",
                            iconSmall: "fa fa-thumbs-down bounce animated",
                            timeout: 3000
                        });
                        currentObj.price(currentObj.price());

                        var itemToEdit = vm.koTable.findItem("id", currentObj.id());

                        vm.koTable.removeItem(itemToEdit[0]);
                        vm.koTable.pushItem(ko.toJS(currentObj));

                    }
                });
            });

            vm.koTable.setItems(mappedData());

            deferred.resolve(true);
        } else {

            deferred.resolve(true);
        }


        return deferred.promise();

    };

    var searchItems = function (obj, e) {

        var isValid = $('#itemAddForm').valid();

        if (isValid) {

            $(e.target).button('loading');
            if (!categoryId()) {
                dataservice.getItemsdecriptionByDepartment(supplierId(), departmentId(), pageNumber(), config.pageSize()).done(function (result) {
                    if (result.length > 0) {

                        items(result);
                        getDataOfItems();
                    }
                    $(e.target).button('reset');

                });

            } else {
                dataservice.getItemsdecriptionByCategoryId(supplierId(), item().categoryId(), pageNumber(), config.pageSize()).done(function (result) {
                    if (result.length > 0) {

                        items(result);
                        getDataOfItems();
                    }
                    $(e.target).button('reset');

                });
            }
        } else {
            $('#itemAddForm').validate();
        }
    }

    var fireEditCost = function (obj, e) {

        $('#ViewModalList').modal('show');
    };

    var fireEditPrice = function (obj, e) {

        $('#ViewModalPrice').modal('show');
    };

    var newCost = ko.observable(0);

    var newPrice = ko.observable(0);

    var editCostActual = function (obj, e) {

        var valid = $('#itemEditCost').valid();

        if (valid) {

            var data = [];

            ko.utils.arrayForEach(arraySelected(), function (item) {
                //arrayFirst
                var obj = {};
                obj.id = item;
                obj.cost = newCost();
                data.push(obj);
            });

            //items(data);
            dataservice.updateCostItems(data).then(function () {

                config.alertSuccess();

                getDataOfItems();

                arraySelected([]);

                $('#ViewModalList').modal('hide');
            });

        } else {
            $("#itemEditCost").validate();
        }
    };

    var editPriceActual = function (obj, e) {

        var valid = $('#itemEditprice').valid();

        if (valid) {

            $(e.target).button('Loading');

            var data = [];

            ko.utils.arrayForEach(arraySelected(), function (item) {

                var objData = {};
                objData.id = item;
                if (isValue() == "true") {
                    objData.price = newPrice();
                } else {
                    ko.utils.arrayFirst(ko.toJS(ko.toJS(vm.koTable.allItems())), function (result) {
                        if (result.id == item) {
                            objData.price = parseFloat(result.price) + parseFloat(result.price * newPrice());
                        }
                    });

                }
                data.push(objData);

            });

            dataservice.updatePriceItems(data).then(function () {

                config.alertSuccess();
                dataservice.getItemsForListCard().success(function (data) {
                    items(data);

                    getDataOfItems();

                    arraySelected([]);

                    $(e.target).button('reset');

                    $('#ViewModalPrice').modal('hide');
                });

            });

        } else {
            $("#itemEditprice").validate();
        }
    };

    var allChecked = ko.observable(false);

    function canActivate() {
        if (config.isAllow(16)) {
            return true;
        } else {
            return false;
        }
    };

    var koTableReady = function () {
        //getItemsForListCard

        // vm.koTable.addRowClickedHandler(viewEditModal);

        dataservice.getItemsForPagination(config.pageSize(), pageNumber()).success(function (data) {
            if (data.length > 0) {

                items(data);

                getDataOfItems();
            }
        });
    };

    var loadMore = function (obj, e) {

        pageNumber(pageNumber() + 1);

        dataservice.getItemsdecriptionByCategoryId(item().categoryId(), pageNumber(), config.pageSize()).done(function (result) {
            if (result.length > 0) {

                vm.koTable.pushItem(data);
            }

        });
    };

    var changeCost = function (data, index) {
        if (data.cost()) {

            dataservice.updateCost(data.id(), data.cost());
        }

    };

    var changePrice = function (data, index) {
        if (data.price()) {
            dataservice.updatePrice(data.id(), data.price());
        }

    };

    var isCheckedAll = ko.observable(false);

    isCheckedAll.subscribe(function (value) {
        if (isCheckedAll()) {

            arraySelected([]);

            var exportData = ko.toJS(ko.toJS(vm.koTable.getFiltereItems()));

            ko.utils.arrayForEach(exportData, function (item) {

                arraySelected.push(item.id);

            });
        }
        else {

            arraySelected([]);
        }
    });

    var categoryIdEdit = ko.observable();

    var categoryChildIdEdit = ko.observable();

    var supplierIdEdit = ko.observable();

    var showChildEdit = ko.observable(false);

    var categoriesChildsEdits = ko.observableArray([]);

    var viewEditModal = function (obj, e) {

        itemEdit(new itemDto(obj.model));

        categoryIdEdit(obj.model.categoryChildId());

        supplierIdEdit(obj.model.supplierId());

        categoryChildIdEdit(obj.model.categoryId());

        showChildEdit(false);

        if (categoryChildIdEdit() != 0) {
            showChildEdit(true);
        }


        $('#ViewModalEdit').modal('show');
    };

    supplierIdEdit.subscribe(function () {
        if (supplierIdEdit()) {

            itemEdit().supplierId(supplierIdEdit());

            dataservice.getCategoriesFirstLevelBysupplierId(supplierIdEdit()).done(function (result) {
                categories(result);

            });
        }
    });

    categoryIdEdit.subscribe(function () {

        if (categoryIdEdit()) {

            itemEdit().categoryId(categoryIdEdit());
            itemEdit().categoryChildId(categoryIdEdit());

            dataservice.getChildsCategories(categoryIdEdit()).done(function (result) {
                categoriesChildsEdits(result);
            });
        }
    });

    categoryChildIdEdit.subscribe(function () {
        if (categoryChildIdEdit()) {
            itemEdit().categoryChildId(categoryChildIdEdit());
        }
    });


    var exportColumns = [];

    var exportToExcel = function () {
        var exportData = ko.toJS(ko.toJS(vm.koTable.allItems()));

        config.exportJson(exportData, exportColumns, 'excel', 'Items');
    };

    var exportToWord = function () {
        var exportData = ko.toJS(ko.toJS(vm.koTable.allItems()));

        config.exportJson(exportData, exportColumns, 'word', 'Items');
    };

    var vm = {
        exportToExcel: exportToExcel,
        exportToWord: exportToWord,


        categoriesChildsEdits: categoriesChildsEdits,
        supplierIdEdit: supplierIdEdit,
        categoryIdEdit: categoryIdEdit,
        categoryChildIdEdit: categoryChildIdEdit,
        showChildEdit: showChildEdit,
        itemEdit: itemEdit,


        departmentId: departmentId,
        departments: departments,
        isValue: isValue,
        isCheckedAll: isCheckedAll,
        changeCost: changeCost,
        changePrice: changePrice,
        loadMore: loadMore,
        categoryChildId: categoryChildId,
        supplierId: supplierId,
        canActivate: canActivate,
        showChild: showChild,
        categoryId: categoryId,
        categoriesChilds: categoriesChilds,
        arraySelected: arraySelected,
        newCost: newCost,
        fireEditCost: fireEditCost,
        fireEditPrice: fireEditPrice,
        editCostActual: editCostActual,
        editPriceActual: editPriceActual,
        suppliers: suppliers,
        categories: categories,
        title: config.language.itemDescription[config.currentLanguage()],
        activate: activate,
        attached: attached,
        language: config.language,
        currentLanguage: config.currentLanguage,
        searchItems: searchItems,
        item: item,
        newPrice: newPrice,
        koTableReady: koTableReady,
        allChecked: allChecked
    };

    return vm;
});