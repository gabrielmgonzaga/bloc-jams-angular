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
                // uses CONTROLLER AS to handle nested scopes
                controller: 'LandingCtrl as landing', 
                templateUrl: '/templates/landing.html'
            })
        
            .state('album', {
                url: '/album',
                controller: 'AlbumCtrl as album',
                templateUrl: '/templates/album.html'
            })
            .state('collection', {
                url: '/collection',
                controller: 'CollectionCtrl as collection',
                templateUrl: '/templates/collection.html'
            });
    };
    
    angular 
        .module('blocJams', ['ui.router'])
        .config(config);
})();