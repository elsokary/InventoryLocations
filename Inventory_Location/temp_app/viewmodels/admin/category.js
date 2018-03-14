define(['plugins/router', 'services/dataservice', 'config', 'services/tokenstore'], function (router, dataservice, config, tokenStore) {
    var show = ko.observable(false);

    var preAdd = ko.observable(config.isAllow(25));

    var selectParent = ko.observable();

    var changeStatus = ko.observable(false);

    var selectedId = ko.observable();

    var docTreeDocumentSelected = ko.observable(false);

    var categoryDto = function () {
        var self = this;
        self.id = ko.observable();
        self.name = ko.observable("");
        self.parentId = ko.observable();
        self.prefix = ko.observable('00');
        self.arrange = ko.observable();
        self.serial = ko.observable('0');
        self.alertDays = ko.observable(0);
        self.code = ko.observable();
        self.trees = ko.observableArray([]);
    };

    var filtered = ko.observableArray();

    var hidden = ko.observableArray();

    var search = function (word, array) {
        array().forEach(function (item) {
            if (item.name()) {
                if (item.name().toLowerCase().indexOf(word.toLowerCase()) === -1) {
                    hidden.push(item);
                } else {
                    item.visible(true);
                    filtered.push(item);
                }
            } else {
                hidden.push(item);
            }

            search(word, item.trees);
        });
    };

    var searchValue = ko.observable();

    var filterHidden = function () {
        hidden().forEach(function (item) {
            var hasVisibleChild = false;

            filtered().forEach(function (account) {
                if (account.parentId() && (account.parentId() === item.id())) {
                    hasVisibleChild = true;
                }
            });

            if (!hasVisibleChild) {
                item.visible(false);
            } else {
                hidden.remove(item);
                item.visible(true);
                filtered.push(item);
                filterHidden();
            }
        });
    }

    searchValue.subscribe(function (value) {
        if (value || value === '') {
            search(value, categories());

            filterHidden();

            filtered([]);

            hidden([]);
        }
    });

    var category = ko.observable(new categoryDto());

    var categories = ko.observableArray();

    var toolTipDone = function () {
        $('.btn-floating').tooltip({
            container: 'body'
        });
        return true;
    };

    var selectedCategory = ko.observable();

    var selectedCategoryParent = ko.observable();

    var currentArrange = ko.observable();

    var viewEditModal = function (obj) {

        selectedCategory(obj);

        changeStatus(true);

        currentArrange(obj.arrange());

        category().parentId(obj.parentId());
        category().id(obj.id());
        category().code(obj.code());
        category().alertDays(obj.alertDays());
        category().name(obj.name());

        category().trees(obj.trees());

        $('#ViewModal').modal('show');

    };

    var viewAddModal = function (obj) {

        changeStatus(false);

        selectedCategory(obj);

        currentArrange(obj.arrange() + 1);

        selectedCategoryParent(this);

        category().code(undefined);

        category().name(undefined);

        if (obj.id || obj.id != null) {

            category().parentId(obj.id());

            category().code(undefined);

            category().name(undefined);

            category().alertDays(0);

        } else {
            category().parentId(null);

            category().code(undefined);

            category().name(undefined);

            category().alertDays(0);
        }

        $('#ViewModal').modal('show');
    };

    var isRoot = ko.observable(false);

    var addModal = function (obj) {

        changeStatus(false);

        isRoot(true);

        currentArrange(0);

        category().parentId(null);

        category().code(undefined);

        category().name(undefined);

        category().alertDays(0);

        selectedCategory(null);

        $('#ViewModal').modal('show');
    };

    function attached() {
        $(".fixed-action-btn").tooltip('destroy');

        $(".fixed-action-btn").tooltip({ container: 'body' });

        $('#ViewModal').on('shown.bs.modal', function () {
            $('#title').focus();
        })

        $('#ViewModal').on('hidden.bs.modal', function () {
            category(new categoryDto());
        })

        $('input,select').on('keypress', function (e) {
            if (e.which == 13) {
                e.preventDefault();
                var $next = $('[tabIndex=' + (+this.tabIndex + 1) + ']');
                console.log($next.length);
                if (!$next.length) {
                    $next = $('[tabIndex=1]');
                }
                $next.focus();
            }
        });

        jQuery.validator.setDefaults({
            debug: true,
            success: "valid"
        });

        var isCtrl = false;

        document.onkeydown = function (e) {

            //if (e.keyCode == 17) isCtrl = true;

            //if (e.keyCode == 83 && isCtrl == true) {

            //    var isValid = $('#categoryForm').valid();

            //    if (isValid) {
            //        if (changeStatus() == false) {
            //            saveAdd();

            //        } else {
            //            saveEdit();
            //        }

            //        isCtrl = false

            //    } else {
            //        $('#categoryForm').validate();
            //    }
            //    return false;
            //}
        }

        $('#categoryForm').validate({

            // Rules for form validation
            rules: {
                title: {
                    required: true
                },
                code: {
                    required: true
                    //number: true
                }
            },

            // Messages for form validation
            messages: {
                title: {
                    required: config.language.titleSelection[config.currentLanguage()]

                },
                code: {
                    required: config.language.resourceCodeRequired[config.currentLanguage()]
                    // number: config.language.onlyNumbers[config.currentLanguage()]

                }
            },

            // Do not change code below
            errorPlacement: function (error, element) {
                error.insertAfter(element.parent());
            }
        });

        $('.btn-floating').tooltip({
            container: 'body'
        });
    };

    function activate() {
        dataservice.getCategories().success(function (result) {
            categories(ko.mapping.fromJS(result));

        });
    };

    function addRowItem(obj, e) {
        var isValid = $('#categoryForm').valid();
        if (isValid) {

            $(e.target).button('loading');

            saveAdd();

            $(e.target).button('reset');

        } else {
            $('#categoryForm').validate();
        }

    };

    function editRow(obj, e) {

        var isValid = $('#categoryForm').valid();

        if (isValid) {
            $(e.target).button('loading');
            saveEdit();

            $(e.target).button('reset');
        } else { $('#categoryForm').validate(); }

    };

    var saveAdd = function () {
        dataservice.addCategories(category()).success(function (result) {

            config.alertSuccess();

            $('#ViewModal').modal('hide');

            if (isRoot()) {
                categories.push(ko.mapping.fromJS(result));
            } else {
                if (selectedCategory().parentId) {
                    selectedCategory().trees.push(ko.mapping.fromJS(result));
                } else {
                    categories.push(ko.mapping.fromJS(result));
                }
            }

        });
    };

    var saveEdit = function () {
        dataservice.editCategories(category()).success(function (result) {

            selectedCategory().name(category().name());

            selectedCategory().code(category().code());

            selectedCategory().parentId(category().parentId());

            if (selectedCategory().trees().length > 0) {
                selectedCategory().trees(selectedCategory().trees());
            }

            config.alertSuccess();

            $('#ViewModal').modal('hide');
        });
    };

    var expandCollapseTreeNode = function (obj, event) {

        var nodeParent = $(event.currentTarget).parent().parent();

        var treeIcon = $(event.currentTarget);

        if (!$(nodeParent).hasClass("open")) {
            $(nodeParent).addClass("open");
            $(treeIcon).removeClass("fa-plus-circle");
            $(treeIcon).addClass("fa-minus-circle");
        } else {
            $(nodeParent).removeClass("open");
            $(treeIcon).removeClass("fa-minus-circle");
            $(treeIcon).addClass("fa-plus-circle");
        }
    };

    var activateDocument = function (obj, event) {
        show(true);
        category().name(obj.name)
        category().parentId(obj.id);
        category().id(obj.id);
        category().code(obj.code);

        selectedId(obj.id);
        $(".tree .parent_li ul li span.active").removeClass("active");
        $(event.currentTarget).parent().addClass("active");
        docTreeDocumentSelected(true);
    };

    var deleteAccountTreeNode = function (obj) {
        var selectedParent = this;

        $.SmartMessageBox({
            title: "كن حذر عملية خطرة!",
            content: "هل انت متاكد تريد الحذف؟",
            buttons: '[No][Yes]'
        }, function (buttonPressed) {
            if (buttonPressed === "Yes") {
                dataservice.deleteCategories(obj.id()).success(function (data) {
                    var itemToDelete = undefined;

                    if (selectedParent.trees) {
                        selectedParent.trees().forEach(function (item) {
                            if (item.id() === obj.id()) {
                                itemToDelete = item;
                            }
                        });
                    }

                    if (itemToDelete) {
                        selectedParent.trees.remove(itemToDelete);
                    } else {
                        categories().forEach(function (item) {
                            if (item.id() === obj.id()) {
                                itemToDelete = item;
                            }
                        });

                        categories.remove(itemToDelete);
                    }
                    $.smallBox({
                        title: "Operation completed successfuly",
                        content: "<i class='fa fa-clock-o'></i> <i>Record deleted successfuly...</i>",
                        color: "#659265",
                        iconSmall: "fa fa-check fa-2x fadeInRight animated",
                        timeout: 2000
                    });
                }).fail(function (response) {
                    $.smallBox({
                        title: "Operation was canceled",
                        content: "<i class='fa fa-clock-o'></i> <i>" + response + "</i>",
                        color: "#C46A69",
                        iconSmall: "fa fa-times fa-2x fadeInRight animated",
                        timeout: 2000
                    });
                });
            }
            if (buttonPressed === "No") {
                $.smallBox({
                    title: "Operation was canceled",
                    content: "<i class='fa fa-clock-o'></i> <i>Canceled delete...</i>",
                    color: "#C46A69",
                    iconSmall: "fa fa-times fa-2x fadeInRight animated",
                    timeout: 2000
                });
            }
        });
    };

    var changeRefCode = ko.computed(function () {
        if (category().code()) {
            var exist = false;
            if (changeStatus() == false) {
                category().id(0);
            }
            dataservice.checkCategoryCodeExist(category().code(), category().id(), currentArrange()).success(function (result) {
                exist = result;
                if (exist) {
                    category().code('');
                    $.smallBox({
                        title: "Operation was canceled",
                        content: "<i class='fa fa-clock-o'></i> <i>كود البراند موحود من قبل</i>",
                        color: "#C46A69",
                        iconSmall: "fa fa-times fa-2x fadeInRight animated",
                        timeout: 2000
                    });
                }

            });
        }
    });

    category().code.subscribe(function (value) {
        category().code(value);

    });

    var changeRefName = ko.computed(function () {
        if (category().name()) {
            var exist = false;
            if (changeStatus() == false) {
                category().id(0);
            }
            dataservice.checkCategoryNameExist(category().name(), category().id()).success(function (result) {

                exist = result;

                if (exist) {
                    category().name('');
                    $.smallBox({
                        title: "Operation was canceled",
                        content: "<i class='fa fa-clock-o'></i> <i>اسم البراند موحود من قبل</i>",
                        color: "#C46A69",
                        iconSmall: "fa fa-times fa-2x fadeInRight animated",
                        timeout: 2000
                    });
                }

            });
        }
    });

    var checkExist = function (array) {
        var exist = false;
        array().forEach(function (item) {
            if (item.code() == word) {
                exist = true;
            } else {
                checkExist(word, item.trees);
            }
        });
        return exist;
    };

    var checkExistName = function (array, word) {
        var exist = false;
        array().forEach(function (item) {
            if (item.name() == word) {
                exist = true;
            } else {
                if (!exist) {
                    exist = checkExistName(word, item.trees);
                }
            }
        });
        return exist;
    };

    function canActivate() {
        if (config.isAllow(28)) {
            return true;
        } else {

            return false;
        }
    };

    var exportToExcel = function () {

        dataservice.getCategoriesForExport().success(function (result) {

            var exportColumns = [
                     new config.ExportColumn(config.language.name[config.currentLanguage()], 'name', 's'),
                     new config.ExportColumn(config.language.referenceCode[config.currentLanguage()], 'code', 's')
            ];

            config.exportJson(result, exportColumns, 'excel', 'Categories');
        });
    };

    var vm = {
        exportToExcel: exportToExcel,
        addModal: addModal,
        currentArrange: currentArrange,
        canActivate: canActivate,
        changeRefName: changeRefName,
        changeRefCode: changeRefCode,
        deleteAccountTreeNode: deleteAccountTreeNode,
        searchValue: searchValue,
        viewEditModal: viewEditModal,
        viewAddModal: viewAddModal,
        selectedCategoryParent: selectedCategoryParent,
        selectedCategory: selectedCategory,
        toolTipDone: toolTipDone,
        title: config.language.category[config.currentLanguage()],
        attached: attached,
        canActivate: canActivate,
        activate: activate,
        language: config.language,
        currentLanguage: config.currentLanguage,
        category: category,
        addRowItem: addRowItem,
        categories: categories,
        docTreeDocumentSelected: docTreeDocumentSelected,
        expandCollapseTreeNode: expandCollapseTreeNode,
        activateDocument: activateDocument,
        selectedId: selectedId,
        show: show,
        changeStatus: changeStatus,
        editRow: editRow,
        selectParent: selectParent
    };

    return vm;

});