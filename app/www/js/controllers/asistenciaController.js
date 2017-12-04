angular.module('GATE')

  .controller('asistenciaController', function ($scope, $stateParams, ionicDatePicker, servicioSecciones, $rootScope, ionicToast) {

    var bz = this;

    bz.datos = $stateParams.datos;
    bz.tema = $rootScope.objectoCliente.preferencias.color_ui;

    bz.getAsistencias = function (f) {
      datos = {
        id_seccion: bz.datos.datosSeccion.id_seccion,
        fecha: f
      }

      bz.datos.miembros.forEach(function (miembro) {
        miembro.asistio = 0;
        miembro.asistio_check = false;
      }, this);

      servicioSecciones.getAsistence(datos).then(function (res) {
        res.data.consulta.forEach(function (asistencia) {
          bz.datos.miembros.forEach(function (miembro) {
            if (asistencia.id_usuario == miembro.id_usuario) {
              if (asistencia.asistio == 1) {
                miembro.asistio_check = true;
                miembro.asistio = 1;
              }
            }
          }, this);
        }, this);
        bz.mostrar = 1;
      }).catch(function (res) {
        console.log(res)
        ionicToast.show('Revisa tu conexión a internet', 'top', false, 2500);
      });
    }

    bz.setAsistencia = function () {

      bz.datos.miembros.forEach(function (miembro) {
        if (miembro.asistio_check == true) {
          miembro.asistio = 1;
        } else {
          miembro.asistio = 0;
        }
      }, this);

      datos = {
        miembros: bz.datos.miembros,
        id_seccion: bz.datos.datosSeccion.id_seccion,
        fecha: bz.datos.fechaSeleccionada
      }

      servicioSecciones.setAsistence(datos).then(function (res) {
        ionicToast.show('Asistencias Colocadas', 'top', false, 2500);
      }).catch(function (res) {
        console.log(res)
        ionicToast.show('Revisa tu conexión a internet', 'top', false, 2500);
      });
    }

    function sumarDias(fecha, dias) {
      fecha.setDate(fecha.getDate() + dias);
      return fecha;
    }
    
    // FUNCION PARA LLAMAR AL DATE PICKER
    var datePickerObj = {
      inputDate: new Date(),
      setLabel: 'Colocar',
      todayLabel: 'Hoy',
      closeLabel: 'Cerrar',
      mondayFirst: true,
      weeksList: ["D", "L", "Ma", "Mi", "J", "V", "S"],
      monthsList: ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"],
      templateType: 'popup',
      from: formatDate(sumarDias(new Date(), -7)),
      to: new Date(),
      showTodayButton: false,
      callback: function (val) {
        date = new Date(val);
        bz.datos.getAsistence.fecha = formatDate(date);
        bz.datos.fechaSeleccionada = formatDate(date);
        bz.getAsistencias(formatDate(date));
      }
    };

    bz.openDatePicker = function () {
      ionicDatePicker.openDatePicker(datePickerObj);
    };

    function formatDate(date) {
      var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

      if (month.length < 2) month = '0' + month;
      if (day.length < 2) day = '0' + day;

      return [year, month, day].join('-');
    }
  })
