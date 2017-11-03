angular.module('GATE')

  .controller('inicioController', ["$ionicSideMenuDelegate", "$scope", "servicioGeneral", "$state", "servicioSecciones", "servicioAsignatura", "servicioUsuario", '$rootScope', 'trimestresConstante', '$ionicLoading', '$ionicActionSheet', '$timeout', '$ionicPopup', '$window', 'ionicToast', function ($ionicSideMenuDelegate, $scope, servicioGeneral, $state, servicioSecciones, servicioAsignatura, servicioUsuario, $rootScope, trimestresConstante, $ionicLoading, $ionicActionSheet, $timeout, $ionicPopup, $window, ionicToast) {

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

    bz.posts = function (datos) {
      servicioGeneral.timeline(datos).then(function (res) {
        bz.datos.posts = res.data;
      })
    }

    bz.morePosts = function () {
      datos = {
        id_usuario: bz.datos.user.id_usuario,
        offset: bz.datos.posts.length
      }
      servicioGeneral.timeline(datos).then(function (res) {
        if (res.data.length > 0) {
          res.data.forEach(function (element) {
            bz.datos.posts.push(element)
          }, this);
        }else{
          ionicToast.show('No hay publicaciones nuevas', 'top', false, 2500);
        }
      })
    }

    bz.listarAsignaturas = function (datos) {
      servicioAsignatura.getAll(datos).then(function (res) {
        bz.datos.asignaturas = res.data;
      });
    }

    bz.buscarSecciones = function (id) {
      datos = {
        id_asignatura: id,
        id_usuario: $rootScope.objectoCliente.id
      }
      servicioSecciones.getAll(datos).then(function (res) {
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

      })
    }

    bz.datosUsuario();

    // Actualizar Usuario

    bz.actualizarUsuario = function (datos) {
      servicioUsuario.update(datos).then(function (res) {
        bz.datos.user = res.data;
        ionicToast.show('Datos Actualizados', 'top', false, 2500);
      })
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

      })
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
