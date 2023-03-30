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
          $("#ranges-grid").on("click", ".k-grid-edit", function(){
            var row = $(this).closest("tr");
            var previousRow = $("#ranges-grid").find("tr.k-grid-edit-row");
            if (previousRow.length>0) {
              $("#ranges-grid").data("kendoGrid").saveRow(row);
            }
            $("#ranges-grid").data("kendoGrid").editRow(row);
          });
          $("#ranges-grid").on("click", ".k-grid-save", function(){
            var row = $(this).closest("tr");
            $("#ranges-grid").data("kendoGrid").saveRow(row);
          });
          $("#ranges-grid").on("click", ".k-grid-cancel", function(){
            var row = $(this).closest("tr");
            $("#ranges-grid").data("kendoGrid").cancelRow(row);
          });
        };
        $scope.showModal = function(id) {
          $('#' + id).modal();
          $scope.refreshGrids();
        };
        $scope.mercados = {
          dataSource: {
            transport: {
              read: {
                url: "../../mocks/costos-mercados.json",
                contentType: "application/json; charset=utf-8",
                dataType: "json"
              }
            }
          },
          change: function() {

          },
          selectable: 'multiple',
          height: 140,
          scrollable: true,
          columns: [{
              width: 6,
              template: "<input type='checkbox' class='checkbox' style='margin:auto;' ng-click='selectRow($event)' />",
              headerTemplate: "<input type='checkbox' class='checkbox' style='margin:auto;' ng-click='selectAll($event)' />"
            },
            {
              field: "name",
              title: "Nombre"
            }
          ]
        };
        $scope.productosCobis = {
          dataSource: {
            transport: {
              read: {
                url: "../../mocks/costos-productos-cobis.json",
                contentType: "application/json; charset=utf-8",
                dataType: "json"
              }
            }
          },
          change: function() {

          },
          selectable: 'multiple',
          height: 140,
          scrollable: true,
          columns: [{
              width: 6,
              template: "<input type='checkbox' class='checkbox' style='margin:auto;' ng-click='selectRow($event)' />",
              headerTemplate: "<input type='checkbox' class='checkbox' style='margin:auto;' ng-click='selectAll($event)' />"
            },
            {
              field: "name",
              title: "Nombre"
            }
          ]
        };
        $scope.oficinas = {
          dataSource: {
            transport: {
              read: {
                url: "../../mocks/costos-oficinas.json",
                contentType: "application/json; charset=utf-8",
                dataType: "json"
              }
            },
            schema: {
              model: {
                fields: {
                  name: {
                    editable: false,
                    nullable: true
                  },
                  group: {
                    editable: true,
                    nullable: true
                  }
                }
              }
            }
          },
          change: function() {

          },
          height: 350,
          scrollable: true,
          editable: true,
          columns: [{
              field: "name",
              title: "Nombre"
            },
            {
              field: "group",
              title: "Grupo de costos",
              editable: true,
              editor: function(container, options) {
                $('<select kendo-combo-box><option>General</option><option>Costos sierra</option></select>').appendTo(container);
              }
            }
          ]
        };
        $scope.oficinas2 = {
          dataSource: {
            transport: {
              read: {
                url: "../../mocks/costos-oficinas.json",
                contentType: "application/json; charset=utf-8",
                dataType: "json"
              }
            }
          },
          change: function() {
            $('#offices').modal('hide');
          },
          selectable: true,
          height: 250,
          scrollable: true,
          columns: [{
            field: "name",
            title: "Nombre"
          }]
        };
        $scope.oficinas3 = {
          dataSource: {
            transport: {
              read: {
                url: "../../mocks/costos-oficinas.json",
                contentType: "application/json; charset=utf-8",
                dataType: "json"
              }
            }
          },
          change: function() {

          },
          selectable: 'multiple',
          height: 280,
          scrollable: true,
          columns: [{
              width: 6,
              template: "<input type='checkbox' class='checkbox' style='margin:auto;' ng-click='selectRow($event)' />",
              headerTemplate: "<input type='checkbox' class='checkbox' style='margin:auto;' ng-click='selectAll($event)' />"
            },
            {
              field: "name",
              title: "Nombre"
            },
            {
              field: "group",
              title: "Grupo de costos"
            }
          ]
        };
        $scope.oficinas4 = {
          dataSource: {
            transport: {
              read: {
                url: "../../mocks/costos-oficinas.json",
                contentType: "application/json; charset=utf-8",
                dataType: "json"
              }
            }
          },
          change: function() {

          },
          selectable: 'multiple',
          height: 280,
          scrollable: true,
          columns: [{
              width: 22,
              template: "<input type='checkbox' class='checkbox' style='margin:auto;' ng-click='selectRow($event)' />",
              headerTemplate: "<input type='checkbox' class='checkbox' style='margin:auto;' ng-click='selectAll($event)' />"
            },
            {
              field: "name",
              title: "Nombre"
            }
          ]
        };
        $scope.rangeTypes = {
          dataSource: {
            transport: {
              read: {
                url: "../../mocks/costos-rangeTypes.json",
                contentType: "application/json; charset=utf-8",
                dataType: "json"
              }
            }
          },
          scrollable: false,
          columns: [{
            field: "name"
          }],
          toolbar: '<button class="btn btn-default k-grid-add"><span class="fa fa-plus"></span> Agregar</button>'
        };
        $scope.definitions = {
          dataSource: {
            transport: {
              read: {
                url: "../../mocks/costos-definitions.json",
                contentType: "application/json; charset=utf-8",
                dataType: "json"
              }
            }
          },
          scrollable: false,
          columns: [{
              field: "code",
              width: 150,
              title: 'Código'
            }, {
              field: "name",
              title: 'Nombre'
            },
            {
              width: 20,
              headerAttributes: {
                "class": "cb-actions"
              },
              attributes: {
                "class": "cb-actions cb-no-wrap"
              },
              template: '<button class="btn btn-default btn-sm" title="Ver" ng-click="showModal(\'definition\'); definitioEditable=false;"><span class="fa fa-eye fa-fw"></span></button><button class="btn btn-default btn-sm" title="Grupos de costos" ng-click="showModal(\'prices\')"><span class="fa fa-dollar fa-fw"></span></button><button class="btn btn-default btn-sm" title="Costos por oficina" ng-click="showModal(\'offices2\')"><span class="fa fa-building-o fa-fw"></span></button>'
            }
          ],
          toolbar: '<button class="btn btn-default" ng-click="showModal(\'definition\'); definitioEditable=true;"><span class="fa fa-plus"></span> Agregar</button>'
        };
        $scope.definitions2 = {
          dataSource: {
            transport: {
              read: {
                url: "../../mocks/costos-definitions.json",
                contentType: "application/json; charset=utf-8",
                dataType: "json"
              }
            }
          },
          scrollable: false,
          columns: [{
              field: "code",
              width: 150,
              title: 'Código'
            }, {
              field: "name",
              title: 'Nombre'
            }, {
              field: "targets",
              title: 'Mercado/s'
            }, {
              field: "products",
              title: 'Producto/s Cobis'
            },
            {
              width: 20,
              headerAttributes: {
                "class": "cb-actions"
              },
              attributes: {
                "class": "cb-actions cb-no-wrap"
              },
              template: '<button class="btn btn-default btn-sm" title="Ver" ng-click="showModal(\'definition\'); setDefinitionEditable(false);"><span class="fa fa-eye fa-fw"></span></button><button class="btn btn-default btn-sm" title="Rubros" ng-click="showModal(\'rubros2\')"><span class="fa fa-dollar fa-fw"></span></button><button class="btn btn-default btn-sm" title="Oficina" ng-click="showModal(\'offices2\')"><span class="fa fa-building-o fa-fw"></span></button>'
            }
          ],
          toolbar: '<button class="btn btn-default" ng-click="showModal(\'definition\'); setDefinitionEditable(true);"><span class="fa fa-plus"></span> Agregar</button>'
        };
        $scope.ranges = {
          dataSource: {
            transport: {
              read: {
                url: "../../mocks/costos-ranges.json",
                contentType: "application/json; charset=utf-8",
                dataType: "json"
              }
            },
            schema: {
              model: {
                id: "id",
                fields: {
                  from: {
                    editable: false,
                    nullable: false
                  },
                  to: {
                    editable: false,
                    nullable: false
                  },
                  avg: {
                    type: "number",
                    validation: {
                      required: true,
                      min: 1
                    }
                  },
                  min: {
                    type: "number",
                    validation: {
                      required: true,
                      min: 1
                    }
                  },
                  max: {
                    type: "number",
                    validation: {
                      required: true,
                      min: 1
                    }
                  }
                }
              }
            }
          },
          editable: true,
          scrollable: false,
          columns: [{
              field: "from",
              title: 'Desde',
              editable: false,
              headerAttributes: {
                style: "text-align:right;"
              },
              attributes: {
                class: "text-right"
              }
            },
            {
              field: "to",
              title: 'Hasta',
              editable: false,
              headerAttributes: {
                style: "text-align:right;"
              },
              attributes: {
                class: "text-right"
              }
            },
            {
              field: "avg",
              width: 120,
              title: 'Medio',
              format: '{0:c}',
              headerAttributes: {
                style: "text-align:right;"
              },
              attributes: {
                class: "text-right"
              }
            },
            {
              field: "min",
              width: 120,
              title: 'Mínimo',
              format: '{0:c}',
              headerAttributes: {
                style: "text-align:right;"
              },
              attributes: {
                class: "text-right"
              }
            },
            {
              field: "max",
              width: 120,
              title: 'Máximo',
              format: '{0:c}',
              headerAttributes: {
                style: "text-align:right;"
              },
              attributes: {
                class: "text-right"
              }
            }
          ],
          toolbar: '<button class="btn btn-default"><span class="fa fa-search"></span> Buscar</button><button class="btn btn-default" ng-click="showModal(\'offices\')"><span class="fa fa-copy"></span> Copiar desde</button>'
        };
        $scope.ranges2 = {
          dataSource: {
            transport: {
              read: {
                url: "../../mocks/costos-ranges.json",
                contentType: "application/json; charset=utf-8",
                dataType: "json"
              }
            },
            schema: {
              model: {
                id: "id",
                fields: {
                  from: {
                    editable: false,
                    nullable: false
                  },
                  to: {
                    editable: false,
                    nullable: false
                  },
                  avg: {
                    type: "number",
                    validation: {
                      required: true,
                      min: 1
                    }
                  },
                  min: {
                    type: "number",
                    validation: {
                      required: true,
                      min: 1
                    }
                  },
                  max: {
                    type: "number",
                    validation: {
                      required: true,
                      min: 1
                    }
                  }
                }
              }
            }
          },
          editable: "inline",
          scrollable: false,
          height: 300,
          columns: [{
              field: "from",
              title: 'Desde',
              editable: false,
              headerAttributes: {
                style: "text-align:right;"
              },
              attributes: {
                class: "text-right"
              }
            },
            {
              field: "to",
              title: 'Hasta',
              editable: false,
              headerAttributes: {
                style: "text-align:right;"
              },
              attributes: {
                class: "text-right"
              }
            },
            {
              field: "min",
              width: 120,
              title: 'Mínimo',
              format: '{0:c}',
              headerAttributes: {
                style: "text-align:right;"
              },
              attributes: {
                class: "text-right"
              }
            },
            {
              field: "avg",
              width: 120,
              title: 'Medio',
              format: '{0:c}',
              headerAttributes: {
                style: "text-align:right;"
              },
              attributes: {
                class: "text-right"
              }
            },
            {
              field: "max",
              width: 120,
              title: 'Máximo',
              format: '{0:c}',
              headerAttributes: {
                style: "text-align:right;"
              },
              attributes: {
                class: "text-right"
              }
            },
            {
              width: 20,
              headerAttributes: {
                "class": "cb-actions"
              },
              attributes: {
                "class": "cb-actions cb-no-wrap"
              },
              template: '<button class="btn btn-default k-grid-edit"><span class="fa fa-pencil"></span></button><button class="btn btn-default k-grid-save"><span class="fa fa-check"></span></button><button class="btn btn-default k-grid-cancel"><span class="fa fa-times"></span></button>',
            }
          ]
        };
        $scope.rubros = {
          dataSource: {
            transport: {
              read: {
                url: "../../mocks/costos-rubros.json",
                contentType: "application/json; charset=utf-8",
                dataType: "json"
              }
            }
          },
          scrollable: false,
          selectable: true,
          height: 300,
          columns: [{
            field: "label",
            title: 'Nombre'
          }, {
            field: "default",
            title: "&nbsp;",
            width: 30,
            headerAttributes: {
              style: "text-align:center;"
            },
            attributes: {
              class: "text-center"
            },
            template: '#if (data.status=="complete") {# <span class=\"fa fa-check-circle text-success\" title="Completo"></span> # } else if (data.status=="partial") {# <span class=\"fa fa-warning text-warning\" title="Parcial"></span> # } #'
          }]
        };
        $scope.refreshGrids = function() {
          setTimeout(function() {
            $('[kendo-grid]').each(function() {
              $(this).data('kendoGrid').refresh();
            });
          }, 400);
        };
        $scope.selectionType = 'Individual';
        $scope.setDefinitionEditable = function(value) {
          $scope.definitionEditable = value;
        };
        $scope.activate();
      }
    ]);

  //Inicializa angular
  angular.bootstrap(document, ['app']);
});
