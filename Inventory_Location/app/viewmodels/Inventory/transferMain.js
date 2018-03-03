define(['plugins/router', 'services/dataservice', 'config'], function (router, dataservice, config) {
    var pageNumber = ko.observable(0);

    var changeStatus = ko.observable(false);

    var exportColumns = [];

    var add = function (obj, e) {

        if (config.isAllow(29)) {

            var indexOfCurrentTab = tabs.indexOf(currentTab());

            if (currentTab() === "to") {
                router.navigate("transferToMainAddEdit/0-false");
            } else {
                router.navigate("transferToMainAddEdit/0-true");
            }
        }
    }

    function attached() {

        $(".fixed-action-btn").tooltip();

    };

    var tabs = "";

    var currentTab = ko.observable('to');

    var changeTabFrom = function (obj, e) {

        var indexOfCurrentTab = tabs.indexOf(currentTab());

        currentTab((indexOfCurrentTab < 2) ? tabs[indexOfCurrentTab + 1] : tabs[indexOfCurrentTab]);

    };

    var changeTabTo = function (obj, e) {

        var indexOfCurrentTab = tabs.indexOf(currentTab());

        currentTab((indexOfCurrentTab === 0) ? tabs[indexOfCurrentTab] : tabs[indexOfCurrentTab - 1]);

    };

    changeTab = function (obj, e) {

        if (freeTabNavigating()) {
            if ($(e.currentTarget).attr("href")) {

                currentTab($(e.currentTarget).attr("href").replace("#", ""));

            }
            else {
                currentTab('to');
            }
            var indexOfCurrentTab = tabs.indexOf(currentTab());

            (indexOfCurrentTab - 1 === 0) ? disablePreviousTab(true) : disablePreviousTab(false);

            (indexOfCurrentTab + 1 > 2) ? disableNextTab(true) : disableNextTab(false);
        }
    };

    var disableNextTab = ko.observable();

    var disablePreviousTab = ko.observable();

    function activate() {

        freeTabNavigating(true);

        disableNextTab(true);

        disablePreviousTab(true);

        currentTab('to');
    };

    var freeTabNavigating = ko.observable();

    function canActivate() {
        if (config.isAllow(32)) {
            return true;
        } else {
            return false;
        }
    };

    var vm = {
        freeTabNavigating: freeTabNavigating,
        currentTab: currentTab,
        canActivate: canActivate,
        title: config.language.transferToMainBranches[config.currentLanguage()],
        activate: activate,
        attached: attached,
        language: config.language,
        currentLanguage: config.currentLanguage,
        add: add
    };

    return vm;
});