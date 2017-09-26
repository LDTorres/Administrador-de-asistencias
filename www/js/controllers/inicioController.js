angular.module('GATE')

  .controller('inicioController', ["$scope", "servicioGeneral", function ($scope, servicioGeneral) {
    var bz = this;

    bz.datos = {
      posts: [{
        titulo: 'Post 1',
        descripcion: 'Increible descripcion',
        nombre_archivo: 'archivo.pdf',
        fecha: '25/9/2017',
        foto_usuario: '../img/gravatar.jpg'
      }, {
        titulo: 'Post 2',
        descripcion: 'Increible descripcion',
        nombre_archivo: 'archivo.pdf',
        fecha: '27/9/2017',
        foto_usuario: '../img/gravatar.jpg'
      }, {
        titulo: 'Post 3',
        descripcion: 'Increible descripcion',
        nombre_archivo: 'archivo.pdf',
        fecha: '30/9/2017',
        foto_usuario: '../img/gravatar.jpg'
      }]
    }

    bz.posts = function () {
      servicioGeneral.timeline().then(function (res) {
        console.log(res)
      }).catch(function (res) {
        console.log(res)
      });
    }

    bz.posts();
  }])
