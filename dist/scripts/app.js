(function() {
    function config($stateProvider, $locationProvider) {
        $locationProvider
            .html5Mode({
                enabled: true, // hashbang urls disabled
                requireBase: false // false to avoid $location error
        });
        
        $stateProvider // .state (stateName, stateConfig)
            .state('landing', {
                url: '/',
                controller: 'LandingCtrl as landing',
                templateUrl: '/templates/landing.html'
            })
            .state('album', {
                url: '/album',
                templateUrl: '/templates/album.html'
            })
            .state('collection', {
                url: '/collection',
                templateUrl: '/templates/collection.html'
            });
    };
    
    angular 
        .module('blocJams', ['ui.router'])
        .config(config);
})();