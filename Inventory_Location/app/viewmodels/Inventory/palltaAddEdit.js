define(['plugins/router', 'services/dataservice', 'config', 'services/tokenstore'], function (router, dataservice, config, tokenStore) {

    var palltaDto = function () {
        var self = this;
        self.id = ko.observable();
        self.serial = ko.observable();
        self.description = ko.observable();
        self.code = ko.observable();
        self.parentId = ko.observable();
        self.isPallta = ko.observable(true);

    };

    var pallta = ko.observable(new palltaDto());

    var resetWarning = ko.computed(function () {
        return "<i class='text-warning fa fa-warning'></i> " + config.language.resetWarning[config.currentLanguage()];
    });

    config.currentLanguage.subscribe(function () {
        $(".jarviswidget-toggle-btn").attr("data-original-title", config.language.collapse[config.currentLanguage()]);
        $(".jarviswidget-fullscreen-btn").attr("data-original-title", config.language.fullscreen[config.currentLanguage()]);
    });

    function attached() {

        jQuery.validator.addMethod("notEqual", function (value, element, param) {
            return this.optional(element) || value != param;
        }, "Please specify a different value");

        $(".fixed-action-btn").tooltip('destroy');
        $(".fixed-action-btn").tooltip({ container: 'body' });

        $('#palltaForm').validate({

            // Rules for form validation
            rules: {

                serial: {
                    required: true
                },
                code: {
                    required: true
                },
                description: {
                    required: true
                }

            },

            // Messages for form validation
            messages: {
                serial: {
                    required: 'Please enter a serial '
                },
                code: {
                    required: 'Please enter a code '
                },
                description: {
                    required: 'Please enter a description '
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

        pallta(new palltaDto());

        if (id > 0) {

            dataservice.getNextArrangePallta().done(function (result) {
                location().serial(result);
            });

            changeStatus(true);

            dataservice.getLocationsById(pallta, id);

        } else {

            changeStatus(false);
        }
    };

    function addEditPallta(obj, event) {
        var isValid = $('#palltaForm').valid();
        if (isValid) {
            if (changeStatus()) {

                dataservice.editPallta(pallta()).done(function (data) {

                    $.smallBox({
                        title: "Operation completed successfuly",
                        content: "<i class='fa fa-clock-o'></i> <i>Record Updated successfuly...</i>",
                        color: "#659265",
                        iconSmall: "fa fa-check fa-2x fadeInRight animated",
                        timeout: 2000
                    });

                    router.navigate("pallta");

                }).fail(function () {

                    $.smallBox({
                        title: "Operation was canceled",
                        content: "<i class='fa fa-clock-o'></i> <i>Canceled delete...</i>",
                        color: "#C46A69",
                        iconSmall: "fa fa-times fa-2x fadeInRight animated",
                        timeout: 2000
                    });

                    router.navigate("pallta");
                });

            }
            else {

                dataservice.addPallta(pallta()).done(function (data) {
                    $.smallBox({
                        title: "Operation completed successfuly",
                        content: "<i class='fa fa-clock-o'></i> <i>Record Updated successfuly...</i>",
                        color: "#659265",
                        iconSmall: "fa fa-check fa-2x fadeInRight animated",
                        timeout: 2000
                    });

                    router.navigate("pallta");

                }).fail(function () {

                    $.smallBox({
                        title: "Operation was canceled",
                        content: "<i class='fa fa-clock-o'></i> <i>Canceled delete...</i>",
                        color: "#C46A69",
                        iconSmall: "fa fa-times fa-2x fadeInRight animated",
                        timeout: 2000
                    });
                    router.navigate("pallta");
                });

            }
        } else {

            $('#palltaForm').validate();

        }
    };

    var vm = {
        changeStatus: changeStatus,
        title: config.language.pallta[config.currentLanguage()],
        attached: attached,
        activate: activate,
        pallta: pallta,
        language: config.language,
        currentLanguage: config.currentLanguage,
        resetWarning: resetWarning,
        addEditPallta: addEditPallta,

    };
    return vm;
});