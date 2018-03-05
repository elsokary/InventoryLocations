define(['plugins/router', 'services/dataservice', 'config', 'services/tokenStore'], function (router, dataservice, config, tokenStore) {

    var isView = ko.observable(false);

    var hrType = function () {
        var self = this;

        self.id = ko.observable();
        self.titleEn = ko.observable();
        self.titleAr = ko.observable();
        self.notes = ko.observable();
        self.type = ko.observable();
    };

    var hrTypeDto = ko.observable(new hrType());

    var changeStatus = ko.observable(false);

    var visibleAdd = ko.observable(false);

    var listType = ko.observable();

    listType.subscribe(function (value) {
        if (value) {
            if (config.isAllow(1182)) {
                visibleAdd(true);
                dataservice.getHrType(undefined, value).done(function (result) {

                    vm.koTable.setItems(result);

                });
                hrTypeDto().type(value);
            } else {
                $.smallBox({
                    title: config.language.smartDeleteMessage[config.currentLanguage()].failureTitle,
                    content: config.language.missingPermissions[config.currentLanguage()],
                    color: "#C46A69",
                    iconSmall: "fa fa-times fa-2x fadeInRight animated",
                    timeout: 2000
                });
            }
        } else {
            visibleAdd(false);
        }
    });

    function addDefaultList(obj, event) {
        changeStatus(false);
        hrTypeDto(new hrType());
        hrTypeDto().type(listType());

        if (config.isAllow(1182) === true) {
            $('#ViewModalList').modal('show');
        } else {
            $.smallBox({
                title: config.language.smartDeleteMessage[config.currentLanguage()].failureTitle,
                content: config.language.missingPermissions[config.currentLanguage()],
                color: "#C46A69",
                iconSmall: "fa fa-times fa-2x fadeInRight animated",
                timeout: 2000
            });
        }
    };

    function addHrTypeRowItem(obj, event) {
        var isValid = $('#eformabsence').valid();
        if (isValid) {
            $(event.target).button('loading');
            dataservice.addHrType(hrTypeDto()).done(function (data) {


                vm.koTable.pushItem(data);

                $(event.target).button('reset');
            });
            $('#ViewModalList').modal('hide');
        }
        else {
            $('#eformabsence').validate();
            $("html, body").animate({ scrollTop: $(".error").first().offset().top - 130 }, "slow");

        }
    };

    function editHrTypeRowItem(obj, event) {
        var isValid = $('#eformabsence').valid();
        if (isValid) {
            $(event.target).button('loading');
            dataservice.editHrType(hrTypeDto()).done(function (data) {

                $(event.target).button('reset');
            });;
            $('#ViewModalList').modal('hide');
        }
        else {
            $('#eformabsence').validate();
            $("html, body").animate({ scrollTop: $(".error").first().offset().top - 130 }, "slow");

        }
    };

    var selectedRowId = ko.observable(undefined);

    var showDelete = ko.observable(false);

    function attached() {
         
        $('#ListTypeGrid').validate({
            // Rules for form validation
            rules: {
                titleEn: {
                    required: true
                },
                titleAr: {
                    required: true
                }
            },

            // Messages for form validation
            messages: {
                titleEn: {
                    required: config.language.titleEnRequired[config.currentLanguage()]
                },
                titleAr: {
                    required: config.language.titleArRequired[config.currentLanguage()]
                }
            },

            // Do not change code below
            errorPlacement: function (error, element) {
                error.insertAfter(element.parent());
            }
        });

    };

    function activate() {

        if (config.isAllow(1181)) {
            showDelete(true);
        } else {
            showDelete(false);
        }

    };

    function canActivate() {

        if (config.isAllow(1179) === true) {
            config.startLoader(true);
            return true;
        } else {
            $.smallBox({
                title: config.language.smartDeleteMessage[config.currentLanguage()].failureTitle,
                content: config.language.missingPermissions[config.currentLanguage()],
                color: "#C46A69",
                iconSmall: "fa fa-times fa-2x fadeInRight animated",
                timeout: 2000
            });
            return false;
        }
    };

    var canDelete = ko.observable(false);

    function compositionComplete() {
        config.startLoader(false);
    }

    var koTableReady = function () {

        vm.koTable.addRowDeleteHandler(deleteBranch);

        vm.koTable.addRowClickedHandler(viewEditModal);
    };

    var viewEditModal = function (obj, e) {
        if (config.isAllow(1180) === true) {
            changeStatus(true);
            dataservice.getHrTypeById(hrTypeDto, obj.model.id());
            $('#ViewModalList').modal('show');
        } else {
            $.smallBox({
                title: config.language.smartDeleteMessage[config.currentLanguage()].failureTitle,
                content: config.language.missingPermissions[config.currentLanguage()],
                color: "#C46A69",
                iconSmall: "fa fa-times fa-2x fadeInRight animated",
                timeout: 2000
            });
        }
    };

    var deleteBranch = function (obj, e) {
        $.SmartMessageBox({
            title: config.language.smartDeleteMessage[config.currentLanguage()].title,
            content: config.language.smartDeleteMessage[config.currentLanguage()].content,
            buttons: config.language.smartDeleteMessage[config.currentLanguage()].buttons
        }, function (buttonPressed) {
            if (buttonPressed === config.language.smartDeleteMessage[config.currentLanguage()].yes) {
                if (canDelete()) {
                    dataservice.deleteHrType(obj.id()).complete(function () {


                        selectedRowId(undefined);

                        $.smallBox({
                            title: config.language.smartDeleteMessage[config.currentLanguage()].successTitle,
                            content: config.language.smartDeleteMessage[config.currentLanguage()].successContent,
                            color: "#659265",
                            iconSmall: "fa fa-check fa-2x fadeInRight animated",
                            timeout: 2000
                        });
                    });

                }
                else {
                    selectedRowId(undefined);

                    $.smallBox({
                        title: "Can't Delete This Record",
                        content: "<i class='fa fa-clock-o'></i> <i>Canceled Delete...</i>",
                        color: "#C46A69",
                        iconSmall: "fa fa-times fa-2x fadeInRight animated",
                        timeout: 2000
                    });
                }

            }
            if (buttonPressed === config.language.smartDeleteMessage[config.currentLanguage()].no) {
                $.smallBox({
                    title: config.language.smartDeleteMessage[config.currentLanguage()].failureTitle,
                    content: config.language.smartDeleteMessage[config.currentLanguage()].failureContent,
                    color: "#C46A69",
                    iconSmall: "fa fa-times fa-2x fadeInRight animated",
                    timeout: 2000
                });

                selectedRowId(undefined);
            }
        });
    };

    var vm = {
        koTableReady: koTableReady,
        deleteBranch: deleteBranch,
        compositionComplete: compositionComplete,
        title: config.language.defaultList[config.currentLanguage()],
        activate: activate,
        canActivate: canActivate,
        listType: listType,
        selectedRowId: selectedRowId,
        attached: attached,
        language: config.language,
        currentLanguage: config.currentLanguage,
        addDefaultList: addDefaultList,
        changeStatus: changeStatus,
        hrTypeDto: hrTypeDto,
        addHrTypeRowItem: addHrTypeRowItem,
        editHrTypeRowItem: editHrTypeRowItem,
        visibleAdd: visibleAdd,
        isView: isView

    };

    return vm;
});