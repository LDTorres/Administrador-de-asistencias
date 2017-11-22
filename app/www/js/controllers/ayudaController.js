angular.module('GATE')

  .controller('ayudaController', ["$scope", "$rootScope", "servicioGeneral", function ($scope, $rootScope, servicioGeneral) {
    var bz = this;

    bz.tema = $rootScope.objectoCliente.preferencias.color_ui;

    bz.datos = {
      desarrolladores:[
        {nombre: 'Luis Torres', malla: 'Informática', correo: 'luisdtc2696@gmail.com', imagen: 'luis.jpg'},
        {nombre: 'Adrian Flores', malla: 'Informática', correo: 'adrian.fl1991@gmail.com', imagen: 'grabatar.jpg'},
        {nombre: 'Michel Novellino', malla: 'Informática', correo: 'michel.novellino16@gmail.com', imagen: 'grabatar.jpg'}
      ]
    };

    servicioGeneral.app().then(function(res){
      bz.datos.app = res;
    })

  }])
