angular.module('GATE')

  .controller('inicioController', ["$scope", "servicioGeneral", "$state", "servicioSecciones", "servicioAsignatura", "servicioUsuario", '$rootScope', 'trimestresConstante', '$ionicLoading', '$timeout', '$ionicPopup', '$window', 'ionicToast','$ionicHistory', "$ionicSideMenuDelegate", function ($scope, servicioGeneral, $state, servicioSecciones, servicioAsignatura, servicioUsuario, $rootScope, trimestresConstante, $ionicLoading, $timeout, $ionicPopup, $window, ionicToast,$ionicHistory, $ionicSideMenuDelegate) {

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
      if ($rootScope.objectoCliente.tipo != 'Estudiante') {
        datos.tipo = $rootScope.objectoCliente.tipo;
      }
      servicioGeneral.timeline(datos).then(function (res) {
        bz.datos.posts = res.data;
      })
    }

    bz.morePosts = function () {

      var d = {
        id_usuario: bz.datos.user.id_usuario,
        offset: bz.datos.posts.length
      }

      if ($rootScope.objectoCliente.tipo != 'Estudiante') {
        datos.tipo = $rootScope.objectoCliente.tipo;
      }

      servicioGeneral.timeline(d).then(function (res) {
        if (res.data.length > 0) {
          res.data.forEach(function (element) {
            bz.datos.posts.push(element)
          }, this);
        } else {
          ionicToast.show('No hay más publicaciones', 'top', false, 2500);
        }
      })
    }

    bz.buscarSecciones = function () {

      bz.da = {
        id_usuario: $rootScope.objectoCliente.id
      }

      if (bz.datos.objectoCliente.tipo != 'Estudiante') {
        bz.da.tipo = 'Profesor';
      }

      servicioSecciones.getAll(bz.da).then(function (res) {
        if (res.data.length == 0) {
          ionicToast.show('No esta inscrito a ninguna sección', 'top', false, 2500);
          bz.datos.secciones = {};
        } else {
          bz.datos.secciones = res.data;
        }
      }).catch(function (res) {
        console.log(res)
        ionicToast.show('Revisa tu conexión a internet', 'top', false, 2500);
      });
    }

    $scope.$on('$ionicView.beforeEnter', function () {
      bz.tema = $rootScope.objectoCliente.preferencias.color_ui;
      bz.datos.preferencias = $rootScope.objectoCliente.preferencias;
      bz.datos.objectoCliente = $rootScope.objectoCliente;
      bz.buscarSecciones();
    });

  }])
