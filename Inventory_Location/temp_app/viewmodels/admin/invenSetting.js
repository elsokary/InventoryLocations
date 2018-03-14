define(['plugins/router', 'services/dataservice', 'config', 'services/tokenstore'], function (router, dataservice, config, tokenstore) {

    var branchId = ko.observable();

    var retailSettingData = function () {
        self = this;
        self.branchId = ko.observable();
        self.days = ko.observable(0);
    };

    var retailSetting = ko.observable(new retailSettingData());

    var showAllBranches = ko.observable(false);

    var branches = ko.observableArray([]);

    function attached() {


        $("#letterEditForm").validate({
            rules: {
                branchId: {
                    required: true
                },
                alertDays: {
                    required: true,
                    digits: true
                }
            },
            messages: {
                branchId: {
                    equired: config.language.toBranch[config.currentLanguage()],
                },
                alertDays: {
                    required: "عدد الايام",
                    digits: "يقبل ارقام فقط"
                }
            },
            errorPlacement: function (error, element) {
                error.insertAfter(element.parent());
            }
        });


    };

    function activate() {

        if (config.isAllow(41)) {

            showAllBranches(true);

            dataservice.getBranchesForListAll().done(function (result) {
                branches(result);
            });

        } else {

            showAllBranches(false);
        }

        var collection = tokenstore.getPayload();

        branchId(collection.bci);

        retailSetting().branchId(branchId());

    };

    function saveChange(obj, e) {
        var valid = $('#letterEditForm').valid();

        if (valid) {
            $(e.target).button('loading');

            retailSetting().branchId(branchId());

            dataservice.addSetting(ko.toJS(retailSetting())).then(function () {

                $(e.target).button('reset');

                $.smallBox({
                    title: "Operation completed successfuly",
                    content: "<i class='fa fa-clock-o'></i> <i>Record Update successfuly...</i>",
                    color: "#659265",
                    iconSmall: "fa fa-check fa-2x fadeInRight animated",
                    timeout: 2000
                });

                router.navigate("");
            });
        } else {
            $("#letterEditForm").validate();
        }

    };

    var koTableReady = function () {
        if (branchId()) {

            //dataservice.getSetting(branchId()).success(function (data) {

            //    vm.koTable.setItems(data);

            //});

        }
    };

    var vm = {
        showAllBranches: showAllBranches,
        branches: branches,
        retailSetting: retailSetting,
        title: 'اعدادات الجرد',
        activate: activate, 
        attached: attached,
        saveChange: saveChange,
        language: config.language,
        currentLanguage: config.currentLanguage, 
        koTableReady: koTableReady
    };

    return vm;

});