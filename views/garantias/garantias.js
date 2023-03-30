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
          $http.get('../../mocks/garantias.json')
            .then(function(response) {
              $scope.results = response.data;
            });
        };
        $scope.clientes = {
          dataSource: {
            transport: {
              read: {
                url: "../../mocks/deudores.json",
                contentType: "application/json; charset=utf-8",
                dataType: "json"
              }
            },
            schema: {
              model: {
                id: "identifier",
                fields: {
                  name: {
                    editable: false,
                    nullable: true
                  },
                  identifier: {
                    editable: false,
                    nullable: true
                  },
                  identifierType: {
                    editable: false,
                    nullable: true
                  },
                  role: {
                    defaultValue: {
                      value: "deudor",
                      label: "Deudor"
                    }
                  },
                }
              }
            }
          },
          scrollable: false,
          editable: true,
          columns: [{
              field: "role",
              title: "Rol",
              editor: function(container, options) {
                $('<input required name="' + options.field + '"/>')
                  .appendTo(container)
                  .kendoDropDownList({
                    autoBind: false,
                    dataTextField: "label",
                    dataValueField: "value",
                    dataSource: {
                      transport: {
                        read: {
                          url: "../../mocks/prestamos-roles.json",
                          contentType: "application/json; charset=utf-8",
                          dataType: "json"
                        }
                      }
                    },
                  });
              }
            },
            {
              field: "name",
              title: "Nombre",
              template: '#: name# #if (type) {#<span class="text-muted">- (#: type#)</span>#}#'
            },
            {
              field: "identifier",
              title: "Identificación"
            },
            {
              field: "identifierType",
              title: "Tipo"
            },
            {
              width: 40,
              attributes: {
                "class": "cb-no-wrap"
              },
              template: '<button class="btn btn-default btn-sm" title="Eliminar"><span class="fa fa-times fa-fw"></span></button>'
            }
          ],
          toolbar: '<button class="btn btn-default k-grid-add" ng-click="addOwner();"><span class="fa fa-plus"></span> Agregar</button>'
        };
        $scope.dateTypes = [{
          label: 'Fecha de Ingreso',
          value: 1
        }];
        $scope.selectedDateType = $scope.dateTypes[0];
        $scope.especificacion = {
          dataSource: {
            transport: {
              read: "../../mocks/especificacion.json"
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
        $scope.find = function() {
          $scope.showResults = true;
          $scope.isAdvanced = false;
        };
        $scope.finish = function() {
          messages.alert('La operación ha sido creada exitosamente')
            .then(function() {
              location.href = 'detalle.html'
            });
        };
        $scope.filters = {
          field: [{
              label: "Cliente",
              id: 1
            },
            {
              label: "# Operación",
              id: 2
            },
            {
              label: "# Préstamo",
              id: 2
            }
          ]
        };
        $scope.gotoSearch = function() {
          location.href = 'busqueda.html';
        };
        $scope.header = {
          primaryText: 'Tapia Andrade Viviana María (Principal)',
          secondaryText: '#0245000345 - Garantía personal',
          fields: [{
              label: 'Monto total',
              value: '90,000.00 USD',
              opened: true
            },
            {
              label: 'Clase',
              value: 'CERRADA',
              opened: true
            },
            {
              label: 'Estado',
              value: 'Vigente',
              opened: true
            },
            {
              label: 'Fecha de ingreso',
              value: '12/12/2016',
              opened: false
            },
            {
              label: 'Localización',
              value: ' - ',
              opened: false
            },
            {
              label: 'Fecha de constitución',
              value: '12/12/2016',
              opened: false
            },
            {
              label: 'Oficina de apertura',
              value: ' - ',
              opened: false
            },
            {
              label: 'Oficina de contabilización',
              value: ' - ',
              opened: false
            },
            {
              label: 'Oficial',
              value: ' - ',
              opened: false
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
            },
            {
              label: 'Imprimir',
              opened: false,
              click: function() {
                messages.alert('Se abre ventana de impresión.');
              }
            },
            {
              label: '-',
              opened: false
            },
            {
              label: 'Cambio de valor y cobertura',
              opened: false,
              click: function() {
                $('#value-form').modal();
              }
            },
            {
              label: 'Recuperaciones',
              opened: false,
              click: function() {

              }
            },
            {
              label: 'Liberación',
              opened: false,
              click: function() {
                $('#status-form').modal();
              }
            },
            {
              label: 'Estado de cuenta',
              opened: false,
              click: function() {

              }
            }
          ]
        };
        $scope.selectedCurrency = 'USD';
        $scope.selectedField = $scope.filters.field[0];
        $scope.setField = function(field) {
          $scope.selectedField = field;
        }
        $scope.setDateType = function(dateType) {
          $scope.selectedDateType = dateType;
        }
        $scope.summary = {
          title: {
            text: "Disponibilidad"
          },
          legend: {
            position: "bottom"
          },
          seriesDefaults: {
            labels: {
              template: "#= category # - #= kendo.format('{0:P}', percentage)#",
              position: "outsideEnd",
              visible: false,
              background: "transparent"
            }
          },
          tooltip: {
            visible: true,
            template: "#= category #: #= kendo.toString(value, 'c0') #"
          },
          series: [{
            type: "donut",
            data: [{
              category: "Valor inicial",
              value: 70
            }, {
              category: "Valor cobertura",
              value: 10
            }]
          }]
        };
        $scope.garantiasOptions = {
          dataSource: new kendo.data.HierarchicalDataSource({
            data: [{
                text: "Quirografaria",
                items: [{
                  text: "Pagaré"
                }]
              },
              {
                text: "Prendaria",
                items: [{
                    text: "Maquinaria"
                  },
                  {
                    text: "Vehículo"
                  },
                  {
                    text: "Garantía vehicular Pyme"
                  }
                ]
              },
              {
                text: "Título valor",
                items: [{
                  text: "Plazo fijo"
                }]
              },
              {
                text: "Garantía hipotecaria",
                items: [{
                    text: "Inmuebles"
                  },
                  {
                    text: "Terreno"
                  }
                ]
              },
              {
                text: "Garantía personal",
                items: [{
                  text: "Garantía personal"
                }]
              }
            ]
          }),
          select: function(e) {
            if (e.sender.dataItem(e.node).hasChildren) {
              e.sender.expand(e.node);
            } else {
              $scope.tipoGarantia = e.sender.dataItem(e.node).text;
              $scope.$apply();
              $('#garantia-form').modal('hide');
            }
          }
        };
        $scope.activate();
      }
    ]);

  //Inicializa angular
  angular.bootstrap(document, ['app']);
});
