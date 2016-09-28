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

        sc.client = {};

        sc.isNew  = function () { return id ? false : true; }
        sc.toList = function () { $location.path('/'); }
        
        if (id) {
            $http.get( `${API_URL}/clients/${id}` )
                .then( client => sc.client = client.data )
                .catch( err => console.log('Error while retrieving client: ', err) )
            ;
        } 

        sc.addUpdate = function () {
            let clientInfo = {
                name:  sc.client.name,
                phone: sc.client.phone,
                email: sc.client.email,
                age:   sc.client.age  
            };

            $http.post( `${API_URL}/clients${id? "/"+id : ""}`, clientInfo )
                .then( data => {
                    console.log("Data has saved:", data);
                    sc.toList();
                })
                .catch( err => console.log('Error while saving user: ', err) )
            ; 
        }
    }// end of  singleCtrl


})();    