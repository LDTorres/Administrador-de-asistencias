angular.module('GATE')

  .controller('usuarioController', ["$scope", "servicioGeneral", "$state", "servicioSecciones", "servicioAsignatura", "servicioUsuario", '$rootScope', 'trimestresConstante', '$ionicLoading', '$timeout', '$ionicPopup', '$window', 'ionicToast', '$ionicHistory', "$ionicSideMenuDelegate", function ($scope, servicioGeneral, $state, servicioSecciones, servicioAsignatura, servicioUsuario, $rootScope, trimestresConstante, $ionicLoading, $timeout, $ionicPopup, $window, ionicToast, $ionicHistory, $ionicSideMenuDelegate) {

    var bz = this;

    bz.datos = {
      posts: [],
      listarAsignaturas: {},
      user: {},
      objectoCliente: $rootScope.objectoCliente,
      trimestres: trimestresConstante,
      colores: ["positive", "assertive", "dark", "energized", "balanced", "royal"],
      preferencias: $rootScope.objectoCliente.preferencias
    }

    bz.tema = $rootScope.objectoCliente.preferencias.color_ui;

    // Perdir los datos de un usuario

    bz.datosUsuario = function (id) {
      servicioUsuario.get(id).then(function (res) {

        bz.datos.user = res.data;
        bz.datos.listarAsignaturas.id_malla = res.data.id_malla;

        datos = {
          id_usuario: bz.datos.user.id_usuario,
          offset: 0
        }
        
        servicioAsignatura.getMalla(res.data.id_malla).then(function (res) {
          bz.datos.user.malla = res.data.nombre;
        });

      }).catch(function (res) {
        console.log(res)
        ionicToast.show('Revisa tu conexión a internet', 'top', false, 2500);
      });
    }

    $scope.$on('$ionicView.beforeEnter', function () {
      bz.tema = $rootScope.objectoCliente.preferencias.color_ui;
      bz.datos.preferencias = $rootScope.objectoCliente.preferencias;
      bz.datos.objectoCliente = $rootScope.objectoCliente;
      bz.datosUsuario($rootScope.objectoCliente.id);
    });

    // Actualizar Usuario

    bz.actualizarUsuario = function (datos) {
      console.log(datos)
      servicioUsuario.update(datos).then(function (res) {
        bz.datos.user = res.data;

        console.log(res)
        ionicToast.show('Datos Actualizados', 'top', false, 2500);
      }).catch(function (res) {
        console.log(res)
        ionicToast.show('Revisa tu conexión a internet', 'top', false, 2500);
      });
    }


  }])
