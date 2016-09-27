
(function () {
    'use strict';

    angular
        .module( 'qsApp' )

        .service( 'AuthService', [
            '$q', 
            '$http', 
            'API_URL',
            authService
        ])

        .service( 'AuthInterceptor', [
            '$q', 
            '$rootScope', 
            'AUTH_STATUS',
            authInterceptor
        ])
    ;

// -------------------------------- //    

    function authService ($q, $http, API_URL) {
        const LOCAL_TOKEN = 'localToken';
        
        let isAuth = false,
            authToken;


        function loadUserData () {
            let token = window.localStorage.getItem( LOCAL_TOKEN );
            if (token) { useUserData(token); }
        }

        function saveUserData (token) {
            window.localStorage.setItem( LOCAL_TOKEN, token );
            useUserData(token); 
        }

        function useUserData (token) {
            isAuth    = true;
            authToken = token;
            $http.defaults.headers.common.Authorization = authToken;
        }

        function removeUserData () {
            authToken = null;
            isAuth    = false;
            $http.defaults.headers.common.Authorization = null;
            window.localStorage.removeItem( LOCAL_TOKEN );
        }

        function register (user) {
            return $q( function (res, rej) {

                $http.post( `${API_URL}/signup`, user )
                    .then( result => {
                        if (result.data.success) {
                            res( result.data.message );
                        } else {
                            rej( result.data.message );
                        }
                    })
                    .catch( err => rej(err) )
                ;
            });
        }

        function login (user) {
            return $q( function (res, rej) {

                $http.post( `${API_URL}/login`, user )
                    .then( result => {
                        if (result.data.success) {
                            saveUserData( result.data.token );
                            res( result.data.message );
                        } else {
                            rej( result.data.message );
                        }
                    })
                    .catch( err => rej(err) )
                ;
            });
        }

        function logout () { removeUserData(); }


        return {
            login:    login,
            register: register,
            logout:   logout,
            isAuth:   function () { return isAuth; }
        };
    
    }//end of  authService


    function authInterceptor ($q, $rootScope, AUTH_STATUS) {
        return {
            responseError: function (response) {
                $rootScope.$broadcast({
                    401: AUTH_STATUS.notAuth
                }[ response.status ], response);

                return $q.rej( response );
            }
        }
    }


})();