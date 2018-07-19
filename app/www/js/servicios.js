angular.module('GATE')

  // Para probarlo desde el movil http://192.168.1.{tu-puerto}/api/public  
  // Desde windows http://localhost:3454

  .constant("ruta", "http://192.168.1.6/api/public")

  .constant("trimestresConstante", [{
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
  }])

  .constant("constanteTutorial", [{
    title: 'Gracias por usar nuestra aplicación!',
  }, {
    description: 'Paso a paso te iremos mostrando el funcionamiento de la app'
  }, {
    title: 'Inicio',
    description: 'Al momento que tu profesor te de el código de sección debes ir al apartado de asignaturas y presionar el boton de inscripción. Te llevará a un formulario donde colocaras el código y ya esta!.'
  }, {
    title: 'Inicio',
    description: 'Puedes dejar que la app te lleve a tu sección o puedes buscarla luego, desde el mismo apartado seleccionando trimestre, asignatura y por último tu sección.'
  }, {
    description: 'Allí veras las publicaciones que tu profesor ha hecho, tambien podrás consultar tus asistencias de clases.'
  }, {
    title: 'Tus datos y preferencias!',
    description: ''
  }, {
    title: 'Perfil',
    description: 'En el apartado de perfil, podrás ver tus datos, modificarlos y guardarlos persionando el botón guardar.'
  },{
    title: 'Esperamos que sigas utilizando la App para tus estudios!'
  }, {
    title: 'Si aun no lo tienes!',
    description: 'En la seccion de ayuda esta el boton, manual de usuarios descargalo y listo.'
  }])

  .factory('LS', ['$window', '$rootScope', function ($window, $rootScope) {
    return {
      definir: function (llave, valor) {
        $window.localStorage.setItem(llave, JSON.stringify(valor));
        return this;
      },
      obtener: function (llave) {
        return $window.localStorage.getItem(llave);
      }
    };

  }])

  /* INGRESAR */

  .service("servicioGeneral", ["$http", "$q", "ruta", "$rootScope", "$window", "$ionicHistory", function ($http, $q, ruta, $rootScope, $window, $ionicHistory) {

    // Espera por parametro {usuario | correo, contrasena}
    this.ingresar = function (datos) {

      var defered = $q.defer();
      var promise = defered.promise;

      $http.post(ruta + '/login', datos).then(function (res) {

        $window.localStorage.setItem('token', angular.toJson(res.data));
        $rootScope.objectoCliente = res.data;
        defered.resolve(res);

      }).catch(function (res) {
        $window.localStorage.removeItem('token');
        delete $rootScope.objectoCliente;
        defered.reject(res);
      });

      return promise;
    };

    this.salir = function () {
      $window.localStorage.removeItem('token');
      delete $rootScope.objectoCliente;
    };

    // Espera por parametro {usuario, contrasena, nombre_completo, cedula, correo, telefono, id_malla}
    this.registrar = function (datos) {

      var defered = $q.defer();
      var promise = defered.promise;

      $http.post(ruta + '/singup', datos).then(function (res) {
        if (res.data.datos) {
          $window.localStorage.setItem('token', angular.toJson(res.data.datos));
          $rootScope.objectoCliente = res.data.datos;
        }
        defered.resolve(res);
      }).catch(function (res) {

        defered.reject(res);
      });
      return promise;

    };

    this.autorizado = function () {

      if ($rootScope.objectoCliente) {

        return $rootScope.objectoCliente;

      } else {

        if ($window.localStorage.getItem('token')) {

          $rootScope.objectoCliente = angular.fromJson($window.localStorage.getItem('token'));

          return $rootScope.objectoCliente;

        } else {

          return false;

        }

      }

    };

    // Devuelve la informacion de la aplicacion
    this.app = function () {

      var defered = $q.defer();
      var promise = defered.promise;

      $http.get(ruta + '/json').then(function (res) {
        defered.resolve(res.data);
      });
      return promise;
    };

    // Espera como parametro {id_usuario, offset}

    this.timeline = function (datos) {

      var defered = $q.defer();
      var promise = defered.promise;

      $http.post(ruta + '/seccion/posts/timeline', datos).then(function (res) {

        defered.resolve(res);

      }).catch(function (res) {


        defered.reject(res);

      });
      return promise;
    };

    this.forgotPass = function (datos) {

      var defered = $q.defer();
      var promise = defered.promise;

      $http.post(ruta + '/forgotPass', datos).then(function (res) {
        defered.resolve(res);
      }).catch(function (res) {
        defered.reject(res);
      });
      return promise;
    };

    // Espera como parametro {id_usuario, offset}

    this.newUserMail = function (datos) {

      var defered = $q.defer();
      var promise = defered.promise;

      $http.post(ruta + '/mail/newUser', datos).then(function (res) {


        defered.resolve(res);

      }).catch(function (res) {


        defered.reject(res);

      });
      return promise;
    };

  }])

  /* USUARIOS */

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

      });
      return promise;
    };

    // Espera como parametro {id_usuario, contrasena, nombre_completo, telefono, cedula}
    this.update = function (datos) {

      var defered = $q.defer();
      var promise = defered.promise;

      $http.post(ruta + '/user/update', datos).then(function (res) {


        defered.resolve(res);

      }).catch(function (res) {


        defered.reject(res);
      });
      return promise;
    };

    // Espera como parametro {id_usuario}
    this.updatePreferences = function (datos) {

      var defered = $q.defer();
      var promise = defered.promise;

      $http.post(ruta + '/user/setPrefencias', datos).then(function (res) {

        defered.resolve(res);

      }).catch(function (res) {


        defered.reject(res);
      });

      return promise;
    };

    /* Espera como parametro {tipo de ususario, por defecto es ESTUDIANTE} */

    this.getAll = function (datos) {

      var defered = $q.defer();
      var promise = defered.promise;

      $http.get(ruta + '/user/all/' + datos).then(function (res) {


        defered.resolve(res);

      }).catch(function (res) {


        defered.reject(res);
      });
      return promise;
    };

    /* Espera como parametro {id del usuario} */

    this.get = function (datos) {

      var defered = $q.defer();
      var promise = defered.promise;

      $http.get(ruta + '/user/' + datos).then(function (res) {


        defered.resolve(res);

      }).catch(function (res) {


        defered.reject(res);
      });
      return promise;
    };

  }])

  /* ASIGNATURAS */

  .service("servicioAsignatura", ["$http", "$q", "ruta", function ($http, $q, ruta) {

    this.getMalla = function (id) {

      var defered = $q.defer();
      var promise = defered.promise;

      $http.get(ruta + '/pnf/get/' + id).then(function (res) {

        defered.resolve(res);

      }).catch(function (res) {


        defered.reject(res);
      });
      return promise;
    };

    /* Esperan el id de todas las asignaturas */

    this.getAll = function (datos) {

      var defered = $q.defer();
      var promise = defered.promise;

      $http.get(ruta + '/asignatura/all/' + datos.id_malla + '/' + datos.id_trimestre).then(function (res) {


        defered.resolve(res);

      }).catch(function (res) {


        defered.reject(res);
      });
      return promise;
    };

    /* Esperan el id, trimestre y opcionalmente el pnf */

    this.get = function (datos) {

      var defered = $q.defer();
      var promise = defered.promise;

      $http.get(ruta + '/asignatura/' + datos.id_malla + '/' + datos.id_trimestre).then(function (res) {


        defered.resolve(res);

      }).catch(function (res) {


        defered.reject(res);
      });
      return promise;
    };

    /* Se añadiran nombre, trimestre, id_malla */

    this.add = function (datos) {

      var defered = $q.defer();
      var promise = defered.promise;

      $http.post(ruta + '/asignatura/add', datos).then(function (res) {


        defered.resolve(res);

      }).catch(function (res) {


        defered.reject(res);
      });
      return promise;
    };

    /* Se actualizaran nombre dentro de una id_malla y trimestre */
    this.update = function (datos) {

      var defered = $q.defer();
      var promise = defered.promise;

      $http.post(ruta + '/asignatura/update', datos).then(function (res) {


        defered.resolve(res);

      }).catch(function (res) {


        defered.reject(res);
      });
      return promise;
    };
  }])

  /* SECCIONES */

  .service("servicioSecciones", ["$http", "$q", "ruta", "Upload", function ($http, $q, ruta, Upload) {

    // Espera como parametro {id_seccion, fecha}

    this.getInfo = function (datos) {

      var defered = $q.defer();
      var promise = defered.promise;

      $http.post(ruta + '/seccion/getInfo', datos).then(function (res) {


        defered.resolve(res);

      }).catch(function (res) {


        defered.reject(res);
      });
      return promise;
    };

    // Espera como parametro {id_asignatura}
    this.getAll = function (datos) {

      var defered = $q.defer();
      var promise = defered.promise;

      $http.post(ruta + '/seccion/all', datos).then(function (res) {

        defered.resolve(res);

      }).catch(function (res) {

        defered.reject(res);

      });
      return promise;
    };

    // Espera como parametro {id_seccion, id_profesor}
    this.get = function (datos) {

      var defered = $q.defer();
      var promise = defered.promise;

      $http.get(ruta + '/seccion/' + datos.id + '/' + datos.idProfesor).then(function (res) {

        defered.resolve(res);

      }).catch(function (res) {

        defered.reject(res);

      });
      return promise;
    };

    // Espera como parametro {id_seccion, id_profesor}
    this.add = function (datos) {

      var defered = $q.defer();
      var promise = defered.promise;

      $http.post(ruta + '/seccion/add', datos).then(function (res) {

        defered.resolve(res);

      }).catch(function (res) {

        defered.reject(res);

      });

      return promise;
    };

    // Espera como parametro {id_usuario, offset}

    this.newSeccionMail = function (datos) {

      var defered = $q.defer();
      var promise = defered.promise;

      $http.post(ruta + '/mail/newSeccion', datos).then(function (res) {


        defered.resolve(res);

      }).catch(function (res) {


        defered.reject(res);

      });
      return promise;
    };


    this.reporte = function (datos) {

      var defered = $q.defer();
      var promise = defered.promise;

      $http.post(ruta + '/seccion/reporte', datos).then(function (res) {


        defered.resolve(res);

      }).catch(function (res) {


        defered.reject(res);

      });
      return promise;
    };

    // Espera como parametro {nombre, id_seccion}
    this.update = function (datos) {

      var defered = $q.defer();
      var promise = defered.promise;

      $http.post(ruta + '/seccion/update', datos).then(function (res) {


        defered.resolve(res);

      }).catch(function (res) {


        defered.reject(res);
      });
      return promise;
    };

    // Miembros

    // Espera como parametro {id_seccion}

    this.getMembers = function (datos) {

      var defered = $q.defer();
      var promise = defered.promise;

      $http.post(ruta + '/seccion/members', datos).then(function (res) {


        defered.resolve(res);

      }).catch(function (res) {


        defered.reject(res);
      });
      return promise;
    };

    // Espera como parametro {id_usuario}

    this.getMember = function (id) {

      var defered = $q.defer();
      var promise = defered.promise;

      $http.get(ruta + '/seccion/member/' + id).then(function (res) {


        defered.resolve(res);

      }).catch(function (res) {


        defered.reject(res);
      });
      return promise;
    };

    // Espera como parametro {id_usuario}

    this.deleteMember = function (datos) {

      var defered = $q.defer();
      var promise = defered.promise;

      $http.post(ruta + '/seccion/member/status', datos).then(function (res) {

        defered.resolve(res);

      }).catch(function (res) {


        defered.reject(res);
      });
      return promise;
    };

    // Espera como parametro {id_usuario, codigo}

    this.addMember = function (datos) {

      var defered = $q.defer();
      var promise = defered.promise;

      $http.post(ruta + '/seccion/member/add', datos).then(function (res) {


        defered.resolve(res);

      }).catch(function (res) {


        defered.reject(res);
      });
      return promise;
    };

    // Espera como parametro {id_usuario, id_seccion, accion}

    this.statusMember = function (datos) {

      var defered = $q.defer();
      var promise = defered.promise;

      $http.post(ruta + '/seccion/member/status', datos).then(function (res) {


        defered.resolve(res);

      }).catch(function (res) {


        defered.reject(res);
      });
      return promise;
    };

    //POSTS

    // Espera como parametro {id_seccion, offset}

    this.getPosts = function (datos) {

      var defered = $q.defer();
      var promise = defered.promise;

      $http.post(ruta + '/seccion/posts', datos).then(function (res) {


        defered.resolve(res);

      }).catch(function (res) {


        defered.reject(res);
      });
      return promise;
    };

    // Espera como parametro {id_publicacion, id_seccion, id_usuario}

    this.getPost = function (datos) {

      var defered = $q.defer();
      var promise = defered.promise;

      $http.post(ruta + '/seccion/post/get', datos).then(function (res) {


        defered.resolve(res);

      }).catch(function (res) {


        defered.reject(res);
      });
      return promise;
    };

    // Espera como parametro {titulo, descripcion, id_seccion, id_usuario, nombre_archivo}

    this.addPost = function (datos) {

      var defered = $q.defer();
      var promise = defered.promise;

      $http.post(ruta + '/seccion/post/add', datos).then(function (res) {

        defered.resolve(res);

      }).catch(function (res) {


        defered.reject(res);

      });

      return promise;
    };

    // Espera como parametro {id_usuario, offset}

    this.newPostMail = function (datos) {

      var defered = $q.defer();
      var promise = defered.promise;

      $http.post(ruta + '/mail/newPost', datos).then(function (res) {


        defered.resolve(res);

      }).catch(function (res) {


        defered.reject(res);

      });
      return promise;
    };


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

      });
      return promise;
    };

    // Espera como parametro {id_publicacion, id_seccion, id_usuario}

    this.deletePost = function (datos) {

      var defered = $q.defer();
      var promise = defered.promise;

      $http.post(ruta + '/seccion/post/delete', datos).then(function (res) {

        defered.resolve(res);

      }).catch(function (res) {

        defered.reject(res);

      });
      return promise;
    };

    // ASISTENCIAS

    // Espera como parametro {id_seccion, id_usuario, fecha, asistio}

    this.setAsistence = function (datos) {

      var defered = $q.defer();
      var promise = defered.promise;

      $http.post(ruta + '/seccion/asistencia', datos).then(function (res) {


        defered.resolve(res);

      }).catch(function (res) {


        defered.reject(res);
      });
      return promise;
    };

    // Espera como parametro {id_seccion, fecha}

    this.getAsistence = function (datos) {

      var defered = $q.defer();
      var promise = defered.promise;

      $http.post(ruta + '/seccion/asistencia/get', datos).then(function (res) {


        defered.resolve(res);

      }).catch(function (res) {


        defered.reject(res);
      });
      return promise;
    };

    // Espera como parametro {id_usuario, fecha, aistio}

    this.updateAsistence = function (datos) {

      var defered = $q.defer();
      var promise = defered.promise;

      $http.post(ruta + '/seccion/asistencia/update', datos).then(function (res) {


        defered.resolve(res);

      }).catch(function (res) {


        defered.reject(res);
      });
      return promise;
    };

    // Espera como parametro {id_seccion, desde, hasta}

    this.report = function (datos) {

      var defered = $q.defer();
      var promise = defered.promise;

      $http.post(ruta + '/seccion/reporte', datos).then(function (res) {


        defered.resolve(res);

      }).catch(function (res) {


        defered.reject(res);
      });
      return promise;
    };

  }])

  .factory('AuthInterceptor', function ($window, $q, $rootScope) {
    function salir() {
      delete $rootScope.objectoCliente;
      $window.localStorage.removeItem('token');
      location.reload();
    }

    function autorizado() {
      if ($rootScope.objectoCliente) {
        return $rootScope.objectoCliente;
      } else {
        if ($window.localStorage.getItem('token')) {
          $rootScope.objectoCliente = angular.fromJson($window.localStorage.getItem('token'));
          return $rootScope.objectoCliente;
        } else {
          return false;
        }
      }
    }
    return {
      request: function (config) {

        config.headers = config.headers || {};
        if (autorizado()) {
          config.headers.auth = autorizado().token;
        }
        //config.headers.cors = {'Access-Control-Allow-Origin':'*', 'Access-Control-Allow-Headers': 'X-Requested-With, Content-Type, Accept, Origin, Authorization', 'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS'};
        return config || $q.when(config);

      },
      response: function (response) {
        return response || $q.when(response);
      },
      responseError: function (response) {
        if (response.status === 401 || response.status === 403) {
          salir();
        } else if (response.status === 500 && response.data.exception[0].message == "Expired token") {
          salir();
        } else {
          return response || $q.when(response);
        }
      }
    };
  });
