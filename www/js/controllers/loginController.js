angular.module('GATE')

  .controller('loginController', ['$scope', 'servicioGeneral', 'ionicDatePicker', '$state', function ($scope, servicioGeneral, ionicDatePicker, $state) {
    var bz = this;

    bz.datos = {
      registro: {},
      login: {},
      mostrarForm: 1
    };

    bz.ingresar = function (datos) {
      servicioGeneral.ingresar(datos).then(function (res) {
        bz.good = 'Datos Correctos';
        bz.validacion = 0;
        setTimeout(function () {
          $state.go('inicio');
        }, 2000);
      }).catch(function (res) {
        bz.good = 0;
        bz.validacion = 'Datos Invalidos';
      });
    }

    bz.registrar = function (datos) {
      servicioGeneral.registrar(datos).then(function (res) {
        console.log(res)
      }).catch(function (res) {
        console.log(res)
      });
    }

    bz.salir = function (datos) {
      servicioGeneral.salir(datos).then(function (res) {
        console.log(res)
      }).catch(function (res) {
        console.log(res)
      });
    }

  }])
