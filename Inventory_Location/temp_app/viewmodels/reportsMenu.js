define(['plugins/router', 'config'], function (router, config) {
    var vm = {};

    vm.title = config.language.Reports[config.currentLanguage()];

    vm.router = router;

    vm.language = config.language;

    vm.currentLanguage = config.currentLanguage;

    vm.currentRoute = ko.observable();

    vm.userPermissions = config.userPermissions;

    vm.navigateToView = function (obj, e) {
        vm.currentRoute(obj.moduleId);
         
        $('#showRports').modal('show');
    };

    vm.canDeactivate = function () {
        vm.currentRoute(undefined);

        return true;
    };

    vm.reportsItems = ko.observableArray([]);
    vm.reportsSales = ko.observableArray([]);
    vm.reportsSupplier = ko.observableArray([]);
    vm.reportsPayments = ko.observableArray([]);
    
    vm.reportsItems(ko.utils.arrayFilter(router.routes, function (route) {
        var conditionOne = (vm.userPermissions().length < 1) && route.settings && route.settings.reportsItems;
        var conditionTwo = route.settings && route.settings.reportsItems && (vm.userPermissions.indexOf(route.settings.permission) > -1);

        return conditionOne || conditionTwo;
    }).sort(function (a, b) { return a.settings.order - b.settings.order }));

    vm.reportsSales(ko.utils.arrayFilter(router.routes, function (route) {
        var conditionOne = (vm.userPermissions().length < 1) && route.settings && route.settings.reportsSales;
        var conditionTwo = route.settings && route.settings.reportsSales && (vm.userPermissions.indexOf(route.settings.permission) > -1);

        return conditionOne || conditionTwo;
    }).sort(function (a, b) { return a.settings.order - b.settings.order }));

    vm.reportsSupplier(ko.utils.arrayFilter(router.routes, function (route) {
        var conditionOne = (vm.userPermissions().length < 1) && route.settings && route.settings.reportsSupplier;
        var conditionTwo = route.settings && route.settings.reportsSupplier && (vm.userPermissions.indexOf(route.settings.permission) > -1);

        return conditionOne || conditionTwo;
    }).sort(function (a, b) { return a.settings.order - b.settings.order }));

    vm.reportsPayments(ko.utils.arrayFilter(router.routes, function (route) {
        var conditionOne = (vm.userPermissions().length < 1) && route.settings && route.settings.reportsPayments;
        var conditionTwo = route.settings && route.settings.reportsPayments && (vm.userPermissions.indexOf(route.settings.permission) > -1);

        return conditionOne || conditionTwo;
    }).sort(function (a, b) { return a.settings.order - b.settings.order }));

    
    return vm;
});