angular.module('GATE')

  .controller('ayudaController', ['$scope', '$rootScope', '$stateParams', 'servicioDB', 'servicioSecciones', function ($scope, $rootScope, $stateParams, servicioDB, servicioSecciones) {
    var bz = this;

    bz.datos = {

      reportes: {}

    };


    bz.listarReportes = function () {

      servicioSecciones.reports().then(function (res) {

        console.log(res);

        bz.datos.reportes = res.data;
        console.log(res.data);
      }).catch(function (res) {

        console.log(res);

      });

    }

    bz.respaldar = function () {

      servicioDB.backup().then(function (res) {
        swal('Se ha creado el archivo de respaldo de la base de datos! <3');
        console.log(res);

      }).catch(function (res) {
        console.log(res);
      });

    }

    bz.restaurar = function (F) {

      console.log(F);
      bz.datos.archivoRespaldo = {
        filename: F
      }
      servicioDB.restore(bz.datos.archivoRespaldo).then(function (res) {
        console.log(res);
        swal('Se ha restaurado la base de datos!');
      }).catch(function (res) {
        swal('Ha ocurrido un error!',
          'No se ha podido restaurar la base de datos',
          'warning'
        );
      });
    }

    bz.eliminar = function (index) {
      datos = {
        id: bz.datos.respaldos[index].id,
        filename: bz.datos.respaldos[index].filename
      }
      swal({
        title: '¿Esta seguro de eliminar el archivo?',
        text: "esta accion no puede revertirse!",
        type: 'warning',
        showCancelButton: true,
        cancelButtonText: 'Cancelar',
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, eliminar!'
      }).then((result) => {
        if (result.value) {

          servicioDB.delete(datos).then(function (res) {
            swal('Se ha eliminado el archivo exitosamente :)');
          }).catch(function (res) {
            swal('Ha ocurrido un error!',
              'No se ha podido eliminar el archivo de respaldo',
              'error'
            );
          })
        }
      });



    }


    bz.respaldos = function () {
      servicioDB.backups().then(function (res) {
        console.log(res);
        bz.datos.respaldos = res.data;
      }).catch(function (res) {
        console.log(res);
      })
    }

    bz.respaldos();
    bz.listarReportes();

  }])
