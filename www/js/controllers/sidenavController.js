angular.module('GATE')

  .controller('sidenavController', ["$scope", "$ionicSideMenuDelegate", function ($scope, $ionicSideMenuDelegate) {

    this.toggleLeft = function () {
      $ionicSideMenuDelegate.toggleLeft();
    }

  }])
