require.config(requireConfig);
define(function (require) {
  'use strict';

  // Importaci&oacute;n de m&oacute;dulos AMD
  var angular = require('angular'),
    kendo = require('kendo'),
    messages = require('cobis/messages');

  require('bootstrap');
  //require('cobis/ValidateLayout');

  var app = angular.module('app', ['kendo.directives'])
    .controller('controller', ['$scope', '$http', '$q', '$timeout',
      function ($scope, $http, $q, $timeout) {
        $scope.type = 'status';
        $scope.statusGrid = {
          dataSource: [
            { code: 102, terminal: 'CajaCMR0001', status: 'Activo' },
            { code: 102, terminal: 'CajaCMR0244', status: 'Activo' },
            { code: 102, terminal: 'CajaCMR0754', status: 'Cerrado' },
            { code: 106, terminal: 'CajaCMR0012', status: 'Cerrado' },
            { code: 106, terminal: 'CajaCMR0545', status: 'Activo' },
            { code: 456, terminal: 'CajaCMR0465', status: 'Cerrado' },
            { code: 456, terminal: 'CajaCMR0756', status: 'Cerrado' },
            { code: 456, terminal: 'CajaCMR0751', status: 'Cerrado' },
            { code: 241, terminal: 'CajaCMR0655', status: 'En Proceso' },
            { code: 241, terminal: 'CajaCMR0244', status: 'Activo' }
          ],
          scrollable: false,
          columns: [{
            field: "code",
            width: 130,
            title: "Código sucursal",
            headerAttributes: {
              "style": "text-align: center;"
            },
            attributes: {
              "class": "text-center"
            }
          }, {
            field: "terminal",
            title: "Terminal"
          }, {
            field: "status",
            width: 90,
            title: "Estado",
            headerAttributes: {
              "style": "text-align: center;"
            },
            attributes: {
              "class": "text-center"
            },
            template: '<div class="label #if (data.status === "Activo") {#label-success#} else if (data.status === "En Proceso") {#label-warning#} else {#label-danger#}#" style="margin: auto; padding: 4px; width: 70px; display: block; font-size: 11px; text-align: center;">#: data.status #</div>'
          }
          ]
        };
        $scope.statusChart = {
          seriesDefaults: { type: 'pie' },
          legend: {
            position: 'bottom'
          },
          series: [{
            type: "donut",
            startAngle: 150,
            padding: 0,
            data: [{
              category: "Activo",
              value: 30,
              color: "#5cb85c",
            }, {
              category: "Cerrado",
              value: 60,
              color: "#d9534f"
            }, {
              category: "En Proceso",
              value: 10,
              color: "#f0ad4e"
            }]
          }],
          tooltip: {
            visible: true,
            format: "{0}%"
          }
        };
        $scope.missingGrid = {
          dataSource: {
            transport: {
              read: {
                url: '../../mocks/missing.json'
              }
            },
            aggregate: [
              { field: "amount", aggregate: "sum" },
              { field: "count", aggregate: "sum" }
            ],
            group: {
              field: "currency",
              dir: "desc",
              aggregates: [
                { field: "amount", aggregate: "sum" },
                { field: "count", aggregate: "sum" }
              ]
            }
          },
          scrollable: false,
          columns: [{
            field: "currency",
            title: "Moneda",
            hidden: true
          }, {
            field: "office",
            title: "Oficina"
          }, {
            field: "amount",
            title: "Monto",
            headerAttributes: {
              "style": "text-align: right;"
            },
            attributes: {
              "class": "text-right"
            },
            groupFooterTemplate: '<div class="text-right">#=sum#</div>',
            footerTemplate: '<div class="text-right">#=sum#</div>',
            aggregates: ["sum"]
          }, {
            field: "count",
            title: "Cantidad",
            headerAttributes: {
              "style": "text-align: right;"
            },
            attributes: {
              "class": "text-right"
            },
            groupFooterTemplate: '<div class="text-right">#=sum#</div>',
            footerTemplate: '<div class="text-right">#=sum#</div>',
            aggregates: ["sum"]
          }
          ]
        };
        $scope.missingChart = {
          seriesDefaults: { type: 'bar' },
          dataSource: {
            transport: {
              read: {
                url: '../../mocks/missing.json'
              }
            },
            aggregate: [
              { field: "amount", aggregate: "sum" },
              { field: "count", aggregate: "sum" }
            ],
            group: {
              field: "currency",
              dir: "desc",
              aggregates: [
                { field: "amount", aggregate: "sum" },
                { field: "count", aggregate: "sum" }
              ]
            }
          },
          legend: {
            position: 'bottom'
          },
          series: [
            { categoryField: 'office', field: 'count' }
          ],
          tooltip: {
            visible: true,
            format: "{0}%"
          }
        };
        $scope.transactionsChart1 = {
          seriesDefaults: { type: 'bar' },
          dataSource: {
            transport: {
              read: {
                url: '../../mocks/missing.json'
              }
            }
          },
          legend: {
            position: 'bottom'
          },
          series: [
            { categoryField: 'status', field: 'count' },
            { categoryField: 'status', field: 'amount' }
          ],
          tooltip: {
            visible: true,
            format: "{0}"
          }
        };
        $scope.transactionsChart2 = {
          seriesDefaults: { type: 'bar' },
          dataSource: {
            transport: {
              read: {
                url: '../../mocks/missing.json'
              }
            },
            aggregate: [
              { field: "amount", aggregate: "sum" },
              { field: "count", aggregate: "sum" }
            ],
            group: {
              field: "currency",
              dir: "desc",
              aggregates: [
                { field: "amount", aggregate: "sum" },
                { field: "count", aggregate: "sum" }
              ]
            }
          },
          legend: {
            position: 'bottom'
          },
          series: [
            { categoryField: 'office', field: 'count' }
          ],
          tooltip: {
            visible: true,
            format: "{0}%"
          }
        };
        $scope.transactionsChart3 = {
          title: {
            position: "bottom",
            text: "Transacciones anuladas por importe"
          },
          legend: {
            visible: false,
            position: "top"
          },
          seriesDefaults: {
            type: "donut",
            startAngle: 150
          },
          series: [{
            data: [{
              category: "Realizadas",
              value: 30.8
            }, {
              category: "Anuladas",
              value: 69.2
            }],
            labels: {
              visible: true,
              background: "transparent",
              position: "outsideEnd",
              template: "#= category #: \n #= value#%"
            }
          }],
          tooltip: {
            visible: true,
            template: "#= category # (#= series.name #): #= value #%"
          }
        };
        $scope.transactionsGrid = {
          dataSource: {
            transport: {
              read: {
                url: '../../mocks/missing.json'
              }
            },
            aggregate: [
              { field: "amount", aggregate: "sum" },
              { field: "count", aggregate: "sum" }
            ],
            group: {
              field: "currency",
              dir: "desc",
              aggregates: [
                { field: "amount", aggregate: "sum" },
                { field: "count", aggregate: "sum" }
              ]
            }
          },
          scrollable: false,
          columns: [{
            field: "currency",
            title: "Moneda",
            hidden: true
          }, {
            field: "office",
            title: "Oficina"
          }, {
            field: "amount",
            title: "Monto",
            headerAttributes: {
              "style": "text-align: right;"
            },
            attributes: {
              "class": "text-right"
            },
            groupFooterTemplate: '<div class="text-right">#=sum#</div>',
            footerTemplate: '<div class="text-right">#=sum#</div>',
            aggregates: ["sum"]
          }, {
            field: "count",
            title: "Anuladas",
            headerAttributes: {
              "style": "text-align: right;"
            },
            attributes: {
              "class": "text-right"
            },
            groupFooterTemplate: '<div class="text-right">#=sum#</div>',
            footerTemplate: '<div class="text-right">#=sum#</div>',
            aggregates: ["sum"]
          }
          ]
        };
        $scope.balanceGrid = {
          dataSource: [
            { warehouse: 'Saldos Soles', office: 32647745.40, atm: 30727720.00, transport: 35899774.88 },
            { warehouse: 'Saldos Dólares', office: 1852969.00, atm: 462080.00, transport: 2724661.83 },
            { warehouse: 'Saldos Dólarizados', office: 11746225.18, atm: 9773510.30, transport: 13603381.49 }
          ],
          scrollable: false,
          columns: [{
            field: "warehouse",
            title: "Tipo de bóveda"
          }, {
            field: "office",
            title: "Sucursales",
            format: "{0:c}",
            headerAttributes: {
              "style": "text-align: right;"
            },
            attributes: {
              "class": "text-right"
            }
          }, {
            field: "atm",
            title: "ATMs",
            format: "{0:c}",
            headerAttributes: {
              "style": "text-align: right;"
            },
            attributes: {
              "class": "text-right"
            }
          }, {
            field: "transport",
            title: "Transportadora",
            format: "{0:c}",
            headerAttributes: {
              "style": "text-align: right;"
            },
            attributes: {
              "class": "text-right"
            }
          }
          ]
        };
        $scope.balanceChart = {
          seriesDefaults: { type: 'pie' },
          legend: {
            visible: false
          },
          series: [{
            type: "donut",
            startAngle: 150,
            name: 'Dólares',
            data: [{
              category: "Sucursales",
              value: 30
            }, {
              category: "ATMs",
              value: 60
            }, {
              category: "Transportadora",
              value: 10
            }],
            labels: {
              visible: true,
              background: "transparent",
              position: "outsideEnd",
              template: "#= category #(#= series.name #): \n #= value#%"
            }
          }, {
            type: "donut",
            startAngle: 150,
            padding: 0,
            name: 'Soles',
            data: [{
              category: "Sucursales",
              value: 12
            }, {
              category: "ATMs",
              value: 67
            }, {
              category: "Transportadora",
              value: 21
            }],
            labels: {
              visible: true,
              background: "transparent",
              position: "outsideEnd",
              template: "#= category #(#= series.name #): \n #= value#%"
            }
          }]
        };
        $scope.officesChart = {
          legend: {
              visible: false
          },
          seriesDefaults: {
              type: "bar",
              stack: true
          },
          series: [{
              name: "Saldo Dolarizado",
              data: [40, 32, 34, 36, 45, 33, 34, 83, 36, 37],
              color: "#5cb85c"
          }, {
              name: "Monto Exceso",
              data: [19, 25, 21, 26, 28, 31, 35, 60, 31, 34],
              color: "#d9534f"
          }],
          valueAxis: {
              max: 180,
              line: {
                  visible: false
              },
              minorGridLines: {
                  visible: true
              }
          },
          categoryAxis: {
              categories: ['SUL Sullana CF TT', 'AQP Porongoche CF', 'AQP Porongoche CF SF', 'AQP Cayma CF SF', 'SJL Tusilagos CF SF', 'SM San Miguel CF SF', 'PIU Saga Falabella CF', 'PIU Irazola', '	ICA Quinde', 'CHI Real Plaza'],
              majorGridLines: {
                  visible: false
              }
          },
          tooltip: {
              visible: true,
              template: "#= series.name #: #= value #"
          }
      };
        $scope.officesGrid = {
          dataSource: [
            { "code": 102, "status": "Realizadas", "code": 102, "currency": "PEN", "office": "SUL Sullana CF TT", "amount": 67, "count": 1 },
            { "code": 876, "status": "Realizadas", "code": 102, "currency": "PEN", "office": "AQP Porongoche CF", "amount": 67, "count": 1 },
            { "code": 425, "status": "Anuladas", "code": 102, "currency": "PEN", "office": "AQP Porongoche CF SF", "amount": 65, "count": 1 },
            { "code": 567, "status": "Realizadas", "code": 106, "currency": "PEN", "office": "AQP Cayma CF SF", "amount": 24, "count": 4 },
            { "code": 456, "status": "Realizadas", "code": 106, "currency": "PEN", "office": "SJL Tusilagos CF SF", "amount": 12, "count": 6 },
            { "code": 224, "status": "Realizadas", "code": 456, "currency": "PEN", "office": "SM San Miguel CF SF", "amount": 5, "count": 1 },
            { "code": 122, "status": "Realizadas", "code": 456, "currency": "PEN", "office": "PIU Saga Falabella CF", "amount": 56, "count": 2 },
            { "code": 565, "status": "Anuladas", "code": 456, "currency": "PEN", "office": "PIU Irazola", "amount": 25, "count": 6 },
            { "code": 195, "status": "Anuladas", "code": 241, "currency": "PEN", "office": "ICA Quinde", "amount": 15, "count": 6 },
            { "code": 266, "status": "Anuladas", "code": 241, "currency": "PEN", "office": "CHI Real Plaza", "amount": 18, "count": 1 }
          ],
          scrollable: false,
          columns: [{
            field: "code",
            width: 130,
            title: "Código sucursal",
            headerAttributes: {
              "style": "text-align: center;"
            },
            attributes: {
              "class": "text-center"
            }
          }, {
            field: "office",
            title: "Sucursal"
          }, {
            field: "count",
            title: "Límie",
            headerAttributes: {
              "style": "text-align: right;"
            },
            attributes: {
              "class": "text-right"
            }
          }, {
            field: "amount",
            title: "Saldo Dolarizado",
            format: "{0:c}",
            headerAttributes: {
              "style": "text-align: right;"
            },
            attributes: {
              "class": "text-right"
            }
          }, {
            field: "amount",
            title: "Monto Exceso",
            format: "{0:c}",
            headerAttributes: {
              "style": "text-align: right;"
            },
            attributes: {
              "class": "text-right"
            }
          }, {
            field: "amount",
            title: "% Exceso",
            format: "{0:p}",
            headerAttributes: {
              "style": "text-align: right;"
            },
            attributes: {
              "class": "text-right text-danger"
            }
          }
          ]
        };
      }
    ]);

  //Inicializa angular
  angular.bootstrap(document, ['app']);
});
