angular.module('GATE')

.factory('datosService', function () {
    return {
        getAuthor: function () {
            var author = {
                name: "Juan"
            };
            return author;
        },
    }
})
