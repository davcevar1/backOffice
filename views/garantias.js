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
          angular.element('#more-info').popover({
            content: $('#info').html(),
            html: true,
            placement: 'bottom'
          });
        };
        $scope.activate();

        $scope.changePriorities = function() {
          $('#prioridades').modal();
        };
        $scope.dates = [
          {label:'Fecha de Creación', value:1},
          {label:'Fecha de Vencimiento préstamo', value:2},
          {label:'Fecha de Vencimiento cuota', value:3},
          {label:'Fecha de Reembolso', value:4},
          {label:'Fecha de Reajuste', value:5},
          {label:'Fecha de Cancelación', value:6}
        ];
        $scope.garantias = {
          dataSource: {
            transport: {
              read: "../mocks/garantias.json"
            }
          },
          scrollable: false,
          selectable: true,
          columns: [{
            field: "number",
            title: "# Garantía"
          }, {
            field: "customer",
            title: "Cliente",
          }, {
            field: "officer",
            title: "Oficial"
          }, {
            field: "office",
            title: "Oficina"
          }]
        };
        $scope.clientes = {
          dataSource: {
            transport: {
              read: "../mocks/clientes.json"
            }
          },
          scrollable: false,
          columns: [{
              field: "id",
              title: "Id #"
            }, {
              field: "name",
              title: "Nombre"
            },
            {
              field: "documentType",
              title: "Tipo de documento",
              attributes: {
                "class": "text-center"
              },
              headerAttributes: {
                "style": "text-align:center;"
              }
            },
            {
              field: "documentNumber",
              title: "Identificación"
            },
            {
              width: '40px',
              template: '<button class="btn btn-default" title="Eliminar"><span class="fa fa-times"></span></button>'
            }
          ],
          toolbar: '<button class="btn btn-default"><span class="fa fa-plus"></span> Agregar</button>'
        };
        $scope.compartido = {
          dataSource: {
            transport: {
              read: "../mocks/compartido.json"
            }
          },
          scrollable: false,
          columns: [{
              field: "entidad",
              title: "Entidad"
            }, {
              field: "valor",
              title: "Valor",
              format: "{0:c}",
              attributes: {
                "class": "text-right"
              },
              headerAttributes: {
                "style": "text-align:right;"
              }
            },
            {
              field: "valorContable",
              title: "Valor contable",
              format: "{0:c}",
              attributes: {
                "class": "text-right"
              },
              headerAttributes: {
                "style": "text-align:right;"
              }
            },
            {
              field: "porcentaje",
              title: "% Corporación",
              format: "{0:p}",
              attributes: {
                "class": "text-center"
              },
              headerAttributes: {
                "style": "text-align:center;"
              }
            },
            {
              width: '40px',
              template: '<button class="btn btn-default" title="Eliminar"><span class="fa fa-times"></span></button>'
            }
          ],
          toolbar: '<button class="btn btn-default" data-toggle="modal" data-target="\\#entity-form"><span class="fa fa-plus"></span> Agregar</button>'
        };
        $scope.especificacion = {
          dataSource: {
            transport: {
              read: "../mocks/especificacion.json"
            }
          },
          scrollable: false,
          columns: [{
              field: "tipo",
              title: "Tipo"
            },
            {
              field: "mConstruccion",
              title: "m2 Contruccción",
              attributes: {
                "class": "text-center"
              },
              headerAttributes: {
                "style": "text-align:center;"
              }
            },
            {
              field: "mTerreno",
              title: "m2 Terreno",
              attributes: {
                "class": "text-center"
              },
              headerAttributes: {
                "style": "text-align:center;"
              }
            },
            {
              field: "habitaciones",
              title: "Habitaciones",
              attributes: {
                "class": "text-center"
              },
              headerAttributes: {
                "style": "text-align:center;"
              }
            },
            {
              field: "banos",
              title: "Baños",
              attributes: {
                "class": "text-center"
              },
              headerAttributes: {
                "style": "text-align:center;"
              }
            },
            {
              field: "plantas",
              title: "Plantas",
              attributes: {
                "class": "text-center"
              },
              headerAttributes: {
                "style": "text-align:center;"
              }
            },
            {
              field: "garajes",
              title: "Garajes",
              attributes: {
                "class": "text-center"
              },
              headerAttributes: {
                "style": "text-align:center;"
              }
            },
            {
              field: "anoConstruccion",
              title: "Año Construcción",
              attributes: {
                "class": "text-center"
              },
              headerAttributes: {
                "style": "text-align:center;"
              }
            },
            {
              width: '40px',
              template: '<button class="btn btn-default" title="Eliminar"><span class="fa fa-times"></span></button>'
            }
          ],
          toolbar: '<button class="btn btn-default" data-toggle="modal" data-target="\\#spec-form"><span class="fa fa-plus"></span> Agregar</button>'
        };
      }
    ]);

  //Inicializa angular
  angular.bootstrap(document, ['app']);
});
