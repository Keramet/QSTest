
function config ($routeProvider) {
    console.log('run config...');

    $routeProvider
        .when('/', {
            templateUrl : 'templates/table.tpl.html',
            controller  : 'mainCtrl as mc'
        })

        .when('/single', {
            templateUrl : 'templates/single.tpl.html',
            controller  : 'singleCtrl as sc'
        })

        .when('/single/:id', {
            templateUrl : 'templates/single.tpl.html',
            controller  : 'singleCtrl as sc'
        })

        .when('/login', {
            templateUrl : 'templates/login.tpl.html',
            controller  : 'loginCtrl as lc'
        })

        .otherwise( {redirectTo: '/'} );
}
