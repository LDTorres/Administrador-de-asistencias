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
        controller: 'loginController as login'
      })
      .state('inicio', {
        url: '/inicio',
        templateUrl: '../templates/inicio.html',
        controller: 'inicioController as inicio'
      })
      .state('inicio/perfil', {
        url: '/perfil',
        templateUrl: '../templates/perfil.html',
        controller: 'perfilController as perfil'
      })
      .state('inicio/configuracion', {
        url: '/configuracion',
        templateUrl: '../templates/configuracion.html',
        controller: 'configuracionController as configuracion'
      })
      .state('inicio/asignaturas', {
        url: '/asignatura',
        templateUrl: '../templates/asignatura.html',
        controller: 'asignaturaController as asignatura'
      })
      .state('inicio/asignaturas/inscripcion', {
        url: '/inscripcion',
        templateUrl: '../templates/inscripcion.html',
        controller: 'inscripcionController as inscripcion'
      })
      .state('inicio/asignaturas/materia', {
        url: '/materia',
        templateUrl: '../templates/materia.html',
        controller: 'materiaController as materia'
      })
      .state('inicio/asignaturas/materia/informacion', {
        url: '/informacion',
        templateUrl: '../templates/informacion.html',
        controller: 'informacionController as informacion'
      })
      .state('inicio/asignaturas/materia/miembros', {
        url: '/miembros',
        templateUrl: '../templates/miembros.html',
        controller: 'miembrosController as miembros'
      })
      .state('inicio/asignaturas/materia/asistencia', {
        url: '/asistencia',
        templateUrl: '../templates/asistencia.html',
        controller: 'asistenciaController as asistencia'
      })
      .state('inicio/asignaturas/materia/publicacion', {
        url: '/publicacion',
        templateUrl: '../templates/publicacion.html',
        controller: 'publicacionController as publicacion'
      });


    $urlRouterProvider.otherwise('/');
  });
