
(function () {
    'use strict';

    angular
        .module( 'qsApp', [
            'ngRoute',
            'ngResource'
        ])

        .run([
            '$rootScope',
            '$location',
            'AuthService',
            'AUTH_STATUS',
            onRun
        ])

        .constant( 'baseUrl', 'http://localhost:3000/user/:id' )

        .constant( 'API_URL', 'http://localhost:3000/api' )

        .constant( 'AUTH_STATUS', {
            notAuth: 'user-not-authonticated'
        })

    ;

//---------------------------------------//

    function onRun ($rootScope, $location, AuthService, AUTH_STATUS) {
        $rootScope.$on( '$locationChangeStart', (event, newUrl, oldUrl) => {
            let protocol = $location.protocol(),
                host     = $location.host(),
                port     = $location.port(),
                url      = `${protocol}://${host}:${port}/#/`,
                urlLog   = url + 'login',
                urlReg   = url + 'register';
            
            if ( !AuthService.isAuth() ) {
                if ( newUrl !== urlLog && newUrl !== urlReg ) {
                    event.preventDefault();
                    $location.path('/login');
                }
            }
        });
        
    }
    


})();
