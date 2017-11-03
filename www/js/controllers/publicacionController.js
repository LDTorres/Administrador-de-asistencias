angular.module('GATE')

  .controller('publicacionController', function ($scope, $stateParams, servicioSecciones, $rootScope, $state) {

    var bz = this;

    bz.datos = {
      nuevoPost: $stateParams.datos,
      modificarPost: $stateParams.datos
    };

    bz.tema = $rootScope.objectoCliente.preferencias.color_ui;

    bz.nuevoPost = function (datos) {
      servicioSecciones.addPost(datos).then(function (res) {
        bz.postAccion = 1;
        console.log(res)
      }).catch(function (res) {
        console.log(res)
      });
    }

    bz.modificarPost = function (datos) {
      servicioSecciones.updatePost(datos).then(function (res) {
        bz.postAccion = 2;
      }).catch(function (res) {
        console.log(res)
      });
    }

    bz.eliminarPost = function () {
      servicioSecciones.deletePost($stateParams.datos).then(function (res) {
        console.log(res)
      }).catch(function (res) {
        console.log(res)
      });
    }
    
  })
