angular.module('GATE', ['ionic', 'ngCordova'])

.config(function ($stateProvider, $urlRouterProvider) {

    $stateProvider
    .state('ingreso', {
        url: '/',
        templateUrl: '../templates/inicio.html',
        controller: 'inicioController as inicio'
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
        url: '/',
        templateUrl: '../templates/inicio.html',
        controller: 'inicioController as inicio'
    })
    

    $urlRouterProvider.otherwise('/');

})
