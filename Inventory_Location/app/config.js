define(['text!resources.json', 'services/tokenstore', 'services/export'], function (resources, tokenStore, exportService) {
    var routes = [{
        route: 'Dashboard',
        moduleId: 'dashboard',
        title: 'ادواتى',
        nav: true,
        settings: { Dashboard: true }
    }, {
        route: '',
        moduleId: 'dashboard',
        title: 'ادواتى',
        nav: true,
        settings: { Dashboard: true }
    }, {
        route: 'accounts',
        moduleId: 'admin/accounts',
        title: 'المستخدمين',
        nav: true,
        settings: { security: true, basicFeatures: true, permission: 24 }
    }, {
        route: 'items',
        moduleId: 'Inventory/items',
        title: 'تحويل الى فرع',
        nav: true,
        settings: { Inventory: true, isInventory: true, permission: 32 }
    }, {
        route: 'PrintPdf',
        moduleId: 'export/PrintPdf',
        title: 'طباعه',
        nav: true
    }, {
        route: 'transferMain',
        moduleId: 'Inventory/transferMain',
        title: 'تحويل الى فرع رئيسى',
        nav: true,
        settings: { Inventory: true, isInventory: true, permission: 32 }
    }, {
        route: 'printBarcode',
        moduleId: 'Inventory/printBarcode',
        title: 'طباعة باركود',
        nav: true,
        settings: { Inventory: true, basicFeatures: true }
    }, {
        route: 'itemAddEdit/:param1*detail',
        moduleId: 'Inventory/itemAddEdit',
        title: 'التحويلات',
        nav: true
    }, {
        route: 'transferToMainAddEdit/:param1*detail',
        moduleId: 'Inventory/transferToMainAddEdit',
        title: 'التحويلات',
        nav: true
    }, {
        route: 'branches',
        moduleId: 'admin/branches',
        title: 'الفروع',
        nav: true,
        settings: { admin: true }
    }, {
        route: 'suppliers',
        moduleId: 'admin/suppliers',
        title: 'الموردين',
        nav: true,
        settings: { admin: true }
    }, {
        route: 'customers',
        moduleId: 'admin/customers',
        title: 'العملاء',
        nav: true,
        settings: { admin: true }
    }, {
        route: 'cardDescription',
        moduleId: 'admin/cardDescription',
        title: 'كارت الصنف',
        nav: true,
        settings: { admin: true }
    }, {
        route: 'accountsAdd/:param1*detail',
        moduleId: 'admin/accountsAdd',
        title: 'Agents Add',
        nav: true,
        settings: { admin: false }

    }, {
        route: 'rptTransactionOnItem',
        moduleId: 'reports/rptTransactionOnItem',
        title: 'تقرير متابعة حركة صنف',
        nav: true,
        settings: { reportsItems: true, permission: 992, order: 1 }

    }, {
        route: 'rptQuantitiesOfBrand',
        moduleId: 'reports/rptQuantitiesOfBrand',
        title: 'تقرير جرد براند بالكميات فقط',
        nav: true,
        settings: { reportsItems: true, permission: 993, order: 2 }

    }, {
        route: 'rptItemsOfBrand',
        moduleId: 'reports/rptItemsOfBrand',
        title: 'تقرير جرد براند ',
        nav: true,
        settings: { reportsItems: true, permission: 994, order: 5 }

    }, {
        route: 'rptTransactionsbyUser',
        moduleId: 'reports/rptTransactionsbyUser',
        title: 'مبيعات الموضف ',
        nav: true,
        settings: { reportsSales: true, permission: 995, order: 1 }

    }, {
        route: 'itemsTransBySupplier',
        moduleId: 'reports/itemsTransBySupplier',
        title: 'حركة اصناف مورد معين ',
        nav: true,
        settings: { reportsSupplier: true, permission: 996, order: 1 }

    }, {
        route: 'itemsTransBySupplierTotals',
        moduleId: 'reports/itemsTransBySupplierTotals',
        title: 'جرد اصناف مورد معين ',
        nav: true,
        settings: { reportsSupplier: true, permission: 997, order: 2 }

    }, {
        route: 'AccountStatmentSupplierRport',
        moduleId: 'reports/AccountStatmentSupplierRport',
        title: 'كشف حساب استاذ مورد ',
        nav: true,
        settings: { reportsSupplier: true, permission: 998, order: 2 }

    }, {
        route: 'AccountStatmentCustomerRport',
        moduleId: 'reports/AccountStatmentCustomerRport',
        title: 'كشف حساب استاذ عميل ',
        nav: true,
        settings: { reportsSupplier: true, permission: 999, order: 3 }

    }, {
        route: 'itemsWithActual',
        moduleId: 'reports/itemsWithActual',
        title: 'أذن تسوية ',
        nav: true,
        settings: { reportsItems: true, permission: 1000, order: 2 }

    }, {
        route: 'itemsActualReport',
        moduleId: 'reports/itemsActualReport',
        title: 'جرد فعلى ',
        nav: true,
        settings: { reportsItems: true, permission: 1002, order: 4 }

    }, {
        route: 'rptRanking',
        moduleId: 'reports/rptRanking',
        title: 'تقرير مبيعات خلال فترة ',
        nav: true,
        settings: { reportsSales: true, permission: 1003, order: 2 }

    }, {
        route: 'rptRankingCustomer',
        moduleId: 'reports/rptRankingCustomer',
        title: 'تقرير مبيعات العملاء خلال فترة ',
        nav: true,
        settings: { reportsSales: true, permission: 1004, order: 3 }

    }, {
        route: 'salesForCustomer',
        moduleId: 'reports/salesForCustomer',
        title: 'تقرير مبيعات عميل خلال فترة ',
        nav: true,
        settings: { reportsSales: true, permission: 1005, order: 4 }

    }, {
        route: 'rptCustomerPyments',
        moduleId: 'reports/rptCustomerPyments',
        title: 'تقرير مدفوعات عميل خلال فترة ',
        nav: true,
        settings: { reportsPayments: true, permission: 1006, order: 3 }

    }, {
        route: 'rptCustomersTotals',
        moduleId: 'reports/rptCustomersTotals',
        title: 'تقرير اجمالي العملاء  ',
        nav: true,
        settings: { reportsPayments: true, permission: 1007, order: 3 }

    }, {
        route: 'rptSuppiersTotals',
        moduleId: 'reports/rptSuppiersTotals',
        title: 'تقرير اجمالي الموردين  ',
        nav: true,
        settings: { reportsPayments: true, permission: 1015, order: 3 }

    }, {
        route: 'rptSuppliersPyments',
        moduleId: 'reports/rptSuppliersPyments',
        title: 'تقرير مدفوعات مورد ',
        nav: true,
        settings: { reportsPayments: true, permission: 1008, order: 1 }

    }, {
        route: 'paymentsSupplierRport',
        moduleId: 'reports/paymentsSupplierRport',
        title: ' مدفوعات مورد ',
        nav: true,
        settings: { reportsPayments: true, permission: 1009, order: 1 }

    }, {
        route: 'Itemsstagnant',
        moduleId: 'reports/Itemsstagnant',
        title: 'تقريرالاصناف الراكدة',
        nav: true,
        settings: { reportsItems: true, permission: 1010, order: 4 }

    }, {
        route: 'paymentStatusReport',
        moduleId: 'reports/paymentStatusReport',
        title: 'تقرير حالة الموردين',
        nav: true,
        settings: { reportsPayments: true, permission: 1011, order: 2 }

    }, {
        route: 'paymentComparisonsReport',
        moduleId: 'reports/paymentComparisonsReport',
        title: 'تقرير مقارنة مبيعات فترات',
        nav: true,
        settings: { reportsSales: true, permission: 1012, order: 3 }

    }, {
        route: 'salesAnalysisRpt',
        moduleId: 'reports/salesAnalysisRpt',
        title: 'تقرير تحليل مبيعات المواقع',
        nav: true,
        settings: { reportsSales: true, permission: 1013, order: 4 }
    }, {
        route: 'rptUserCshier',
        moduleId: 'reports/rptUserCshier',
        title: 'تقفيل الخزنة',
        nav: true,
        settings: { reportsSales: true, permission: 1014, order: 5 }
    }, {
        route: 'permissionsGroups',
        moduleId: 'admin/permissionsGroups',
        title: 'الصلاحيات',
        nav: true,
        settings: { security: true, basicFeatures: true, permission: 20 }
    }, {
        route: 'permissionsGroupsPermissions/:param1*detail',
        moduleId: 'admin/permissionsGroupsPermissions',
        title: 'Permissions Groups Permissions',
        nav: true,
        settings: { security: false }
    }, {
        route: 'reportsMenu',
        moduleId: 'reportsMenu',
        title: 'Reports Menu',
        nav: true,
        settings: { ReportsMenuTop: true }
    }];

    var isPageSetup = ko.observable(false);

    function getAuthenticationHeader() {
        var token = tokenStore.getToken();

        return !!token ? token : "";
    };

    var startLoader = ko.observable();

    var contactName = ko.observable();

    var branchName = ko.observable();

    var phone = ko.observable();

    var item = ko.observable();

    var supplierId = ko.observable();

    var branchId = ko.observable();

    var isComplet = ko.observable();

    var isInventory = ko.observable(false);

    var isCashier = ko.observable(false);

    var allFeatures = ko.observable(true);

    var basicFeatures = ko.observable(true);

    var isDefaultThem = ko.observable(true);

    function postJson(url, data) {
        return new window.Promise(function (resolve, reject) {

            var req = new XMLHttpRequest();
            req.open('POST', url, true);

            req.setRequestHeader("Content-type", "application/json");

            var token = tokenStore.getToken();
            if (token)
                req.setRequestHeader("Authorization", token);

            req.onload = function () {
                if (req.status == 200) {
                    resolve(this);
                }
                else {
                    reject(Error(req.statusText));
                }
            };

            req.onerror = function () {
                reject(Error("Network Error"));
            };

            req.send(JSON.stringify(data));
        });
    };

    var itemsColumnDefenition = {};

    var itemsArray = ko.observableArray();

    var documentTitle = ko.observable();

    //Jquery Validation Custom Validators
    (function ($) {
        //validates if value > 0
        $.validator.addMethod("greaterThanZero", function (value, element, param) {
            return this.optional(element) || parseFloat(value) > 0;
        }, "Please insert a value greater than Zero");

        $.validator.addMethod("dateFormat", function (value, element) {
            return value.match(/^\d\d?\/\d\d?\/\d\d\d\d$/);
        }, "Please enter a date in the format dd/mm/yyyy.");

        $.validator.addMethod('minOrEqual', function (value, el, param) {
            return parseFloat(value) >= param;
        }, "P");
    })(jQuery);

    var language = JSON.parse(resources);

    var userPermissions = ko.observableArray([]);

    var currentLanguage = ko.observable();

    if (localStorage.getItem('language')) {
        currentLanguage(localStorage.getItem('language'));
    } else {
        currentLanguage('ar');
    }

    function CreateGuid() {
        //function s4() {
        //    return Math.floor((1 + Math.random()) * 0x10000)
        //      .toString(16)
        //      .substring(1);
        //}
        //return s4() + s4() + '' + s4() + '' + s4();
        var result = Math.floor(Math.random() * 90000) + 1000000000000;
        return result
    }

    var localization = language.jqxGridLanguage[currentLanguage()].localizationobj;

    function generateGuid() {
        //var result, i, j;
        //result = '';
        //for (j = 0; j < 32; j++) {
        //    if (j == 8 || j == 12 || j == 16 || j == 20)
        //        result = result + '-';
        //    i = Math.floor(Math.random() * 16).toString(16).toUpperCase();
        //    result = result + i;
        //}
        var result = Math.floor(Math.random() * 90000) + 1000000000000;
        return result
    }

    var isCompany = ko.observable(false);

    var getNextArrange = function (arr) {
        var arrange = 0;
        arrange = Enumerable.From(arr)
                           //.Select("$.code")
                           .Max("$.code");
        if (arrange != null) {
            arrange = parseInt(arrange) + 1;
        }
        return arrange;
    };

    var serialNo = ko.observable();

    var getNextSerial = function (arr) {

        var arrange = 0;
        if (arr.length > 0) {

            arrange = Enumerable.From(arr)
                               .Max("$.serialNo");
            if (arrange != null) {
                arrange = parseInt(arrange) + 1;
            }
        }
        else { arrange = 1; }
        return arrange;
    };

    var isAllow = function (code) {
        if (isCompany() === false) {
            var isAllowed = userPermissions.indexOf(code);
            if (isAllowed != -1) {
                return true;
            } else {
                $.smallBox({
                    title: "Operation was canceled",
                    content: language.missingPermissions[currentLanguage()],
                    color: "#C46A69",
                    iconSmall: "fa fa-times fa-2x fadeInRight animated",
                    timeout: 3000
                });
                return false;
            }
        } else {
            return true;
        }
    };

    var exportColumn = function (friendlyName, fieldName, type) {
        var self = this;

        self.title = friendlyName;
        self.key = fieldName;
        self.type = type;
    };

    var exportColumns = ko.observableArray([]);


    var jsonDataArray = ko.observableArray([]);

    var exportJson = function (jsonData, exportColumns, fileType, fileName) {
        if (fileType === 'excel') {
            exportService.excelExportingService(jsonData, exportColumns, 'Inventory Exporting Service - ' + fileName);
        } else if (fileType === 'pdf') {
            exportService.pdfExportingService(jsonData, exportColumns, 'Inventory Exporting Service - ' + fileName);
        } else if (fileType === 'word') {
            exportService.wordExportingService(jsonData, exportColumns, 'Inventory Exporting Service - ' + fileName);
        }
    };

    ko.bindingHandlers.datepicker = {
        init: function (element, valueAccessor, allBindingsAccessor) {
            var options = allBindingsAccessor().datepickerOptions || {};
            $(element).datepicker(options);

            ko.utils.registerEventHandler(element, "changeDate", function (event) {
                var value = valueAccessor();
                if (ko.isObservable(value)) {
                    value(!!event.target.value ? moment(event.date).format("DD/MM/YYYY") : '');
                }
            });
        },
        update: function (element, valueAccessor) {
            var value = ko.utils.unwrapObservable(valueAccessor());

            var val = !!value ? moment(value, "DD/MM/YYYY").format("DD-MM-YYYY") : '';

            if (val) {
                $(element).datepicker('update', val);
            }
        }
    };

    ko.bindingHandlers.select2 = {
        init: function (element, valueAccessor, allBindingsAccessor) {
            var obj = valueAccessor(),
                allBindings = allBindingsAccessor(),
                lookupKey = allBindings.lookupKey;

            $(element).select2(obj);

            if (lookupKey) {
                var value = ko.utils.unwrapObservable(allBindings.value);

                $(element).select2('data', ko.utils.arrayFirst(obj.data.results, function (item) {
                    return item[lookupKey] === value;
                }));
            }

            allBindings.options.subscribe(function (v) {
                if (v.length > 0) {
                    $(element).trigger('change');
                }
            });

            ko.utils.domNodeDisposal.addDisposeCallback(element, function () {
                $(element).select2('destroy');
            });
        },
        update: function (element, valueAccessor, allBindingsAccessor) {
            var allBindings = allBindingsAccessor(),
            value = ko.utils.unwrapObservable(allBindings.value || allBindings.selectedOptions);

            if (value) {
                if (allBindings.options().length > 0) {
                    $(element).select2('val', value);
                }
            }
        }
    };

    ko.bindingHandlers.iCalendar = {
        init: function (element, valueAccessor, allBindingsAccessor) {
            var obj = valueAccessor();

            if (obj().length > 0) {
                var iCalendar = $(element).calendar({
                    tmpl_path: "/app/views/templates/calendar/",
                    events_source: obj()
                });

                $('.btn-group button[data-calendar-nav]').each(function () {
                    var $this = $(this);
                    $this.click(function () {
                        iCalendar.navigate($this.data('calendar-nav'));
                    });
                });

                $('.btn-group button[data-calendar-view]').each(function () {
                    var $this = $(this);
                    $this.click(function () {
                        iCalendar.view($this.data('calendar-view'));
                    });
                });
            }
        },
        update: function (element, valueAccessor) {
            var obj = valueAccessor();

            if (obj().length > 0) {
                var iCalendar = $(element).calendar({
                    tmpl_path: "/app/views/templates/calendar/",
                    events_source: obj()
                });

                $('.btn-group button[data-calendar-nav]').each(function () {
                    var $this = $(this);
                    $this.click(function () {
                        iCalendar.navigate($this.data('calendar-nav'));
                    });
                });

                $('.btn-group button[data-calendar-view]').each(function () {
                    var $this = $(this);
                    $this.click(function () {
                        iCalendar.view($this.data('calendar-view'));
                    });
                });
            }
        }
    };

    ko.bindingHandlers.daterangepicker = {
        update: function (element, valueAccessor) {
            var value = valueAccessor();

            var valueUnwrapped = ko.unwrap(value);

            $(element).daterangepicker({
                ranges: {
                    'Today': [moment(), moment()],
                    'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
                    'Last 7 Days': [moment().subtract(6, 'days'), moment()],
                    'Last 30 Days': [moment().subtract(29, 'days'), moment()],
                    'This Month': [moment().startOf('month'), moment().endOf('month')],
                    'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
                },
                startDate: moment(),
                endDate: moment()
            }, function (start, end) {
                $(element).children("span").text(start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'));
            });

            $(element).on('apply.daterangepicker', function (ev, picker) {
                valueUnwrapped.startDate(picker.startDate);
                valueUnwrapped.endDate(picker.endDate);

                value.valueHasMutated();
            });
        }
    };

    ko.bindingHandlers.chart = {
        update: function (element, valueAccessor, allBindingsAccessor) {
            var options = allBindingsAccessor().chartOptions() || {};

            var value = valueAccessor();

            var valueUnwrapped = ko.unwrap(value);

            if (valueUnwrapped.length > 0) {
                if ($(element).data('highcharts-chart')) {
                    $(element).highcharts().destroy();
                }

                $(element).highcharts(options);
            }
        }
    };

    ko.bindingHandlers.setWidget = {
        init: function (element, valueAccessor) {
            var observable = valueAccessor();

            if (!observable()) {
                observable(true);
            }
        }
    };

    ko.bindingHandlers.unsetWidget = {
        init: function (element, valueAccessor) {
            var observable = valueAccessor();

            if (observable()) {
                observable(false);
            }
        }
    };

    ko.bindingHandlers.booleanValue = {
        init: function (element, valueAccessor) {
            var observable = valueAccessor(),
                interceptor = ko.computed({
                    read: function () {
                        if (observable()) {
                            return observable().toString();
                        } else {
                            return "";
                        }
                    },
                    write: function (newValue) {
                        if ((newValue === "true") || (newValue === "false")) {
                            observable(newValue === "true");
                        } else {
                            observable("");
                        }
                    }
                });

            ko.applyBindingsToNode(element, { value: interceptor });
        }
    };

    ko.bindingHandlers.autoComplete = {
        init: function (element, valueAccessor, allBindingsAccessor) {
            var observable = valueAccessor();

            var autoCompleteInputValue = allBindingsAccessor().autoCompleteValue || allBindingsAccessor().value;

            var autoCompleteValue = (allBindingsAccessor().autoCompleteValue ? "autoCompleteValue" : "value");

            if (autoCompleteValue === "autoCompleteValue") {
                var filtered = observable().filter(function (obj) {
                    return obj.autoCompleteValue === autoCompleteInputValue();
                });

                if (filtered.length) {
                    $(element).val(filtered[0].value);
                }
            }

            if (observable()) {
                $(element).autocomplete({
                    source: observable(),
                    select: function (event, ui) {
                        autoCompleteInputValue(ui.item[autoCompleteValue]);
                    }
                });
            }
        }, update: function (element, valueAccessor, allBindingsAccessor) {
            var observable = valueAccessor();

            var autoCompleteInputValue = allBindingsAccessor().autoCompleteValue || allBindingsAccessor().value;

            var autoCompleteValue = (allBindingsAccessor().autoCompleteValue ? "autoCompleteValue" : "value");

            if (autoCompleteValue === "autoCompleteValue") {
                var filtered = observable().filter(function (obj) {
                    return obj.autoCompleteValue === autoCompleteInputValue();
                });

                if (filtered.length) {
                    $(element).val(filtered[0].value);
                }
            }

            $(element).autocomplete({
                source: observable(),
                select: function (event, ui) {
                    autoCompleteInputValue(ui.item[autoCompleteValue]);
                }
            });
        }
    };

    ko.bindingHandlers.summernote = new function () {
        var isblur = false;

        this.init = function (element, valueAccessor, allBindings) {
            var value = valueAccessor();
            var options = $.extend(value, {
                height: 300,
                toolbar: [
                    ["style", ["bold", "italic", "underline", "clear"]],
                    ["fontstyle", ["style"]],
                    ["color", ["color"]],
                    ["fontsize", ["fontsize"]],
                    ["lists", ["ul", "ol", "paragraph"]],
                    ["insert", ["link"]],
                    ["table", ["table"]],
                    ["misc", ["fullscreen", "codeview"]]
                ],
                onblur: function () {
                    isblur = true;
                    value($(element).code());
                    isblur = false;
                }
            });
            $.extend(options, allBindings.get("summerOptions"));
            return $(element).summernote(options);
        };
        this.update = function (element, valueAccessor) {
            if (!isblur) {
                var value = valueAccessor();
                $(element).code(value());
            }
        };
    };

    ko.bindingHandlers.dropdown = new function () {
        this.init = function (element, valueAccessor, allBindingsAccessor) {
            if ($(element).is('select')) {
                if (ko.isObservable(valueAccessor())) {
                    ko.bindingHandlers.value.init(element, valueAccessor, allBindingsAccessor);
                }
                $(element).selectpicker();
            }
        };

        this.update = function (element, valueAccessor, allBindingsAccessor) {
            if ($(element).is('select')) {
                var dropdownOptions = allBindingsAccessor().selectPickerOptions;
                if (typeof dropdownOptions !== 'undefined' && dropdownOptions !== null) {
                    var options = dropdownOptions.options,
                        optionsText = dropdownOptions.optionsText,
                        optionsValue = dropdownOptions.optionsValue,
                        optionsCaption = dropdownOptions.optionsCaption,
                        isDisabled = dropdownOptions.disabledCondition || false,
                        resetOnDisabled = dropdownOptions.resetOnDisabled || false;
                    if (ko.utils.unwrapObservable(options).length > 0) {
                        // call the default Knockout options binding
                        ko.bindingHandlers.options.update(element, options, ko.observable({ optionsText: optionsText, optionsValue: optionsValue, optionsCaption: optionsCaption }));
                    }
                    if (isDisabled && resetOnDisabled) {
                        // the dropdown is disabled and we need to reset it to its first option
                        $(element).selectpicker('val', $(element).children('option:first').val());
                    }
                    $(element).prop('disabled', isDisabled);
                }
                if (ko.isObservable(valueAccessor())) {
                    if ($(element).prop('multiple') && $.isArray(ko.utils.unwrapObservable(valueAccessor()))) {
                        // in the case of a multiple select where the valueAccessor() is an observableArray, call the default Knockout selectedOptions binding
                        ko.bindingHandlers.selectedOptions.update(element, valueAccessor);
                    } else {
                        // call the default Knockout value binding
                        ko.bindingHandlers.value.update(element, valueAccessor);
                    }
                }

                $(element).selectpicker('refresh');
            }
        };
    };

    ko.bindingHandlers.bootstrapSwitch = new function () {
        this.init = function (element, valueAccessor, allBindingsAccessor) {
            //initialize bootstrapSwitch
            $(element).bootstrapSwitch();

            // setting initial value
            $(element).bootstrapSwitch('state', valueAccessor()());

            //handle the field changing
            $(element).on('switchChange.bootstrapSwitch', function (event, state) {
                var observable = valueAccessor();
                observable(state);
            });

            // Adding component options
            var options = allBindingsAccessor().bootstrapSwitchOptions || {};

            for (var property in options) {
                if (options.hasOwnProperty(property)) {
                    $(element).bootstrapSwitch(property, ko.utils.unwrapObservable(options[property]));
                }
            }

            //handle disposal (if KO removes by the template binding)
            ko.utils.domNodeDisposal.addDisposeCallback(element, function () {
                $(element).bootstrapSwitch("destroy");
            });

        }
        //update the control when the view model changes
        this.update = function (element, valueAccessor, allBindingsAccessor) {
            var value = ko.utils.unwrapObservable(valueAccessor());

            // Adding component options
            var options = allBindingsAccessor().bootstrapSwitchOptions || {};
            for (var property in options) {
                if (options.hasOwnProperty(property)) {
                    $(element).bootstrapSwitch(property, ko.utils.unwrapObservable(options[property]));
                }
            }

            $(element).bootstrapSwitch("state", value);
        }
    };

    ko.bindingHandlers.timePicker = new function () {
        this.init = function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
            var options = allBindingsAccessor().timePickerOptions || {};

            var tpicker = $(element).timepicker(options);

            tpicker.on('changeTime.timepicker', function (e) {

                var value = valueAccessor();

                if (!value) {
                    throw new Error('timeValue binding observable not found');
                }

                var date = ko.unwrap(value);

                var mdate = moment(date || new Date());

                var hours24;

                if (e.time.meridian === "AM") {
                    if (e.time.hours === 12)
                        hours24 = 0;
                    else
                        hours24 = e.time.hours;
                } else {
                    if (e.time.hours === 12) {
                        hours24 = 12;
                    } else {
                        hours24 = e.time.hours + 12;
                    }
                }

                mdate.hours(hours24);

                mdate.minutes(e.time.minutes);

                $(element).data('updating', true);

                value(hours24 + ':' + e.time.minutes);

                $(element).data('updating', false);
            });
        }

        this.update = function (element, valueAccessor, allBindings, viewModel, bindingContext) {
            if ($(element).data('updating')) {
                return;
            }

            var date = ko.unwrap(valueAccessor());

            if (date) {
                var time = date;
                $(element).timepicker('setTime', time);
            }
        }
    }

    var alertSuccess = function () {
        $.smallBox({
            title: "Operation completed successfuly",
            content: "<i class='fa fa-clock-o'></i> <i>Operation completed successfuly...</i>",
            color: "#659265",
            iconSmall: "fa fa-check fa-2x fadeInRight animated",
            timeout: 2000
        });
    };

    var alertFail = function () {
        $.smallBox({
            title: "Operation was canceled",
            content: "<i class='fa fa-clock-o'></i> <i>Canceled Operation...</i>",
            color: "#C46A69",
            iconSmall: "fa fa-times fa-2x fadeInRight animated",
            timeout: 2000
        });
    };

    var pageSize = ko.observable(1000);

    var remoteServerName = 'api/InventoryLocation';

    var docType = ko.observable("");

    var docId = ko.observable();

    var guid = function () {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
              .toString(16)
              .substring(1);
        }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
          s4() + '-' + s4() + s4() + s4();
    };

    return {
        isDefaultThem: isDefaultThem,
        isInventory: isInventory,
        isCashier: isCashier,
        allFeatures: allFeatures,
        basicFeatures: basicFeatures,

        startLoader: startLoader,
        isComplet: isComplet,
        supplierId: supplierId,
        branchId: branchId,
        item: item,
        getNextArrange: getNextArrange,
        serialNo: serialNo,
        getNextSerial: getNextSerial,
        isCompany: isCompany,
        docType: docType,
        docId: docId,
        generateGuid: generateGuid,
        CreateGuid: CreateGuid,
        alertFail: alertFail,
        alertSuccess: alertSuccess,
        routes: routes,
        remoteServerName: remoteServerName,
        language: language,
        postJson: postJson,
        isPageSetup: isPageSetup,
        getAuthenticationHeader: getAuthenticationHeader,
        isAllow: isAllow,
        ExportColumn: exportColumn,
        userPermissions: userPermissions,
        exportJson: exportJson,
        exportColumns: exportColumns,
        jsonDataArray: jsonDataArray,
        pageSize: pageSize,
        currentLanguage: currentLanguage,
        guid: guid,
        contactName: contactName,
        branchName: branchName,
        phone: phone,
        itemsColumnDefenition: itemsColumnDefenition,
        itemsArray: itemsArray,
        documentTitle: documentTitle,
    };
});