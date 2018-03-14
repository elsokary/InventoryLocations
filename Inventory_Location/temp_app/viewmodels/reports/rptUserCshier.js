define(['plugins/router', 'services/dataservice', 'config', 'services/tokenstore'], function (router, dataservice, config, tokenStore) {

    var salesDetailDto = function (data) {
        var self = this;
        self.contactName = ko.observable();
        self.branchName = ko.observable();
        self.date = ko.observable();
        self.checkIn = ko.observable('');
        self.cash = ko.observable(0);
        self.visa = ko.observable(0);
        self.netSales = ko.observable(0);
        self.returneds = ko.observable(0);
        self.total = ko.observable(0);
        if (data) {
            self.contactName(data.contactName);
            self.date(moment(data.date).format('DD/MM/YYYY'));
            self.branchName(data.branchName);
            self.checkIn(data.checkIn);
            self.cash(data.cash);
            self.visa(data.visa);
            self.netSales(data.netSales);
            self.returneds(data.returneds);
            self.total(data.total);
        }
    };

    var salesDetail = ko.observable();

    function attached() {

        $(".fixed-action-btn").tooltip('destroy');

        $(".fixed-action-btn").tooltip({ container: 'body' });

    };

    function activate() {
        dataservice.getTransactionsUserDetail().success(function (data) {

            salesDetail(new salesDetailDto(data));
        });
    };

    var itemsTable = ko.observableArray([]);

    var itemsColumnDefenition = ko.observable();

    var PrintToExcel = function () {
         
        var contents = $("#invoice").html();
        var frame1 = $('<iframe />');
        frame1[0].name = "frame1";
        $("body").append(frame1);
        var frameDoc = frame1[0].contentWindow ? frame1[0].contentWindow : frame1[0].contentDocument.document ? frame1[0].contentDocument.document : frame1[0].contentDocument;
        frameDoc.document.open();
        frameDoc.document.write('<link href="../css/printStyle.css" rel="stylesheet" type="text/css" />');

        frameDoc.document.write(contents);
        frameDoc.document.close();
        setTimeout(function () {
            window.frames["frame1"].focus();
            window.frames["frame1"].print();
            frame1.remove();
        }, 1000);


    };

    function canActivate() {
        if (config.isAllow(33)) {
            return true;
        }
    };

    function canDeActivate() {

        return true;
    };

    var vm = {
        salesDetail: salesDetail,
        itemsTable: itemsTable,
        itemsColumnDefenition: itemsColumnDefenition,
        PrintToExcel: PrintToExcel,
        canDeActivate: canDeActivate,
        canActivate: canActivate,
        title: config.language.items[config.currentLanguage()],
        activate: activate,
        attached: attached,
        language: config.language,
        currentLanguage: config.currentLanguage
    };

    return vm;

});