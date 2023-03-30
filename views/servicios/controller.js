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
      function($scope, $http, $q, $timeout) {
        $scope.activate = function() {
          $timeout(function() {
            $scope.servicesGrid.element.find(".k-grid-toolbar").insertAfter($scope.servicesGrid.element.find("table[role=grid]"));
          }, 400);
        };
        $scope.services = {
          dataSource: {
            transport: {
              read: {
                url: "../../mocks/servicios.json",
                contentType: "application/json; charset=utf-8",
                dataType: "json"
              }
            }
          },
          scrollable: false,
          /*
          change: function() {
            location.href = 'pago.html';
          },
          */
          columns: [{
              width: '40px',
              template: kendo.template('<div class="cb-avatar">#= avatar #</div>')
            },
            {
              field: "id",
              width: "100%",
              template: kendo.template('<div class="cb-code">#= code #</div><div class="cb-alias">#= alias #</div><div class="cb-service">#= service #</div>')
            },
            {
              field: "id",
              attributes: {
                class: 'cb-actions'
              },
              template: kendo.template('<button class="btn btn-default" ng-click="pay($event)"><span class="fa fa-arrow-circle-o-right"></span> Pagar</button> <button class="btn btn-default" ng-click="delete($event)"><span class="fa fa-trash"></span></button>')
            }
          ],
          toolbar: '<div class="cb-flex cb-middle"><button class="btn btn-default" ng-click="createService();"><span class="fa fa-plus"></span> Nuevo servicio</button></div>'
        };
        $scope.services2 = {
          dataSource: {
            transport: {
              read: {
                url: "../../mocks/servicios.json",
                contentType: "application/json; charset=utf-8",
                dataType: "json"
              }
            }
          },
          selectable: true,
          width: '200px',
          columns: [{
            field: "id",
            width: "100%",
            template: kendo.template('<div class="cb-service">#= service #</div>')
          }]
        };
        $scope.services3 = {
          dataSource: {
            transport: {
              read: {
                url: "../../mocks/afiliacion-detail.json",
                contentType: "application/json; charset=utf-8",
                dataType: "json"
              }
            }
          },
          columns: [{
            field: "id",
            template: kendo.template('<div class="cb-service" style="font-weight: bold;">#= label #</div>')
          }, {
            field: "id",
            template: kendo.template('<div class="cb-service text-right">#= value #</div>')
          }]
        };
        $scope.services4 = {
          dataSource: {
            transport: {
              read: {
                url: "../../mocks/afiliacion-detail2.json",
                contentType: "application/json; charset=utf-8",
                dataType: "json"
              }
            }
          },
          columns: [{
            field: "id",
            template: kendo.template('<div class="cb-service" style="font-weight: bold;">#= label #</div>')
          }, {
            field: "id",
            template: kendo.template('<div class="cb-service text-right">#= value #</div>')
          }]
        };
        $scope.toggleAmount = function(event) {
          var parent = $(event.target).closest('tr').parent();
          var node = $(event.target).closest('tr');
          var index = node.index();
          if (event.target.checked) {
            parent.find('tr:nth-child(-n+'+index+') input[type="checkbox"]').prop("checked", true);
            parent.find('tr:nth-child(-n+'+(index+1)+') input[type="text"]').prop("disabled", false);
          }
          if (!event.target.checked) {
            parent.find('tr:nth-child(+n+'+(index+1)+') input[type="checkbox"]').prop("checked", false);
            parent.find('tr:nth-child(+n+'+(index+1)+') input[type="text"]').prop("disabled", true);
          }
        };
        $scope.amounts = {
          dataSource: {
            transport: {
              read: {
                url: "../../mocks/afiliacion-amounts.json",
                contentType: "application/json; charset=utf-8",
                dataType: "json"
              }
            },
            aggregate: [{
                field: "value",
                aggregate: "sum"
              }
            ]
          },
          scrollable: true,
          height: '300px',
          columns: [{
            width: '13px',
            attributes: {
              "class": "text-center"
            },
            template: '<input type="checkbox" ng-click="toggleAmount($event)" />'
          }, {
            field: "label",
            template: '#: label # - #: kendo.toString(value, "c") #'
          }, {
            field: "value",
            title: "Monto",
            format: "{0:c}",
            attributes: {
              "class": "text-right"
            },
            template: '<input style="width:80px;" type="text" kendo-numeric-text-box k-spinners="false" k-max="#: value #" value="#: value #" #if(!data.editable){#disabled#}# />',
            footerTemplate: "<div class='text-right'>Total a pagar: #: kendo.toString(sum, 'c') #</div>"
          }]
        };
        $scope.amounts2 = {
          dataSource: {
            transport: {
              read: {
                url: "../../mocks/pago-detail.json",
                contentType: "application/json; charset=utf-8",
                dataType: "json"
              }
            }
          },
          columns: [{
            field: "id",
            template: kendo.template('<div class="cb-service" style="font-weight: bold;">#= label #</div>')
          }, {
            field: "id",
            template: kendo.template('<div class="cb-service text-right">#= value #</div>')
          }]
        };
        $scope.amounts3 = {
          dataSource: {
            transport: {
              read: {
                url: "../../mocks/pago-detail2.json",
                contentType: "application/json; charset=utf-8",
                dataType: "json"
              }
            }
          },
          columns: [{
            field: "id",
            template: kendo.template('<div class="cb-service" style="font-weight: bold;">#= label #</div>')
          }, {
            field: "id",
            template: kendo.template('<div class="cb-service text-right">#= value #</div>')
          }]
        };
        $scope.amounts4 = {
          dataSource: {
            transport: {
              read: {
                url: "../../mocks/afiliacion-amounts.json",
                contentType: "application/json; charset=utf-8",
                dataType: "json"
              }
            },
            aggregate: [{
                field: "value",
                aggregate: "sum"
              }
            ]
          },
          columns: [{
            field: "label"
          }, {
            field: "value",
            title: "Monto",
            format: "{0:c}",
            attributes: {
              "class": "text-right"
            },
            footerTemplate: "<div class='text-right'>Total a pagar: #: kendo.toString(sum, 'c') #</div>"
          }]
        };
        $scope.pay = function() {
          location.href = 'pago.html';
        };
        $scope.createService = function() {
          location.href = 'afiliacion.html';
        };
        $scope.delete = function(e) {
          e.stopPropagation();
        };
        $scope.activate();
      }
    ]);

  //Inicializa angular
  angular.bootstrap(document, ['app']);
});
