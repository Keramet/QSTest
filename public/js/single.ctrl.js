(function () {
    'use strict';

    angular
        .module( 'qsApp' )

        .controller( 'singleCtrl', [
            '$http',
            '$location',
            '$routeParams',
            'AuthService',
            'API_URL',
            singleCtrl
        ])
    ;


    function singleCtrl ($http, $location, $routeParams, AuthService, API_URL) {
        let sc = this,
            id = $routeParams.id;

        sc.isNew = function () { return id ? false : true; }

        sc.client = {};

        if (id) {
            $http.get( `${API_URL}/clients/${id}` )
                .then( client => {
                    sc.client = client.data;
                })
                .catch( err => console.log('Error while retrieving user: ', err) )
            ;
        } 

        sc.toList = function () { $location.path('/'); }

        sc.addUpdate = function () {
            let clientInfo = {
                name:  sc.user.name,
                phone: sc.user.phone,
                email: sc.user.email,
                age:   sc.user.age  
            };

            $http.post( `${API_URL}/clients/${id}`, clientInfo )
                .then( data => {
                    console.log("Data has saved:", data);
                    sc.toList();
                })
                .catch( err => console.log('Error while saving user: ', err) )
            ; 
        }
    }// end of  singleCtrl


})();    