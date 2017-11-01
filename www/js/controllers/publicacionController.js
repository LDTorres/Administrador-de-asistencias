angular.module('GATE')

  .controller('publicacionController', function ($scope, $stateParams, servicioSecciones, $rootScope) {

    var bz = this;

    bz.datos = {
      nuevoPost: $stateParams.datos,
      modificarPost: $stateParams.datos
    };

    bz.tema = $rootScope.objectoCliente.preferencias.color_ui;

    bz.nuevoPost = function (datos) {
      console.log(datos)
      servicioSecciones.addPost(datos).then(function (res) {
        console.log(res)
      }).catch(function (res) {
        console.log(res)
      });
    }

    bz.modificarPost = function (datos) {
      console.log(datos)
      servicioSecciones.updatePost(datos).then(function (res) {
        console.log(res)
      }).catch(function (res) {
        console.log(res)
      });
    }
  })
