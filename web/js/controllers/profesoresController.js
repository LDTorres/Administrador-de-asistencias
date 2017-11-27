angular.module('GATE')

  .controller('profesoresController', ['$scope', '$rootScope', 'servicioUsuario', '$stateParams', function ($scope, $rootScope, servicioUsuario, $stateParams) {
    var bz = this;

    bz.datos = {

    };

    bz.datosProfesores = function () {
      servicioUsuario.getAllTeacher().then(function (res) {
        bz.datos.profesores = res.data;
        console.log(res);
      }).catch(function (res) {
        console.log(res)
      });
    }

    bz.datosProfesores();

  }])
