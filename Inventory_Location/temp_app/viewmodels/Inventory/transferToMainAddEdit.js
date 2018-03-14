define(['plugins/router', 'services/dataservice', 'config', 'services/tokenstore'], function (router, dataservice, config, tokenStore) {

    var changeStatus = ko.observable(true);

    var isFromMain = ko.observable();

    var ItemId = ko.observable();

    var insertedItems = ko.observableArray();

    var inventoryObservable = ko.observable();

    var inventoryItem = function () {
        var self = this;
        self.id = ko.observable();
        self.fromBranchId = ko.observable();
        self.toBranchId = ko.observable();
        self.itemId = ko.observable();
        self.price = ko.observable(1);
        self.quantity = ko.observable(1);
        self.cost = ko.observable(1);
        self.resourceCode = ko.observable();

        self.description = ko.observable("");

        self.total = ko.computed(function () {
            return self.cost() * self.quantity();
        }, this);
        self.totalPrice = ko.computed(function () {
            return self.price() * self.quantity();
        }, this);
        self.reason = ko.observable('');

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
            inventoryItemObject.reason(item.reason);
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

    var inventoryItemDto = ko.observable(new createInventoryItem());

    var branches = ko.observableArray([]);

    var items = ko.observableArray([]);

    function attached() {

        $(".fixed-action-btn").tooltip('destroy');

        $(".fixed-action-btn").tooltip({ container: 'body' });

        // site request items Form Validation
        $('#inventoryForm').validate({

            rules: {
                toBranch: {
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
                }
            },

            messages: {
                toBranch: {
                    required: config.language.toBranch[config.currentLanguage()]
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
                }
            },

            // Do not change code below
            errorPlacement: function (error, element) {
                error.insertAfter(element.parent());
            }
        });


    };

    var branchId = ko.observable();

    var itemId = ko.observable();

    itemId.subscribe(function () {
        if (itemId()) {

            inventoryItemDto().itemId(itemId());

            var obj = ko.utils.arrayFirst(items(), function (item) {
                if (item.itemId === itemId()) {
                    return item;
                }
            });
            inventoryItemDto().resourceCode(obj.resourceCode);
            inventoryItemDto().cost(obj.lastCost);
        }
    });

    branchId.subscribe(function () {
        if (branchId()) {

            insertedItems([]);

            insertedItems.push(createInventoryItem());

            if (isFromMain() == 'true') {

                var collection = tokenStore.getPayload();

                dataservice.getItemByBranchId(collection.bci).done(function (result) {

                    items(result);

                });

            } else {

                dataservice.getItemByBranchId(branchId()).done(function (result) {

                    items(result);

                });
            }

        }
    });

    function compositionComplete() {


    }

    var addSiteRequestItem = function (obj, e) {

        var isValid = $("#inventoryForm").valid();

        if (isValid) {

            $(e.target).button('loading');

            var count = insertedItems().length;

            if (isFromMain() == 'true') {
                ko.utils.arrayForEach(insertedItems(), function (result) {

                    count = count - 1;
                    if (result.itemId()) {

                        result.toBranchId(branchId());


                        dataservice.transferItemFromMainBranch(result);
                    }
                    if (count == 0) {

                        config.alertSuccess();

                        $(e.target).button('reset');

                        router.navigate('transferMain');
                    }
                });
            } else {
                ko.utils.arrayForEach(insertedItems(), function (result) {

                    count = count - 1;

                    if (result.itemId()) {

                        result.fromBranchId(branchId());

                        result.toBranchId(branchId());

                        dataservice.transferItemToMainBranch(result);

                    }
                    if (count == 0) {

                        config.alertSuccess();

                        $(e.target).button('reset');

                        router.navigate('transferMain');
                    }
                });
            }
            if (count == 0) {

                config.alertSuccess();

                $(e.target).button('reset');

                router.navigate('transferMain');
            }
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

                router.navigate('transferMain');
            });

        } else {

            config.alertFail();

            $('#inventoryForm').validate();
        }
    };

    var id = ko.observable();

    function activate(data) {

        var arr = data.split('-');

        id(parseInt(arr[0]));

        isFromMain(arr[1]);

        insertedItems([]);

        dataservice.getTransferBranchesForList().done(function (result) {

            branches(result);

        });

    };

    var changeItem = function (data, index) {

        if (data.itemId()) {

            insertedItems.push(createInventoryItem());

            var obj = ko.utils.arrayFirst(items(), function (item) {
                if (item.itemId === data.itemId()) {
                    return item;
                }
            });

            data.resourceCode(obj.resourceCode);

            data.cost(obj.lastCost);

            data.price(obj.lastCost);

        }
    };

    function canActivate() {
        if (config.isAllow(29)) {

            return true;
        }

    };

    var vm = {
        changeItem: changeItem,
        insertedItems: insertedItems,
        itemId: itemId,
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
        compositionComplete: compositionComplete,
        addSiteRequestItem: addSiteRequestItem,
        inventoryItemDto: inventoryItemDto,
        editSiteRequestItem: editSiteRequestItem
    };

    return vm;

});