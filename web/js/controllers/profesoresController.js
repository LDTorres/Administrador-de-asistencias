angular.module('GATE')

  .controller('profesoresController', ['$scope', '$rootScope', 'servicioUsuario', '$stateParams', 'servicioGeneral', function ($scope, $rootScope, servicioUsuario, $stateParams, servicioGeneral) {
    var bz = this;

    bz.datos = {
      modificarUsuario: {},
      registroProfesor: {
        id_malla: 1,
        tipo: "Profesor"
      }
    };


    bz.crearProfesor = function (datos) {

      servicioGeneral.registrar(bz.datos.registroProfesor).then(function (res) {
        swal('Usuario creado exitosamente! ');
      }).catch(function (res) {
        console.log(res)
        swal(
          'Un error ha ocurrido!',
          'intentelo de nuevo.',
          'error'
        );
      });
    }

    bz.datosProfesores = function () {
      servicioUsuario.getAllTeacher().then(function (res) {
        bz.datos.profesores = res.data;
      }).catch(function (res) {
        console.log(res)
      });
    }


    bz.actualizarUsuario = function (datos) {
      servicioUsuario.update(datos).then(function (res) {
        swal('Usuario modificado exitosamente! ');
        bz.datos.profesores[datos.index] = datos;
        console.log(res);
      }).catch(function (res) {
        console.log(res)
        swal(
          'Un error ha ocurrido!',
          'intentelo de nuevo.',
          'error'
        );
      });
    }

    bz.modificarUsuario = function (index) {
      bz.actUsuario = true;
      bz.datos.modificarUsuario = bz.datos.profesores[index];
      bz.datos.modificarUsuario.index = index;

    }

    bz.datosProfesores();

  }])
