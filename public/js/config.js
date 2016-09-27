(function () {
    'use strict';

    angular
        .module( 'qsApp' )
        
        .config([
            '$routeProvider',
            '$httpProvider',
            config
        ])
    ;

//-------------------------------------------------------

    function config ($routeProvider, $httpProvider) {

        $httpProvider.interceptors.push('AuthInterceptor');
        
        $routeProvider
            .when( '/', {
                templateUrl : 'templates/table.tpl.html',
                controller  : 'tableCtrl as tc'
            })

            .when( '/single', {
                templateUrl : 'templates/single.tpl.html',
                controller  : 'singleCtrl as sc'
            })

            .when( '/single/:id', {
                templateUrl : 'templates/single.tpl.html',
                controller  : 'singleCtrl as sc'
            })

            .when( '/login', {
                templateUrl : 'templates/login.tpl.html',
                controller  : 'logRegCtrl as lc'
            })

            .when( '/register', {
                templateUrl : 'templates/login.tpl.html',
                controller  : 'logRegCtrl as lc'
            })
            .otherwise( {redirectTo: '/'} )
        ;

    }//end of  config

})();
