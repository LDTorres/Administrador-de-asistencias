angular.module('GATE')

  .controller('tutorialController', ["$scope", "$rootScope", "servicioGeneral", "constanteTutorial", "$ionicPopup", function ($scope, $rootScope, servicioGeneral, constanteTutorial, $ionicPopup) {
    var bz = this;

    bz.slides = constanteTutorial;

    $scope.next = function () {
      $scope.$broadcast('slideBox.nextSlide');
    };

    bz.salir = function (index) {
      if (index == 0) {
        var confirmPopup = $ionicPopup.confirm({
          title: 'Deseas ir al inicio?'
        });

        confirmPopup.then(function (res) {
          if (res) {
            setTimeout(function () {
              $state.go('inicio');
            }, 2000);
          } else {}
        });
      }
    }

  }])
