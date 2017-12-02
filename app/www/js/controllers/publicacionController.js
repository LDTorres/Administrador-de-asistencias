angular.module('GATE')

  .controller('publicacionController', function ($scope, $stateParams, servicioSecciones, $rootScope, $state, servicioGeneral, ionicToast, $ionicHistory, $ionicLoading) {

    var bz = this;

    bz.datos = {
      nuevoPost: $stateParams.datos,
      modificarPost: $stateParams.datos,
      miembros: $stateParams.datos.miembros
    };
    bz.tema = $rootScope.objectoCliente.preferencias.color_ui;
    bz.nuevoPost = function (datos) {
      $ionicLoading.show({
        template: 'Creando Nueva Publicación',
      });
      servicioSecciones.addPost(datos).then(function (res) {

        bz.datosEmail = {
          descripcion: datos.descripcion,
          subject: 'Nueva Publicación',
          profesor: $rootScope.objectoCliente.nombre_completo,
          nombre_publicacion: datos.titulo,
          miembros_correos: []
        }

        $stateParams.datos.miembros.forEach(function (element) {
          bz.datosEmail.miembros_correos.push(element.correo)
        }, this);

        ionicToast.show(res.data.msg, 'top', false, 2500);

        $ionicLoading.hide().then(function () {
          $state.go('app.inicio/seccion', {
            id_seccion: $stateParams.datos.id_seccion
          });
        });
      }).catch(function (res) {
        console.log(res)
      });
    }

    bz.modificarPost = function (datos) {
      servicioSecciones.updatePost(datos).then(function (res) {
        ionicToast.show(res.data.msg, 'top', false, 2500);
        $ionicHistory.clearCache().then(function () {
          $state.go('app.inicio/seccion', {
            id_seccion: $stateParams.datos.id_seccion
          });
        });
      }).catch(function (res) {
        console.log(res)
      });
    }

    bz.eliminarPost = function () {
      servicioSecciones.deletePost($stateParams.datos).then(function (res) {
        ionicToast.show(res.data.msg, 'top', false, 2500);
        $ionicHistory.clearCache().then(function () {
          $state.go('app.inicio/seccion', {
            id_seccion: $stateParams.datos.id_seccion
          });
        });
      }).catch(function (res) {
        console.log(res)
      });
    }

  })
