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

    $scope.menuItems = ['asistencia', 'profesores', 'malla', 'ayuda'];

    $scope.activeMenu = $scope.menuItems[0];


    $scope.setActive = function (menuItem) {
      $scope.activeMenu = menuItem;

    }
  }])
