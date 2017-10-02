angular.module('GATE', ['ionic', 'ngCordova', 'ngFileUpload', 'ionic-datepicker'])

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

  .config(function ($stateProvider, $urlRouterProvider, $httpProvider, ionicDatePickerProvider) {

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
      from: new Date(2017, 1, 1),
      to: new Date(2030, 12, 30),
      showTodayButton: true,
      dateFormat: 'dd MMMM yyyy',
      closeOnSelect: false,
      disableWeekdays: [0, 6],
    };

    ionicDatePickerProvider.configDatePicker(datePickerObj);

    $stateProvider
      .state('ingreso', {
        url: '/',
        templateUrl: '../templates/login.html',
        controller: 'loginController as login',
        resolve: {
          "currentAuth": ["$q", "servicioGeneral", function ($q, servicioGeneral) {

            if (servicioGeneral.autorizado()) {

              return $q.reject("LOGOUT_REQUIRED");

            }

          }]
        }
      })
      // Inicio va a contener {timeline, todas las asignaturas y las secciones, perfil}
      .state('inicio', {
        url: '/inicio',
        templateUrl: '../templates/inicio.html',
        controller: 'inicioController as inicio',
        resolve: {
          "currentAuth": ["$q", "servicioGeneral", function ($q, servicioGeneral) {

            if (!servicioGeneral.autorizado()) {

              return $q.reject("AUTH_REQUIRED");

            }

          }]
        }
      })
      // Ayuda va a contener {informacion de la app, y el manual}
      .state('inicio/ayuda', {
        url: '/ayuda',
        templateUrl: '../templates/ayuda.html',
        controller: 'ayudaController as ayuda'
      })
      // Perfil va a contener {informacion del usuario a modificar y colocar la foto de perfil}
      .state('inicio/perfil', {
        url: '/perfil',
        templateUrl: '../templates/perfil.html',
        controller: 'perfilController as perfil'
      })
      // Configuracion va a contener {}
      .state('inicio/configuracion', {
        url: '/configuracion',
        templateUrl: '../templates/configuracion.html',
        controller: 'configuracionController as configuracion'
      })
      // Esta ruta va a contener {inscribir una asignatura {alumno}, crear una seccion {profesor}}
      .state('inicio/asignatura/inscripcion', {
        url: '/inscripcion',
        templateUrl: '../templates/inscripcion.html',
        controller: 'inscripcionController as inscripcion'
      })
      // Esta ruta va a contener {posts de la seccion, miembros, informacion, asistencias}
      .state('inicio/seccion', {
        url: '/seccion:id_seccion',
        templateUrl: '../templates/seccion.html',
        controller: 'seccionController as seccion',
      })
      // Esta ruta va a contener {posts de la seccion, miembros, informacion, asistencias}
      .state('inicio/seccion/asistencias', {
        url: '/asistencias',
        templateUrl: '../templates/asistencia.html',
        controller: 'asistenciaController as asistencia',
        params: {
          datos: null
        }
      })
      // Esta ruta va a contener {nueva publicacion}
      .state('inicio/seccion/publicacion', {
        url: '/publicacion',
        templateUrl: '../templates/publicacion.html',
        controller: 'publicacionController as publicacion',
        params: {
          datos: null
        }
      })
      // Esta ruta va a contener {posts de la seccion, miembros, informacion, asistencias}
      .state('inicio/seccion/reportes', {
        url: '/reportes',
        templateUrl: '../templates/reportes.html',
        controller: 'reportesController as reportes'
      });

    $urlRouterProvider.otherwise('/');
  })

  .run(function ($rootScope, $state) {

    $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {

    });

    $rootScope.$on("$stateChangeError", function (event, toState, toParams, fromState, fromParams, error) {
      if (error === "AUTH_REQUIRED") {
        $state.go("ingreso");
      } else if (error === "LOGOUT_REQUIRED") {
        $state.go('dashboard');
      }
    });
  })
