define(['plugins/router', 'services/dataservice', 'config', 'services/tokenstore'], function (router, dataservice, config, tokenStore) {

    var accountDto = function () {
        var self = this;
        self.id = ko.observable();
        self.userName = ko.observable();
        self.passWord = ko.observable();
        self.contactName = ko.observable();
        self.address = ko.observable('');
        self.phone = ko.observable();
        self.email = ko.observable();
        self.groupId = ko.observable();
        self.branchId = ko.observable();
        self.supervisorId = ko.observable();
        self.userType = ko.observable('user');
        self.isCashier = ko.observable(false);
        self.code = ko.observable();
    };

    var isCashier = ko.observable(false);


    var account = ko.observable(new accountDto());

    isCashier.subscribe(function (value) {
        if (value) { 
            account().userType('isCashier');
        } else {
            account().userType('user');
        }
    });

    var resetWarning = ko.computed(function () {
        return "<i class='text-warning fa fa-warning'></i> " + config.language.resetWarning[config.currentLanguage()];
    });

    config.currentLanguage.subscribe(function () {
        $(".jarviswidget-toggle-btn").attr("data-original-title", config.language.collapse[config.currentLanguage()]);
        $(".jarviswidget-fullscreen-btn").attr("data-original-title", config.language.fullscreen[config.currentLanguage()]);
    });

    var supervisorContacts = ko.observableArray([]);

    var groups = ko.observableArray([]);

    var branches = ko.observableArray([]);

    var supervisorId = ko.observable();

    var groupId = ko.observable();

    supervisorId.subscribe(function () {
        if (supervisorId()) {
            account().supervisorId(supervisorId());
        }
    });

    groupId.subscribe(function () {
        if (groupId()) {
            account().groupId(groupId());
        }
    });

    function attached() {

        jQuery.validator.addMethod("notEqual", function (value, element, param) {
            return this.optional(element) || value != param;
        }, "Please specify a different value");

        $(".fixed-action-btn").tooltip('destroy');
        $(".fixed-action-btn").tooltip({ container: 'body' });

        $('#AccountEditForm').validate({

            // Rules for form validation
            rules: {

                userPassword: {
                    required: true
                },
                userName: {
                    required: true,
                    minlength: 4
                },

                Phone: {
                    required: true,
                    digits: true
                },
                branchId: {
                    required: true
                },
                groupId: {
                    required: true
                }

            },

            // Messages for form validation
            messages: {
                userPassword: {
                    required: 'Please enter a  Password '
                },
                userName: {
                    required: 'Please enter a User Name',
                    minlength: 'user name '
                },
                Phone: {
                    required: 'Please Enter a valid Phone ',
                    digits: 'Only digits accepted'
                },
                branchId: {
                    required: 'برجاء اختيار الفرع '
                },
                groupId: {
                    required: 'برجاء اختيار الصلاحية '
                }
            },

            // Do not change code below
            errorPlacement: function (error, element) {
                error.insertAfter(element.parent());
            }
        });
    };

    var changeStatus = ko.observable(false);

    function activate(id) {

        account(new accountDto());

        dataservice.getAccounts().done(function (data) {
            supervisorContacts(data);
        });

        dataservice.getGroup(groups);

        dataservice.getBranchesForListAll().done(function (result) {

            branches(result);
        });

        if (id > 0) {

            groupId(undefined);

            supervisorId(undefined);

            changeStatus(true);

            dataservice.getAccountForedit(account, id).done(function (result) {

                supervisorId(account().supervisorId());

                groupId(account().groupId());

            });

        } else {

            groupId(undefined);

            supervisorId(undefined);

            changeStatus(false);
        }
    };

    function addAccount(obj, event) {
        var isValid = $('#AccountEditForm').valid();
        if (isValid) {
            if (changeStatus()) {

                dataservice.editAccount(account()).done(function (data) {

                    $.smallBox({
                        title: "Operation completed successfuly",
                        content: "<i class='fa fa-clock-o'></i> <i>Record Updated successfuly...</i>",
                        color: "#659265",
                        iconSmall: "fa fa-check fa-2x fadeInRight animated",
                        timeout: 2000
                    });

                    router.navigate("accounts");

                }).fail(function () {

                    $.smallBox({
                        title: "Operation was canceled",
                        content: "<i class='fa fa-clock-o'></i> <i>Canceled delete...</i>",
                        color: "#C46A69",
                        iconSmall: "fa fa-times fa-2x fadeInRight animated",
                        timeout: 2000
                    });

                    router.navigate("accounts");
                });

            }
            else {

                dataservice.addAccount(account()).done(function (data) {
                    $.smallBox({
                        title: "Operation completed successfuly",
                        content: "<i class='fa fa-clock-o'></i> <i>Record Updated successfuly...</i>",
                        color: "#659265",
                        iconSmall: "fa fa-check fa-2x fadeInRight animated",
                        timeout: 2000
                    });

                    router.navigate("accounts");

                }).fail(function () {

                    $.smallBox({
                        title: "Operation was canceled",
                        content: "<i class='fa fa-clock-o'></i> <i>Canceled delete...</i>",
                        color: "#C46A69",
                        iconSmall: "fa fa-times fa-2x fadeInRight animated",
                        timeout: 2000
                    });
                    router.navigate("accounts");
                });

            }
        } else {

            $('#AccountEditForm').validate();

        }
    };

    var vm = {
        isCashier: isCashier,
        branches: branches,
        changeStatus: changeStatus,
        title: config.language.titleAccounts[config.currentLanguage()],
        attached: attached,
        groups: groups,
        activate: activate,
        supervisorContacts: supervisorContacts,
        account: account,
        language: config.language,
        currentLanguage: config.currentLanguage,
        resetWarning: resetWarning,
        addAccount: addAccount,
        supervisorId: supervisorId,
        groupId: groupId

    };
    return vm;
});