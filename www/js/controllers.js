angular.module('GATE')

  .controller('loginController', function ($scope, servicioGeneral) {
    var bz = this;

    bz.datos = {
      registro: {},
      login: {}
    };

    bz.ingresar = function (datos) {
      servicioGeneral.ingresar(bz.datos.login).then(function (res) {
        console.log(res)
      }).catch(function (res) {
        console.log(res)
      });
    }

    bz.registrar = function (datos) {
      servicioGeneral.registrar(bz.datos.registro).then(function () {
        console.log(res)
      }).catch(function (res) {
        console.log(res)
      });
    }

    bz.salir = function (datos) {
      servicioGeneral.salir(datos).then(function () {
        console.log(res)
      }).catch(function (res) {
        console.log(res)
      });
    }
  })

  .controller('inicioController', function ($scope) {

  })

  .controller('perfilController', function ($scope) {

  })

  .controller('configuracionController', function ($scope) {

  })

  .controller('asignaturaController', function ($scope) {

  })

  .controller('inscripcionController', function ($scope) {

  })

  .controller('materiaController', function ($scope) {

  })

  .controller('informacionController', function ($scope) {

  })

  .controller('miembrosController', function ($scope) {

  })

  .controller('asistenciaController', function ($scope) {

  })

  .controller('publicacionController', function ($scope) {

  });
