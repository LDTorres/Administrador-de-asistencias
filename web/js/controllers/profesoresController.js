angular.module('GATE')

  .controller('profesoresController', ['$scope', '$rootScope', 'servicioUsuario', '$stateParams', function ($scope, $rootScope, servicioUsuario, $stateParams) {
    var bz = this;

    bz.tema = $rootScope.objectoCliente.preferencias.color_ui;

    bz.datos = {

    };

    bz.datosUsuario = function () {
      servicioUsuario.get($stateParams.id_usuario).then(function (res) {
        bz.datos = res.data;
      }).catch(function (res) {
        console.log(res)
      });
    }

    bz.datosProfesores = function () {
      servicioUsuario.getAllTeacher().then(function (res) {
        bz.datos.profesores = res.data;
        console.log(res);
      }).catch(function (res) {
        console.log(res)
      });
    }

    bz.datosProfesores();
    bz.datosUsuario();

  }])
