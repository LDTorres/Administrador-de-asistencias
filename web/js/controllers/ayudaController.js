angular.module('GATE')

  .controller('ayudaController', ['$scope', '$rootScope', '$stateParams', 'servicioDB', 'servicioSecciones', function ($scope, $rootScope, $stateParams, servicioDB, servicioSecciones) {
    var bz = this;

    bz.datos = {

      reportes: {}

    };

    bz.respaldar = function () {

      servicioDB.backup().then(function (res) {

        console.log(res);

      }).catch(function (res) {
        console.log(res);
      });

    }

    bz.restaurar = function (F) {
      console.log(F);
      servicioDB.restore(F).then(function (res) {
        console.log(res);
      }).catch(function (res) {
        console.log(res);
      })
    }

    bz.eliminar = function (index) {
      datos = {
        id: bz.datos.respaldos[index].id,
        filename: bz.datos.respaldos[index].filename
      }

      servicioDB.delete(datos).then(function (res) {
        console.log(res);
      }).catch(function (res) {
        console.log(res);
      })
    }

    servicioDB.backups().then(function (res) {
      bz.datos.respaldos = res.data;
    })

  }])
