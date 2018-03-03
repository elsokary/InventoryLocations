define(['durandal/system', 'plugins/router', 'config', 'services/dataservice', 'durandal/app', 'services/tokenstore'], function (system, router, config, dataservice, app, tokenStore) {

    var languageSelected = ko.observable(false);
    var startLoader = config.startLoader;
    var languageChecked = ko.computed(function () {
        var grids = $(".jqx-KoGrid");

        if (languageSelected() === true) {

            return 'ar';
        } else {

            return 'ar';
        }
    });
    function userLogout() {
        $.SmartMessageBox({
            title: "<i class='fa fa-sign-out txt-color-orangeDark'></i> Logout <span class='txt-color-orangeDark'><strong>" + $('#show-shortcut').text() + "</strong></span> ?",
            content: "You will be missed, Are you sure you want to leave us?",
            buttons: '[No][Yes]'
        }, function (buttonPressed) {
            if (buttonPressed === "Yes") {
                tokenStore.removeToken();
                window.location.reload();
                window.localStorage.remove("SelectedWidgets");
            }
        });
    }
    var transitionEnd;

    function toggleShortcut() {

        function hideShortCut() {
            $("#shortcut").animate({ height: "hide" }, 300, "easeOutCirc");

            $("body").removeClass("shortcut-on");
        }

        function showShortCut() {
            $("#shortcut").animate({ height: "show" }, 200, "easeOutCirc");

            $("body").addClass("shortcut-on");
        }

        $("#shortcut").is(":visible") ? hideShortCut() : showShortCut();

        $("#shortcut").find("a").click(function (e) {
            setTimeout(hideShortCut, 300);
        });

        $(document).mouseup(function (e) {
            $("#shortcut").is(e.target) || 0 !== $("#shortcut").has(e.target).length || hideShortCut();
        });
    }

    function determineTransitionEvent() {
        var t;
        var el = document.createElement('fakeelement');

        var transitions = {
            'transition': 'transitionend',
            'OTransition': 'oTransitionEnd',
            'MozTransition': 'transitionend',
            'WebkitTransition': 'webkitTransitionEnd'
        };

        for (t in transitions) {
            if (transitions.hasOwnProperty(t)) {
                if (el.style[t] !== undefined) {
                    transitionEnd = transitions[t];
                }
            }
        }
    }

    var boot = function () {
        $.fn.extend({
            treed: function (o) {

                var openedClass = 'glyphicon-minus-sign';
                var closedClass = 'glyphicon-plus-sign';

                if (typeof o != 'undefined') {
                    if (typeof o.openedClass != 'undefined') {
                        openedClass = o.openedClass;
                    }
                    if (typeof o.closedClass != 'undefined') {
                        closedClass = o.closedClass;
                    }
                };

                //initialize each of the top levels
                var tree = $(this);
                tree.addClass("classy-tree");
                tree.find('li').has("ul").each(function () {
                    var branch = $(this); //li with children ul
                    branch.prepend("<i class='indicator glyphicon " + closedClass + "'></i>");
                    branch.addClass('branch');
                    branch.on('click', function (e) {
                        if (this == e.target) {
                            var icon = $(this).children('i:first');
                            icon.toggleClass(openedClass + " " + closedClass);
                            $(this).children().children().toggle();
                        }
                    })
                    branch.children().children().toggle();
                });
                //fire event from the dynamically added icon
                tree.find('.branch .indicator').each(function () {
                    $(this).on('click', function () {
                        $(this).closest('li').click();
                    });
                });
                //fire event to open branch if the li contains an anchor instead of text
                tree.find('.branch>a').each(function () {
                    $(this).on('click', function (e) {
                        $(this).closest('li').click();
                        e.preventDefault();
                    });
                });
                //fire event to open branch if the li contains a button instead of text
                tree.find('.branch>button').each(function () {
                    $(this).on('click', function (e) {
                        $(this).closest('li').click();
                        e.preventDefault();
                    });
                });
            }
        });

        var currentLang = config.currentLanguage('ar');

        if (currentLang === 'ar') {
            languageSelected(true);
        }

        languageSelected.subscribe(function () {
            localStorage.setItem('language', languageChecked());
            window.location.reload();
        });

        if (router.routes.length < 1) {
            router.map(config.routes).buildNavigationModel();
            return router.activate();
        }

        return 1;
    };

    var isDefaultThem = ko.observable(true);

    var basicFeatures = ko.observable(true);

    var isInventory = ko.observable(false);

    var isCashier = ko.observable(false);

    function activate() {
        isDefaultThem(config.isDefaultThem());
        basicFeatures(config.basicFeatures());
        isInventory(config.isInventory());
        isCashier(config.isCashier());

        return boot();
    }

    function attached() {

        initApp.addDeviceType();
        initApp.leftNav();
        initApp.SmartActions();
        initApp.domReadyMisc();

        determineTransitionEvent();

        changeLayout();

        $(document).on("keydown", 'input, select, textarea, .select2-container, .select2-input', function (e) {
            var self = $(this);

            var form = self.parents('form:eq(0)');

            if ((e.which || e.keyCode) === 13) {
                var focusable = form.find('input,a,select,button,textarea,.select2-container').filter(':visible');

                var next = focusable.eq(focusable.index(this) + 1);

                if (next.length) {
                    if (next.hasClass("select2-container")) {
                        next.select2("open");
                    } else {
                        next.focus();
                    }
                } else if (self.hasClass("select2-input")) {
                    var key = self.attr("id").replace("_search", "");

                    var parent = $("#" + key).parent();

                    var form = parent.parents('form:eq(0)');

                    var focusable = form.find('input,select,button,textarea,.select2-container').filter(':visible');

                    var next = focusable.eq(focusable.index(parent) + 3);

                    if (next.length) {
                        if (next.hasClass("select2-container")) {
                            next.select2("open");
                        } else {
                            next.focus();
                        }
                    }
                }
                e.preventDefault();
            }
        });

        var currentLang = config.currentLanguage();

        if (currentLang === 'ar') {
            $('body').addClass('smart-rtl');
        }

        $('.user-menu .dropdown-menu').click(function (e) {
            e.stopPropagation();
        });

        $('.durandal-wrapper').on(transitionEnd, '.main-content-animation', function () {
            if ($(this).hasClass('main-content-animation')) {
                $(this).removeClass('main-content-animation');
                $('.fixed-action-btn').hide().fadeIn('fast');
                startLoader(false);
            } else if ($(this).hasClass('durandal-wrapper')) {
                $(this).removeClass('durandal-wrapper');
                $('.fixed-action-btn').hide().fadeIn('fast');
                startLoader(false);
            }
        });

        $('#main').on(transitionEnd, '.durandal-wrapper', function () {
            if ($(this).hasClass('main-content-animation')) {
                $(this).removeClass('main-content-animation');
                $('.fixed-action-btn').hide().fadeIn('fast');
                startLoader(false);
            } else if ($(this).hasClass('durandal-wrapper')) {
                $(this).removeClass('durandal-wrapper');
                $('.fixed-action-btn').hide().fadeIn('fast');
                startLoader(false);
            }
        });


        $("[rel='tooltip']").tooltip({ 'container': 'body' });

        $("body").on("click", '[data-action="toggleShortcut"]', function (e) {
            toggleShortcut();
            e.preventDefault();
        });
    }

    var changeLayout = function () {
        //if (isDefaultThem()) {
        //    $("#left-panel").css('background-color', 'rgba(43, 188, 191, 0.71)');
        //    $("#verticalMenu").css('background-color', '#718a9f');
        //    $("#left-panel").css('display', 'block !important');
        //    $("#verticalMenu").css('display', 'none !important');
        //    $("#navULBasicData").css('visibility', 'hidden');
        //    $("#navULSecurity").css('visibility', 'hidden');
        //    $("#navULInventory").css('visibility', 'hidden');
        //    $("#navULAcc").css('visibility', 'hidden');

        //} else {
        $('body').addClass('hidden-menu');
        $("#left-panel").css('background-color', '#eeeeee');
        $("#verticalMenu").css('display', 'block !important');
        $("#left-panel").css('display', 'none !important');
        //  }

    };

    var constructNavigation = function (dom, obj) {

    };

    var shell = {
        basicFeatures: basicFeatures,
        isInventory: isInventory,
        isCashier: isCashier,

        isDefaultThem: isDefaultThem,
        startLoader: startLoader,
        activate: activate,
        router: router,
        language: config.language,
        currentLanguage: config.currentLanguage,
        attached: attached,
        userLogout: userLogout,
        constructNavigation: constructNavigation,
        languageSelected: languageSelected,
        currentModuleMenu: config.currentModuleMenu
    };

    return shell;
});