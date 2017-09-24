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


    /* USUARIOS */

    .service("servicioUsuario", ["$http", "$q", "ruta", function ($http, $q, ruta) {

        // Colocamos la imagen de perfil  // TODO: Upload
      /*   this.setPicture = function (datos) {

            var defered = $q.defer();
            var promise = defered.promise; */

            /* Ver si se envia el archivo 
            console.log(datos)
            */

          /*   Upload.upload({
              url: ruta + '/user/picture',
              method: 'POST',
              file: {
                filename: datos.perfilPicture
              },
              data: datos
            }).then(function (res) {
      
              defered.resolve(res);
      
            }).catch(function (res) {
      
              defered.reject(res);
      
            })
            return promise;
           
        } */

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

        /* Espera como parametro {tipo de ususario, por defecto es ESTUDIANTE} */

        this.getAll = function (datos) {
            /* Declaramos una promesa */
            var defered = $q.defer();
            var promise = defered.promise;

            $http.get(ruta + '/user/all/' + datos).then(function (res) {

                /* Si el valor fue devuelto */
                defered.resolve(res);

            }).catch(function (res) {

                /* Si hubo algun error */
                defered.reject(res);
            })
            return promise;
        }

        /* Espera como parametro {id del usuario} */

        this.get = function (datos) {
            /* Declaramos una promesa */
            var defered = $q.defer();
            var promise = defered.promise;

            $http.get(ruta + '/user/' + datos).then(function (res) {

                /* Si el valor fue devuelto */
                defered.resolve(res);

            }).catch(function (res) {

                /* Si hubo algun error */
                defered.reject(res);
            })
            return promise;
        }

    }])


    /* ASIGNATURAS */

    .service("servicioAsignatura", ["$http", "$q", "ruta", function ($http, $q, ruta) {

        /* Esperan el id de todas las asignaturas */

        this.getAll = function (datos) {
            /* Declaramos una promesa */
            var defered = $q.defer();
            var promise = defered.promise;

            $http.get(ruta + '/asignatura/all').then(function (res) {

                /* Si el valor fue devuelto */
                defered.resolve(res);

            }).catch(function (res) {

                /* Si hubo algun error */
                defered.reject(res);
            })
            return promise;
        }

        /* Esperan el id, trimestre y opcionalmente el pnf */

        this.get = function (datos) {
            /* Declaramos una promesa */
            var defered = $q.defer();
            var promise = defered.promise;

            $http.get(ruta + '/asignatura/' + datos.id + '/' + datos.trimestre).then(function (res) {

                /* Si el valor fue devuelto */
                defered.resolve(res);

            }).catch(function (res) {

                /* Si hubo algun error */
                defered.reject(res);
            })
            return promise;
        }

        /* Se añadiran nombre, trimestre, id_malla */

        this.add = function (datos) {
            /* Declaramos una promesa */
            var defered = $q.defer();
            var promise = defered.promise;

            $http.post(ruta + '/asignatura/add', datos).then(function (res) {

                /* Si el valor fue devuelto */
                defered.resolve(res);

            }).catch(function (res) {

                /* Si hubo algun error */
                defered.reject(res);
            })
            return promise;
        }

        /* Se actualizaran nombre dentro de una id_malla y trimestre */
        this.update = function (datos) {
            /* Declaramos una promesa */
            var defered = $q.defer();
            var promise = defered.promise;

            $http.post(ruta + '/asignatura/update', datos).then(function (res) {

                /* Si el valor fue devuelto */
                defered.resolve(res);

            }).catch(function (res) {

                /* Si hubo algun error */
                defered.reject(res);
            })
            return promise;
        }
        

    }])
