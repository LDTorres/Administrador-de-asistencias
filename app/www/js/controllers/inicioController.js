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

    bz.listarAsignaturas = function (datos) {
      servicioAsignatura.getAll(datos).then(function (res) {
        if (res.data.length == 0) {
          ionicToast.show('No hay ninguna asignatura para ese trimestre', 'top', false, 2500);
          bz.datos.asignaturas = {};
          bz.datos.secciones = {};
        } else {
          bz.datos.asignaturas = res.data;
        }
      }).catch(function (res) {
        console.log(res)
        ionicToast.show('Revisa tu conexión a internet', 'top', false, 2500);
      });
    }

    bz.buscarSecciones = function (d) {

      bz.da = {
        id_asignatura: d.asignaturaSeleccionada,
        id_usuario: $rootScope.objectoCliente.id
      }

      if (d.objectoCliente.tipo != 'Estudiante') {
        bz.da.tipo = 'Profesor';
      }

      servicioSecciones.getAll(bz.da).then(function (res) {
        if (res.data.length == 0) {
          ionicToast.show('No esta inscrito a ninguna sección de esa asignatura', 'top', false, 2500);
          bz.datos.secciones = {};
        } else {
          bz.datos.secciones = res.data;
        }
      }).catch(function (res) {
        console.log(res)
        ionicToast.show('Revisa tu conexión a internet', 'top', false, 2500);
      });
    }

    // Perdir los datos de un usuario

    bz.datosUsuario = function (id) {
      servicioUsuario.get(id).then(function (res) {

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
        ionicToast.show('Revisa tu conexión a internet', 'top', false, 2500);
      });
    }

    $scope.$on('$ionicView.beforeEnter', function () {
      bz.tema = $rootScope.objectoCliente.preferencias.color_ui;
      bz.datos.preferencias = $rootScope.objectoCliente.preferencias;
      bz.datos.objectoCliente = $rootScope.objectoCliente;
      bz.datosUsuario($rootScope.objectoCliente.id);
    });

    // Actualizar Usuario

    bz.actualizarUsuario = function (datos) {
      console.log(datos)
      servicioUsuario.update(datos).then(function (res) {
        bz.datos.user = res.data;

        console.log(res)
        ionicToast.show('Datos Actualizados', 'top', false, 2500);
      }).catch(function (res) {
        console.log(res)
        ionicToast.show('Revisa tu conexión a internet', 'top', false, 2500);
      });
    }


  }])
