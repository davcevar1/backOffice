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
          $http.get('../../mocks/asientos-contables.json')
            .then(function(response) {
              $scope.results = response.data;
            });
          /*$http.get('../../mocks/planes-cuenta.json')
            .then(function(response) {
              $scope.results = response.data;
            });*/
          if (location.search == '?edit') {
            $scope.create = false;
            $scope.editable = false;
          } else {
            $scope.create = true;
            $scope.editable = true;
          }
        };
        $scope.addRecord = function() {
          $('#record').modal();
        }
        $scope.addPeriod = function() {
          $('#period').modal();
        }
        $scope.asociacionOficinasArea = {
          dataSource: {
            transport: {
              read: {
                url: "../../mocks/conta-oficinas.json",
                contentType: "application/json; charset=utf-8",
                dataType: "json"
              }
            }
          },
          scrollable: false,
          columns: [{
              field: "id",
              title: "#",
              headerAttributes: {
                style: "text-align:center;"
              },
              attributes: {
                class: "text-center"
              },
              width: 30
            },
            {
              field: "name",
              title: "Oficina"
            },
            {
              field: "length",
              headerAttributes: {
                style: "text-align:center;"
              },
              attributes: {
                class: "text-center"
              },
              width: 30,
              headerTemplate: '<span style="writing-mode:vertical-rl;">Obligaciones</span>',
              template: '<input type="checkbox" />'
            },
            {
              field: "length",
              headerAttributes: {
                style: "text-align:center;"
              },
              attributes: {
                class: "text-center"
              },
              width: 30,
              headerTemplate: '<span style="writing-mode:vertical-rl;">Tesorería</span>',
              template: '<input type="checkbox" />'
            },
            {
              field: "length",
              headerAttributes: {
                style: "text-align:center;"
              },
              attributes: {
                class: "text-center"
              },
              width: 30,
              headerTemplate: '<span style="writing-mode:vertical-rl;">Area cierre</span>',
              template: '<input type="checkbox" />'
            },
            {
              field: "length",
              title: "Tesorería",
              headerAttributes: {
                style: "text-align:center;"
              },
              attributes: {
                class: "text-center"
              },
              width: 30,
              headerTemplate: '<span style="writing-mode:vertical-rl;">Contabilidad</span>',
              template: '<input type="checkbox" />'
            },
            {
              field: "length",
              headerAttributes: {
                style: "text-align:center;"
              },
              attributes: {
                class: "text-center"
              },
              width: 30,
              headerTemplate: '<span style="writing-mode:vertical-rl;">Obligaciones</span>',
              template: '<input type="checkbox" />'
            },
            {
              field: "length",
              headerAttributes: {
                style: "text-align:center;"
              },
              attributes: {
                class: "text-center"
              },
              width: 30,
              headerTemplate: '<span style="writing-mode:vertical-rl;">Tesorería</span>',
              template: '<input type="checkbox" />'
            },
            {
              field: "length",
              headerAttributes: {
                style: "text-align:center;"
              },
              attributes: {
                class: "text-center"
              },
              width: 30,
              headerTemplate: '<span style="writing-mode:vertical-rl;">Area cierre</span>',
              template: '<input type="checkbox" />'
            },
            {
              field: "length",
              title: "Tesorería",
              headerAttributes: {
                style: "text-align:center;"
              },
              attributes: {
                class: "text-center"
              },
              width: 30,
              headerTemplate: '<span style="writing-mode:vertical-rl;">Contabilidad</span>',
              template: '<input type="checkbox" />'
            }
          ]
        };
        $scope.autocompleteCuentas = {
            dataSource: {
              transport: {
                read: {
                  url: "../../mocks/conta-plan-cuentas.json",
                  contentType: "application/json; charset=utf-8",
                  dataType: "json"
                }
              }
            },
            dataTextField: 'number',
            filter: "contains",
            placeholder: "Seleccione una cuenta...",
            template: "#: number # - #: name #"
        }
        $scope.cuentasProcesos = {
          dataSource: {
            transport: {
              read: {
                url: "../../mocks/conta-cuentas-asociadas.json",
                contentType: "application/json; charset=utf-8",
                dataType: "json"
              }
            },
            schema: {
              model: {
                id: "number",
                fields: {
                  name: {
                    validation: {
                      required: true
                    }
                  },
                  office: {
                    validation: {
                      required: true
                    }
                  },
                  area: {
                    validation: {
                      required: true
                    }
                  }
                }
              }
            }
          },
          editable: true,
          scrollable: false,
          columns: [
            {
              field: "name",
              title: "Cuenta",
              width: "30%",
              editor: function(container, options) {
                $('<input kendo-combo-box options="autocompleteCuentas"/>').appendTo(container);
              }
            },
            {
              field: "office",
              title: "Oficina",
              width: "30%",
              editor: function(container, options) {
                $('<select kendo-combo-box><option>MATRIZ</option></select>').appendTo(container);
              }
            },
            {
              field: "area",
              title: "Area",
              width: "30%",
              editor: function(container, options) {
                $('<select kendo-combo-box><option>OBLIGACIONES</option></select>').appendTo(container);
              }
            },
            {
              width: 20,
              attributes: {
                "class": "cb-no-wrap"
              },
              template: '<button class="btn btn-default btn-sm" title="Eliminar"><span class="fa fa-times fa-fw"></span></button>'
            }
          ],
          toolbar: '<button class="btn btn-default k-grid-add" ng-click="addPeriod();"><span class="fa fa-plus"></span> Agregar</button>'
        };
        $scope.find = function() {
          $scope.showResults = true;
        };
        $scope.filters = {
          field: [{
              label: "# Asiento",
              id: 2
            },
            {
              label: "Descripción",
              id: 1
            }
          ]
        };
        $scope.gotoSearch = function() {
          location.href = 'busqueda-asientos.html';
        };
        $scope.oficinasAdmin = {
          dataSource: {
            transport: {
              read: {
                url: "../../mocks/oficinas.json",
                contentType: "application/json; charset=utf-8",
                dataType: "json"
              }
            }
          },
          scrollable: false,
          columns: [{
              field: "name",
              title: "Nombre"
            },
            {
              width: 20,
              attributes: {
                "class": "cb-no-wrap"
              },
              template: '<button class="btn btn-default btn-sm" title="Eliminar"><span class="fa fa-times fa-fw"></span></button>'
            }
          ],
          toolbar: '<button class="btn btn-default k-grid-add" ng-click="addReception();"><span class="fa fa-plus"></span> Agregar</button>'
        };
        $scope.areas = new kendo.data.HierarchicalDataSource({
          data: [{
            "code": "1",
            "text": "BANCO COBIS",
            "items": [{
                "code": "22100",
                "text": "Area 1",
              },
              {
                "code": "22200",
                "text": "Area 2",
              },
              {
                "code": "22300",
                "text": "Area 3",
              },
              {
                "code": "22400",
                "text": "Area 4",
              }
            ]
          }],
          schema: {
            model: {
              children: 'items',
              hasChildren: function(item) {
                return item.items && item.items.length > 0;
              }
            }
          }
        });
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
        $scope.oficinas = new kendo.data.HierarchicalDataSource({
          data: [{
            "code": "1",
            "text": "BANCO COBIS",
            "items": [{
                "code": "22100",
                "text": "REGIONAL ANTIOQUIA CONSOLIDADO",
                "items": [{
                    "code": "1300",
                    "text": "REGIONAL ANTIOQUIA PROPIO",
                    "items": []
                  },
                  {
                    "code": "1301",
                    "text": "ANDES",
                    "items": []
                  },
                  {
                    "code": "1302",
                    "text": "ABEJORRAL",
                    "items": []
                  },
                  {
                    "code": "1303",
                    "text": "MEDELLIN JUNIN",
                    "items": []
                  },
                  {
                    "code": "1307",
                    "text": "MEDELLIN AMERICA",
                    "items": []
                  }
                ]
              },
              {
                "code": "22200",
                "text": "REGIONAL BOGOTA CONSOLIDADO",
                "items": [{
                    "code": "70",
                    "text": "AVENIDA JIMENEZ",
                    "items": [{
                        "code": "A",
                        "text": "ATM CAJEROS AUTOMATICOS",
                        "items": []
                      },
                      {
                        "code": "B",
                        "text": "BOVEDA",
                        "items": []
                      },
                      {
                        "code": "D",
                        "text": "DIFERIDO",
                        "items": []
                      },
                      {
                        "code": "E",
                        "text": "DISPENSADOR DE EFECTIVO",
                        "items": []
                      },
                      {
                        "code": "L",
                        "text": "BLINDADO",
                        "items": []
                      },
                      {
                        "code": "M",
                        "text": "MINITESORO",
                        "items": []
                      },
                      {
                        "code": "N",
                        "text": "NORMAL",
                        "items": []
                      },
                      {
                        "code": "V",
                        "text": "CAJAS MOVILES",
                        "items": []
                      },
                      {
                        "code": "X",
                        "text": "CAJAS EXTENDIDAS",
                        "items": []
                      }
                    ]
                  },
                  {
                    "code": "820",
                    "text": "AVENIDA CHILE",
                    "items": []
                  },
                  {
                    "code": "10240",
                    "text": "|CB  CAFE INTERNET BOX",
                    "items": []
                  },
                  {
                    "code": "10496",
                    "text": "CB - DROGUERIA EXPRESS",
                    "items": []
                  },
                  {
                    "code": "10752",
                    "text": "CB - ENVIOS DIMONEX",
                    "items": []
                  }
                ]
              },
              {
                "code": "22300",
                "text": "REGIONAL CAFETERA CONSOLIDADO",
                "items": [{
                    "code": "1800",
                    "text": "REGIONAL CAFETERA PROPIO",
                    "items": []
                  },
                  {
                    "code": "1801",
                    "text": "AGUADAS",
                    "items": []
                  },
                  {
                    "code": "1803",
                    "text": "MANIZALES SUCURSAL",
                    "items": []
                  },
                  {
                    "code": "1812",
                    "text": "NEIRA-CALDAS",
                    "items": []
                  },
                  {
                    "code": "1820",
                    "text": "BELALCAZAR",
                    "items": []
                  }
                ]
              },
              {
                "code": "22400",
                "text": "REGIONAL COSTA CONSOLIDADO",
                "items": [{
                    "code": "1203",
                    "text": "ACHI",
                    "items": []
                  },
                  {
                    "code": "1207",
                    "text": "CARTAGENA SUCURSAL",
                    "items": []
                  },
                  {
                    "code": "1215",
                    "text": "ARJONA",
                    "items": []
                  },
                  {
                    "code": "1216",
                    "text": "CALAMAR",
                    "items": []
                  },
                  {
                    "code": "1218",
                    "text": "MARIA LA BAJA",
                    "items": []
                  }
                ]
              },
              {
                "code": "22500",
                "text": "REGIONAL SANTANDER CONSOLIDADO",
                "items": [{
                    "code": "1244",
                    "text": "MORALES (BOLIVAR)",
                    "items": []
                  },
                  {
                    "code": "1255",
                    "text": "SAN PABLO (BOLIVAR)",
                    "items": []
                  },
                  {
                    "code": "1265",
                    "text": "SIMITI",
                    "items": []
                  },
                  {
                    "code": "1270",
                    "text": "SANTA ROSA DEL SUR",
                    "items": []
                  },
                  {
                    "code": "1394",
                    "text": "YONDO",
                    "items": []
                  }
                ]
              }
            ]
          }],
          schema: {

            model: {
              children: 'items',
              hasChildren: function(item) {
                return item.items.length > 0;
              }
            }
          }
        });
        $scope.oficinasAdmin = {
          dataSource: {
            transport: {
              read: {
                url: "../../mocks/conta-comprobantes.json",
                contentType: "application/json; charset=utf-8",
                dataType: "json"
              }
            }
          },
          scrollable: false,
          columns: [{
              field: "number",
              title: "#"
            },
            {
              field: "number",
              title: "Cuenta"
            },
            {
              field: "number",
              title: "Oficina"
            },
            {
              field: "number",
              title: "Area"
            },
            {
              field: "number",
              title: "Doc"
            },
            {
              width: 20,
              attributes: {
                "class": "cb-no-wrap"
              },
              template: '<button class="btn btn-default btn-sm" title="Eliminar"><span class="fa fa-times fa-fw"></span></button>'
            }
          ],
          toolbar: '<button class="btn btn-default k-grid-add" ng-click="addReception();"><span class="fa fa-plus"></span> Agregar</button>'
        };
        $scope.periods = {
          dataSource: {
            transport: {
              read: {
                url: "../../mocks/conta-periods.json",
                contentType: "application/json; charset=utf-8",
                dataType: "json"
              }
            }
          },
          scrollable: false,
          columns: [{
              field: "code",
              title: "#"
            },
            {
              field: "start",
              title: "Inicia"
            },
            {
              field: "end",
              title: "Finaliza"
            },
            {
              field: "type",
              title: "Tipo"
            },
            {
              field: "status",
              title: "Estado"
            },
            {
              width: 20,
              attributes: {
                "class": "cb-no-wrap"
              },
              template: '<button class="btn btn-default btn-sm" title="Eliminar"><span class="fa fa-times fa-fw"></span></button>'
            }
          ],
          toolbar: '<button class="btn btn-default k-grid-add" ng-click="addPeriod();"><span class="fa fa-plus"></span> Agregar</button>'
        };
        $scope.levels = {
          dataSource: {
            transport: {
              read: {
                url: "../../mocks/conta-levels.json",
                contentType: "application/json; charset=utf-8",
                dataType: "json"
              }
            },
            schema: {
              model: {
                id: "id",
                fields: {
                  id: {
                    editable: false,
                    nullable: true
                  },
                  name: {
                    validation: {
                      required: true
                    }
                  },
                  length: {
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
              field: "id",
              title: "Nivel",
              headerAttributes: {
                style: "text-align:center;"
              },
              attributes: {
                class: "text-center"
              },
              width: 30
            },
            {
              field: "name",
              title: "Nombre"
            },
            {
              field: "length",
              title: "longitud",
              headerAttributes: {
                style: "text-align:center;"
              },
              attributes: {
                class: "text-center"
              },
              width: 30
            },
            {
              width: 20,
              attributes: {
                "class": "cb-no-wrap"
              },
              template: '<button class="btn btn-default btn-sm" title="Eliminar"><span class="fa fa-times fa-fw"></span></button>'
            }
          ],
          toolbar: '<button class="btn btn-default k-grid-add" ng-click="addPeriod();"><span class="fa fa-plus"></span> Agregar</button>'
        };
        $scope.linkAccount = function() {
          $('#add').modal();
        }
        $scope.procesos = {
          dataSource: {
            transport: {
              read: {
                url: "../../mocks/conta-procesos.json",
                contentType: "application/json; charset=utf-8",
                dataType: "json"
              }
            }
          },
          editable: true,
          scrollable: false,
          columns: [{
              field: "id",
              title: " ",
              headerAttributes: {
                style: "text-align:right;"
              },
              attributes: {
                class: "text-right"
              },
              width: 30
            },
            {
              field: "name",
              title: "Nombre"
            },
            {
              width: 20,
              attributes: {
                "class": "cb-no-wrap"
              },
              template: '<button class="btn btn-default btn-sm" ng-click="linkAccount()">Cuentas asociadas</button>'
            }
          ]
        };
        $scope.records = {
          dataSource: {
            transport: {
              read: {
                url: "../../mocks/conta-comprobantes.json",
                contentType: "application/json; charset=utf-8",
                dataType: "json"
              }
            },
            schema: {
              model: {
                fields: {
                  value1: {
                    type: "number"
                  },
                  value2: {
                    type: "number"
                  }
                }
              }
            },
            aggregate: [{
              field: "value1",
              aggregate: "sum"
            }, {
              field: "value2",
              aggregate: "sum"
            }]
          },
          scrollable: false,
          columns: [{
              field: "number",
              title: "#"
            },
            {
              field: "account",
              title: "Cuenta"
            },
            {
              field: "type",
              title: "Tipo"
            },
            {
              field: "type2",
              title: "Tipo cotización"
            },
            {
              field: "office",
              title: "Oficina"
            },
            {
              field: "area",
              title: "Area"
            },
            {
              field: "value1",
              format: '{0:c}',
              attributes: {
                "class": "text-right"
              },
              headerAttributes: {
                "style": "text-align:right;"
              },
              title: "Valor MN.",
              aggregates: ["sum"],
              footerTemplate: '<div class="text-right text-nowrap">Débitos: #= kendo.toString(5000, "c") # USD</div><div class="text-right text-nowrap">Créditos: #= kendo.toString(sum, "c") # USD</div><div class="text-right"><div class="label label-success">Cuadrado</div></div>'
            },
            {
              field: "value2",
              format: '{0:c}',
              attributes: {
                "class": "text-right"
              },
              headerAttributes: {
                "style": "text-align:right;"
              },
              title: "Valor ME.",
              aggregates: ["sum"],
              footerTemplate: '<div class="text-right text-nowrap">#= kendo.toString(5000, "c") # USD</div><div class="text-right text-nowrap">#= kendo.toString(sum, "c") # USD</div><div class="text-right"><div class="label label-danger">No cuadrado</div></div>'
            },
            {
              field: "quote",
              format: '{0:c}',
              attributes: {
                "class": "text-right"
              },
              headerAttributes: {
                "style": "text-align:right;"
              },
              title: "Cotización"
            },
            {
              width: 20,
              attributes: {
                "class": "cb-no-wrap"
              },
              template: '<button class="btn btn-default btn-sm" title="Eliminar"><span class="fa fa-times fa-fw"></span></button>'
            }
          ],
          toolbar: '<button class="btn btn-default k-grid-add" ng-click="addRecord();"><span class="fa fa-plus"></span> Agregar</button>'
        };
        $scope.recordsCarga = angular.copy($scope.records);
        $scope.recordsCarga.scrollable = true;
        $scope.recordsCarga.resizable = true;
        $scope.recordsCarga.height = '400px';
        $scope.recordsCarga.toolbar = '<button class="btn btn-default k-grid-add" ng-click="uploadFile();"><span class="fa fa-upload"></span> Cargar</button>';
        $scope.recordsCarga.columns = [
          {
            field: "number",
            title: "#"
          },
          {
            field: "account",
            title: "Cuenta"
          },
          {
            field: "type",
            title: "Tipo"
          },
          {
            field: "type2",
            title: "Tipo cotización"
          },
          {
            field: "office",
            title: "Of. Origen"
          },
          {
            field: "area",
            title: "Ar. Origen"
          },
          {
            field: "office",
            title: "Of. Destino"
          },
          {
            field: "area",
            title: "Ar. Destino"
          },
          {
            field: "value1",
            format: '{0:c}',
            attributes: {
              "class": "text-right"
            },
            headerAttributes: {
              "style": "text-align:right;"
            },
            title: "Débitos MN.",
            aggregates: ["sum"],
            footerTemplate: '<div class="text-right text-nowrap">Débitos: #= kendo.toString(5000, "c") # USD</div><div class="text-right text-nowrap">Créditos: #= kendo.toString(sum, "c") # USD</div><div class="text-right"><div class="label label-success">Cuadrado</div></div>'
          },
          {
            field: "value2",
            format: '{0:c}',
            attributes: {
              "class": "text-right"
            },
            headerAttributes: {
              "style": "text-align:right;"
            },
            title: "Débitos ME.",
            aggregates: ["sum"],
            footerTemplate: '<div class="text-right text-nowrap">#= kendo.toString(5000, "c") # USD</div><div class="text-right text-nowrap">#= kendo.toString(sum, "c") # USD</div><div class="text-right"><div class="label label-danger">No cuadrado</div></div>'
          },
          {
            field: "value1",
            format: '{0:c}',
            attributes: {
              "class": "text-right"
            },
            headerAttributes: {
              "style": "text-align:right;"
            },
            title: "Créditos MN.",
            aggregates: ["sum"],
            footerTemplate: '<div class="text-right text-nowrap">Débitos: #= kendo.toString(5000, "c") # USD</div><div class="text-right text-nowrap">Créditos: #= kendo.toString(sum, "c") # USD</div><div class="text-right"><div class="label label-success">Cuadrado</div></div>'
          },
          {
            field: "value2",
            format: '{0:c}',
            attributes: {
              "class": "text-right"
            },
            headerAttributes: {
              "style": "text-align:right;"
            },
            title: "Créditos ME.",
            aggregates: ["sum"],
            footerTemplate: '<div class="text-right text-nowrap">#= kendo.toString(5000, "c") # USD</div><div class="text-right text-nowrap">#= kendo.toString(sum, "c") # USD</div><div class="text-right"><div class="label label-danger">No cuadrado</div></div>'
          },
          {
            field: "quote",
            format: '{0:c}',
            attributes: {
              "class": "text-right"
            },
            headerAttributes: {
              "style": "text-align:right;"
            },
            title: "Cotización"
          },
          {
            width: 20,
            attributes: {
              "class": "cb-no-wrap"
            },
            template: '<button class="btn btn-default btn-sm" title="Eliminar"><span class="fa fa-times fa-fw"></span></button>'
          }
        ];
        $scope.selectedField = $scope.filters.field[0];
        $scope.setField = function(field) {
          $scope.selectedField = field;
        }
        $scope.uploadFile = function() {
          messages.alert('Ventana modal de seleccion de archivo.');
        }
        $scope.activate();
      }
    ]);

  //Inicializa angular
  angular.bootstrap(document, ['app']);
});
