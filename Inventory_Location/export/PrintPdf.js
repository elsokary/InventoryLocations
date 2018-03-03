$(document).ready(function () {

    var documentTitle = ko.observable();

    var itemsTable = ko.observableArray([]);

    var itemsColumnDefenition = ko.observable({});

    itemsTable(JSON.parse(window.localStorage.getItem("itemsArray")) || []);

    itemsColumnDefenition(JSON.parse(window.localStorage.getItem("itemsColumnDefenition")));

    documentTitle(JSON.parse(window.localStorage.getItem("documentTitle")));
      
    $("#btnPrint").click(function () {
        
        printData();
    });
     
    function printData() {
        var contents = $("#dvContents").html();
        var frame1 = $('<iframe />');
        frame1[0].name = "frame1";
        frame1.css({ "position": "absolute", "top": "-1000000px" });
        $("body").append(frame1);
        var frameDoc = frame1[0].contentWindow ? frame1[0].contentWindow : frame1[0].contentDocument.document ? frame1[0].contentDocument.document : frame1[0].contentDocument;
        frameDoc.document.open();
        //Create a new HTML document.
        frameDoc.document.write('<html><head><title>DIV Contents</title>');
        frameDoc.document.write('</head><body>');
        //Append the external CSS file.
        frameDoc.document.write('<link href="../css/printStyle.css" rel="stylesheet" type="text/css" /><link href="../css/override.css" rel="stylesheet" type="text/css" />');
        //Append the DIV contents.
        frameDoc.document.write(contents);
        frameDoc.document.write('</body></html>');
        frameDoc.document.close();
        setTimeout(function () {
            window.frames["frame1"].focus();
            window.frames["frame1"].print();
            frame1.remove();
        }, 500);
    };

    var vm = { 
        itemsTable: itemsTable,
        itemsColumnDefenition: itemsColumnDefenition,
        documentTitle: documentTitle
    };

    ko.applyBindings(vm);
});