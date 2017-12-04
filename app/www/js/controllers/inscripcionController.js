angular.module('GATE')

  .controller('inscripcionController', ["$scope", "servicioGeneral", "$state", "servicioSecciones", "servicioAsignatura", "trimestresConstante", "$rootScope", "ionicToast", "$ionicLoading", "$ionicPopup", function ($scope, servicioGeneral, $state, servicioSecciones, servicioAsignatura, trimestresConstante, $rootScope, ionicToast, $ionicLoading, $ionicPopup) {
    var bz = this;

    bz.datos = {
      listarAsignaturas: {},
      trimestres: trimestresConstante,
      crearSeccion: {
        id_asignatura: 0,
        nombre: ''
      },
      inscribirSeccion: {}
    }
    bz.tema = $rootScope.objectoCliente.preferencias.color_ui;
    bz.datos.objeto = $rootScope.objectoCliente;
    bz.datos.listarAsignaturas.id_malla = $rootScope.objectoCliente.id_malla;

    bz.listarAsignaturas = function (datos) {
      servicioAsignatura.getAll(datos).then(function (res) {
        if (res.data.length == 0) {
          ionicToast.show('No hay ninguna asignatura para ese trimestre', 'top', false, 2500);
        } else {
          bz.datos.asignaturas = res.data;
        }
      });
    }

    bz.crearSeccion = function () {
      bz.datos.crearSeccion.id_usuario = parseInt($rootScope.objectoCliente.id);

      $ionicLoading.show({
        template: 'Creando Nueva Sección.',
      });

      servicioSecciones.add(bz.datos.crearSeccion).then(function (res) {
        $ionicLoading.hide().then(function () {
          ionicToast.show(res.data.msg, 'top', false, 2500);
          if (res.data.params) {

            bz.codigo = res.data.params.codigo;

            bz.copiarSeleccionado(bz.codigo);

            var confirmPopup = $ionicPopup.confirm({
              title: 'Se ha creado la sección',
              template: 'Desea ir hasta allí?'
            });

            var id_seccion = res.data.params.insert_id;

            confirmPopup.then(function (res) {
              if (res) {

                $state.go('app.inicio/seccion', {
                  id_seccion: id_seccion
                });

              } else {
                ionicToast.show('El código de la sección se ha copiado en portapapeles', 'top', false, 2500);
              }
            });

          }
        });
      }).catch(function (res) {
        console.log(res)
      });
    }

    bz.copiarSeleccionado = function (texto) {
      var aux = document.createElement("input");
      aux.setAttribute("value", texto);
      document.body.appendChild(aux);
      aux.select();
      document.execCommand("copy");
      document.body.removeChild(aux);
      ionicToast.show('Código Copiado!', 'top', false, 2500);
    }

    bz.inscribirSeccion = function (datos) {
      datos.id_usuario = $rootScope.objectoCliente.id
      servicioSecciones.addMember(datos).then(function (res) {
        ionicToast.show(res.data.msg, 'top', false, 2500);
        if (res.data.msg == 'Registro Exitoso!') {

          var confirmPopup = $ionicPopup.confirm({
            title: 'Te has registrado en la sección ' + res.data.nombre,
            template: 'Deseas visitarla?'
          });

          var id_seccion = res.data.id_seccion;

          confirmPopup.then(function (res) {
            if (res) {
              $state.go('app.inicio/seccion', {
                id_seccion: id_seccion
              });
            } else {}
          });
        }
      });
    }

    bz.hideToast = function () {
      ionicToast.hide();
    };

  }])
