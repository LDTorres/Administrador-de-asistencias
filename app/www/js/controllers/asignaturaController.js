angular.module('GATE')

  .controller('asignaturaController', ["$scope", "servicioGeneral", "$state", "servicioSecciones", "servicioAsignatura", function ($scope, servicioGeneral, $state, servicioSecciones, servicioAsignatura) {
    var bz = this;

    bz.datos = {
      user: [{
        tipo: 'estudiante'
      }]
    }

    bz.tema = $rootScope.objectoCliente.preferencias.color_ui;
  }])
