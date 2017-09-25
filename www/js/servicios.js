angular.module('GATE')

  .constant("ruta", "http://localhost:3454")
  /* INGRESAR */

  .service("servicioGeneral", ["$http", "$q", "ruta", function ($http, $q, ruta) {

    // Espera por parametro {usuario | correo, contrasena}
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
    // Cierra la session
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
    // Espera por parametro {usuario, contrasena, nombre_completo, cedula, correo, telefono, id_malla}
    this.registrar = function (datos) {
      /* Declaramos una promesa */
      var defered = $q.defer();
      var promise = defered.promise;

      $http.post(ruta + '/singup', datos).then(function (res) {

        /* Si el valor fue devuelto */
        defered.resolve(res);

      }).catch(function (res) {

        /* Si hubo algun error */
        defered.reject(res);
      })
      return promise;
    }
    // Devuelve la informacion de la aplicacion
    this.app = function () {
      /* Declaramos una promesa */
      var defered = $q.defer();
      var promise = defered.promise;

      $http.get(ruta + '/app').then(function (res) {

        /* Si el valor fue devuelto */
        defered.resolve(res);

      }).catch(function (res) {

        /* Si hubo algun error */
        defered.reject(res);
      })
      return promise;
    };
  }])

  // USUARIOS

  .service("servicioUsuario", ["$http", "$q", "ruta", "Upload", function ($http, $q, ruta, Upload) {

    // Colocamos la imagen de perfil
    this.setPicture = function (datos) {

      var defered = $q.defer();
      var promise = defered.promise;

      /* Ver si se envia el archivo 
      console.log(datos)
      */

      Upload.upload({
        url: ruta + '/user/picture',
        method: 'POST',
        file: {
          archivo: datos.archivo
        },
        data: datos
      }).then(function (res) {

        defered.resolve(res);

      }).catch(function (res) {

        defered.reject(res);

      })
      return promise;

    }

    // Espera un id de usuario y opcionalmente la accion
    this.estado = function (datos) {
      var defered = $q.defer();
      var promise = defered.promise;

      if (datos.accion) {
        var rutaCompleta = '/status/' + id + '/' + accion;
      }

      var rutaCompleta = '/status/' + id;

      $http.get(ruta + rutaCompleta).then(function (res) {

        /* Si el valor fue devuelto */
        defered.resolve(res);

      }).catch(function (res) {

        /* Si hubo algun error */
        defered.reject(res);
      })
      return promise;
    }

    // Espera como parametro {contrasena, nombre_completo, telefono}
    this.update = function (datos) {
      /* Declaramos una promesa */
      var defered = $q.defer();
      var promise = defered.promise;

      $http.post(ruta + '/user/update', datos).then(function (res) {

        /* Si el valor fue devuelto */
        defered.resolve(res);

      }).catch(function (res) {

        /* Si hubo algun error */
        defered.reject(res);
      })
      return promise;
    }

  }])

  .service("servicioSecciones", ["$http", "$q", "ruta", "Upload", function ($http, $q, ruta, Upload) {

    // Espera como parametro {id_asignatura}
    this.getAll = function (id) {
      /* Declaramos una promesa */
      var defered = $q.defer();
      var promise = defered.promise;

      $http.get(ruta + '/seccion/all/' + id).then(function (res) {

        /* Si el valor fue devuelto */
        defered.resolve(res);

      }).catch(function (res) {

        /* Si hubo algun error */
        defered.reject(res);
      })
      return promise;
    }

    // Espera como parametro {id_seccion, id_profesor}
    this.get = function (datos) {
      /* Declaramos una promesa */
      var defered = $q.defer();
      var promise = defered.promise;

      $http.get(ruta + '/seccion/' + datos.id + '/' + datos.idProfesor).then(function (res) {

        /* Si el valor fue devuelto */
        defered.resolve(res);

      }).catch(function (res) {

        /* Si hubo algun error */
        defered.reject(res);
      })
      return promise;
    }

    // Espera como parametro {id_seccion, id_profesor}
    this.add = function (datos) {
      /* Declaramos una promesa */
      var defered = $q.defer();
      var promise = defered.promise;

      $http.post(ruta + '/seccion/add', datos).then(function (res) {

        /* Si el valor fue devuelto */
        defered.resolve(res);

      }).catch(function (res) {

        /* Si hubo algun error */
        defered.reject(res);
      })
      return promise;
    }

    // Espera como parametro {nombre, id_seccion}
    this.update = function (datos) {
      /* Declaramos una promesa */
      var defered = $q.defer();
      var promise = defered.promise;

      $http.post(ruta + '/seccion/update', datos).then(function (res) {

        /* Si el valor fue devuelto */
        defered.resolve(res);

      }).catch(function (res) {

        /* Si hubo algun error */
        defered.reject(res);
      })
      return promise;
    }

    // Miembros

    // Espera como parametro {id_seccion}

    this.getMembers = function (id) {
      /* Declaramos una promesa */
      var defered = $q.defer();
      var promise = defered.promise;

      $http.get(ruta + '/seccion/members/' + id).then(function (res) {

        /* Si el valor fue devuelto */
        defered.resolve(res);

      }).catch(function (res) {

        /* Si hubo algun error */
        defered.reject(res);
      })
      return promise;
    }

    // Espera como parametro {id_usuario}

    this.getMember = function (id) {
      /* Declaramos una promesa */
      var defered = $q.defer();
      var promise = defered.promise;

      $http.get(ruta + '/seccion/member/' + id).then(function (res) {

        /* Si el valor fue devuelto */
        defered.resolve(res);

      }).catch(function (res) {

        /* Si hubo algun error */
        defered.reject(res);
      })
      return promise;
    }

    // Espera como parametro {id_usuario}

    this.deleteMember = function (id) {
      /* Declaramos una promesa */
      var defered = $q.defer();
      var promise = defered.promise;

      $http.get(ruta + '/seccion/member/delete/' + id).then(function (res) {

        /* Si el valor fue devuelto */
        defered.resolve(res);

      }).catch(function (res) {

        /* Si hubo algun error */
        defered.reject(res);
      })
      return promise;
    }

    // Espera como parametro {id_usuario, id_seccion, accion}

    this.statusMember = function (datos) {
      /* Declaramos una promesa */
      var defered = $q.defer();
      var promise = defered.promise;

      $http.post(ruta + '/seccion/member/status', datos).then(function (res) {

        /* Si el valor fue devuelto */
        defered.resolve(res);

      }).catch(function (res) {

        /* Si hubo algun error */
        defered.reject(res);
      })
      return promise;
    }

    //POSTS

    // Espera como parametro {id_seccion, offset}

    this.getPosts = function (datos) {
      /* Declaramos una promesa */
      var defered = $q.defer();
      var promise = defered.promise;

      $http.post(ruta + '/seccion/posts', datos).then(function (res) {

        /* Si el valor fue devuelto */
        defered.resolve(res);

      }).catch(function (res) {

        /* Si hubo algun error */
        defered.reject(res);
      })
      return promise;
    }

    // Espera como parametro {id_publicacion, id_seccion, id_usuario}

    this.getPost = function (datos) {
      /* Declaramos una promesa */
      var defered = $q.defer();
      var promise = defered.promise;

      $http.post(ruta + '/seccion/post/get', datos).then(function (res) {

        /* Si el valor fue devuelto */
        defered.resolve(res);

      }).catch(function (res) {

        /* Si hubo algun error */
        defered.reject(res);
      })
      return promise;
    }

    // Espera como parametro {titulo, descripcion, id_seccion, id_usuario, nombre_archivo}

    this.addPost = function (datos) {
      var defered = $q.defer();
      var promise = defered.promise;

      /* Ver si se envia el archivo 
      console.log(datos)
      */

      Upload.upload({
        url: ruta + '/seccion/post/add',
        method: 'POST',
        file: {
          archivo: datos.archivo
        },
        data: datos
      }).then(function (res) {

        defered.resolve(res);

      }).catch(function (res) {

        defered.reject(res);

      })
      return promise;

    }

    // Espera como parametro {titulo, descripcion, nombre_archivo, id_publicacion, id_seccion, id_usuario}

    this.updatePost = function (datos) {
      var defered = $q.defer();
      var promise = defered.promise;

      /* Ver si se envia el archivo 
      console.log(datos)
      */

      Upload.upload({
        url: ruta + '/seccion/post/update',
        method: 'POST',
        file: {
          archivo: datos.archivo
        },
        data: datos
      }).then(function (res) {

        defered.resolve(res);

      }).catch(function (res) {

        defered.reject(res);

      })
      return promise;

    }

    // Espera como parametro {id_publicacion, id_seccion, id_usuario}

    this.deletePost = function (datos) {
      /* Declaramos una promesa */
      var defered = $q.defer();
      var promise = defered.promise;

      $http.post(ruta + '/seccion/post/delete', datos).then(function (res) {

        /* Si el valor fue devuelto */
        defered.resolve(res);

      }).catch(function (res) {

        /* Si hubo algun error */
        defered.reject(res);
      })
      return promise;
    }

    // ASISTENCIAS

    // Espera como parametro {id_seccion, id_usuario, fecha, asistio}

    this.setAsistence = function (datos) {
      /* Declaramos una promesa */
      var defered = $q.defer();
      var promise = defered.promise;

      $http.post(ruta + '/seccion/asistencia', datos).then(function (res) {

        /* Si el valor fue devuelto */
        defered.resolve(res);

      }).catch(function (res) {

        /* Si hubo algun error */
        defered.reject(res);
      })
      return promise;
    }

    // Espera como parametro {id_seccion, fecha}

    this.getAsistence = function (datos) {
      /* Declaramos una promesa */
      var defered = $q.defer();
      var promise = defered.promise;

      $http.post(ruta + '/seccion/asistencia/get', datos).then(function (res) {

        /* Si el valor fue devuelto */
        defered.resolve(res);

      }).catch(function (res) {

        /* Si hubo algun error */
        defered.reject(res);
      })
      return promise;
    }

    // Espera como parametro {id_usuario, fecha, aistio}

    this.updateAsistence = function (datos) {
      /* Declaramos una promesa */
      var defered = $q.defer();
      var promise = defered.promise;

      $http.post(ruta + '/seccion/asistencia/update', datos).then(function (res) {

        /* Si el valor fue devuelto */
        defered.resolve(res);

      }).catch(function (res) {

        /* Si hubo algun error */
        defered.reject(res);
      })
      return promise;
    }

    // Espera como parametro {id_seccion, desde, hasta}

    this.report = function (datos) {
      /* Declaramos una promesa */
      var defered = $q.defer();
      var promise = defered.promise;

      $http.post(ruta + '/seccion/reporte', datos).then(function (res) {

        /* Si el valor fue devuelto */
        defered.resolve(res);

      }).catch(function (res) {

        /* Si hubo algun error */
        defered.reject(res);
      })
      return promise;
    }

  }]);
