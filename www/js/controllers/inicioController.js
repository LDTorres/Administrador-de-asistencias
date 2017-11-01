angular.module('GATE')

  .controller('inicioController', ["$ionicSideMenuDelegate", "$scope", "servicioGeneral", "$state", "servicioSecciones", "servicioAsignatura", "servicioUsuario", '$rootScope', 'trimestresConstante', '$ionicLoading', '$ionicActionSheet', '$timeout', '$ionicPopup', '$window', function ($ionicSideMenuDelegate, $scope, servicioGeneral, $state, servicioSecciones, servicioAsignatura, servicioUsuario, $rootScope, trimestresConstante, $ionicLoading, $ionicActionSheet, $timeout, $ionicPopup, $window) {

    var bz = this;

    bz.datos = {
      posts: [],
      listarAsignaturas: {},
      user: {},
      objectoCliente: $rootScope.objectoCliente,
      trimestres: trimestresConstante,
      colores: ["positive", "assertive", "dark", "energized", "balanced", "royal"],
      preferencias: $rootScope.objectoCliente.preferencias
    }

    bz.tema = $rootScope.objectoCliente.preferencias.color_ui;

    // TODO: ARREGLANDO

    bz.posts = function (datos, refrescar) {
      if (refrescar == true) {
        console.log('Refrescando')
        datos.offset = bz.datos.posts.length;
      }
      servicioGeneral.timeline(datos).then(function (res) {
        if (refrescar == true) {
          console.log('Obteniendo mas Posts')
          bz.datos.posts.push(res) = res.data;
        } else {
          bz.datos.posts = res.data;
        }
      }).catch(function (res) {
        console.log(res)
      });
    }



    bz.listarAsignaturas = function (datos) {
      servicioAsignatura.getAll(datos).then(function (res) {
        bz.datos.asignaturas = res.data;
      });
    }

    bz.buscarSecciones = function (id) {
      servicioSecciones.getAll(id).then(function (res) {
        bz.datos.secciones = res.data;
      });
    }

    bz.irSeccion = function (id) {
      $state.go('inicio/seccion', {
        id_seccion: id
      });
    }

    // Perdir los datos de un usuario

    bz.datosUsuario = function () {
      servicioUsuario.get(bz.datos.objectoCliente.id).then(function (res) {
        bz.datos.user = res.data;
        bz.datos.listarAsignaturas.id_malla = res.data.id_malla;

        datos = {
          id_usuario: bz.datos.user.id_usuario,
          offset: 0
        }
        bz.posts(datos);

        servicioAsignatura.getMalla(res.data.id_malla).then(function (res) {
          bz.datos.user.malla = res.data.nombre;
        });

      }).catch(function (res) {
        console.log(res)
      });
    }

    bz.datosUsuario();

    // Actualizar Usuario
    bz.actualizarUsuario = function (datos, v) {
      if (v == true) {
        bz.v = false;
        servicioUsuario.update(datos).then(function (res) {
          bz.datos.user = res.data;
          bz.actualizado = 'Tus datos han sido actualizados';
          setTimeout(function () {
            bz.actualizado = '';
          }, 2000);
        }).catch(function (res) {
          console.log(res)

        });
      }
    }

    // Actualizar Preferencias

    bz.preferenciasAct = function (datos) {

      datos.id_usuario = $rootScope.objectoCliente.id;

      servicioUsuario.updatePreferences(datos).then(function (res) {

        $rootScope.objectoCliente.preferencias = datos;
        $window.localStorage.setItem('token', JSON.stringify($rootScope.objectoCliente));

        var confirmPopup = $ionicPopup.confirm({
          title: 'Refrescar App',
          template: 'Para aplicar los cambios debemos refrescar la app, esta de acuerdo?'
        });

        confirmPopup.then(function (res) {
          if (res) {
            location.reload();
          } else {}
        });

      }).catch(function (res) {
        console.log(res)
      });
    }

    // Cierra Sesion
    bz.cerrarSesion = function () {
      var confirmPopup = $ionicPopup.confirm({
        title: 'CERRAR SESION',
        template: 'Estas seguro de cerrar sesion?'
      });

      confirmPopup.then(function (res) {
        if (res) {
          servicioGeneral.salir();
          $state.go('ingreso');
        } else {}
      });
    }
  }])
