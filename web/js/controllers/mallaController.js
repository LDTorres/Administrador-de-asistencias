angular.module('GATE')

  .controller('mallaController', ["$scope", "servicioGeneral", "$state", "servicioSecciones", "servicioAsignatura", "trimestresConstante", "$rootScope", function ($scope, servicioGeneral, $state, servicioSecciones, servicioAsignatura, trimestresConstante, $rootScope) {
    var bz = this;

    bz.datos = {
      listarAsignaturas: {},
      modificarAsignatura: {},
      trimestres: trimestresConstante,
      crearAsignatura: {
        id_malla: 1

      }
    }




    bz.tema = $rootScope.objectoCliente.preferencias.color_ui;

    bz.datos.objeto = $rootScope.objectoCliente;
    bz.datos.listarAsignaturas.id_malla = $rootScope.objectoCliente.id_malla;

    bz.listarAsignaturas = function (datos) {
      servicioAsignatura.getAll(datos).then(function (res) {
        bz.datos.asignaturas = res.data;
      });
    }

    bz.crearAsignatura = function (datos) {

      servicioAsignatura.add(datos).then(function (res) {
        swal('Se ha creado la asignatura: ' + bz.datos.crearAsignatura.nombre_asig);
        bz.datos.crearAsignatura.id_asignatura = res.data.insertId;
        bz.datos.asignaturas.push(bz.datos.crearAsignatura);
      }).catch(function (res) {
        swal(
          'Un error ha ocurrido!',
          'intentelo de nuevo.',
          'error'
        );
      });

    }

    bz.modificarAsignatura = function (index) {

      bz.actAsignatura = true;
      bz.datos.modificarAsignatura = bz.datos.asignaturas[index];
      console.log(bz.datos.modificarAsignatura)
    }

    bz.actualizarAsignatura = function (datos) {
      servicioAsignatura.update(datos).then(function (res) {
        swal('Nuevo Nombre: ' + bz.datos.modificarAsignatura.nombre_asig);


      }).catch(function (res) {
        swal(
          'Un error ha ocurrido!',
          'intentelo de nuevo.',
          'error'
        );
      });
    }


    bz.crearSeccion = function () {
      bz.datos.crearSeccion.id_usuario = parseInt($rootScope.objectoCliente.id);
      servicioSecciones.add(bz.datos.crearSeccion).then(function (res) {
        bz.codigo = res.data.params.codigo;

      }).catch(function (res) {
        swal(
          'Un error ha ocurrido!',
          'intentelo de nuevo.',
          'error'
        );
        console.log(res)
      });
    }

    bz.inscribirSeccion = function (datos) {
      datos.id_usuario = $rootScope.objectoCliente.id
      servicioSecciones.addMember(datos).then(function (res) {
        ionicToast.show(res.data.msg, 'top', false, 2500);
      });
    }


  }])
