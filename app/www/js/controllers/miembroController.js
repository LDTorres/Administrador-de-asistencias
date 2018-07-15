angular.module('GATE')

  .controller('miembroController', ['$scope', '$rootScope', 'servicioUsuario', '$stateParams', function ($scope, $rootScope, servicioUsuario, $stateParams) {
    var bz = this;

    bz.datos = {

    };
    bz.tema = $rootScope.objectoCliente.preferencias.color_ui;
    bz.datosUsuario = function () {
      servicioUsuario.get($stateParams.id_usuario).then(function (res) {
        bz.datos = res.data;
      }).catch(function (res) {
        console.log(res)
        ionicToast.show('Revisa tu conexión a internet', 'top', false, 2500);
      });
    }

    bz.datosUsuario();

  }])
