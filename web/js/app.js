angular.module("GATE", ["ui.router", 'ngAnimate', 'ngTouch', 'ui.bootstrap'])

  .config(function ($stateProvider, $httpProvider, $urlRouterProvider) {

    /* INTERCEPTADOR */
    $httpProvider.interceptors.push('AuthInterceptor');

    /*------------------------ Ui router states ----------------------*/

    $stateProvider.state({
        name: 'login',
        url: '/',
        templateUrl: 'js/views/login.html',
        controller: 'loginController as login',
        resolve: {
          "currentAuth": ["$q", "servicioGeneral", function ($q, servicioGeneral) {

            if (servicioGeneral.autorizado()) {

              return $q.reject("LOGOUT_REQUIRED");

            }
          }]
        }
      })
      .state({
        name: 'malla',
        url: '/malla',
        templateUrl: 'js/views/malla.html',
        controller: 'mallaController as malla',
        resolve: {
          "currentAuth": ["$q", "servicioGeneral", function ($q, servicioGeneral) {
            if (!servicioGeneral.autorizado()) {

              return $q.reject("AUTH_REQUIRED");

            }
          }]
        }
      })
      .state({
        name: 'profesores',
        url: '/profesores',
        templateUrl: 'js/views/profesores.html',
        controller: 'profesoresController as profesores',
        resolve: {
          "currentAuth": ["$q", "servicioGeneral", function ($q, servicioGeneral) {

            if (!servicioGeneral.autorizado()) {

              return $q.reject("AUTH_REQUIRED");

            }

          }]
        }
      })

      .state({
        name: 'asistencia',
        url: '/asistencia',
        templateUrl: 'js/views/asistencia.html',
        controller: 'asistenciaController as asistencia',
        resolve: {
          "currentAuth": ["$q", "servicioGeneral", function ($q, servicioGeneral) {

            if (!servicioGeneral.autorizado()) {

              return $q.reject("AUTH_REQUIRED");

            }

          }]
        }
      })
      .state({
        name: 'ayuda',
        url: '/ayuda',
        templateUrl: 'js/views/ayuda.html',
        controller: 'ayudaController as ayuda',
        resolve: {
          "currentAuth": ["$q", "servicioGeneral", function ($q, servicioGeneral) {

            if (!servicioGeneral.autorizado()) {

              return $q.reject("AUTH_REQUIRED");

            }
          }]
        }
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
        $state.go('malla');
      }
    });
  })
