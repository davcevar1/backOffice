require.config(requireConfig);
define(function (require) {
    'use strict';
    
    // Importación de módulos AMD
    var angular = require('angular'),
        kendo = require('kendo');

    // Importación no son módulos
    require('bootstrap');
    
    var app = angular.module('app', ['kendo.directives'])
        .controller('controller', ['$scope', '$http', '$q',
            function ($scope, $http, $q) {
                $scope.activate = function() {
                    $scope.initialized = true;
                };
                
                $scope.messages = new kendo.data.DataSource({
                    data: [
                        {code:123445634563456, process:'SOLICITUD OPERACION ORIGINAL', task:'INGRESO DE DATOS', customer: 'WLADIMIR NICOLAY ESTRELLA CORTEZ', date:'07-02-2015 17:16:10', status:'CAN'},
                        {code:123423523452345, process:'SOLICITUD OPERACION ORIGINAL', task:'INGRESO DE DATOS', customer: 'WLADIMIR NICOLAY ESTRELLA CORTEZ', date:'07-02-2015 17:16:10', status:'TER'},
                        {code:123424523452344, process:'SOLICITUD OPERACION ORIGINAL', task:'INGRESO DE DATOS', customer: 'WLADIMIR NICOLAY ESTRELLA CORTEZ', date:'07-02-2015 17:16:10', status:'EJE'},
                        {code:123423452452455, process:'SOLICITUD OPERACION ORIGINAL', task:'INGRESO DE DATOS', customer: 'WLADIMIR NICOLAY ESTRELLA CORTEZ', date:'07-02-2015 17:16:10', status:'SUS'}
                    ]
                });

                //Inicializa controller
                (function () {
                    $scope.activate();
                })();
            }
        ]);

    //Inicializa angular
    angular.bootstrap(document, ['app']);
});