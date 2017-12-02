angular.module('GATE')

  .controller('sidemenuController', function ($scope, $stateParams, ionicDatePicker, servicioSecciones, $rootScope, ionicToast, $ionicPopup, servicioGeneral, $state) {

    var bz = this;
    bz.datos = {
      objectoCliente: $rootScope.objectoCliente
    }
    $scope.$on('$ionicView.beforeEnter', function () {
      bz.datos.objectoCliente = $rootScope.objectoCliente;
    });

    $scope.usuario = {
      gravatar: bz.datos.objectoCliente.preferencias.gravatar,
      tema: bz.datos.objectoCliente.preferencias.color_ui,
      nombre: bz.datos.objectoCliente.nombre_completo,
      tipo: bz.datos.objectoCliente.tipo
    }

    // Cierra Sesion
    $scope.cerrarSesion = function () {
      var confirmPopup = $ionicPopup.confirm({
        title: 'CERRAR SESIÓN',
        template: 'Estas seguro de cerrar sesión?'
      });

      confirmPopup.then(function (res) {
        if (res) {
          servicioGeneral.salir();
          $state.go('ingreso');
        } else { }
      });
    }
  })
