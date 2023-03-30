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
          $http.get('../../mocks/loans.json')
            .then(function(response) {
              $scope.loans = response.data;
            });
          $timeout(function() {
            if ($scope.prioritiesGrid) {
              $scope.prioritiesGrid.table.kendoDraggable({
                filter: "tbody > tr",
                group: "gridGroup",
                threshold: 100,
                hint: function(e) {
                  return $('<div class="k-grid k-widget cb-draggable" style="box-shadow: 0 0 10px 0 rgba(0,0,0,.3); box-sizing:border-box; padding: .5em .6em; padding-left: 39px; width:' + $scope.prioritiesGrid.element.width() + 'px; cursor:move;">' + $scope.prioritiesGrid.dataItem($(e)).description + '</div>');
                }
              });
              $scope.prioritiesGrid.table.kendoDropTarget({
                group: "gridGroup",
                drop: function(e) {
                  e.draggable.hint.hide();
                  var target = $scope.prioritiesGrid.dataSource.getByUid($(e.draggable.currentTarget).data("uid")),
                    dest = $(document.elementFromPoint(e.clientX, e.clientY));

                  if (dest.closest('tr').length > 0 && dest.closest('tr').data("uid")) {
                    dest = $scope.prioritiesGrid.dataSource.getByUid(dest.closest('tr').data("uid"));

                    //not on same item
                    if (target.get("id") !== dest.get("id")) {
                      //reorder the items
                      var tmp = target.get("priority");
                      target.set("priority", dest.get("priority"));
                      dest.set("priority", tmp);

                      $scope.prioritiesGrid.dataSource.sort({
                        field: "priority",
                        dir: "asc"
                      });
                    }
                  }
                }
              });
            }
          }, 300);
        };
        $scope.amortizacion2 = {
          dataSource: {
            transport: {
              read: "../../mocks/amortizacion2.json"
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
              title: "Capital",
              format: "{0:c}",
              attributes: {
                "class": "text-right"
              },
              headerAttributes: {
                "style": "text-align:right;"
              }
            },
            {
              field: "interest",
              title: "Interes",
              format: "{0:c}",
              attributes: {
                "class": "text-right"
              },
              headerAttributes: {
                "style": "text-align:right;"
              }
            },
            {
              field: "comission",
              title: "Comisión",
              format: "{0:c}",
              attributes: {
                "class": "text-right"
              },
              headerAttributes: {
                "style": "text-align:right;"
              }
            },
            {
              field: "value",
              title: "Cuota",
              format: "{0:c}",
              attributes: {
                "class": "text-right"
              },
              headerAttributes: {
                "style": "text-align:right;"
              }
            },
            {
              field: "capitalBalance",
              title: "Saldo final",
              format: "{0:c}",
              attributes: {
                "class": "text-right"
              },
              headerAttributes: {
                "style": "text-align:right;"
              }
            },
            {
              field: "status",
              title: "Estado"
            }
          ]
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
              title: "Capital",
              format: "{0:c}",
              attributes: {
                "class": "text-right"
              },
              headerAttributes: {
                "style": "text-align:right;"
              }
            },
            {
              field: "interest",
              title: "Interes",
              format: "{0:c}",
              attributes: {
                "class": "text-right"
              },
              headerAttributes: {
                "style": "text-align:right;"
              }
            },
            {
              field: "comission",
              title: "Comisión",
              format: "{0:c}",
              attributes: {
                "class": "text-right"
              },
              headerAttributes: {
                "style": "text-align:right;"
              }
            },
            {
              field: "value",
              title: "Cuota",
              format: "{0:c}",
              attributes: {
                "class": "text-right"
              },
              headerAttributes: {
                "style": "text-align:right;"
              }
            },
            {
              field: "capitalBalance",
              title: "Saldo final",
              format: "{0:c}",
              attributes: {
                "class": "text-right"
              },
              headerAttributes: {
                "style": "text-align:right;"
              }
            },
            {
              field: "status",
              title: "Estado"
            }
          ],
          toolbar: '<button class="btn btn-default" data-toggle="modal" data-target="\\#rubros"><span class="fa fa-list"></span> Rubros</button> <button class="btn btn-default k-grid-add"><span class="fa fa-calculator"></span> Simular</button> <button class="btn btn-default k-grid-add"><span class="fa fa-print"></span> Imprimir</button>'
        };
        $scope.amortizacionView = angular.copy($scope.amortizacion);
        $scope.amortizacionView.toolbar = null;
        $scope.goto = function(url) {
          location.href = url;
        };
        $scope.cuota = {
          dataSource: {
            transport: {
              read: "../../mocks/cuota.json"
            }
          },
          height: 200,
          scrollable: true,
          columns: [{
              field: "description",
              title: "Descripción"
            },
            {
              field: "value",
              title: "Valor",
              format: "{0:c}",
              attributes: {
                "class": "text-right"
              },
              headerAttributes: {
                "style": "text-align:right;"
              }
            }
          ]
        };
        $scope.dateTypes = [
          {
            label: 'Fecha de Creación',
            value: 1
          },
          {
            label: 'Fecha de Vencimiento préstamo',
            value: 2
          },
          {
            label: 'Fecha de Vencimiento cuota',
            value: 3
          },
          {
            label: 'Fecha de Reembolso',
            value: 4
          },
          {
            label: 'Fecha de Reajuste',
            value: 5
          },
          {
            label: 'Fecha de Cancelación',
            value: 6
          }
        ];
        $scope.fideicomisosCanjear = {
          dataSource: {
            transport: {
              read: {
                url: "../../mocks/fideicomisos-canjear.json",
                contentType: "application/json; charset=utf-8",
                dataType: "json"
              }
            },
            schema: {
              model: {
                fields: {
                  febuary: {
                    type: "number"
                  },
                  march: {
                    type: "number"
                  },
                  april: {
                    type: "number"
                  },
                  may: {
                    type: "number"
                  },
                  june: {
                    type: "number"
                  }
                }
              }
            },
            aggregate: [{
                field: "february",
                aggregate: "sum"
              },
              {
                field: "march",
                aggregate: "sum"
              },
              {
                field: "april",
                aggregate: "sum"
              },
              {
                field: "may",
                aggregate: "sum"
              },
              {
                field: "june",
                aggregate: "sum"
              }
            ]
          },
          scrollable: false,
          columns: [{
              field: "enabled",
              title: '&nbsp;',
              width: 30,
              headerAttributes: {
                style: "text-align:center;"
              },
              attributes: {
                class: "text-center"
              },
              template: '<input type="checkbox" #= enabled ? "checked=checked" : "" # />'
            },
            {
              field: "customer",
              title: "Cliente"
            },
            {
              field: "expire",
              title: "Vence"
            },
            {
              field: "value",
              title: "Cuota",
              headerAttributes: {
                style: 'text-align: right'
              },
              attributes: {
                class: 'text-right'
              },
              format: '{0:c}'
            },
            {
              field: "number",
              title: "Dividendo Actual",
              headerAttributes: {
                style: 'text-align: center'
              },
              attributes: {
                class: 'text-center'
              }
            },
            {
              field: "bank",
              title: "Banco",
              headerAttributes: {
                style: 'text-align: center'
              },
              attributes: {
                class: 'text-center'
              }
            },
            {
              field: "february",
              title: "Febrero",
              headerAttributes: {
                style: 'text-align: right'
              },
              attributes: {
                class: 'text-right'
              },
              format: '{0:c}',
              aggregates: ['sum'],
              footerTemplate: '<div class="text-right">#: kendo.toString(sum, "c") #</div>'
            },
            {
              field: "march",
              title: "Marzo",
              headerAttributes: {
                style: 'text-align: right'
              },
              attributes: {
                class: 'text-right'
              },
              format: '{0:c}',
              aggregates: ["sum"],
              footerTemplate: '<div class="text-right">#: kendo.toString(sum, "c") #</div>'
            },
            {
              field: "april",
              title: "Abril",
              headerAttributes: {
                style: 'text-align: right'
              },
              attributes: {
                class: 'text-right'
              },
              format: '{0:c}',
              aggregates: ["sum"],
              footerTemplate: '<div class="text-right">#: kendo.toString(sum, "c") #</div>'
            },
            {
              field: "may",
              title: "Mayo",
              headerAttributes: {
                style: 'text-align: right'
              },
              attributes: {
                class: 'text-right'
              },
              format: '{0:c}',
              aggregates: ["sum"],
              footerTemplate: '<div class="text-right">#: kendo.toString(sum, "c") #</div>'
            },
            {
              field: "june",
              title: "Junio",
              headerAttributes: {
                style: 'text-align: right'
              },
              attributes: {
                class: 'text-right'
              },
              format: '{0:c}',
              aggregates: ["sum"],
              footerTemplate: '<div class="text-right">#: kendo.toString(sum, "c") #</div>'
            }
          ],
          toolbar: '<button class="btn btn-default"><span class="fa fa-search"></span> Buscar</button>'
        };
        $scope.fideicomisosCanjear2 = {
          dataSource: {
            transport: {
              read: {
                url: "../../mocks/fideicomisos-canjear.json",
                contentType: "application/json; charset=utf-8",
                dataType: "json"
              }
            }
          },
          selectable: 'multiple',
          scrollable: false,
          columns: [
            {
              field: "customer",
              title: "Cliente"
            },
            {
              field: "expire",
              title: "Vence"
            },
            {
              field: "value",
              title: "Cuota",
              headerAttributes: {
                style: 'text-align: right'
              },
              attributes: {
                class: 'text-right'
              },
              format: '{0:c}'
            },
            {
              field: "number",
              title: "Dividendo Actual",
              headerAttributes: {
                style: 'text-align: center'
              },
              attributes: {
                class: 'text-center'
              }
            },
            {
              field: "bank",
              title: "Banco",
              headerAttributes: {
                style: 'text-align: center'
              },
              attributes: {
                class: 'text-center'
              }
            },
            {
              field: "february",
              title: "Total proyectado",
              headerAttributes: {
                style: 'text-align: right'
              },
              attributes: {
                class: 'text-right'
              },
              format: '{0:c}',
              footerTemplate: '<div class="text-right">#: kendo.toString(sum, "c") #</div>'
            }
          ],
          toolbar: '<button class="btn btn-default"><span class="fa fa-search"></span> Buscar</button> <button class="btn btn-default"><span class="fa fa-check-square-o"></span> Marcar todas</button>'
        };
        $scope.fideicomisosFlujo = {
          dataSource: {
            transport: {
              read: {
                url: "../../mocks/fideicomisos-flow.json",
                contentType: "application/json; charset=utf-8",
                dataType: "json"
              }
            },
            schema: {
              model: {
                fields: {
                  febuary: {
                    type: "number"
                  },
                  march: {
                    type: "number"
                  },
                  april: {
                    type: "number"
                  },
                  may: {
                    type: "number"
                  },
                  june: {
                    type: "number"
                  }
                }
              }
            },
            group: {
              field: "group",
              aggregates: [{
                  field: "february",
                  aggregate: "sum"
                },
                {
                  field: "march",
                  aggregate: "sum"
                },
                {
                  field: "april",
                  aggregate: "sum"
                },
                {
                  field: "may",
                  aggregate: "sum"
                },
                {
                  field: "june",
                  aggregate: "sum"
                }
              ]
            },
            aggregates: [{
                field: "february",
                aggregate: "sum"
              },
              {
                field: "march",
                aggregate: "sum"
              },
              {
                field: "april",
                aggregate: "sum"
              },
              {
                field: "may",
                aggregate: "sum"
              },
              {
                field: "june",
                aggregate: "sum"
              }
            ]
          },
          scrollable: false,
          columns: [{
              field: "group",
              hidden: true,
              groupHeaderTemplate: "#= value #"
            },
            {
              field: "bank",
              title: "Banco"
            },
            {
              field: "number",
              title: "Dividendo Actual",
              headerAttributes: {
                style: 'text-align: center'
              },
              attributes: {
                class: 'text-center'
              }
            },
            {
              field: "february",
              title: "Febrero",
              headerAttributes: {
                style: 'text-align: right'
              },
              attributes: {
                class: 'text-right'
              },
              format: '{0:c}',
              aggregates: ['sum'],
              template: '<div class="text-right #if (data.march<0){#text-danger#}#">#: kendo.toString(data.february, "c") #</div>'
            },
            {
              field: "march",
              title: "Marzo",
              headerAttributes: {
                style: 'text-align: right'
              },
              attributes: {
                class: 'text-right'
              },
              format: '{0:c}',
              aggregates: ["sum"],
              template: '<div class="text-right #if (data.march<0){#text-danger#}#">#: kendo.toString(data.march, "c") #</div>'
            },
            {
              field: "april",
              title: "Abril",
              headerAttributes: {
                style: 'text-align: right'
              },
              attributes: {
                class: 'text-right'
              },
              format: '{0:c}',
              aggregates: ["sum"],
              template: '<div class="text-right #if (data.april<0){#text-danger#}#">#: kendo.toString(data.april, "c") #</div>'
            },
            {
              field: "may",
              title: "Mayo",
              headerAttributes: {
                style: 'text-align: right'
              },
              attributes: {
                class: 'text-right'
              },
              format: '{0:c}',
              aggregates: ["sum"],
              template: '<div class="text-right #if (data.may<0){#text-danger#}#">#: kendo.toString(data.may, "c") #</div>'
            },
            {
              field: "june",
              title: "Junio",
              headerAttributes: {
                style: 'text-align: right'
              },
              attributes: {
                class: 'text-right'
              },
              format: '{0:c}',
              aggregates: ["sum"],
              template: '<div class="text-right #if (data.june<0){#text-danger#}#">#: kendo.toString(data.june, "c") #</div>'
            }
          ]
        };
        $scope.fideicomisosFlujo2 = {
          dataSource: {
            transport: {
              read: {
                url: "../../mocks/amortizacion3.json",
                contentType: "application/json; charset=utf-8",
                dataType: "json"
              }
            },
            pageSize: 15
          },
          pageable: {
              alwaysVisible: false,
              pageSizes: [5, 10, 20, 100]
          },
          scrollable: true,
          columns: [
            {
              field: "date",
              width: 100,
              title: "Período"
            },
            {
              field: "precancelar",
              title: "Precancelar",
              headerAttributes: {
                style: 'text-align: right'
              },
              attributes: {
                class: 'text-right'
              },
              format: '{0:c}',
            },
            {
              field: "operation1",
              title: "Op. #42352345",
              headerAttributes: {
                style: 'text-align: right'
              },
              attributes: {
                class: 'text-right'
              },
              format: '{0:c}'
            },
            {
              field: "operation2",
              title: "Op. #42357654",
              headerAttributes: {
                style: 'text-align: right'
              },
              attributes: {
                class: 'text-right'
              },
              format: '{0:c}'
            },
            {
              field: "operation2",
              title: "Total Op.",
              headerAttributes: {
                style: 'text-align: right'
              },
              attributes: {
                class: 'text-right'
              },
              format: '{0:c}'
            },
            {
              field: "operation2",
              title: "Dif. flujo",
              headerAttributes: {
                style: 'text-align: right'
              },
              attributes: {
                class: 'text-right'
              },
              format: '{0:c}'
            },
            {
              field: "operation2",
              title: "Dif. acumulada",
              headerAttributes: {
                style: 'text-align: right'
              },
              attributes: {
                class: 'text-right'
              },
              format: '{0:c}'
            }
          ]
        };
        $scope.fideicomisosPrecanceladas = {
          dataSource: {
            transport: {
              read: {
                url: "../../mocks/fideicomisos-canjear.json",
                contentType: "application/json; charset=utf-8",
                dataType: "json"
              }
            },
            schema: {
              model: {
                fields: {
                  febuary: {
                    type: "number"
                  },
                  march: {
                    type: "number"
                  },
                  april: {
                    type: "number"
                  },
                  may: {
                    type: "number"
                  },
                  june: {
                    type: "number"
                  }
                }
              }
            },
            aggregate: [{
                field: "february",
                aggregate: "sum"
              },
              {
                field: "march",
                aggregate: "sum"
              },
              {
                field: "april",
                aggregate: "sum"
              },
              {
                field: "may",
                aggregate: "sum"
              },
              {
                field: "june",
                aggregate: "sum"
              }
            ]
          },
          scrollable: false,
          columns: [{
              field: "number",
              title: "Dividendo Precancelar",
              headerAttributes: {
                style: 'text-align: center'
              },
              attributes: {
                class: 'text-center'
              }
            },
            {
              field: "value",
              title: "Cuota",
              headerAttributes: {
                style: 'text-align: right'
              },
              attributes: {
                class: 'text-right'
              },
              format: '{0:c}'
            },
            {
              field: "expire",
              title: "Vence",
              headerAttributes: {
                style: 'text-align: center'
              },
              attributes: {
                class: 'text-center'
              }
            },
            {
              field: "bank",
              title: "Banco",
              headerAttributes: {
                style: 'text-align: center'
              },
              attributes: {
                class: 'text-center'
              }
            },
            {
              field: "february",
              title: "Febrero",
              headerAttributes: {
                style: 'text-align: right'
              },
              attributes: {
                class: 'text-right'
              },
              format: '{0:c}',
              aggregates: ['sum'],
              footerTemplate: '<div class="text-right">#: kendo.toString(sum, "c") #</div>'
            },
            {
              field: "march",
              title: "Marzo",
              headerAttributes: {
                style: 'text-align: right'
              },
              attributes: {
                class: 'text-right'
              },
              format: '{0:c}',
              aggregates: ["sum"],
              footerTemplate: '<div class="text-right">#: kendo.toString(sum, "c") #</div>'
            },
            {
              field: "april",
              title: "Abril",
              headerAttributes: {
                style: 'text-align: right'
              },
              attributes: {
                class: 'text-right'
              },
              format: '{0:c}',
              aggregates: ["sum"],
              footerTemplate: '<div class="text-right">#: kendo.toString(sum, "c") #</div>'
            },
            {
              field: "may",
              title: "Mayo",
              headerAttributes: {
                style: 'text-align: right'
              },
              attributes: {
                class: 'text-right'
              },
              format: '{0:c}',
              aggregates: ["sum"],
              footerTemplate: '<div class="text-right">#: kendo.toString(sum, "c") #</div>'
            },
            {
              field: "june",
              title: "Junio",
              headerAttributes: {
                style: 'text-align: right'
              },
              attributes: {
                class: 'text-right'
              },
              format: '{0:c}',
              aggregates: ["sum"],
              footerTemplate: '<div class="text-right">#: kendo.toString(sum, "c") #</div>'
            }
          ],
          toolbar: '<button class="btn btn-default"><span class="fa fa-search"></span> Buscar</button>'
        };
        $scope.fideicomisosPrecanceladas2 = {
          dataSource: {
            transport: {
              read: {
                url: "../../mocks/fideicomisos-canjear.json",
                contentType: "application/json; charset=utf-8",
                dataType: "json"
              }
            }
          },
          scrollable: false,
          columns: [{
              field: "number",
              title: "Dividendo Precancelar",
              headerAttributes: {
                style: 'text-align: center'
              },
              attributes: {
                class: 'text-center'
              }
            },
            {
              field: "value",
              title: "Cuota",
              headerAttributes: {
                style: 'text-align: right'
              },
              attributes: {
                class: 'text-right'
              },
              format: '{0:c}'
            },
            {
              field: "expire",
              title: "Vence",
              headerAttributes: {
                style: 'text-align: center'
              },
              attributes: {
                class: 'text-center'
              }
            },
            {
              field: "bank",
              title: "Banco",
              headerAttributes: {
                style: 'text-align: center'
              },
              attributes: {
                class: 'text-center'
              }
            },
            {
              field: "february",
              title: "Total proyectado",
              headerAttributes: {
                style: 'text-align: right'
              },
              attributes: {
                class: 'text-right'
              },
              format: '{0:c}',
              footerTemplate: '<div class="text-right">#: kendo.toString(sum, "c") #</div>'
            }
          ],
          toolbar: '<button class="btn btn-default"><span class="fa fa-search"></span> Buscar</button>'
        };
        $scope.selectedDateType = $scope.dateTypes[0];
        $scope.edit = function() {
          messages.alert('Se ha actualizado exitosamente.');
          $scope.editable = false;
        }
        $scope.editPayment = function(type) {
          switch(type) {
            case 'Condonar':
              $('#condonar').modal();
              break;
            case 'Editar':
              $('#editar-pago').modal();
              break;
          }
        }
        $scope.find = function() {
          $scope.showResults = true;
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
              label: "# Operación migrada",
              id: 3
            },
            {
              label: "# Trámite",
              id: 3
            }
          ]
        };
        $scope.finish = function() {
          messages.alert('La operación ha sido creada exitosamente')
            .then(function() {
              location.href = 'detalle.html'
            });
        };
        $scope.gotoSearch = function() {
          location.href = 'busqueda.html';
        };
        $scope.header = {
          primaryText: 'Tapia Andrade Viviana María (Principal)',
          secondaryText: '#0245000345 - Crédito hipotecario',
          fields: [{
              label: 'Monto total',
              value: '90,000.00 USD',
              opened: true
            },
            {
              label: 'Saldo pendiente',
              value: '20,000.00 USD',
              opened: true
            },
            {
              label: 'Producto',
              value: 'Crédito hipotecario',
              opened: true
            },
            {
              label: 'Estado',
              value: 'Vigente',
              opened: true
            },
            {
              label: 'Número de libreta',
              value: '---',
              opened: false
            },
            {
              label: 'Créditos hoy',
              value: '---',
              opened: false
            },
            {
              label: 'Créditos este mes',
              value: '2',
              opened: false
            },
            {
              label: 'Débitos hoy',
              value: '---',
              opened: false
            },
            {
              label: 'Déditos este mes',
              value: '2018-01-01',
              opened: false
            },
            {
              label: 'Tipo de interés',
              value: '---',
              opened: false
            },
            {
              label: 'Cuenta de funcionario',
              value: 'Si',
              opened: false
            },
            {
              label: 'Menor de edad',
              value: 'No',
              opened: false
            },
            {
              label: '# de cuenta migrada',
              value: '0994567554',
              opened: false
            },
            {
              label: 'Oficial',
              value: 'José Melendez',
              opened: false
            },
            {
              label: 'Oficina de apertura',
              value: 'Matriz',
              opened: false
            }
          ],
          actions: [{
              label: 'Actualizar',
              opened: false,
              click: function() {
                $scope.editable = !$scope.editable;
                if ($scope.editable) {
                  $scope.tabs.activateTab($('#tab-deudores'));
                }
              }
            },
            {
              label: 'Imprimir',
              opened: false,
              click: function() {
                $('#imprimir').modal();
              }
            },
            {
              label: '-',
              opened: false
            },
            {
              label: 'Desembolso',
              opened: false,
              click: function() {

              }
            },
            {
              label: 'Desembolso parcial',
              opened: false,
              click: function() {

              }
            },
            {
              label: 'Pago / Cancelación / Precancelación',
              opened: false,
              click: function() {
                location.href = 'pago.html';
              }
            },
            {
              label: 'Pagos no aplicados',
              opened: false,
              click: function() {

              }
            },
            {
              label: '-',
              opened: false
            },
            {
              label: 'Renovación',
              opened: false,
              click: function() {

              }
            },
            {
              label: 'Reajuste',
              opened: false,
              click: function() {

              }
            },
            {
              label: 'Cambio tipo de cartera',
              opened: false,
              click: function() {

              }
            },
            {
              label: '-',
              opened: false
            },
            {
              label: 'Ingreso otros cargos',
              opened: false,
              click: function() {

              }
            },
            {
              label: 'Proyección cuota a pagar',
              opened: false,
              click: function() {
                $('#proyeccion-cuota').modal();
              }
            },
            {
              label: 'Simulación abono',
              opened: false,
              click: function() {
                $('#simulacion-abono').modal();
              }
            },
            {
              label: 'Aplicar fecha valor',
              opened: false,
              click: function() {

              }
            },
            {
              label: 'Reversar transacción',
              opened: false,
              click: function() {

              }
            },
            {
              label: 'Desbloqueo manual',
              opened: false,
              click: function() {

              }
            },
            {
              label: 'Instrucciones operativas',
              opened: false,
              click: function() {

              }
            }
          ]
        };
        $scope.deudores = {
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
        $scope.info = {
          alicuota: -1
        };
        $scope.priorities = {
          dataSource: {
            transport: {
              read: "../../mocks/valores2.json"
            }
          },
          scrollable: false,
          columns: [{
            title: '',
            width: 30,
            template: '<span class="fa fa-arrows"></span>'
          }, {
            field: "description",
            title: "Rubro"
          }]
        };
        $scope.request = {
          type: 'date'
        };
        $scope.rubros = {
          dataSource: {
            transport: {
              read: "../../mocks/rubros.json"
            }
          },
          columns: [{
              field: "concept",
              title: "Concepto",
              attributes: {
                "class": "text-center"
              },
              headerAttributes: {
                "style": "text-align:center;"
              }
            }, {
              field: "payment",
              title: "Forma de pago",
              attributes: {
                "class": "text-center"
              },
              headerAttributes: {
                "style": "text-align:center;"
              }
            }, {
              field: "sign",
              title: "Signo",
              attributes: {
                "class": "text-center"
              },
              headerAttributes: {
                "style": "text-align:center;"
              }
            },
            {
              field: "factor",
              title: "Factor",
              attributes: {
                "class": "text-right"
              },
              headerAttributes: {
                "style": "text-align:right;"
              }
            },
            {
              field: "referencial",
              title: "Referencial",
              attributes: {
                "class": "text-center"
              },
              headerAttributes: {
                "style": "text-align:center;"
              }
            },
            {
              field: "rate",
              title: "Tasa",
              attributes: {
                "class": "text-right"
              },
              headerAttributes: {
                "style": "text-align:right;"
              }
            }
          ],
          selectable: true,
          toolbar: '<button class="btn btn-default k-grid-add" ng-click="addOwner();"><span class="fa fa-plus"></span> Agregar</button>'
        };
        $scope.resumen = {
          title: {
            text: "Pagos"
          },
          legend: {
            position: "bottom"
          },
          tooltip: {
            visible: true,
            template: "#= series.name #: #= kendo.toString(value, 'c0') #"
          },
          valueAxis: {
            labels: {
              format: "{0:c}"
            }
          },
          series: [{
            name: "Capital",
            data: [3907, 230, 50]
          }, {
            name: "Interés y mora",
            data: [200, 150, 0]
          }, {
            name: "Otros",
            data: [150, 50, 0]
          }]
        };
        $scope.condonaciones = {
          dataSource: {
            transport: {
              read: "../../mocks/prestamos-condonaciones.json"
            },
            aggregate: [{
              field: "total",
              aggregate: "sum"
            }]
          },
          scrollable: false,
          columns: [{
              field: "description",
              title: "Descripción",
              width: 150,
              template: '<div class="text-nowrap">#: data.description #</div>'
            }, {
              field: "total",
              title: "Total",
              format: "{0:c}",
              attributes: {
                "class": "text-right"
              },
              headerAttributes: {
                "style": "text-align:right;"
              },
              aggregates: ['sum'],
              footerTemplate: '<div class="text-right">#: kendo.toString(sum, "c") #</div>'
            },
            {
              width: 20,
              headerAttributes: {
                "class": "cb-actions"
              },
              attributes: {
                "class": "cb-actions cb-no-wrap"
              },
              template: '<button class="btn btn-default btn-sm" data-toggle="modal" data-target="\\#condonar" title="Editar"><span class="fa fa-pencil fa-fw"></span></button>'
            }
          ],
          toolbar: '<button class="btn btn-default" data-toggle="modal" data-target="\\#condonar"><span class="fa fa-plus"></span> Agregar</button>'
        };
        $scope.summary = {
          dataSource: {
            transport: {
              read: "../../mocks/valores.json"
            }
          },
          scrollable: true,
          height: 250,
          columns: [{
            field: "type",
            hidden: true,
            groupHeaderTemplate: "#= value #"
          },{
              field: "description",
              title: "Descripción",
              width: 150,
              template: '<div class="text-nowrap">#: data.description #</div>'
            }, {
              field: "vencido",
              title: "Vencido",
              format: "{0:c}",
              attributes: {
                "class": "text-right"
              },
              headerAttributes: {
                "style": "text-align:right;"
              },
              template: '#if (data.type=="Rubros"){# #: kendo.toString(data.vencido, "c") # #}#'
            }, {
              field: "vigente",
              title: "Vigente",
              format: "{0:c}",
              attributes: {
                "class": "text-right"
              },
              headerAttributes: {
                "style": "text-align:right;"
              },
              template: '#if (data.type=="Rubros"){# #: kendo.toString(data.vigente, "c") # #}#'
            }, {
              field: "novigente",
              title: "No vigente",
              format: "{0:c}",
              attributes: {
                "class": "text-right"
              },
              headerAttributes: {
                "style": "text-align:right;"
              },
              template: '#if (data.type=="Rubros"){# #: kendo.toString(data.novigente, "c") # #}#'
            }, {
              field: "total",
              title: "Total",
              format: "{0:c}",
              attributes: {
                "class": "text-right"
              },
              headerAttributes: {
                "style": "text-align:right;"
              },
              template: '<div class="cb-no-wrap">#if (data.sign=="-"){# - #}##: kendo.toString(data.total, "c") #</div>'
            }
          ]
        };
        $scope.summary2 = {
          dataSource: {
            transport: {
              read: "../../mocks/prestamos-pagos-summary.json"
            }
          },
          scrollable: false,
          columns: [{
            field: "type",
            hidden: true,
            groupHeaderTemplate: "#= value #"
          },{
              field: "description",
              title: "Descripción",
              width: 150,
              template: '<div class="text-nowrap">#: data.description #</div>',
              attributes: {
                style:"font-weight:bold;"
              }
            }, {
              field: "vencido",
              title: "Vencido",
              format: "{0:c}",
              attributes: {
                "class": "text-right"
              },
              headerAttributes: {
                "style": "text-align:right;"
              },
              template: '#if (data.type=="Rubros"){# #: kendo.toString(data.vencido, "c") # #}#'
            }, {
              field: "vigente",
              title: "Vigente",
              format: "{0:c}",
              attributes: {
                "class": "text-right"
              },
              headerAttributes: {
                "style": "text-align:right;"
              },
              template: '#if (data.type=="Rubros"){# #: kendo.toString(data.vigente, "c") # #}#'
            }, {
              field: "novigente",
              title: "No vigente",
              format: "{0:c}",
              attributes: {
                "class": "text-right"
              },
              headerAttributes: {
                "style": "text-align:right;"
              },
              template: '#if (data.type=="Rubros"){# #: kendo.toString(data.novigente, "c") # #}#'
            }, {
              field: "total",
              title: "Total",
              format: "{0:c}",
              attributes: {
                "class": "text-right"
              },
              headerAttributes: {
                "style": "text-align:right;"
              },
              template: '<div class="cb-no-wrap">#if (data.sign=="-"){# - #}##: kendo.toString(data.total, "c") #</div>'
            }
          ]
        };
        $scope.payments = {
          dataSource: {
            transport: {
              read: "../../mocks/prestamos-pagos.json"
            },
            aggregate: [{
              field: "total",
              aggregate: "sum"
            }]
          },
          scrollable: false,
          columns: [{
              field: "description",
              title: "Descripción",
              width: 150,
              template: '<div class="text-nowrap">#: data.description #</div>'
            }, {
              field: "total",
              title: "Total",
              format: "{0:c}",
              attributes: {
                "class": "text-right"
              },
              headerAttributes: {
                "style": "text-align:right;"
              },
              aggregates: ['sum'],
              footerTemplate: '<div class="text-right">#: kendo.toString(sum, "c") #</div>'
            },
            {
              width: 20,
              headerAttributes: {
                "class": "cb-actions"
              },
              attributes: {
                "class": "cb-actions cb-no-wrap"
              },
              template: '<button class="btn btn-default btn-sm" ng-click="editPayment(\'Editar\')" title="Editar"><span class="fa fa-pencil fa-fw"></span></button>'
            }
          ],
          toolbar: '<button class="btn btn-default" data-toggle="modal" data-target="\\#editar-pago"><span class="fa fa-plus"></span> Agregar</button>'
        };
        $scope.sobrante = {
          dataSource: {
            transport: {
              read: "../../mocks/prestamos-pagos.json"
            },
            aggregate: [{
              field: "total",
              aggregate: "sum"
            }]
          },
          scrollable: false,
          columns: [{
              field: "description",
              title: "Descripción",
              width: 150,
              template: '<div class="text-nowrap">#: data.description #</div>'
            }, {
              field: "total",
              title: "Total",
              format: "{0:c}",
              attributes: {
                "class": "text-right"
              },
              headerAttributes: {
                "style": "text-align:right;"
              },
              aggregates: ['sum'],
              footerTemplate: '<div class="text-right">#: kendo.toString(sum, "c") #</div>'
            },
            {
              width: 20,
              headerAttributes: {
                "class": "cb-actions"
              },
              attributes: {
                "class": "cb-actions cb-no-wrap"
              },
              template: '<button class="btn btn-default btn-sm" data-toggle="modal" data-target="\\#sobrante" title="Editar"><span class="fa fa-pencil fa-fw"></span></button>'
            }
          ],
          toolbar: '<button class="btn btn-default" data-toggle="modal" data-target="\\#sobrante"><span class="fa fa-plus"></span> Agregar</button>'
        };
        $scope.selectedField = $scope.filters.field[0];
        $scope.setField = function(field) {
          $scope.selectedField = field;
        }
        $scope.setDateType = function(dateType) {
          $scope.selectedDateType = dateType;
        }
        $scope.selectedCurrency = 'USD';
        $scope.activate();
      }
    ]);

  //Inicializa angular
  angular.bootstrap(document, ['app']);
});
