angular.module('GATE')

  .controller('inicioController', ["$ionicSideMenuDelegate", "$scope", "servicioGeneral", "$state", "servicioSecciones", "servicioAsignatura", "servicioUsuario", '$rootScope', 'trimestresConstante', function ($ionicSideMenuDelegate, $scope, servicioGeneral, $state, servicioSecciones, servicioAsignatura, servicioUsuario, $rootScope, trimestresConstante) {

    var bz = this;

    console.log($rootScope.objectoCliente.token)

    bz.datos = {
      posts: [],
      listarAsignaturas: {},
      user: {},
      objectoCliente: $rootScope.objectoCliente,
      trimestres: trimestresConstante
    }

    bz.toggleLeft = function () {
      $ionicSideMenuDelegate.toggleLeft();
    };


    bz.posts = function (id) {
      servicioGeneral.timeline(id).then(function (res) {
        bz.datos.posts = res.data;
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

    bz.datosUsuario = function () {
      servicioUsuario.get(bz.datos.objectoCliente.id).then(function (res) {
        bz.datos.user = res.data;
        bz.datos.listarAsignaturas.id_malla = res.data.id_malla;
        bz.posts(bz.datos.user.id_usuario);

        servicioAsignatura.getMalla(res.data.id_malla).then(function (res) {
          bz.datos.user.malla = res.data.nombre;
        });

      }).catch(function (res) {
        console.log(res)
      });
    }

    bz.datosUsuario();

    bz.actualizarUsuario = function () {
      servicioUsuario.update(bz.datos.user).then(function (res) {
        bz.datos.user = res.data;
        bz.actualizado = 'Tus datos han sido actualizados';
        setTimeout(function () {
          bz.actualizado = '';
        }, 2000);
      }).catch(function (res) {
        console.log(res)

      });
    }

    bz.cerrarSesion = function () {
      servicioGeneral.salir();
      console.log('Sesion cerrada')
      $state.go('ingreso')
    }
  }])
