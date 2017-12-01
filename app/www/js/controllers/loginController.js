angular.module('GATE')

  .controller('loginController', ['$scope', 'servicioGeneral', 'ionicDatePicker', '$state', '$rootScope', 'ionicToast', "$ionicLoading", function ($scope, servicioGeneral, ionicDatePicker, $state, $rootScope, ionicToast, $ionicLoading) {
    var bz = this;

    bz.datos = {
      registro: {
        id_malla: 1
      },
      login: {},
      mostrarForm: 1
    };

    bz.switch = 'Iniciar Sesion';

    bz.cambiar = function (vista) {
      if (vista == 1) {
        bz.switch = 'Iniciar Sesion';
      } else if (2) {
        bz.switch = 'Registrarse';
      } else {
        bz.switch = 'Olvido Contraseña';
      }
      bz.datos.mostrarForm = vista;
    }

    bz.ingresar = function (datos) {
      servicioGeneral.ingresar(datos).then(function (res) {
        if (res.data.error == 'invalido') {
          ionicToast.show('Datos Invalidos', 'top', false, 2500);
        } else {
          ionicToast.show('Datos Correctos', 'top', false, 2500);
          setTimeout(function () {
            $state.go('inicio');
          }, 2000);
        }
      }).catch(function (res) {
        console.log(res)
        ionicToast.show('Datos Invalidos', 'top', false, 2500);
      });
    }

    bz.registrar = function (datos) {
      datos.id_malla = 1;

      $ionicLoading.show({
        template: 'Creando Cuenta...',
      });

      servicioGeneral.registrar(datos).then(function (res) {
        $ionicLoading.hide().then(function () {
          ionicToast.show(res.data.msg, 'top', false, 2500);
          setTimeout(function () {
            $state.go('tutorial');
          }, 2000);
        });

      }).catch(function (res) {
        console.log(res)
      });
    }

    bz.forgotPass = function (datos) {
      $ionicLoading.show({
        template: 'Enviando Contraseña al correo...',
      });
      servicioGeneral.forgotPass(datos).then(function (res) {
        $ionicLoading.hide().then(function () {
          ionicToast.show('Revisa tu correo', 'top', false, 2500);
        });
      }).catch(function (res) {
        console.log(res)
      });
    }

  }])
