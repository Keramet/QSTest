// controllers

'use strict';


function mainCtrl ($location, User) {
    let mc  = this;

    mc.filterON = null;

    // mc.changeLocation = function (url) {
    //     $location.path(url);
    // }

    mc.create = function () { 
        $location.path('/single');
    }

    mc.edit = function (user) {
        $location.path(`/single/${user._id}`);
    }

    mc.refresh = function () {  // get all users
        User.query().$promise
            .then( function (users) {
                mc.data = users;
            })
            .catch( function (err) {
                console.error('Got error while retrieving users: ', err);
            });
    }

    mc.delete = function (id) {
        User.delete( {id: id} ).$promise
            .then( function (user) {
                mc.refresh();
                console.log('User was deleted: ', user);
            })
            .catch( function (err) {
                console.log('Got error while deleting user: ', err);
            });
    }
        
    mc.refresh();
}// end of  mainCtrl



function singleCtrl ($location, $routeParams, $scope, User) {
    let sc = this,
        id =  $routeParams.id;

        $scope.isNew = function () { return id ? false : true; }

        if (id) {
            User.get( {id: id} ).$promise
                .then( function (user) {
                    sc.user = user;
                })
                .catch( function (err) {
                    sc.user = {};
                    console.error('Got error while retrieving user: ', err);
                });
        }

        sc.toList = function () { $location.path('/'); }

        sc.addUpdate = function () {
            let userInfo = {
                name: sc.user.name,
                age:  sc.user.age  
            },
                params = sc.user._id ? {id: sc.user._id} 
                                     : {};

            User.save( params, userInfo ).$promise
                .then( function (data) {
                    console.log("Data has saved:", data);
                    sc.toList();
                })
                .catch( function (err) {
                    console.error('Error while saving data: ', err);
                }); 
        }

}// end of  singleCtrl


function loginCtrl () {
    let lc = this;

    console.log('Loading  loginCtrl...');
}// end of  loginCtrl