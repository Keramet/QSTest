(function () {
    'use strict';

    angular
        .module( 'qsApp' )

        .controller( 'logRegCtrl', [
            '$scope',
            '$location',
            'AuthService',
            logRegCtrl
        ])
    ;


    function logRegCtrl ($scope, $location, AuthService) {
        let lc = this,
            authAction;

        lc.user = { name: '',
                password: ''  };

        if ( $location.path() === '/login' ) {
            lc.isNew      = false;
            lc.img        = "https://en.opensuse.org/images/0/0b/Icon-user.png"
            lc.caption    = 'LogIN to UApp';
            lc.btnCaption = 'Login';
            lc.placeholder= 'User name';
            authAction    = AuthService.login;
        } else {
            lc.isNew      = true;
            lc.img        = 'https://www.convergent-design.com/images/icon-new-user.png';
            lc.caption    = 'Register in UApp';
            lc.btnCaption = 'Register';
            lc.placeholder= 'New User';
            authAction    = AuthService.register;
        }

        lc.action = function () {
            authAction( lc.user )
                .then(  msg => {
                    console.log(msg);
                    $location.path('/table');
                })
                .catch( err => console.log(err) )
            ;
        }
    }// end of  loginCtrl


})();