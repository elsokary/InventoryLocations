define(['config', 'services/dataservice', 'services/tokenstore'], function (config, dataservice, tokenStore) {
     
    var barcodes = ko.observableArray([]);

    var numberOfBarcods = ko.observable(0).extend({
        required: true, min: 1, max: 20
    });
    numberOfBarcods.subscribe(function (value) {
        var barCodeCount = parseInt(value);

        if (barcodes().length > barCodeCount) {
            var diff = barcodes().length - barCodeCount;

            for (var i = 0; i < diff; i++) {
                barcodes.pop();
            }
        } else if (barcodes().length < barCodeCount) {
            var diff = barCodeCount - barcodes().length;

            for (var i = 0; i < diff; i++) {
                barcodes.push(config.guid());
            }
        }
    });

    var resourceCode = ko.observable();
     
    function attached() {
        $(".fixed-action-btn").tooltip('destroy');

        $(".fixed-action-btn").tooltip({ container: 'body' });
    };
      
    var print = function (obj, e) {
        $("#barcodes").clone().appendTo("#print-area");

        window.print();

        $("#print-area").empty();
    };

    var branchId = ko.observable();

    var description = ko.observable("");

    function activate(id) {
        barcodes([]);
        var collection = tokenStore.getPayload();

        branchId(parseInt(collection.bci));

        config.branchId(branchId());

    };

    function canActivate() {
        if (config.isAllow(116)) {
            return true;
        } else {
            if (config.isAllow(117)) {
                return true;
            }
            else {
                $.smallBox({
                    title: "تم الغاء العملية",
                    content: config.language.missingPermissions[config.currentLanguage()],
                    color: "#C46A69",
                    iconSmall: "fa fa-times fa-2x fadeInRight animated",
                    timeout: 2000
                });

                return false;
            }
        }

    };

    var drawBarcode = function (elem, index, data) {
        var text = resourceCode();
        JsBarcode("#inventory-barcode-" + index, text, {
            text: resourceCode() + " " + price().toString(),
            fontSize: 30,

            textPosition: "top",
            fontOptions: "bold",
            font: 'monospace',
            height: 100,

            textAlign: "left",
            format: "CODE128"//ean13
        });
    };

    branchId.subscribe(function () {

        if (branchId()) {

            config.branchId(branchId());
        }
    });

    var price = ko.observable('');

    config.isComplet.subscribe(function () {

        if (config.isComplet()) {

            barcodes([]);

            barcodes.push(config.guid());

            resourceCode(config.item().code);

            price(config.item().price);

            description(config.item().subject);

            $('#searchItem').modal('hide');

            config.isComplet(false);
        }
    });

    var showItemModal = function (data, index) {

        $('#searchItem').modal('show');

    };

    resourceCode.subscribe(function () {
        dataservice.getItemByResourceCode(resourceCode()).done(function (result) {
            if (result) {
                price(result.price);
                resourceCode(result.code);
                description(result.subject);
            }
        });
    });

    var vm = {
        description: description,
        showItemModal: showItemModal,
        numberOfBarcods: numberOfBarcods,
        resourceCode: resourceCode, 
        canActivate: canActivate,
        title: config.language.print[config.currentLanguage()],
        activate: activate,
        attached: attached,
        language: config.language,
        currentLanguage: config.currentLanguage,
        print: print,
        drawBarcode: drawBarcode,
        barcodes: barcodes
    };

    return vm;

});