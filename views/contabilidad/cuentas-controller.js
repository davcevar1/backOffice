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
    .controller('controller', ['$scope', '$http', '$q', '$timeout',
      function($scope, $http, $q) {
        $scope.activate = function() {
          $http.get('../../mocks/conta-plan-cuentas.json')
            .then(function(response) {
              $scope.results = response.data;
            });
          if (location.search == '?edit') {
            $scope.create = false;
            $scope.editable = false;
          } else {
            $scope.create = true;
            $scope.editable = true;
          }
        };
        $scope.accounts = new kendo.data.HierarchicalDataSource({ data: [
          {
            text: "11 - Fondos disponibles",
            items: [{
              text: "1101 - Caja",
              items: [{
                text: "110105 - Efectivo",
                items: [{
                  text: "11010501 - Caja general"
                }, {
                  text: "11010502 - Caja ATM"
                }]
              }, {
                text: "110110 - Caja chica",
                items: [{
                    text: "11011001 - Caja chica agencias"
                  },
                  {
                    text: "11011002 - Caja chica secretaría"
                  },
                  {
                    text: "11011003 - Caja chica GOE"
                  },
                  {
                    text: "11011004 - Fondos construcciones"
                  }
                ]
              }]
            }]
          }]
        });
        $scope.find = function() {
          $scope.showResults = true;
        };
        $scope.filters = {
          field: [{
              label: "# Cuenta",
              id: 2
            },
            {
              label: "Nombre",
              id: 1
            }
          ]
        };
        $scope.gotoSearch = function() {
          location.href = 'busqueda-plan-cuentas.html';
        };
        $scope.header = {
          primaryText: 'CD 1938 - Depósito de cheque',
          secondaryText: '#0245000345 - Contabilidad',
          fields: [{
              label: 'Oficina origen',
              value: 'SUCRE',
              opened: true
            },
            {
              label: 'Area origen',
              value: 'CONTABILIDAD',
              opened: true
            },
            {
              label: 'Mayorizado',
              value: 'Si',
              opened: true
            },
            {
              label: 'Estado',
              value: 'Ingresado',
              opened: true
            }
          ],
          actions: [{
            label: 'Actualizar',
            opened: false,
            click: function() {
              $scope.editable = !$scope.editable;
              if ($scope.editable) {
                $scope.tabs.activateTab($('#tab-clientes'));
              }
            }
          }, {
            label: 'Imprimir',
            opened: false,
            click: function() {
              messages.alert('Se abre ventana de impresión.');
            }
          }, {
            label: '-',
            opened: false
          }, {
            label: 'Autorizar',
            opened: false,
            click: function() {
              messages.confirm('Esta seguro que desea autorizar el asiento actual?.')
                .then(function(input) {
                  console.log(input);
                });
            }
          }, {
            label: 'Anular',
            opened: false,
            click: function() {
              messages.confirm('Esta seguro que desea anular el asiento actual?.')
                .then(function(input) {
                  console.log(input);
                });
            }
          }]
        };
        $scope.selectedField = $scope.filters.field[0];
        $scope.setField = function(field) {
          $scope.selectedField = field;
        }
        $scope.type = "search";
        $scope.activate();
      }
    ]);

  //Inicializa angular
  angular.bootstrap(document, ['app']);
});
