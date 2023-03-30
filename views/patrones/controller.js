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
    .controller('controller', ['$scope', '$http', '$q', '$filter',
      function($scope, $http, $q, $filter) {
        $scope.activate = function() {
        };
        $scope.grid = {
          dataSource: {
            transport: {
              read: {
                url: "../../mocks/patterns-grid.json",
                contentType: "application/json; charset=utf-8",
                dataType: "json"
              }
            },
            schema: {
                model: {
                    id: "id",
                    fields: {
                        number: { type: "number", validation: { required: true } },
                        text: { validation: { required: true } },
                        combobox: { validation: { required: true } }
                    }
                }
            }
          },
          editable: true,
          scrollable: true,
          columns: [
            {
              field: "number",
              title: "Número"
            },
            {
              field: "text",
              title: "Texto"
            },
            {
              field: "combobox",
              title: "Combobox"
            }
          ],
          toolbar: ["create"]
        };
        $scope.activate();
      }
    ]);

  //Inicializa angular
  angular.bootstrap(document, ['app']);
});
