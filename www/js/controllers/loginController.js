angular.module('GATE')

  .controller('loginController', function ($scope, servicioGeneral, ionicDatePicker) {
    var bz = this;

    bz.datos = {
      registro: {},
      login: {}
    };


    // FUNCION PARA LLAMAR AL DATE PICKER
    var ipObj1 = {
      callback: function (val) { //Mandatory
        console.log('Return value from the datepicker popup is : ' + val, new Date(val));
      }
    };

    bz.openDatePicker = function () {
      ionicDatePicker.openDatePicker(ipObj1);
    };
    // bz.openDatePicker();
    ////////////////////////////////////////



    bz.ingresar = function (datos) {

      servicioGeneral.ingresar(datos).then(function (res) {
        console.log(res)
      }).catch(function (res) {
        console.log(res)
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
  })
