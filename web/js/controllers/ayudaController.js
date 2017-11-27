angular.module('GATE')

  .controller('ayudaController', ['$scope', '$rootScope', '$stateParams', 'servicioDB', function ($scope, $rootScope, $stateParams, servicioDB) {
    var bz = this;

    bz.datos = {

    };


    bz.restaurar = function (F) {

      servicioDB.restore(F).then(function (res) {
        console.log(res)
      }).catch(function (res) {
        console.log(res)
      })
    }

    bz.eliminar = function (index) {
      datos = {
        id: bz.datos.respaldos[index].id,
        filename: bz.datos.respaldos[index].filename
      }

      servicioDB.delete(datos).then(function (res) {
        console.log(res)
      }).catch(function (res) {
        console.log(res)
      })
    }


    bz.respaldos = function () {
      servicioDB.backups().then(function (res) {
        console.log(res)
        bz.datos.respaldos = res.data;
      }).catch(function (res) {
        console.log(res)
      })
    }

    bz.respaldos();

  }])
