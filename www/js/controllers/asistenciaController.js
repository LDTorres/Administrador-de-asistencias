angular.module('GATE')

  .controller('asistenciaController', function ($scope, $stateParams, ionicDatePicker, servicioSecciones) {
    var bz = this;

    bz.datos = $stateParams.datos;

    bz.datos.fechaSeleccionada = '';

    // FUNCION PARA LLAMAR AL DATE PICKER
    var ipObj1 = {
      callback: function (val) {
        date = new Date(val);
        bz.datos.getAsistence.fecha = formatDate(date);
        bz.datos.fechaSeleccionada = formatDate(date);
      }
    }

    bz.openDatePicker = function () {
      ionicDatePicker.openDatePicker(ipObj1);
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

    bz.datos.miembros.forEach(function (element) {
      element.asistio = 0;
    }, this);

    bz.setAsistencia = function () {
      datos = {
        miembros: bz.datos.miembros,
        id_seccion: bz.datos.datosSeccion.id_seccion,
        fecha: bz.datos.fechaSeleccionada
      }

      servicioSecciones.setAsistence(datos).then(function (res) {
        console.log(res);
      }).catch(function (res) {
        console.log(res)
      });
    }
  })
