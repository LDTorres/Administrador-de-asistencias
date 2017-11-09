angular.module('GATE')

  .controller('seccionController', ['$scope', '$stateParams', 'servicioSecciones', 'ionicDatePicker', '$state', '$rootScope', 'ionicToast', function ($scope, $stateParams, servicioSecciones, ionicDatePicker, $state, $rootScope, ionicToast) {
    var bz = this;

    bz.tema = $rootScope.objectoCliente.preferencias.color_ui;

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

    bz.datos.tipo = $rootScope.objectoCliente.tipo;
    bz.eliminarOpcion = $rootScope.objectoCliente.tipo == 'Administrador' || $rootScope.objectoCliente.tipo == 'Profesor' ? true : false;

    bz.crearPublicacion = function () {
      $state.go('inicio/seccion/publicacion', {
        datos: {
          id_seccion: $stateParams.id_seccion,
          id_usuario: 1,
          accion: 'new',
          miembros: bz.datos.miembros
        }
      });
    }

    bz.editarPublicacion = function (post) {
      post.accion = 'edit';
      $state.go('inicio/seccion/publicacion', {
        datos: post
      });
    }

    bz.getInfo = function () {
      servicioSecciones.getInfo(bz.datos.datosSeccion).then(function (res) {
        bz.datos.seccion = res.data;
      }).catch(function (res) {
        console.log(res)
      });
    }

    bz.posts = function (datos) {
      servicioSecciones.getPosts(datos).then(function (res) {
        bz.datos.posts = res.data;
        bz.getInfo();
      }).catch(function (res) {
        console.log(res)
      });
    }

    bz.posts(bz.datos.datosSeccion);

    bz.morePosts = function () {
      bz.datos.datosSeccion.offset = bz.datos.posts.length;
      servicioSecciones.getPosts(bz.datos.datosSeccion).then(function (res) {
        if (res.data.length > 0) {
          res.data.forEach(function (element) {
            bz.datos.posts.push(element)
          }, this);
        }else{
          ionicToast.show('No hay publicaciones nuevas', 'top', false, 2500);
        }
      })
    }

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
        bz.datos.fechaSeleccionada = formatDate(date);
        bz.getAsistencias(bz.datos.getAsistence);
      }
    }

    bz.openDatePicker = function () {
      ionicDatePicker.openDatePicker(ipObj1);
    };

    bz.getAsistencias = function (datos) {
      if (bz.datos.tipo == 'Estudiante') {
        datos.id_usuario = $rootScope.objectoCliente.id_usuario;
      }
      servicioSecciones.getAsistence(datos).then(function (res) {
        bz.datos.asistencias = res.data;
      })
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

    bz.eliminarMiembro = function(i, datos, a){
      datos.accion = a;
      servicioSecciones.deleteMember(datos).then(function (res) {
        if(a == 0){
          ionicToast.show('Desactivado', 'top', false, 2500);
        }else{
          ionicToast.show('Activado', 'top', false, 2500);
        }
        bz.datos.miembros[i].estado = a; 
      })
    }

  }])
