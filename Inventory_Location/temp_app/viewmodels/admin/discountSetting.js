define(['plugins/router', 'services/dataservice', 'config', 'services/tokenstore'], function (router, dataservice, config, tokenstore) {

    var categoriesPool = ko.observableArray([]);

    var branches = ko.observableArray([]);

    var branchId = ko.observable();

    var retailSettingData = function () {
       var self = this;
        self.categoryId = ko.observable();
        self.branchId = ko.observable();
        self.discount = ko.observable(0);
        self.fromDate = ko.observable(moment().format());
        self.finishDate = ko.observable(moment().format());
    };

    var retailSetting = ko.observable(new retailSettingData());
     
    var showAllBranches = ko.observable(false);

    function attached() {

        $("#letterEditForm").validate({
            rules: {
                categoryId: {
                    required: true
                },
                branchId: {
                    required: true
                },
                discount: {
                    required: true,
                    digits: true
                }
            },
            messages: {
                categoryId: {
                    equired: config.language.categoryName[config.currentLanguage()]
                },
                branchId: {
                    equired: config.language.toBranch[config.currentLanguage()]
                },
                discount: {
                    required: "نسبة الخصم",
                    digits: "يقبل ارقام فقط"
                }
            },
            errorPlacement: function (error, element) {
                error.insertAfter(element.parent());
            }
        });


    };

    function activate() {

        var collection = tokenstore.getPayload();

        if (config.isAllow(41)) {

            showAllBranches(true);

            dataservice.getBranchesForListAll().done(function (result) {
                branches(result);
                branchId(collection.bci);

                retailSetting().branchId(branchId());
            });

        } else {

            branchId(collection.bci);

            retailSetting().branchId(branchId());

            showAllBranches(false);
        }

        dataservice.getCategoriesListRetail(categoriesPool);

    };

    function saveChange(obj, e) {
        var valid = $('#letterEditForm').valid();

        if (valid) {
            $(e.target).button('loading');

            retailSetting().branchId(branchId());

            var objectData = ko.toJS(retailSetting());

            objectData.fromDate = moment(objectData.fromDate, 'DD/MM/YYYY').format();

            objectData.finishDate = moment(objectData.finishDate, 'DD/MM/YYYY').format();
             
            dataservice.addItemHistory(objectData).then(function () {

                $(e.target).button('reset');

                $.smallBox({
                    title: "Operation completed successfuly",
                    content: "<i class='fa fa-clock-o'></i> <i>Record Update successfuly...</i>",
                    color: "#659265",
                    iconSmall: "fa fa-check fa-2x fadeInRight animated",
                    timeout: 2000
                });

            });

        } else {
            $("#letterEditForm").validate();
        }

    };

    var koTableReady = function () {

        dataservice.selectAllDataDiscount().success(function (data) {

            vm.koTable.setItems(data);

        });

    };

    var vm = {
        showAllBranches: showAllBranches,
        branches: branches,
        retailSetting: retailSetting,
        title: 'اعدادات الخصومات',
        activate: activate,
        categoriesPool: categoriesPool,
        attached: attached,
        saveChange: saveChange,
        language: config.language,
        currentLanguage: config.currentLanguage,
        koTableReady: koTableReady
    };

    return vm;

});