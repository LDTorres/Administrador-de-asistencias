angular.module("GATE")

  /* login */

  .controller('loginController', ['$scope', '$rootScope', '$state', "$stateParams", "servicioGeneral", function ($scope, $rootScope, $state, $stateParams, servicioGeneral) {
    var bz = this;

    bz.datos = {
      registro: {
        id_malla: 1
      },
      login: {},
      mostrarForm: 1
    };

    bz.ingresar = function () {
      servicioGeneral.ingresar(bz.datos.login).then(function (res) {
        setTimeout(function () {
          $state.go('asistencia');
        }, 2000)
        //console.log($rootScope.objectoCliente);
      }).catch(function (res) {
        console.log(res)
      });
    }

    bz.registrar = function (datos) {
      datos.id_malla = 1;
      servicioGeneral.registrar(datos).then(function (res) {
        console.log(res)
        setTimeout(function () {
          $state.go('asistencia');
        }, 2000);
      }).catch(function (res) {
        console.log(res)
      });
    }

    bz.forgotPass = function (datos) {
      servicioGeneral.forgotPass(datos).then(function (res) {
        console.log(res)
      }).catch(function (res) {
        console.log(res)
      });
    }

    bz.cerrarSesion = function () {
      servicioGeneral.salir();
      console.log('Sesion Cerrada');
      $state.go('login');
    }
  }])
