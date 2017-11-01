angular.module('GATE')

  .controller('loginController', ['$scope', 'servicioGeneral', 'ionicDatePicker', '$state', '$rootScope', function ($scope, servicioGeneral, ionicDatePicker, $state, $rootScope) {
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
      } else {
        bz.switch = 'Registrarse';
      }
      bz.datos.mostrarForm = vista;
    }

    bz.ingresar = function (datos, v) {
      if (v == true) {
        servicioGeneral.ingresar(datos).then(function (res) {
          bz.good = 'Datos Correctos';
          bz.validacion = 0;

          setTimeout(function () {
            $state.go('inicio');
          }, 2000);

          //console.log($rootScope.objectoCliente);
        }).catch(function (res) {
          bz.good = 0;
          bz.validacion = 'Datos Invalidos';
        });
      }
    }

    bz.registrar = function (datos, v) {
      if (v == true) {
        servicioGeneral.registrar(datos).then(function (res) {
          console.log(res)
          datos = {
            subject: 'Registro Exitoso!',
            body: 'Gracias por registrarte en GATE APP!',
            to: datos.correo
          }
          console.log(datos);
          envioEmail = servicioGeneral.sendMail(datos);
          console.log(envioEmail);
        }).catch(function (res) {
          console.log(res)
        });
      }
    }

    bz.salir = function (datos) {
      servicioGeneral.salir(datos).then(function (res) {
        console.log(res)
      }).catch(function (res) {
        console.log(res)
      });
    }

  }])
