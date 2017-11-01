angular.module('GATE')

  .controller('inscripcionController', ["$scope", "servicioGeneral", "$state", "servicioSecciones", "servicioAsignatura", "trimestresConstante", "$rootScope", function ($scope, servicioGeneral, $state, servicioSecciones, servicioAsignatura, trimestresConstante, $rootScope) {
    var bz = this;

    bz.datos = {
      listarAsignaturas: {},
      trimestres: trimestresConstante,
      crearSeccion: {
        id_asignatura: 0,
        nombre: ''
      },
      inscribirSeccion: {}
    }

    bz.tema = $rootScope.objectoCliente.preferencias.color_ui;

    bz.datos.objeto = $rootScope.objectoCliente;
    bz.datos.listarAsignaturas.id_malla = $rootScope.objectoCliente.id_malla;

    bz.listarAsignaturas = function (datos) {
      console.log(datos)
      servicioAsignatura.getAll(datos).then(function (res) {
        bz.datos.asignaturas = res.data;
      });
    }

    bz.crearSeccion = function (datos) {
      datos.id_usuario = $rootScope.objectoCliente.id
      servicioSecciones.add(datos).then(function (res) {
        bz.seccionCreada = 'Seccion Creada';
      });
    }

    bz.inscribirSeccion = function (datos) {
      datos.id_usuario = $rootScope.objectoCliente.id
      servicioSecciones.addMember(datos).then(function (res) {
        bz.m = res.data.msg;
      });
    }

  }])
