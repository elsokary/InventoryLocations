define(['plugins/router', 'services/dataservice', 'config', 'services/tokenstore'], function (router, dataservice, config, tokenstore) {

    var categoriesPool = ko.observableArray([]);

    var branchId = ko.observable();

    var retailSettingData = function () {
        self = this;
        self.categoryId = ko.observable();
        self.branchId = ko.observable();
        self.days = ko.observable(0);
        self.selectedValues = ko.observableArray();
    };

    var retailSetting = ko.observable(new retailSettingData());

    var createAccountProject = function (accountid, projectId, isTaskAdmin) {
        var pro = new retailSettingData();

        pro.categoryId = projectId;
        pro.branchId = accountid;
        pro.days = isTaskAdmin;

        return pro;
    };

    var showAllBranches = ko.observable(false);

    var branches = ko.observableArray([]);

    function attached() {

        $("#projectId").select2({ closeOnSelect: false });

        $("#UserProjects").select2({ closeOnSelect: false });

        $("#letterEditForm").validate({
            rules: {
                categoryId: {
                    required: true
                },
                branchId: {
                    required: true
                },
                alertDays: {
                    required: true,
                    digits: true
                }
            },
            messages: {
                  categoryId: {
                      equired: config.language.categoryName[config.currentLanguage()]
                },
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

    var selectedValues = ko.observableArray();

    var currentCategories = ko.observableArray();

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

        dataservice.getCategoriesListRetail(categoriesPool);

        dataservice.getCategoriesNotInSettingList(branchId(), currentCategories);

    };

    function saveChange(obj, e) {
        var valid = $('#letterEditForm').valid();

        if (valid) {
            $(e.target).button('loading');

            retailSetting().branchId(branchId());

            dataservice.addRetailSetting(ko.toJS(retailSetting())).then(function () {

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

            dataservice.getRetailSetting(branchId()).success(function (data) {

                vm.koTable.setItems(data);

            });

        }
    };

    var vm = {
        showAllBranches: showAllBranches,
        branches: branches,
        retailSetting: retailSetting,
        title: 'اعدادات البراندات',
        activate: activate,
        categoriesPool: categoriesPool,
        attached: attached,
        saveChange: saveChange,
        language: config.language,
        currentLanguage: config.currentLanguage,
        selectedValues: selectedValues,
        currentCategories: currentCategories,
        koTableReady: koTableReady
    };

    return vm;

});