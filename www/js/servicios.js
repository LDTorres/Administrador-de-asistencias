angular.module('GATE')
  /* INGRESAR */

  .service("ingresarService", ["$http", "$q", function ($http, $q) {
    var ruta = 'http://localhost:3454';
    this.ingresar = function (datos) {
      /* Declaramos una promesa */
      var defered = $q.defer();
      var promise = defered.promise;

      $http.post(ruta + '/login', datos).then(function (res) {
        /* Si el valor fue devuelto */
        defered.resolve(res);

      }).catch(function (res) {

        /* Si hubo algun error */
        defered.reject(res);
      })
      return promise;
    }

    this.salir = function () {
      /* Declaramos una promesa */
      var defered = $q.defer();
      var promise = defered.promise;

      $http.get(ruta + '/logout').then(function (res) {

        /* Si el valor fue devuelto */
        defered.resolve(res);

      }).catch(function (res) {

        /* Si hubo algun error */
        defered.reject(res);
      })
      return promise;
    }

    this.registrar = function (datos) {
      /* Declaramos una promesa */
      var defered = $q.defer();
      var promise = defered.promise;

      $http.post(ruta + '/registro', datos).then(function (res) {

        /* Si el valor fue devuelto */
        defered.resolve(res);

      }).catch(function (res) {

        /* Si hubo algun error */
        defered.reject(res);
      })
      return promise;
    }
  }])

  /* USUARIOS */

  .service("usuariosService", ["$http", "$q", function ($http, $q) {

    /* Alumnos */

    this.listarAlumnos = function () {
      /* Declaramos una promesa */
      var defered = $q.defer();
      var promise = defered.promise;

      $http.get('ruta').then(function (res) {

        /* Si el valor fue devuelto */
        defered.resolve(res);

      }).catch(function (res) {

        /* Si hubo algun error */
        defered.reject(res);
      })
      return promise;
    }

    this.obtenerAlumno = function () {
      /* Declaramos una promesa */
      var defered = $q.defer();
      var promise = defered.promise;

      $http.get('ruta').then(function (res) {

        /* Si el valor fue devuelto */
        defered.resolve(res);

      }).catch(function (res) {

        /* Si hubo algun error */
        defered.reject(res);
      })
      return promise;
    }

    /* Profesores */

    this.listarProfesores = function () {
      /* Declaramos una promesa */
      var defered = $q.defer();
      var promise = defered.promise;

      $http.get('ruta').then(function (res) {

        /* Si el valor fue devuelto */
        defered.resolve(res);

      }).catch(function (res) {

        /* Si hubo algun error */
        defered.reject(res);
      })
      return promise;
    }

    this.obtenerProfesor = function () {
      /* Declaramos una promesa */
      var defered = $q.defer();
      var promise = defered.promise;

      $http.get('ruta').then(function (res) {

        /* Si el valor fue devuelto */
        defered.resolve(res);

      }).catch(function (res) {

        /* Si hubo algun error */
        defered.reject(res);
      })
      return promise;
    }

    /* GENERALES */

    this.usuarioPerfil = function () {
      /* Declaramos una promesa */
      var defered = $q.defer();
      var promise = defered.promise;

      $http.get('ruta').then(function (res) {

        /* Si el valor fue devuelto */
        defered.resolve(res);

      }).catch(function (res) {

        /* Si hubo algun error */
        defered.reject(res);
      })
      return promise;
    }

    this.usuarioModificar = function () {
      /* Declaramos una promesa */
      var defered = $q.defer();
      var promise = defered.promise;

      $http.get('ruta').then(function (res) {

        /* Si el valor fue devuelto */
        defered.resolve(res);

      }).catch(function (res) {

        /* Si hubo algun error */
        defered.reject(res);
      })
      return promise;
    }

    this.usuarioBaja = function () {
      /* Declaramos una promesa */
      var defered = $q.defer();
      var promise = defered.promise;

      $http.get('ruta').then(function (res) {

        /* Si el valor fue devuelto */
        defered.resolve(res);

      }).catch(function (res) {

        /* Si hubo algun error */
        defered.reject(res);
      })
      return promise;
    }

  }])

  /* Programas de formacion */

  .service("mallaService", ["$http", "$q", function ($http, $q) {

    this.listarPnf = function () {
      /* Declaramos una promesa */
      var defered = $q.defer();
      var promise = defered.promise;

      $http.get('ruta').then(function (res) {

        /* Si el valor fue devuelto */
        defered.resolve(res);

      }).catch(function (res) {

        /* Si hubo algun error */
        defered.reject(res);
      })
      return promise;
    }

    this.listarMaterias = function () {
      /* Declaramos una promesa */
      var defered = $q.defer();
      var promise = defered.promise;

      $http.get('ruta').then(function (res) {

        /* Si el valor fue devuelto */
        defered.resolve(res);

      }).catch(function (res) {

        /* Si hubo algun error */
        defered.reject(res);
      })
      return promise;
    }

    /* Secciones */

    this.listarSecciones = function () {
      /* Declaramos una promesa */
      var defered = $q.defer();
      var promise = defered.promise;

      $http.get('ruta').then(function (res) {

        /* Si el valor fue devuelto */
        defered.resolve(res);

      }).catch(function (res) {

        /* Si hubo algun error */
        defered.reject(res);
      })
      return promise;
    }

    this.crearSeccion = function () {
      /* Declaramos una promesa */
      var defered = $q.defer();
      var promise = defered.promise;

      $http.get('ruta').then(function (res) {

        /* Si el valor fue devuelto */
        defered.resolve(res);

      }).catch(function (res) {

        /* Si hubo algun error */
        defered.reject(res);
      })
      return promise;
    }

    this.modificarSeccion = function () {
      /* Declaramos una promesa */
      var defered = $q.defer();
      var promise = defered.promise;

      $http.get('ruta').then(function (res) {

        /* Si el valor fue devuelto */
        defered.resolve(res);

      }).catch(function (res) {

        /* Si hubo algun error */
        defered.reject(res);
      })
      return promise;
    }

    this.usuariosSeccion = function () {
      /* Declaramos una promesa */
      var defered = $q.defer();
      var promise = defered.promise;

      $http.get('ruta').then(function (res) {

        /* Si el valor fue devuelto */
        defered.resolve(res);

      }).catch(function (res) {

        /* Si hubo algun error */
        defered.reject(res);
      })
      return promise;
    }

    this.eliminarAlumnoSeccion = function () {
      /* Declaramos una promesa */
      var defered = $q.defer();
      var promise = defered.promise;

      $http.get('ruta').then(function (res) {

        /* Si el valor fue devuelto */
        defered.resolve(res);

      }).catch(function (res) {

        /* Si hubo algun error */
        defered.reject(res);
      })
      return promise;
    }

  }])

  /* Info App */

  .service("infoAppService", ["$http", "$q", function ($http, $q) {

    this.informacionApp = function () {
      /* Declaramos una promesa */
      var defered = $q.defer();
      var promise = defered.promise;

      $http.get('ruta').then(function (res) {

        /* Si el valor fue devuelto */
        defered.resolve(res);

      }).catch(function (res) {

        /* Si hubo algun error */
        defered.reject(res);
      })
      return promise;
    }

  }]);
