angular.module('GATE')

  .controller('inicioController', ["$scope", "servicioGeneral", function ($scope, servicioGeneral) {
    var bz = this;

    bz.datos = {
      posts: []
    }

    bz.posts = function () {
      servicioGeneral.timeline(1).then(function (res) {
        console.log(res.data[0]);
        bz.datos.posts = res.data[0];
      }).catch(function (res) {
        console.log(res)
      });
    }

    bz.posts();

  }])
