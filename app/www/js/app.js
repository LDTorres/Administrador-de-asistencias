angular.module('GATE', ['ionic', 'ngCordova', 'ionic-datepicker', 'ionic-toast'])

  .run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if (window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      }
      if (window.StatusBar) {
        // org.apache.cordova.statusbar required
        StatusBar.styleDefault();
      }
    });
  })

  .config(function ($stateProvider, $urlRouterProvider, $httpProvider, ionicDatePickerProvider, $ionicConfigProvider, $ionicSideMenuDelegateProvider) {

    $ionicConfigProvider.views.maxCache(5);
    $ionicConfigProvider.tabs.position('bottom');

    /* INTERCEPTADOR */
    $httpProvider.interceptors.push('AuthInterceptor');

    var datePickerObj = {
      inputDate: new Date(),
      setLabel: 'Colocar',
      todayLabel: 'Hoy',
      closeLabel: 'Cerrar',
      mondayFirst: true,
      weeksList: ["D", "L", "Ma", "Mi", "J", "V", "S"],
      monthsList: ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"],
      templateType: 'popup',
      from: new Date(),
      to: new Date(2030, 12, 30),
      showTodayButton: true,
      dateFormat: 'dd MMMM yyyy',
      closeOnSelect: false,
      disableWeekdays: [0, 6]
    };

    ionicDatePickerProvider.configDatePicker(datePickerObj);

    $stateProvider
      .state('ingreso', {
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
      .state('tutorial', {
        url: '/tutorial',
        templateUrl: 'js/views/tutorial.html',
        controller: 'tutorialController as tutorial',
        resolve: {
          "currentAuth": ["$q", "servicioGeneral", function ($q, servicioGeneral) {

            if (!servicioGeneral.autorizado()) {

              return $q.reject("AUTH_REQUIRED");

            }

          }]
        }
      })
      .state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'js/views/menu.html',
        controller: 'sidemenuController as sidemenu',
        resolve: {
          "currentAuth": ["$q", "servicioGeneral", function ($q, servicioGeneral) {

            if (!servicioGeneral.autorizado()) {

              return $q.reject("AUTH_REQUIRED");

            }

          }]
        }
      })
      // Inicio va a contener {timeline, todas las asignaturas y las secciones, perfil}
      .state('app.inicio', {
        url: '/inicio',
        views: {
          'menuContent': {
            templateUrl: 'js/views/inicio.html',
            controller: 'inicioController as inicio'
          }
        }
      })
      .state('app.inicio/usuario', {
        url: '/perfil',
        views: {
          'menuContent': {
            templateUrl: 'js/views/usuario.html',
            controller: 'usuarioController as usuario'
          }
        }
      })
      // Ayuda va a contener {informacion de la app, y el manual}
      .state('app.inicio/ayuda', {
        url: '/ayuda',
        views: {
          'menuContent': {
            templateUrl: 'js/views/ayuda.html',
            controller: 'ayudaController as ayuda'
          }
        }
      })
      // Esta ruta va a contener {inscribir una asignatura {alumno}, crear una seccion {profesor}}
      .state('app.inicio/asignatura/inscripcion', {
        url: '/inscripcion',
        views: {
          'menuContent': {
            templateUrl: 'js/views/inscripcion.html',
            controller: 'inscripcionController as inscripcion'
          }
        }
      })
      // Esta ruta va a contener {posts de la seccion, miembros, informacion, asistencias}
      .state('app.inicio/seccion', {
        url: '/seccion:id_seccion',
        views: {
          'menuContent': {
            templateUrl: 'js/views/seccion.html',
            controller: 'seccionController as seccion'
          }
        }
      })
      // Esta ruta va a contener {posts de la seccion, miembros, informacion, asistencias}
      .state('app.inicio/seccion/asistencias', {
        url: '/asistencias',
        params: {
          datos: null
        },
        views: {
          'menuContent': {
            templateUrl: 'js/views/asistencia.html',
            controller: 'asistenciaController as asistencia'
          }
        }
      })
      // Esta ruta va a contener {nueva publicacion}
      .state('app.inicio/seccion/publicacion', {
        url: '/publicacion',
        params: {
          datos: null
        },
        views: {
          'menuContent': {
            templateUrl: 'js/views/publicacion.html',
            controller: 'publicacionController as publicacion'
          }
        }
      })
      .state('app.inicio/seccion/miembro/perfil', {
        url: '/miembro:id_usuario',
        views: {
          'menuContent': {
            templateUrl: 'js/views/miembro.html',
            controller: 'miembroController as miembro'
          }
        }
      })
      // Esta ruta va a contener {posts de la seccion, miembros, informacion, asistencias}
      .state('app.inicio/seccion/reportes', {
        url: '/reportes',
        params: {
          datos: null
        },
        views: {
          'menuContent': {
            templateUrl: 'js/views/reportes.html',
            controller: 'reportesController as reportes'
          }
        }
      });

    $urlRouterProvider.otherwise('/app/inicio');
  })

  .run(function ($rootScope, $state) {

    $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {

    });

    $rootScope.$on("$stateChangeError", function (event, toState, toParams, fromState, fromParams, error) {
      if (error === "AUTH_REQUIRED") {
        $state.go("ingreso");
      } else if (error === "LOGOUT_REQUIRED") {
        $state.go('inicio');
      }
    });
  });
