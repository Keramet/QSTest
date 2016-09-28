(function () {
    'use strict';

    angular
        .module( 'qsApp' )

        .controller( 'tableCtrl', [
            '$http',
            '$location',
            '$timeout',
            '$window',
            'AuthService',
            'API_URL',
            tableCtrl
        ])
    ;


    function tableCtrl ($http, $location, $timeout, $window, AuthService, API_URL) {
        let tc  = this;
     
        tc.destroySession = function () {
            AuthService.logout();
        }

        tc.logout = function () {
            AuthService.logout();
            $location.path('/login');
        }

        tc.filterON = false;
        tc.caption  = 'Inforamtion about all Clients';

        tc.filterValue = '';  
        tc.filter = function () {
            tc.filterValue = '';     
            $timeout( ()=> $window.document.getElementById("qsFilter").focus(), 0 );

            return tc.filterON = !tc.filterON;     
        }

        tc.create = function () { 
            $location.path('/single/');
        }

        tc.edit = function (client) {
            $location.path(`/single/${client._id}`);
        }

        tc.refresh = function () {  // get all clients
            $http.get( `${API_URL}/clients` )
                .then(  clients => {
                    tc.data = clients.data;
                    console.log( clients );
                })
                .catch( err => console.log('Got error while retrieving data: ', err) )
            ;
        }

        // refactor
        tc.delete = function (id) {
            $http.delete( `${API_URL}/clients/${id}` )
                .then( client => {
                    tc.refresh();
                    console.log('Client was deleted: ', client);
                })
                .catch( err => console.log('Error while deleting client: ', err) )
            ;
        }

        tc.refresh();

    }// end of  tableCtrl


})();