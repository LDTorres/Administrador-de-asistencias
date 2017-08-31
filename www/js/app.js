angular.module('GATE', ['ionic', 'ngCordova'])

  .config(function ($stateProvider, $urlRouterProvider) {

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
      .state('inicio/asignatura', {
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

    $urlRouterProvider.otherwise('/inicio');

