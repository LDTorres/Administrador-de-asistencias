angular.module('GATE')

  .controller('inicioController', ["$scope", "servicioGeneral", "$state", "servicioSecciones", "servicioAsignatura", "servicioUsuario", function ($scope, servicioGeneral, $state, servicioSecciones, servicioAsignatura, servicioUsuario) {
    var bz = this;

    bz.datos = {
      posts: [],
      listarAsignaturas: {
        id_malla: 1
      },
      crearSeccion: {},
      user: {
        id_usuario: 1,
        foto_perfil: 'grabatar.jpg',
        nombre_completo: 'Luis',
        cedula: 25659843,
        malla: 'Informatica',
        telefono: 04128594981,
        usuario: 'Luis',
        correo: 'luisdtc2696.gmail.com',
        contrasena: '12345678'
      },
      trimestres: [{
        id_trimestre: 1
      }, {
        id_trimestre: 2
      }, {
        id_trimestre: 3
      }, {
        id_trimestre: 4
      }, {
        id_trimestre: 5
      }, {
        id_trimestre: 6
      }, {
        id_trimestre: 7
      }, {
        id_trimestre: 8
      }, {
        id_trimestre: 9
      }, {
        id_trimestre: 10
      }, {
        id_trimestre: 11
      }, {
        id_trimestre: 12
      }]
    }

    bz.posts = function () {
      servicioGeneral.timeline(1).then(function (res) {
        bz.datos.posts = res.data[0];
      }).catch(function (res) {
        console.log(res)
      });
    }

    bz.posts();

    bz.listarAsignaturas = function (datos) {
      servicioAsignatura.getAll(datos).then(function (res) {
        bz.datos.asignaturas = res.data;
      });
    }

    bz.buscarSecciones = function (id) {
      servicioSecciones.getAll(id).then(function (res) {
        bz.datos.secciones = res.data;
      });
    }

    bz.irSeccion = function (id) {
      $state.go('inicio/seccion', {
        id_seccion: id
      });
    }

    bz.actualizarUsuario = function () {
      servicioUsuario.update(bz.datos.user).then(function (res) {
        bz.datos.user = res.data;
        bz.actualizado = 'Tus datos han sido actualizados';
      }).catch(function (res) {
        console.log(res)
      });
    }
  }])
