define(['plugins/router', 'services/dataservice', 'config', 'services/tokenstore'], function (router, dataservice, config, tokenStore) {

    var changeStatus = ko.observable(true);

    var inventoryObservableData = function () {
        var self = this;
        self.id = "";
        self.fromBranchId = "";
        self.toBranchId = "";
        self.itemId = "";
        self.price = "";
        self.quantity = "";
        self.cost = "";
        self.resourceCode = "";
        self.reason = "";
        self.uId = "";
    };

    var inventoryObservable = ko.observable(new inventoryObservableData());

    var inventoryItem = function () {
        var self = this;
        self.id = ko.observable();
        self.fromBranchId = ko.observable();
        self.toBranchId = ko.observable();
        self.itemId = ko.observable(undefined);
        self.price = ko.observable(1);
        self.quantity = ko.observable(1);
        self.cost = ko.observable(1);
        self.total = ko.computed(function () {
            return self.cost() * self.quantity();
        }, this);
        self.totalPrice = ko.computed(function () {
            return self.price() * self.quantity();
        }, this);
        self.resourceCode = ko.observable("");
        self.description = ko.observable("");
        self.reason = ko.observable("");
        self.uId = ko.observable(1);

    };

    var createInventoryItem = function (item) {
        var inventoryItemObject = new inventoryItem();

        if (item) {
            inventoryItemObject.id(item.id);
            inventoryItemObject.itemId(item.itemId);
            inventoryItemObject.fromBranchId(item.fromBranchId);
            inventoryItemObject.toBranchId(item.toBranchId);
            inventoryItemObject.quantity(item.quantity);
            inventoryItemObject.resourceCode(item.resourceCode);
            inventoryItemObject.description(item.description);
            inventoryItemObject.price(item.price);
            inventoryItemObject.cost(item.cost);
            inventoryItemObject.total(item.total);
            inventoryItemObject.totalPrice(item.totalPrice);
            inventoryItemObject.reason(item.reason);
        }

        return inventoryItemObject;
    };

    var fromBranchId = ko.observable();

    var createItem = function (item) {
        var inventoryItemObject = new inventoryItem();

        if (item) {
            inventoryItemObject.itemId(item.id);
            inventoryItemObject.quantity(1);
            inventoryItemObject.resourceCode(item.code);
            inventoryItemObject.description(item.subject);
            inventoryItemObject.price(item.price);
            inventoryItemObject.cost(item.cost);
        }

        return inventoryItemObject;
    };

    var initializeInventoryItem = function (siteRequestItemObject) {
        siteRequestItemObject().id(0);
        siteRequestItemObject().itemId();
        siteRequestItemObject().fromBranchId();
        siteRequestItemObject().toBranchId(1);
        siteRequestItemObject().price(0);
        siteRequestItemObject().quantity(0);
        siteRequestItemObject().cost(0);
        siteRequestItemObject().resourceCode('');
        siteRequestItemObject().reason('');
    };

    var branches = ko.observableArray([]);

    var items = ko.observableArray([]).extend({ deferred: true });

    var insertedItems = ko.observableArray();

    function attached() {

        $(".fixed-action-btn").tooltip('destroy');

        $(".fixed-action-btn").tooltip({ container: 'body' });

        $('#inventoryForm').validate({

            rules: {
                toBranch: {
                    required: true
                },
                fromBranch: {
                    required: true
                },
                itemId: {
                    required: true,
                    digits: true
                },
                price: {
                    required: true
                },
                resourceCode: {
                    required: true,
                    number: true
                },
                quantity: {
                    required: true,
                    number: true
                },
                reason: {
                    digits: true
                }
            },

            messages: {
                toBranch: {
                    required: config.language.toBranch[config.currentLanguage()]
                },
                fromBranch: {
                    required: config.language.fromBranchName[config.currentLanguage()]
                },
                itemId: {
                    required: '',
                    digits: config.language.onlyNumbers[config.currentLanguage()]
                },
                price: {
                    required: ''
                },
                resourceCode: {
                    required: config.language.resourceCode[config.currentLanguage()],
                    number: config.language.onlyNumbers[config.currentLanguage()]
                },
                quantity: {
                    required: config.language.quantityRequired[config.currentLanguage()],
                    number: config.language.onlyNumbers[config.currentLanguage()]
                },
                reason: {
                    required: ''
                }
            },

            // Do not change code below
            errorPlacement: function (error, element) {
                error.insertAfter(element.parent());
            }
        });
    };

    var branchId = ko.observable();

    var changeItem = function (data, index) {

        dataservice.getItemByResourceCodeByBranchId(ko.toJS(data.resourceCode), config.branchId()).done(function (result) {
            if (result) {

                insertedItems.push(createInventoryItem());

                data.resourceCode(result.code);

                data.itemId(result.id);

                data.description(result.subject);

                data.cost(result.cost ? result.cost : 0);

                data.price(result.price);

            }
        });
    };

    branchId.subscribe(function () {
        if (branchId()) {

            insertedItems([]);

            insertedItems.push(createInventoryItem());
        }
    });

    var addSiteRequestItem = function (obj, e) {

        var isValid = $("#inventoryForm").valid();

        if (isValid) {

            $(e.target).button('loading');

            var count = insertedItems().length;

            ko.utils.arrayForEach(insertedItems(), function (result) {

                if (result.itemId()) {

                    result.toBranchId(branchId());

                    result.fromBranchId(fromBranchId());

                    dataservice.transferItemToBranch(result);

                } 
                count--;
                 
                if (count == 0) {

                    config.alertSuccess();

                    $(e.target).button('reset');

                    router.navigate('items');

                }
            });
 
        } else {
            $("#inventoryForm").validate();
        }
    };

    var editSiteRequestItem = function (obj, e) {
        var isValid = $('#inventoryForm').valid();

        if (isValid) {
            $(e.target).button('loading');

            dataservice.editContractsinventory(inventoryItemDto(), dataRowItemDtoEditObservable).done(function (result) {
                $(e.target).button('reset');

                config.alertSuccess();

                router.navigate('items');
            });
        } else {
            $('#inventoryForm').validate();
        }
    };

    function activate(id) {

        insertedItems([]);

        branchId(undefined);

        fromBranchId(undefined);

        var collection = tokenStore.getPayload();

        config.branchId(parseInt(collection.bci));
         
        dataservice.getBranchesForList().done(function (result) {
            branches(result);
            fromBranchId(parseInt(collection.bci));
        });

    };

    function canActivate() {
        if (config.isAllow(33)) {
            return true;
        }
    };

    var showItemModal = function (data, index) {

        $('#searchItem').modal('show');

    };

    config.isComplet.subscribe(function () {
        if (config.isComplet()) {

            insertedItems.unshift(createItem(config.item()));

            $('#searchItem').modal('hide');

            config.isComplet(false);
        }
    });


    var vm = {
        showItemModal: showItemModal,
        changeItem: changeItem,
        inventoryItem: inventoryItem,
        inventoryObservable: inventoryObservable,
        insertedItems: insertedItems,
        branchId: branchId,
        items: items,
        branches: branches,
        canActivate: canActivate,
        title: config.language.items[config.currentLanguage()],
        activate: activate,
        attached: attached,
        changeStatus: changeStatus,
        language: config.language,
        currentLanguage: config.currentLanguage,
        addSiteRequestItem: addSiteRequestItem,
        editSiteRequestItem: editSiteRequestItem
    };

    return vm;

});