angular.module('GATE', ['ionic', 'ngCordova'])

.config(function ($stateProvider, $urlRouterProvider) {

    $stateProvider
    .state('inicio', {
        url: '/',
        templateUrl: '../templates/inicio.html',
        controller: 'inicioController as inicio'
    })
    .state('login', {
        url: 'login',
        templateUrl: '../templates/login.html',
        controller: 'loginController as login'
    })
    .state('perfil', {
        url: 'perfil',
            templateUrl: '../templates/perfil.html',
            controller: 'perfilController as perfil',
        })
        .state('configuracionC', {
            url: 'configuracionC',
            templateUrl: '../templates/configuracionCuenta.html',
            controller: 'configuracionCController as configuracionC',
        })
        .state('grupos', {
            url: 'grupos',
            templateUrl: '../templates/grupos.html',
            controller: 'gruposController as grupos',
        });

    $urlRouterProvider.otherwise('/');

})
