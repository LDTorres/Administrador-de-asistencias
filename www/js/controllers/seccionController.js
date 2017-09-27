angular.module('GATE')

  .controller('seccionController', function ($scope, $stateParams, servicioSecciones, ionicDatePicker) {
    var bz = this;
    bz.datos = {
      seccion: [],
      datosSeccion: {
        id_seccion: $stateParams.id_seccion,
        offset: 0
      },
      getAsistence: {
        id_seccion: $stateParams.id_seccion,
      },
      posts: [],
      miembros: []
    }

    bz.getInfo = function () {
      servicioSecciones.getInfo(bz.datos.datosSeccion).then(function (res) {
        bz.datos.seccion = res.data;
        console.log(res)
      }).catch(function (res) {
        console.log(res)
      });
    }

    bz.getInfo();

    bz.posts = function (datos) {
      servicioSecciones.getPosts(datos).then(function (res) {
        bz.datos.posts = res.data;
      }).catch(function (res) {
        console.log(res)
      });
    }

    bz.posts(bz.datos.datosSeccion);

    bz.miembros = function (datos) {
      servicioSecciones.getMembers(datos).then(function (res) {
        bz.datos.miembros = res.data;
      }).catch(function (res) {
        console.log(res)
      });
    }

    bz.miembros(bz.datos.datosSeccion);

    // FUNCION PARA LLAMAR AL DATE PICKER
    var ipObj1 = {
      callback: function (val) {
        date = new Date(val);
        bz.datos.getAsistence.fecha = formatDate(date);
        console.log(bz.datos.getAsistence)
        bz.getAsistencias(bz.datos.getAsistence);
      }
    }

    bz.openDatePicker = function () {
      ionicDatePicker.openDatePicker(ipObj1);
    };

    bz.getAsistencias = function (datos) {
      servicioSecciones.getAsistence(datos).then(function (res) {
        bz.datos.asistencias = res.data;
      }).catch(function (res) {
        console.log(res)
      });
    }

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
