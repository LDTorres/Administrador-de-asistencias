angular.module('GATE')

  .controller('asistenciaController', function ($scope, $stateParams, servicioUsuario, servicioGeneral, $state, servicioAsignatura, trimestresConstante, servicioSecciones, $rootScope) {

    var bz = this;

    bz.id_seccion = $stateParams.id_seccion;

    bz.datos = {
      listarAsignaturas: {
      },
      trimestres: trimestresConstante,
      asignatura_activa: {
        id_usuario: $rootScope.objectoCliente.id,
        tipo: $rootScope.objectoCliente.tipo
      },
      obtener: {},
      reporteInfo: {
        id_malla: 1,
        id_usuario: $rootScope.objectoCliente.id
      },
      mostrar_btn: false
    }



    bz.tipoUsuario = $rootScope.objectoCliente.tipo;
    bz.datos.objeto = $rootScope.objectoCliente;
    bz.datos.listarAsignaturas.id_malla = $rootScope.objectoCliente.id_malla;

    /* crear reportes */

    servicioSecciones.reportes().then(function(res){
      bz.datos.reportes = res;
    });

    bz.crearReporte = function (datos) {

      bz.datos.reporteInfo.desde = bz.formatDate(bz.datos.desde);
      bz.datos.reporteInfo.hasta = bz.formatDate(bz.datos.hasta);
      bz.datos.reporteInfo.id_seccion = bz.id_seccion;
      console.log(bz.datos.reporteInfo);

      servicioSecciones.report(bz.datos.reporteInfo).then(function (res) {
        bz.datos.reportes.push(res.data)
      }).catch(function (res) {
        console.log(res);
        swal('Un error ha ocurrido',
          'vuelva a intentarlo',
          'warning'
        );
      });

    }

    /*listar asignaturas*/

    bz.listarAsignaturas = function (datos) {
      servicioAsignatura.getAll(datos).then(function (res) {
        bz.datos.asignaturas = res.data;
      });
    }




    /* listar secciones*/

    bz.listarSecciones = function () {

      if (bz.tipoUsuario != 'Estudiante') {
        bz.datos.asignatura_activa.tipo = 'Profesor';
      }

      servicioSecciones.getAll(bz.datos.asignatura_activa).then(function (res) {

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

        if(res.data.length > 0){
          bz.oa = true;
          bz.datos.miembros = res.data;
        }else{
          swal('No hay miembros en esta sección! ', 'error');
        }

      }).catch(function(res){
        swal('No hay miembros en esta sección! ', 'error');
      })
    }

    bz.eliminarReporte = function (i) {

      datos = {
        nombre: bz.datos.reportes[i].nombre_reporte,
        id: bz.datos.reportes[i].id_reporte
      }

      servicioSecciones.deletereport(datos).then(function (res) {
        swal('Reporte Eliminado! ');
        bz.datos.reportes.splice(i, 1);
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

      servicioSecciones.setAsistence(datos).then(function (res) {
        console.log(res);
        swal('Asistencias guardadas! ');
      }).catch(function (res) {
        console.log(res);
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
