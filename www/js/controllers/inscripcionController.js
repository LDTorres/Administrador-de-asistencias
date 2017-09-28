angular.module('GATE')

    .controller('inscripcionController', ["$scope", "servicioGeneral", "$state", "servicioSecciones", "servicioAsignatura", function ($scope, servicioGeneral, $state, servicioSecciones, servicioAsignatura) {
        var bz = this;

        bz.datos = {
            user: [{
                tipo: 'estudiante'
            }]
        }
    }])