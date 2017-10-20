angular.module('GATE')

  .controller('perfilController', ['$scope', '$rootScope', 'servicioUsuario', '$stateParams', function ($scope, $rootScope, servicioUsuario, $stateParams) {
    var bz = this;

    bz.datos = {

    };

    bz.datosUsuario = function () {
      servicioUsuario.get($stateParams.id_usuario).then(function (res) {
        bz.datos = res.data;
      }).catch(function (res) {
        console.log(res)
      });
    }

    bz.datosUsuario();

  }])
