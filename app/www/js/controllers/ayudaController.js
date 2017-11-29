angular.module('GATE')

  .controller('ayudaController', ["$scope", "$rootScope", "servicioGeneral", "constanteTutorial", function ($scope, $rootScope, servicioGeneral, constanteTutorial) {
    var bz = this;

    bz.tema = $rootScope.objectoCliente.preferencias.color_ui;

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
      ]
    };

    bz.slides = constanteTutorial;

    $scope.next = function () {
      $scope.$broadcast('slideBox.nextSlide');
    };

    servicioGeneral.app().then(function (res) {
      bz.datos.app = res;
    })

  }])
