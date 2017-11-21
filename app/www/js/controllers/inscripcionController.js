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
        if(res.data.length == 0){
          ionicToast.show('No hay ninguna asignatura para ese trimestre', 'top', false, 2500);
        }else{
          bz.datos.asignaturas = res.data;
        }
      });
    }

    bz.crearSeccion = function () {
      bz.datos.crearSeccion.id_usuario = parseInt($rootScope.objectoCliente.id);

      $ionicLoading.show({
        template: 'Creando Nueva Seccion.',
      });

      servicioSecciones.add(bz.datos.crearSeccion).then(function (res) {
        $ionicLoading.hide().then(function(){
            ionicToast.show(res.data.msg, 'top', false, 2500);

            var confirmPopup = $ionicPopup.confirm({
              title: 'Se ha creado la seccion',
              template: 'Desea ir hasta allí?'
            });

            confirmPopup.then(function (res) {
              if (res) {
                $state.go('inicio/seccion',{id_seccion: res.data.params.insert_id});
              } else {}
            });
            bz.codigo = res.data.params.codigo;
        });
      }).catch(function (res) {
        console.log(res)
      });
    }

    bz.inscribirSeccion = function (datos) {
      datos.id_usuario = $rootScope.objectoCliente.id
      servicioSecciones.addMember(datos).then(function (res) {
        ionicToast.show(res.data.msg, 'top', false, 2500);
      });
    }

    bz.hideToast = function(){
      ionicToast.hide();
    };

  }])
