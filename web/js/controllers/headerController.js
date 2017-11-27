angular.module("GATE")

  /* login */

  .controller('headerController', ['$scope', '$rootScope', '$state', "$stateParams", "servicioGeneral", function ($scope, $rootScope, $state, $stateParams, servicioGeneral) {

    var bz = this;

    this.nombre = 'Marisquito'

    bz.cerrarSesion = function () {
      servicioGeneral.salir();
      console.log('Sesion Cerrada');
      $state.go('login');
    }

  }])
