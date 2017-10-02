angular.module('GATE')

  .controller('inscripcionController', ["$scope", "servicioGeneral", "$state", "servicioSecciones", "servicioAsignatura", function ($scope, servicioGeneral, $state, servicioSecciones, servicioAsignatura) {
    var bz = this;

    bz.datos = {
      listarAsignaturas: {
        id_malla: 1
      },
      user: {
        tipo: 'profesor'
      },
      trimestres: [{
        id_trimestre: 1
      }, {
        id_trimestre: 2
      }, {
        id_trimestre: 3
      }, {
        id_trimestre: 4
      }, {
        id_trimestre: 5
      }, {
        id_trimestre: 6
      }, {
        id_trimestre: 7
      }, {
        id_trimestre: 8
      }, {
        id_trimestre: 9
      }, {
        id_trimestre: 10
      }, {
        id_trimestre: 11
      }, {
        id_trimestre: 12
      }],
      crearSeccion: {
        id_usuario: 1,
        id_asignatura: 0,
        nombre: ''
      },
      inscribirSeccion: {
        id_usuario: 1
      }
    }

    bz.listarAsignaturas = function (datos) {
      servicioAsignatura.getAll(datos).then(function (res) {
        bz.datos.asignaturas = res.data;
      });
    }

    bz.crearSeccion = function (datos) {
      servicioSecciones.add(datos).then(function (res) {
        bz.seccionCreada = 'Seccion Creada';
      });
    }

    bz.inscribirSeccion = function (datos) {
      servicioSecciones.addMember(datos).then(function (res) {
        bz.m = res.data.msg;
      });
    }

  }])
