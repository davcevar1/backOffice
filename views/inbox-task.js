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
                
                $scope.setCustomer = function(customer) {
                    $scope.customer = customer;
                }
                
                $scope.setCurrentView = function(currentView, e) {
                    if (e) e.stopPropagation();
                    $scope.currentView = currentView;
                };
                $scope.openFilters = function() {
                    $('#filters').modal('show');
                };

                //Inicializa controller
                (function () {
                    $scope.activate();
                })();
            }
        ]);

    //Inicializa angular
    angular.bootstrap(document, ['app']);
});