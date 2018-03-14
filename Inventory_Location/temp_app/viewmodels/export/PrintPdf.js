define(['plugins/router', 'services/dataservice', 'config'], function (router, dataservice, config) {

    var documentTitle = ko.observable();

    var itemsTable = ko.observableArray([]);

    var itemsColumnDefenition = ko.observable({});

    function printData() {
        var divToPrint = document.getElementById("printTable");
        var newWin = window.open("");
        newWin.document.write(divToPrint.outerHTML);
        newWin.print();
        newWin.close();
    }

    function attached() {

        $('button')
            .on('click',
                function () {
                    printData();
                });
    }

    function compositionComplete() { 
         $('html').css('width', '1045px'); 

    };

    function activate() {

        itemsTable(config.itemsArray());

        itemsColumnDefenition(config.itemsColumnDefenition);

        documentTitle(config.documentTitle());

    };

    var vm = {
        attached: attached,
        compositionComplete: compositionComplete,
        activate: activate,
        itemsTable: itemsTable,
        itemsColumnDefenition: itemsColumnDefenition,
        documentTitle: documentTitle
    };

    return vm;
});