require.config(requireConfig);
define(function(require) {
  'use strict';

  // Importación de módulos AMD
  var angular = require('angular'),
    kendo = require('kendo'),
    messages = require('cobis/messages');

  // Importación no son módulos
  require('bootstrap');

  var respondToVisibility = function(element, callback) {
    var options = {
      root: document.documentElement
    }

    var observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        callback(entry.intersectionRatio > 0);
      });
    }, options);

    observer.observe(element);
  };

  $('#portfolios').on('contextmenu', '.k-master-row', function(e) {
    event.preventDefault();
    $('#portfolio').modal();
  });

  var app = angular.module('app', ['kendo.directives'])
    .controller('controller', ['$scope', '$http', '$q', '$filter',
      function($scope, $http, $q, $filter) {
        $scope.activate = function() {
          if ($('#amortizacion2').length>0) {
            respondToVisibility($('#amortizacion2')[0], function() {
              $('#amortizacion2').data('kendoGrid').refresh();
            });
          }
        };
        $scope.addTitle = function() {
          $('#title-search').modal();
        };
        $scope.amortizacion = {
          dataSource: {
            transport: {
              read: "../../mocks/amortizacion.json"
            }
          },
          columns: [{
              field: "number",
              title: "#",
              width: 20,
              attributes: {
                "class": "text-right"
              },
              headerAttributes: {
                "style": "text-align:right;"
              }
            },
            {
              field: "date",
              title: "Fecha"
            },
            {
              field: "capital",
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
              field: "type",
              title: "Tipo"
            },
            {
              field: "status",
              title: "Estado"
            }
          ]
        };
        $scope.amortizacion2 = {
          dataSource: {
            transport: {
              read: "../../mocks/amortizacion.json"
            }
          },
          scrollable: true,
          height: 300,
          columns: [{
              field: "number",
              title: "#",
              width: 20,
              attributes: {
                "class": "text-right"
              },
              headerAttributes: {
                "style": "text-align:right;"
              }
            },
            {
              field: "date",
              title: "Fecha"
            },
            {
              field: "capital",
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
              field: "type",
              title: "Tipo"
            },
            {
              field: "status",
              title: "Estado"
            }
          ]
        };
        $scope.acceptCalc = function() {
          $scope.title.return = 7;
          $('#flow').modal('hide');
          setTimeout(function(){
            $scope.editTitle();
          }, 400);
        };
        $scope.cuadre = $scope.pagos = {
          dataSource: {
            transport: {
              read: {
                url: "../../mocks/mesa-pagos.json",
                contentType: "application/json; charset=utf-8",
                dataType: "json"
              }
            },
            schema: {
              model: {
                fields: {
                  amount: {
                    type: "number"
                  }
                }
              }
            },
            aggregate: [{
              field: "amount",
              aggregate: "sum"
            }]
          },
          scrollable: false,
          detailTemplate: $("#cuadre-detail").length > 0 ? kendo.template($("#cuadre-detail").html()) : kendo.template(''),
          columns: [
            {
              field: "code",
              title: "# Operación"
            },
            {
              field: "paymentMethod",
              title: "Forma de pago/cobro"
            },
            {
              field: "amount",
              title: "Monto Cobro",
              format: '{0:c}',
              attributes: {
                "class": "text-right"
              },
              headerAttributes: {
                "style": "text-align:right;"
              },
              footerTemplate: '<div class="text-right text-nowrap"> #= kendo.toString(sum, "c") #</div>'
            }
            ,
            {
              field: "amount",
              title: "Monto Pago",
              format: '{0:c}',
              attributes: {
                "class": "text-right"
              },
              headerAttributes: {
                "style": "text-align:right;"
              },
              footerTemplate: '<div class="text-right text-nowrap">#= kendo.toString(sum, "c") #</div>'
            }
          ],
          toolbar: '<button class="btn btn-default"><span class="fa fa-search"></span> Buscar</button>'
        };
        $scope.operationFlow = {
          dataSource: {
            transport: {
              read: "../../mocks/amortizacion.json"
            }
          },
          columns: [{
              field: "number",
              title: "#",
              width: 20,
              attributes: {
                "class": "text-right"
              },
              headerAttributes: {
                "style": "text-align:right;"
              }
            },
            {
              field: "date",
              title: "Fecha"
            },
            {
              field: "capital",
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
              field: "capital",
              title: "Valor 2",
              format: "{0:c}",
              attributes: {
                "class": "text-right"
              },
              headerAttributes: {
                "style": "text-align:right;"
              }
            },
            {
              field: "type",
              title: "Tipo"
            },
            {
              field: "status",
              title: "Estado"
            }
          ]
        };
        $scope.operationFlowChart = {
          dataSource: {
            transport: {
              read: {
                url: "../../mocks/amortizacion.json",
                contentType: "application/json; charset=utf-8",
                dataType: "json"
              }
            }
          },
          seriesDefaults: {
            type: 'line'
          },
          series: [{
              name: 'Valor',
              field: 'capital',
              categoryField: 'date',
              labels: {
                visible: true
              }
            },
            {
              name: 'Valor 2',
              field: 'capitalBalance',
              categoryField: 'date',
              labels: {
                visible: true
              }
            }
          ],
          theme: 'metro',
          tooltip: {
            visible: true,
            template: "#= value #"
          },
          legend: {
            position: 'bottom',
            labels: {
              template: "#: text #"
            }
          }
        };
        $scope.submitTitle = function() {
          $scope.header.fields[0].value = $filter('currency')(987654);
          $scope.header.fields[1].value = $filter('currency')(0);
          $scope.header.fields[2].value = $filter('currency')(987654);
          $('#title').modal('hide');
        };
        $scope.calculate = function() {
          setTimeout(function(){
            $scope.showModal('#flow');
          }, 400);
        };
        $scope.editable = true;
        $scope.editTitle = function () {
          $('#title').modal();
        };
        $scope.find = function() {
          $scope.showResults = true;
        };
        $scope.filters = {
          field: [
            {
              label: "# Operación",
              id: 1
            },
            {
              label: "# Portafolio",
              id: 3
            },
            {
              label: "Serie título",
              id: 4
            },
            {
              label: "Código ISIN",
              id: 5
            },
            {
              label: "Nemónico",
              id: 6
            }
          ]
        };
        $scope.filtersPortafolios = {
          field: [
            {
              label: "# Portafolio",
              id: 1
            },
            {
              label: "Serie título",
              id: 3
            }
          ]
        };
        $scope.gotoSearch = function() {
          location.href = 'operaciones-busqueda.html';
        };
        $scope.gotoPortfoliosSearch = function() {
          location.href = 'portafolios-busqueda.html';
        };
        $scope.header = {
          fields: [{
              label: 'Valor efectivo total',
              value: '---',
              opened: true
            },
            {
              label: 'Rubros',
              value: '---',
              opened: true
            },
            {
              label: 'Valor adquisición',
              value: '---',
              opened: true
            }
          ],
          actions: [],
          hideMoreInfo: true
        };
        $scope.operationHeader = {
          primaryText: 'José Martinez Velasco',
          secondaryText: '#0245000345 - Título',
          fields: [{
              label: 'Fecha negociación',
              value: '12/12/2018',
              opened: true
            },
            {
              label: 'Valor operación',
              value: '$500,456.00 USD',
              opened: true
            },
            {
              label: 'Estado',
              value: 'Activo',
              opened: true
            }
          ],
          actions: [
            {
              label: 'Negociar',
              opened: false,
              click: function() {
                //TODO
              }
            }
          ],
          hideMoreInfo: true
        };
        $scope.operationPendingHeader = {
          primaryText: 'International Global Solutions',
          secondaryText: '#0245000345 - Título Valor',
          fields: [
            {
              label: 'Fecha negociación',
              value: '12/12/2018',
              opened: true
            },
            {
              label: 'Monto',
              value: '$10,006.00 USD',
              opened: true
            },
            {
              label: 'Rubros',
              value: '$0.00 USD',
              opened: true
            },
            {
              label: 'Total operación',
              value: '$10,006.00 USD',
              opened: true
            },
            {
              label: 'Estado',
              value: 'Activo',
              opened: true
            },
            {
              label: 'Fecha activación',
              value: '12/12/2018',
              opened: false
            },
            {
              label: 'Moneda',
              value: 'Bolivianos',
              opened: false
            },
            {
              label: 'Operación',
              value: 'Compra',
              opened: false
            },
            {
              label: 'Forma pago / cobro',
              value: 'CUENTA CONTABLE - CC',
              opened: false
            },
            {
              label: 'Trader',
              value: 'ALEXANDRA ABADIANO',
              opened: false
            },
            {
              label: 'Portafolio',
              value: 'Propio',
              opened: false
            },
          ],
          actions: [
            {
              label: 'Rubros',
              opened: false,
              click: function() {
                $('#rubros').modal();
              }
            },
            {
              label: 'Pagos',
              opened: false,
              click: function() {
                $('#pagos').modal();
              }
            },
            {
              label: 'Ejecutar cierre',
              opened: false,
              click: function() {
                //TODO
              }
            },
            {
              label: 'Anular',
              opened: false,
              click: function() {
                //TODO
              }
            },
            {
              label: 'Imprimir',
              opened: false,
              click: function() {
                //TODO
              }
            }
          ]
        };
        $scope.portfolioHeader = {
          primaryText: 'International Global Solutions',
          secondaryText: '#BSON4545467 - Portafolio',
          fields: [
            {
              label: 'Fecha valor',
              value: '12/12/2018',
              opened: true
            },
            {
              label: 'Fecha vencimiento',
              value: '12/12/2018',
              opened: true
            },
            {
              label: 'Monto',
              value: '$10,006.00 USD',
              opened: true
            },
            {
              label: 'Tasa',
              value: '4.5%',
              opened: true
            },
            {
              label: 'Plazo',
              value: '24 meses',
              opened: true
            },
            {
              label: 'Rendimiento',
              value: '30%',
              opened: true
            },
            {
              label: 'Estado',
              value: 'Activo',
              opened: true
            }
          ],
          actions: [
            {
              label: 'Yields',
              opened: false,
              click: function() {

              }
            }
          ],
          hideMoreInfo: true
        };
        $scope.operations = {
          dataSource: {
            transport: {
              read: {
                url: "../../mocks/mesa-operaciones.json",
                contentType: "application/json; charset=utf-8",
                dataType: "json"
              }
            }
          },
          selectable: true,
          change: function() {
            location.href = 'operacion.html';
          },
          columns: [{
            field: "id",
            template: $("#operation").length > 0 ? kendo.template($("#operation").html()) : kendo.template('')
          }],
          toolbar: '<div class="cb-flex cb-middle"><button class="btn btn-primary" ng-if="isAdvanced"><span class="fa fa-search"></span> Buscar</button><div class="cb-flex cb-middle cb-right cb-grow text-right"><div class="text-muted small" style="margin-right:10px;">Exportar:</div><button class="btn btn-default" style="margin:0;" title="Exportar a PDF"><span class="fa fa-file-pdf-o" style="margin:0;"></span></button><button class="btn btn-default" style="margin:0;" title="Exportar a Excel"><span class="fa fa-file-excel-o" style="margin:0;"></span></button></div></div>'
        };
        $scope.operationsPending = {
          dataSource: {
            transport: {
              read: {
                url: "../../mocks/mesa-operaciones.json",
                contentType: "application/json; charset=utf-8",
                dataType: "json"
              }
            }
          },
          selectable: true,
          change: function() {
            location.href = 'operacion-cierre.html';
          },
          columns: [{
            field: "id",
            template: $("#operation").length > 0 ? kendo.template($("#operation").html()) : kendo.template('')
          }],
          toolbar: '<div class="cb-flex cb-middle"><button class="btn btn-primary" ng-if="isAdvanced"><span class="fa fa-search"></span> Buscar</button><div class="cb-flex cb-middle cb-right cb-grow text-right"><div class="text-muted small" style="margin-right:10px;">Exportar:</div><button class="btn btn-default" style="margin:0;" title="Exportar a PDF"><span class="fa fa-file-pdf-o" style="margin:0;"></span></button><button class="btn btn-default" style="margin:0;" title="Exportar a Excel"><span class="fa fa-file-excel-o" style="margin:0;"></span></button></div></div>'
        };
        $scope.operationsDetail = {
          dataSource: {
            transport: {
              read: {
                url: "../../mocks/mesa-operaciones.json",
                contentType: "application/json; charset=utf-8",
                dataType: "json"
              }
            }
          },
          detailTemplate: $("#operation-detail").length > 0 ? kendo.template($("#operation-detail").html()) : kendo.template(''),
          columns: [
            {
              field: 'id',
              title: '# Operación',
              width: 60
            },
            {
              field: 'operationType',
              title: 'Tipo operación',
              width: 60,
            },
            {
              field: 'product',
              title: 'Producto',
              width: 40,
            },
            {
              field: 'customer',
              title: 'Cliente'
            },
            {
              field: 'date',
              title: 'Vencimiento',
              width: 50,
            },
            {
              field: 'amount',
              title: 'Nominal',
              format: '{0:c}',
              attributes: {
                "class": "text-right"
              },
              headerAttributes: {
                "style": "text-align:right;"
              }
            },
            {
              field: 'amount',
              title: 'Efectivo',
              format: '{0:c}',
              attributes: {
                "class": "text-right"
              },
              headerAttributes: {
                "style": "text-align:right;"
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
              template: '<button class="btn btn-default btn-sm" title="Ver" ng-click="showModal(\'\\#flow\', $event); definitioEditable=false;"><span class="fa fa-eye fa-fw"></span></button>'
            }
          ],
          toolbar: '<div class="cb-flex cb-middle"><button class="btn btn-default"><span class="fa fa-search"></span> Buscar</button><div class="cb-flex cb-middle cb-right cb-grow text-right"><div class="text-muted small" style="margin-right:10px;">Exportar:</div><button class="btn btn-default" style="margin:0;" title="Exportar a PDF"><span class="fa fa-file-pdf-o" style="margin:0;"></span></button><button class="btn btn-default" style="margin:0;" title="Exportar a Excel"><span class="fa fa-file-excel-o" style="margin:0;"></span></button></div></div>'
        };
        $scope.taxes = {
          dataSource: {
            transport: {
              read: {
                url: "../../mocks/mesa-cupones.json",
                contentType: "application/json; charset=utf-8",
                dataType: "json"
              }
            }
          },
          columns: [
            {
              field: 'code',
              title: '# Título'
            },
            {
              field: 'emisor',
              title: 'Emisor'
            },
            {
              field: 'currency',
              title: 'Moneda',
              width: 40
            },
            {
              field: 'expire',
              title: 'Fecha de vencimiento'
            },
            {
              field: 'rate',
              title: 'Tasa interés',
              format: '{0:p}',
              attributes: {
                "class": "text-right"
              },
              headerAttributes: {
                "style": "text-align:right;"
              }
            },
            {
              field: 'quantity',
              title: 'Cant.',
              width: 30,
              attributes: {
                "class": "text-right"
              },
              headerAttributes: {
                "style": "text-align:right;"
              }
            },
            {
              field: 'value',
              title: 'Valor unitario',
              format: '{0:c}',
              attributes: {
                "class": "text-right"
              },
              headerAttributes: {
                "style": "text-align:right;"
              }
            },
            {
              field: 'value',
              title: 'Valor real',
              format: '{0:c}',
              attributes: {
                "class": "text-right"
              },
              headerAttributes: {
                "style": "text-align:right;"
              }
            },
            {
              field: 'rate',
              title: 'Tasa real',
              format: '{0:p}',
              attributes: {
                "class": "text-right"
              },
              headerAttributes: {
                "style": "text-align:right;"
              }
            }
          ],
          toolbar: '<div class="cb-flex cb-middle"><button class="btn btn-default"><span class="fa fa-search"></span> Buscar</button><div class="cb-flex cb-middle cb-right cb-grow text-right"><div class="text-muted small" style="margin-right:10px;">Exportar:</div><button class="btn btn-default" style="margin:0;" title="Exportar a PDF"><span class="fa fa-file-pdf-o" style="margin:0;"></span></button><button class="btn btn-default" style="margin:0;" title="Exportar a Excel"><span class="fa fa-file-excel-o" style="margin:0;"></span></button></div></div>'
        };
        $scope.cupones = {
          dataSource: {
            transport: {
              read: {
                url: "../../mocks/mesa-cupones.json",
                contentType: "application/json; charset=utf-8",
                dataType: "json"
              }
            }
          },
          columns: [
            {
              field: 'code',
              title: '# Título'
            },
            {
              field: 'emisor',
              title: 'Emisor'
            },
            {
              field: 'currency',
              title: 'Moneda',
              width: 40
            },
            {
              field: 'expire',
              title: 'Fecha de vencimiento'
            },
            {
              field: 'rate',
              title: 'Tasa interés',
              format: '{0:p}',
              attributes: {
                "class": "text-right"
              },
              headerAttributes: {
                "style": "text-align:right;"
              }
            },
            {
              field: 'quantity',
              title: 'Cant.',
              width: 30,
              attributes: {
                "class": "text-right"
              },
              headerAttributes: {
                "style": "text-align:right;"
              }
            },
            {
              field: 'value',
              title: 'Valor unitario',
              format: '{0:c}',
              attributes: {
                "class": "text-right"
              },
              headerAttributes: {
                "style": "text-align:right;"
              }
            },
            {
              field: 'value',
              title: 'Valor real',
              format: '{0:c}',
              attributes: {
                "class": "text-right"
              },
              headerAttributes: {
                "style": "text-align:right;"
              }
            },
            {
              field: 'rate',
              title: 'Tasa real',
              format: '{0:p}',
              attributes: {
                "class": "text-right"
              },
              headerAttributes: {
                "style": "text-align:right;"
              }
            }
          ],
          toolbar: '<div class="cb-flex cb-middle"><button class="btn btn-default"><span class="fa fa-search"></span> Buscar</button><div class="cb-flex cb-middle cb-right cb-grow text-right"><div class="text-muted small" style="margin-right:10px;">Exportar:</div><button class="btn btn-default" style="margin:0;" title="Exportar a PDF"><span class="fa fa-file-pdf-o" style="margin:0;"></span></button><button class="btn btn-default" style="margin:0;" title="Exportar a Excel"><span class="fa fa-file-excel-o" style="margin:0;"></span></button></div></div>'
        };
        $scope.request = {
          paymentMethod: ''
        };
        $scope.results = {
          dataSource: {
            transport: {
              read: {
                url: "../../mocks/md-titulos.json",
                contentType: "application/json; charset=utf-8",
                dataType: "json"
              }
            }
          },
          selectable: true,
          scrollable: false,
          change: function(e) {
            $('#title-search').modal('hide');
            setTimeout(function(){
              $scope.editTitle();
            }, 400);
          },
          columns: [
            {
              field: "code",
              title: "Código"
            },
            {
              field: "description",
              title: "Descripción"
            }
          ]
        };
        $scope.searchSubmit = function(e) {
          e.preventDefault();
          $scope.showResults = true;
        }
        $scope.selectCustomer = function() {
          $('#customer').modal();
        }
        $scope.setCustomer = function(customer) {
          $scope.request.customer = customer;
          $scope.header.primaryText = customer.name;
          $('#customer').modal('hide');
        };
        $scope.selectedField = $scope.filters.field[0];
        $scope.setField = function(field) {
          $scope.selectedField = field;
        }
        $scope.showModal = function(selector, event) {
          $(selector).modal();
        };
        $scope.submit = function() {
          if (!$scope.request.customer) {
            messages.alert('Debe seleccionar un cliente.');
          }else{
            $scope.header.secondaryText = '#'+$scope.request.customer.id;
            $scope.create = false;
            $scope.editable = false;
            $scope.hideMoreInfo = false;
            messages.alert('Lo transacción se ha registrado con exito.');
          }
        };
        $scope.title = {};
        $scope.portfolios = {
          dataSource: {
            transport: {
              read: {
                url: "../../mocks/md-titulos.json",
                contentType: "application/json; charset=utf-8",
                dataType: "json"
              }
            }
          },
          detailTemplate: $("#titulo-detail").length > 0 ? kendo.template($("#titulo-detail").html()) : kendo.template(''),
          scrollable: false,
          columns: [
            {
              field: "code",
              title: "Código"
            },
            {
              field: "description",
              title: "Título"
            },
            {
              field: "nominalValue",
              format: "{0:c}",
              title: "Valor nominal"
            },
            {
              field: "nominalValue",
              format: "{0:c}",
              title: "Valor efectivo"
            },
            {
              field: "nominalValue",
              format: "{0:c}",
              title: "Valor mercado"
            },
            {
              field: "couponDate",
              title: "Fecha de vencimiento"
            },
            {
              field: "status",
              title: "Estado"
            },
            {
              width: 40,
              attributes: {
                "class": "cb-actions cb-no-wrap"
              },
              template: '<button class="btn btn-default btn-sm" title="Flujo" ng-click="showModal(\'\\#flow\', $event)"><span class="fa fa-line-chart fa-fw"></span></button> <button class="btn btn-default btn-sm" title="Exportar a excel" data-toggle="modal" data-target="\\#export"><span class="fa fa-file-excel-o fa-fw"></span></button>'
            }
          ]
        };
        $scope.portfolios2 = {
          dataSource: {
            transport: {
              read: {
                url: "../../mocks/md-titulos.json",
                contentType: "application/json; charset=utf-8",
                dataType: "json"
              }
            }
          },
          scrollable: false,
          selectable: true,
          change: function() {
            location.href = 'portfolio.html';
          },
          columns: [{
            field: "id",
            template: $("#portfolio").length > 0 ? kendo.template($("#portfolio").html()) : kendo.template('')
          }]
        };
        $scope.titulos = {
          dataSource: {
            transport: {
              read: {
                url: "../../mocks/md-titulos.json",
                contentType: "application/json; charset=utf-8",
                dataType: "json"
              }
            }
          },
          detailTemplate: $("#titulo-detail").length > 0 ? kendo.template($("#titulo-detail").html()) : kendo.template(''),
          scrollable: false,
          columns: [
            {
              field: "code",
              title: "Código"
            },
            {
              field: "description",
              title: "Descripción"
            },
            {
              field: "coupon",
              title: "Cupón"
            },
            {
              field: "couponDate",
              title: "Ultimo cupón"
            },
            {
              field: "period",
              title: "Período"
            },
            {
              field: "excuseCapital",
              title: "Gracia capital"
            },
            {
              field: "nominalValue",
              format: "{0:c}",
              title: "Valor nominal"
            },
            {
              width: 40,
              attributes: {
                "class": "cb-actions cb-no-wrap"
              },
              template: '<button class="btn btn-default btn-sm" title="Flujo" data-toggle="modal" data-target="\\#flow"><span class="fa fa-line-chart fa-fw"></span></button> <button class="btn btn-default btn-sm" title="Exportar a excel"><span class="fa fa-file-excel-o fa-fw"></span></button>'
            }
          ]
        };
        $scope.titulosNotEditable = {
          dataSource: {
            transport: {
              read: {
                url: "../../mocks/md-titulos.json",
                contentType: "application/json; charset=utf-8",
                dataType: "json"
              }
            }
          },
          scrollable: false,
          columns: [
            {
              field: "code",
              title: "Código"
            },
            {
              field: "description",
              title: "Descripción"
            },
            {
              field: "coupon",
              title: "Cupón"
            },
            {
              field: "couponDate",
              title: "Ultimo cupón"
            },
            {
              field: "period",
              title: "Período"
            },
            {
              field: "excuseCapital",
              title: "Gracia capital"
            },
            {
              field: "nominalValue",
              format: "{0:c}",
              title: "Valor nominal"
            }
          ]
        };
        $scope.valoracion = {
          dataSource: {
            transport: {
              read: {
                url: "../../mocks/md-titulos.json",
                contentType: "application/json; charset=utf-8",
                dataType: "json"
              }
            }
          },
          scrollable: false,
          columns: [
            {
              field: "code",
              title: "Número valoración"
            },
            {
              field: "couponDate",
              title: "Fecha valoración",
              attributes: {
                "class": "text-center"
              },
              headerAttributes: {
                "style": "text-align:center;"
              }
            },
            {
              field: "time",
              title: "Hora valoración",
              attributes: {
                "class": "text-center"
              },
              headerAttributes: {
                "style": "text-align:center;"
              }
            },
            {
              field: "nominalValue",
              format: "{0:c}",
              title: "Valor nominal",
              attributes: {
                "class": "text-right"
              },
              headerAttributes: {
                "style": "text-align:right;"
              }
            },
            {
              field: "nominalValue",
              format: "{0:c}",
              title: "Valor mercado",
              attributes: {
                "class": "text-right"
              },
              headerAttributes: {
                "style": "text-align:right;"
              }
            },
            {
              field: "nominalValue",
              format: "{0:c}",
              title: "Valor presente neto",
              attributes: {
                "class": "text-right"
              },
              headerAttributes: {
                "style": "text-align:right;"
              }
            },
            {
              field: "variation",
              format: "{0:c}",
              title: "Variación",
              attributes: {
                "class": "text-right"
              },
              headerAttributes: {
                "style": "text-align:right;"
              },
              template: "<div class=\"#if (data.variation>0) {#text-success# }else{ #text-danger# } #\">#= kendo.toString(data.variation, 'c0') #</div>"
            }
          ],
          toolbar: '<div class="cb-flex cb-middle"><button class="btn btn-default"><span class="fa fa-search"></span> Buscar</button><div class="cb-flex cb-middle cb-right cb-grow text-right"><div class="text-muted small" style="margin-right:10px;">Exportar:</div><button class="btn btn-default" style="margin:0;" title="Exportar a PDF"><span class="fa fa-file-pdf-o" style="margin:0;"></span></button><button class="btn btn-default" style="margin:0;" title="Exportar a Excel"><span class="fa fa-file-excel-o" style="margin:0;"></span></button></div></div>'
        };
        $scope.valoracion2 = {
          dataSource: {
            transport: {
              read: {
                url: "../../mocks/md-titulos.json",
                contentType: "application/json; charset=utf-8",
                dataType: "json"
              }
            },
            pageSize: 1
          },
          scrollable: false,
          columns: [
            {
              field: "code",
              title: "Número valoración"
            },
            {
              field: "couponDate",
              title: "Fecha valoración",
              attributes: {
                "class": "text-center"
              },
              headerAttributes: {
                "style": "text-align:center;"
              }
            },
            {
              field: "time",
              title: "Hora valoración",
              attributes: {
                "class": "text-center"
              },
              headerAttributes: {
                "style": "text-align:center;"
              }
            },
            {
              field: "nominalValue",
              format: "{0:c}",
              title: "Valor nominal",
              attributes: {
                "class": "text-right"
              },
              headerAttributes: {
                "style": "text-align:right;"
              }
            },
            {
              field: "nominalValue",
              format: "{0:c}",
              title: "Valor mercado",
              attributes: {
                "class": "text-right"
              },
              headerAttributes: {
                "style": "text-align:right;"
              }
            },
            {
              field: "nominalValue",
              format: "{0:c}",
              title: "Valor presente neto",
              attributes: {
                "class": "text-right"
              },
              headerAttributes: {
                "style": "text-align:right;"
              }
            },
            {
              field: "variation",
              format: "{0:c}",
              title: "Variación",
              attributes: {
                "class": "text-right"
              },
              headerAttributes: {
                "style": "text-align:right;"
              },
              template: "<div class=\"#if (data.variation>0) {#text-success# }else{ #text-danger# } #\">#= kendo.toString(data.variation, 'c0') #</div>"
            }
          ]
        };
        $scope.valoracionHistorica = {
          dataSource: {
            transport: {
              read: {
                url: "../../mocks/md-titulos.json",
                contentType: "application/json; charset=utf-8",
                dataType: "json"
              }
            }
          },
          seriesDefaults: {
            type: 'line'
          },
          series: [{
              name: 'Valor mercado',
              field: 'nominalValue',
              categoryField: 'couponDate',
              labels: {
                visible: true
              }
            },
            {
              name: 'Valor presente neto',
              field: 'value',
              categoryField: 'couponDate',
              labels: {
                visible: true
              }
            }
          ],
          theme: 'metro',
          tooltip: {
            visible: true,
            template: "#= value #"
          },
          legend: {
            position: 'bottom',
            labels: {
              template: "#: text #"
            }
          }
        };
        $scope.rubros = {
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
              title: "Secuencia"
            },
            {
              field: "account",
              title: "Rubro"
            },
            {
              field: "type",
              title: "Descripción"
            },
            {
              field: "type2",
              title: "Moneda negociación"
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
              title: "Valor negociación",
              footerTemplate: '<div class="text-right text-nowrap">Total: #= kendo.toString(5000, "c") #</div>'
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
              footerTemplate: '<div class="text-right text-nowrap">Total: #= kendo.toString(5000, "c") #</div>'
            },
            {
              width: 20,
              attributes: {
                "class": "cb-actions cb-no-wrap"
              },
              template: '<button class="btn btn-default btn-sm" title="Eliminar"><span class="fa fa-times fa-fw"></span></button>'
            }
          ],
          toolbar: '<button class="btn btn-default k-grid-add"><span class="fa fa-plus"></span> Agregar</button>'
        };
        $scope.pagos = {
          dataSource: {
            transport: {
              read: {
                url: "../../mocks/mesa-pagos.json",
                contentType: "application/json; charset=utf-8",
                dataType: "json"
              }
            },
            schema: {
              model: {
                fields: {
                  amount: {
                    type: "number"
                  }
                }
              }
            },
            aggregate: [{
              field: "amount",
              aggregate: "sum"
            }]
          },
          scrollable: false,
          columns: [{
              field: "paymentMethod",
              title: "Forma de pago"
            },
            {
              field: "currency",
              title: "Moneda"
            },
            {
              field: "bank",
              title: "Institución financiera"
            },
            {
              field: "amount",
              title: "Monto",
              format: '{0:c}',
              attributes: {
                "class": "text-right"
              },
              headerAttributes: {
                "style": "text-align:right;"
              },
              footerTemplate: '<div class="text-right text-nowrap">Total #= kendo.toString(sum, "c") #</div><div class="text-right text-nowrap">Acumulado #= kendo.toString(sum, "c") #</div><div class="text-right text-nowrap">Diferencia #= kendo.toString(0, "c") #</div>'
            },
            {
              width: 20,
              attributes: {
                "class": "cb-actions cb-no-wrap"
              },
              template: '<button class="btn btn-default btn-sm" title="Eliminar"><span class="fa fa-times fa-fw"></span></button>'
            }
          ],
          toolbar: '<button class="btn btn-default" ng-click="setPaymentsMode(\'entity\')"><span class="fa fa-plus"></span> Agregar</button>'
        };
        $scope.setPaymentsMode = function(paymentsMode) {
          $scope.paymentsMode = paymentsMode;
        }
        $scope.activate();
      }
    ]);

  //Inicializa angular
  angular.bootstrap(document, ['app']);
});
