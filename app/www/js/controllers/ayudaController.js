angular.module('GATE')

  .controller('ayudaController', ["$scope", "$rootScope", "servicioGeneral", "constanteTutorial", "servicioUsuario", "$window", "$ionicPopup", "ruta", function ($scope, $rootScope, servicioGeneral, constanteTutorial, servicioUsuario, $window, $ionicPopup, ruta) {
    var bz = this;

    bz.ruta = ruta;

    bz.datos = {
      desarrolladores: [{
          nombre: 'Luis Torres',
          malla: 'Informática',
          correo: 'luisdtc2696@gmail.com',
          imagen: 'luis.jpg'
        },
        {
          nombre: 'Adrian Flores',
          malla: 'Informática',
          correo: 'adrian.fl1991@gmail.com',
          imagen: 'adrian.jpg'
        },
        {
          nombre: 'Michel Novellino',
          malla: 'Informática',
          correo: 'michel.novellino16@gmail.com',
          imagen: 'michel.jpg'
        }
      ],
      colores: ["positive", "assertive", "dark", "energized", "balanced", "royal"],
      usuario: $rootScope.objectoCliente
    };
    bz.tema = $rootScope.objectoCliente.preferencias.color_ui;
    bz.slides = constanteTutorial;

    $scope.next = function () {
      $scope.$broadcast('slideBox.nextSlide');
    };

    servicioGeneral.app().then(function (res) {
      bz.datos.app = res;
    })

    // Actualizar Preferencias

    bz.preferenciasAct = function (color) {
      datos = {
        color_ui: color,
        id_usuario: $rootScope.objectoCliente.id
      };

      servicioUsuario.updatePreferences(datos).then(function (res) {

        $rootScope.objectoCliente.preferencias.color_ui = datos.color_ui;
        $window.localStorage.setItem('token', angular.toJson($rootScope.objectoCliente));

        var confirmPopup = $ionicPopup.confirm({
          title: 'Refrescar App',
          template: 'Para aplicar los cambios debemos refrescar la app, esta de acuerdo?'
        });

        confirmPopup.then(function (res) {
          if (res) {
            location.reload();
          } else {}
        });

      })
    }

  }])
