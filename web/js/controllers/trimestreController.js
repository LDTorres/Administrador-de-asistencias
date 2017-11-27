angular.module("GATE")

  /* login */

  .controller('trimestreController', ['$scope', '$rootScope', '$state', "$stateParams", "trimestresConstante", function ($scope, $rootScope, $state, $stateParams, trimestresConstante) {

    var bz = this;

    bz.datos = {
      trimestres: trimestresConstante,
    }
    console.log(bz.datos);

  }])
