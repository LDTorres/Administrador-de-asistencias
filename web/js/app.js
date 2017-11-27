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
        name: 'listado',
        url: '/listado',
        templateUrl: 'js/views/listado.html',
        controller: 'listadoController as listado',
        resolve: {
          "currentAuth": ["$q", "servicioGeneral", function ($q, servicioGeneral) {
            /*
                        if (!servicioGeneral.autorizado()) {

                          return $q.reject("AUTH_REQUIRED");

                        }
            */
          }]
        }
      })
      .state({
        name: 'trimestre',
        url: '/trimestre',
        templateUrl: 'js/views/trimestre.html',
        controller: 'trimestreController as trimestre',
        resolve: {
          "currentAuth": ["$q", "servicioGeneral", function ($q, servicioGeneral) {
            /*
                                    if (!servicioGeneral.autorizado()) {

                                      return $q.reject("AUTH_REQUIRED");

                                    }
                        */

          }]
        }
      })

      .state({
        name: 'inscripcion',
        url: '/inscripcion',
        templateUrl: 'js/views/inscripcion.html',
        controller: 'inscripcionController as inscripcion',
        resolve: {
          "currentAuth": ["$q", "servicioGeneral", function ($q, servicioGeneral) {
            /*
                                    if (!servicioGeneral.autorizado()) {

                                      return $q.reject("AUTH_REQUIRED");

                                    }
                        */

          }]
        }
      })
      .state({
        name: 'perfil',
        url: '/perfil',
        templateUrl: 'js/views/perfil.html',
        controller: 'perfilController as perfil',
        resolve: {
          "currentAuth": ["$q", "servicioGeneral", function ($q, servicioGeneral) {
            /*
                                    if (!servicioGeneral.autorizado()) {

                                      return $q.reject("AUTH_REQUIRED");

                                    }
                        */

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
        $state.go('listado');
      }
    });
  })
