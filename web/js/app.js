angular.module("GATE", ["ui.router", 'ngAnimate', 'ngTouch', 'ui.bootstrap'])

    .config(function ($stateProvider, $httpProvider, $urlRouterProvider) {

        /* INTERCEPTADOR */
        //$httpProvider.interceptors.push('AuthInterceptor');

        /*------------------------ Ui router states ----------------------*/

        $stateProvider.state({
                name: 'login',
                url: '/',
                templateUrl: 'js/views/login.html',
                controller: 'loginController as login',
            })

        $urlRouterProvider.otherwise('/');

    })


    .run(function ($rootScope, $state) {

        $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {



        });


        $rootScope.$on("$stateChangeError", function (event, toState, toParams, fromState, fromParams, error) {
            // We can catch the error thrown when the $requireSignIn promise is rejected
            // and redirect the user back to the home page
            if (error === "AUTH_REQUIRED") {

                $state.go("login");
            } else if (error === "LOGOUT_REQUIRED") {
                $state.go('dashboard');
            }
        });
    })