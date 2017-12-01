angular.module('GATE')

  .controller('profesoresController', ['$scope', '$rootScope', 'servicioUsuario', '$stateParams', function ($scope, $rootScope, servicioUsuario, $stateParams) {
    var bz = this;

    bz.datos = {
      modificarUsuario: {},

    };




    bz.datosProfesores = function () {
      servicioUsuario.getAllTeacher().then(function (res) {
        bz.datos.profesores = res.data;
      }).catch(function (res) {
        console.log(res)
      });
    }


    bz.actualizarUsuario = function (datos) {
      servicioUsuario.update(datos).then(function (res) {
        console.log(datos)
        bz.datos.profesores[datos.index] = datos;
        console.log(res);
      }).catch(function (res) {
        console.log(res)
      });
    }

    bz.modificarUsuario = function (index) {
      bz.actUsuario = true;
      bz.datos.modificarUsuario = bz.datos.profesores[index];
      bz.datos.modificarUsuario.index = index;

    }

    bz.datosProfesores();

  }])
