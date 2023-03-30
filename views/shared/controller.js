require.config(requireConfig);
define(function(require) {
  'use strict';

  // Importación de módulos AMD
  var angular = require('angular'),
    kendo = require('kendo'),
    messages = require('cobis/messages');

  // Importación no son módulos
  require('bootstrap');

  var app = angular.module('app', ['kendo.directives'])
    .controller('controller', ['$scope', '$http', '$q',
      function($scope, $http, $q) {
        $scope.activate = function() {
          $http.get('../../mocks/canales-usuarios.json')
            .then(function(response) {
              $scope.users = response.data;
            });
          var options = location.search.substr(1).split('&');
          $scope.allowBasic = options.indexOf('allowBasic')>=0;
          $scope.allowAdvanced = options.indexOf('allowAdvanced')>=0;
          $scope.allowAdd = options.indexOf('allowAdd')>=0;
        };
        $scope.add = function() {
          messages.alert('Formulario de agregar');
        };
        $scope.allowAdd = false;
        $scope.allowAdvanced = false;
        $scope.allowBasic = false;
        $scope.find = function() {
          $scope.showResults = true;
        };
        $scope.filters = {
          field: [{
              label: "Identificación",
              id: 1
            },
            {
              label: "Nombre",
              id: 3
            }
          ]
        };
        $scope.selectedField = $scope.filters.field[0];
        $scope.setField = function(field) {
          $scope.selectedField = field;
        }
        $scope.toggleAdvanced = function() {
          $scope.isAdvanced = !$scope.isAdvanced;
        };
        $scope.activate();
      }
    ]);

  //Inicializa angular
  angular.bootstrap(document, ['app']);
});
