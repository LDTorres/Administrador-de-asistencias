angular.module('GATE')

  .controller('mallaController', ["$scope", "servicioGeneral", "$state", "servicioSecciones", "servicioAsignatura", "trimestresConstante", "$rootScope", function ($scope, servicioGeneral, $state, servicioSecciones, servicioAsignatura, trimestresConstante, $rootScope) {
    var bz = this;

    bz.datos = {
      listarAsignaturas: {},
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
        console.log(res);
      })

    }

    bz.crearSeccion = function () {
      bz.datos.crearSeccion.id_usuario = parseInt($rootScope.objectoCliente.id);
      servicioSecciones.add(bz.datos.crearSeccion).then(function (res) {
        bz.codigo = res.data.params.codigo;
      }).catch(function (res) {
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
