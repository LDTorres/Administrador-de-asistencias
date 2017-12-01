angular.module('GATE')

  .controller('asistenciaController', function ($scope, $stateParams, servicioUsuario, servicioGeneral, $state, servicioAsignatura, trimestresConstante, servicioSecciones, $rootScope) {

    var bz = this;

    bz.id_seccion = $stateParams.id_seccion;



    bz.datos = {
      listarAsignaturas: {},
      trimestres: trimestresConstante,
      asignatura_activa: {
        id_usuario: $rootScope.objectoCliente.id,
        tipo: $rootScope.objectoCliente.tipo
      },
      obtener: {},
      reporteInfo: {
        id_usuario: $rootScope.objectoCliente.id
      },
      mostrar_btn: false
    }



    bz.tipoUsuario = $rootScope.objectoCliente.tipo;

    console.log($rootScope.objectoCliente);
    bz.tema = $rootScope.objectoCliente.preferencias.color_ui;

    bz.datos.objeto = $rootScope.objectoCliente;
    bz.datos.listarAsignaturas.id_malla = $rootScope.objectoCliente.id_malla;

    /*listar asignaturas*/

    bz.listarAsignaturas = function (datos) {
      servicioAsignatura.getAll(datos).then(function (res) {
        bz.datos.asignaturas = res.data;
      });
    }


    /* listar secciones*/

    bz.listarSecciones = function (datos) {
      servicioSecciones.getAll(datos).then(function (res) {
        bz.datos.secciones = res.data;

      }).catch(function (res) {

        console.log(res);


      });

    }
    /*asistencias*/

    bz.getMiembros = function () {

      datos = {
        id_seccion: bz.id_seccion
      }

      servicioSecciones.getMembers(datos).then(function (res) {
        bz.oa = true;
        bz.datos.miembros = res.data;
      })
    }



    bz.getAsistencias = function () {

      bz.datos.miembros.forEach(function (miembro) {
        miembro.asistio = 0;
      }, this);

      datos = {
        id_seccion: bz.id_seccion,
        fecha: bz.formatDate(bz.fecha)
      }

      servicioSecciones.getAsistence(datos).then(function (res) {
        res.data.consulta.forEach(function (asistencia) {
          bz.datos.miembros.forEach(function (miembro) {
            if (asistencia.id_usuario == miembro.id_usuario) {
              if (asistencia.asistio == 1) {
                miembro.asistio = 1;
              }
            }
          }, this);
        }, this);
        bz.vf = true;
      }).catch(function (res) {

        bz.vf = false;
      })
    }

    bz.setAsistencia = function () {

      datos = {
        miembros: bz.datos.miembros,
        id_seccion: bz.id_seccion,
        fecha: bz.formatDate(bz.fechaSeleccionada)
      }

      servicioSecciones.setAsistence(datos).then(function (res) {}).catch(function (res) {
        console.log(res)
      });
    }

    bz.formatDate = function (date) {
      var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

      if (month.length < 2) month = '0' + month;
      if (day.length < 2) day = '0' + day;

      return [year, month, day].join('-');
    }



  })
