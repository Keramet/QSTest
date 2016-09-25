
(function () {
    'use strict';

    angular
        .module( 'qsApp', [
            'ngRoute',
            'ngResource'
        ])

        .config([
            '$routeProvider',
            config
        ])

        .constant( 'baseUrl', 'http://localhost:3000/user/:id')

        .factory( 'User', [
            '$resource', 
            'baseUrl', 
            userFac
        ])

        .controller( 'mainCtrl', [
            '$location',
            'User',
            mainCtrl
        ])

        .controller( 'singleCtrl', [
            '$location',
            '$routeParams',
            '$scope',
            'User',
            singleCtrl
        ])

        // .controller( 'editCtrl', [
        //     '$location',
        //     '$routeParams',
        //     '$scope',
        //     'User',
        //     editCtrl
        // ])
    ;


// functions implementation...
    

    function userFac ($resource, baseUrl) {
        return $resource( baseUrl );
    }



})();