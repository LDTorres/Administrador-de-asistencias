angular.module('GATE')

  .controller('loginController', ['$scope', 'ingresarService', function ($scope, ingresarService) {
    var bz = this;

    bz.datos = {
      registro: {
        usuario: 'Michelyuuf',
        contrasena: '12345678432',
        nombre_completo: 'Juan sdfdsrperroncho',
        cedula: 123478756,
        correo: 'michefsdfl.com',
        telefono: 1234,
        id_malla: 1
      },
      login: {
        usuario: 'Luis',
        contrasena: '123456789'
      }
    };

    bz.ingresar = function () {
      ingresarService.ingresar(bz.datos.login).then(function (res) {
        console.log(res)
      }).catch(function (res) {
        console.log(res)
      });
    }

    bz.registrar = function (datos) {
      ingresarService.registrar(bz.datos.registro).then(function () {
        console.log(res)
      }).catch(function (res) {
        console.log(res)
      });
    }



    bz.salir = function (datos) {
      ingresarService.salir(datos).then(function () {
        console.log(res)
      }).catch(function (res) {
        console.log(res)
      });
    }
  }])

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
