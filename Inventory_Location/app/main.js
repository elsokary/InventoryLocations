require.config({
    paths: {
        'config': 'config',
        'services': 'services',
        'resources': 'resources',
        'durandal': '../JavaScript/durandal',
        'plugins': '../JavaScript/durandal/plugins',
        'transitions': '../JavaScript/durandal/transitions',
        'text': '../JavaScript/require/text'
    },
    waitSeconds: 0

});

define('jquery', function () { return jQuery; });
define('knockout', ko);

define('main', ['durandal/system', 'durandal/app', 'durandal/viewLocator', 'plugins/router', 'services/dataservice', 'services/authInterceptor', 'services/tokenstore', 'config'], function (system, app, viewLocator, router, dataservice, authInterceptor, tokenStore, config) {
    system.debug(true);
    app.title = 'Inventory';
    app.configurePlugins({
        router: true,
        dialog: true,
        widget: true
    });

    authInterceptor.setupHttpCalls();

    var checkPer = function () {

        $.getJSON("public/IP_Configuration.json", function (data) {
            if (data.allFeatures == "true") {
                config.isInventory(true);
                config.isCashier(true);
                config.allFeatures(true);
            } else {
                config.isInventory(data.isInventory == "true" ? true : false);
                config.isCashier(data.isCashier == "true" ? true : false);
                config.allFeatures(data.allFeatures == "true" ? true : false);
            }

            config.basicFeatures(data.basicFeatures == "true" ? true : false);
            config.isDefaultThem(data.defaultThem == "true" ? true : false);

        })
     .error(function (status, arr) {
         var st = status;

         var st2 = arr;

         alert("error");
     });
    };

    app.start().then(function () {

        router.makeRelative({ moduleId: 'viewmodels' });

        viewLocator.useConvention();

        if (!tokenStore.isAuthenticated()) {
            app.setRoot('viewmodels/login');
        } else {
            dataservice.checkTokenValidity().done(function (data) {
                var primeData = data;

                if (primeData) {
                    if (primeData.permissions && primeData.permissions.length > 0) {
                         
                        var permissionsArray = CryptoJS.enc.Utf8.parse(JSON.stringify(primeData.permissions));

                        var encodedPermissions = CryptoJS.enc.Base64.stringify(permissionsArray);

                        window.localStorage.setItem('permissions', encodedPermissions);
                    }

                    config.contactName(primeData.contactName);

                    config.branchName(primeData.branchName);

                    config.phone(primeData.phone);

                    config.isCompany(primeData.isCompany);
                }
                app.setRoot('viewmodels/shell');
            });
        }
        checkPer();
        system.log('Main Module started');
    });
});