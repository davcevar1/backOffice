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
          $http.get('../../mocks/cta-accounts.json')
            .then(function(response) {
              $scope.results = response.data;
            });
        };
        $scope.addCondition = function() {
          $('#conditions').modal();
        };
        $scope.accounts = {
          dataSource: {
            transport: {
              read: {
                url: "../../mocks/cta-accounts.json",
                contentType: "application/json; charset=utf-8",
                dataType: "json"
              }
            }
          },
          scrollable: false,
          selectable: true,
          change: function() {
            location.href = 'detalle.html';
          },
          columns: [{
            field: "id",
            template: $("#account").length > 0 ? kendo.template($("#account").html()) : kendo.template('')
          }],
          toolbar: '<div class="cb-flex cb-middle"><button class="btn btn-primary" ng-if="isAdvanced"><span class="fa fa-search"></span> Buscar</button><div class="cb-flex cb-middle cb-right cb-grow text-right"><div class="text-muted small" style="margin-right:10px;">Exportar:</div><button class="btn btn-default" style="margin:0;" title="Exportar a PDF"><span class="fa fa-file-pdf-o" style="margin:0;"></span></button><button class="btn btn-default" style="margin:0;" title="Exportar a Excel"><span class="fa fa-file-excel-o" style="margin:0;"></span></button></div></div>'
        };
        $scope.savingPlanSummary = {
          dataSource: {
            transport: {
              read: {
                url: "../../mocks/cta-saving-plan-summary.json",
                contentType: "application/json; charset=utf-8",
                dataType: "json"
              }
            }
          },
          scrollable: false,
          columns: [{
            field: "label",
            title: "Etiqueta",
            attributes: {
              style: 'font-weight: bold;'
            }
          }, {
            field: "value",
            title: "Valor",
            headerAttributes: {
              syle: 'text-align: right !important;'
            },
            attributes: {
              class: 'text-right'
            }
          }]
        };
        $scope.savingPlanDetail = {
          dataSource: {
            transport: {
              read: {
                url: "../../mocks/cta-saving-plan-detail.json",
                contentType: "application/json; charset=utf-8",
                dataType: "json"
              }
            }
          },
          scrollable: false,
          columns: [{
            field: "expirationDate",
            title: "Fecha de vencimiento"
          }, {
            field: "value",
            title: "Valor a depositar",
            format: "\{0:c\} USD",
            headerAttributes: {
              syle: 'text-align: right !important;'
            },
            attributes: {
              class: 'text-right'
            }
          }, {
            field: "depositDate",
            title: "Fecha de depósito"
          }, {
            field: "value2",
            title: "Valor a depositar",
            format: "\{0:c\} USD",
            headerAttributes: {
              syle: 'text-align: right !important;'
            },
            attributes: {
              class: 'text-right'
            }
          }, {
            field: "rate",
            title: "Interés preferencial",
            headerAttributes: {
              syle: 'text-align: right !important;'
            },
            attributes: {
              class: 'text-right'
            }
          }]
        };
        $scope.balance = 'Agencia';
        $scope.conditions = {
          dataSource: {
            transport: {
              read: {
                url: "../../mocks/dpf-conditions.json",
                contentType: "application/json; charset=utf-8",
                dataType: "json"
              }
            }
          },
          scrollable: false,
          columns: [{
              field: "type",
              title: "Tipo"
            },
            {
              field: "owners",
              title: "Beneficiarios"
            },
            {
              width: 40,
              attributes: {
                "class": "cb-no-wrap"
              },
              template: '<button class="btn btn-default btn-sm" title="Firmas" ng-click="showSignatures();"><span class="fa fa-picture-o fa-fw"></span></button> <button class="btn btn-default btn-sm" title="Eliminar" ng-click="removeCondition();"><span class="fa fa-times fa-fw"></span></button>'
            }
          ],
          toolbar: '<button class="btn btn-default k-grid-add" ng-click="addCondition();"><span class="fa fa-plus"></span> Agregar</button>'
        };
        $scope.currency = 'USD';
        $scope.filters = {
          field: [{
              label: "Cliente",
              id: 1
            },
            {
              label: "# Operación",
              id: 2
            }
          ]
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
        $scope.gotoSearch = function() {
          location.href = 'busqueda.html';
        };
        $scope.header = {
          primaryText: 'Tapia Andrade Viviana María (Principal)',
          secondaryText: '#0245000345 - Maxiahorro',
          fields: [{
              label: 'Saldo a girar',
              value: '20,000.00 USD',
              opened: true
            },
            {
              label: 'Saldo disponible',
              value: '20,000.00 USD',
              opened: true
            },
            {
              label: 'Saldo contable',
              value: '21,000.00 USD',
              opened: true
            },
            {
              label: 'Saldo interés',
              value: '1,230.00 USD',
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
                  $scope.tabs.activateTab($('#tab-clientes'));
                }
              }
            },
            {
              label: 'Emitir certificado',
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
              label: 'Bloqueo de valores',
              opened: false,
              click: function() {
                $scope.showModal('value-block');
              }
            },
            {
              label: 'Bloqueo de movimientos',
              opened: false,
              click: function() {
                $scope.showModal('movements-block');
              }
            },
            {
              label: 'Encaje bancario',
              opened: false,
              click: function() {

              }
            },
            {
              label: '-',
              opened: false
            },
            {
              label: 'Canje de libreta',
              opened: false,
              click: function() {

              }
            },
            {
              label: 'Anulación de libreta',
              opened: false,
              click: function() {

              }
            },
            {
              label: 'Reimpresión de libreta',
              opened: false,
              click: function() {

              }
            },
            {
              label: 'Lineas pendientes por imprimir',
              opened: false,
              click: function() {

              }
            },
            {
              label: '-',
              opened: false
            },
            {
              label: 'Reactivar cuenta',
              opened: false,
              click: function() {

              }
            },
            {
              label: 'Reapertura de cuenta',
              opened: false,
              click: function() {

              }
            },
            {
              label: 'Estado de cuenta',
              opened: false,
              click: function() {

              }
            },
            {
              label: 'Estado de cuenta con costo',
              opened: false,
              click: function() {

              }
            },
            {
              label: '-',
              opened: false
            },
            {
              label: 'Servicios adicionales',
              opened: false,
              click: function() {

              }
            },
            {
              label: 'Asociar cuentas',
              opened: false,
              click: function() {

              }
            },
            {
              label: 'Plan de ahorros',
              opened: false,
              click: function() {
                $('#saving-plan').modal();
              }
            },
            {
              label: 'Valores en suspenso',
              opened: false,
              click: function() {

              }
            },
            {
              label: 'Cheques remesas',
              opened: false,
              click: function() {

              }
            },
            {
              label: 'Formulario de licitud pendiente',
              opened: false,
              click: function() {

              }
            }
          ]
        };
        $scope.owners = {
          dataSource: {
            transport: {
              read: {
                url: "../../mocks/dpf-owners.json",
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
                      value: "Principal",
                      label: "Principal"
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
                          url: "../../mocks/dpf-roles.json",
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
        $scope.moneyActivity = {
          dataSource: {
            transport: {
              read: {
                url: "../../mocks/dpf-money-activity.json",
                contentType: "application/json; charset=utf-8",
                dataType: "json"
              }
            }
          },
          scrollable: false,
          columns: [{
              field: "date",
              title: "Fecha"
            }, {
              field: "cause",
              title: "causa"
            },
            {
              field: "office",
              title: "Oficina"
            },
            {
              field: "transaction",
              title: "Descripción"
            },
            {
              field: "operation",
              title: "+ / -"
            },
            {
              field: "amount",
              title: "Monto",
              format: "\{0:c\} USD",
              attributes: {
                "class": "text-right"
              },
              headerAttributes: {
                "style": "text-align:right;"
              }
            },
            {
              field: "balanceAvailable",
              title: "Saldo disponible",
              format: "\{0:c\} USD",
              attributes: {
                "class": "text-right"
              },
              headerAttributes: {
                "style": "text-align:right;"
              }
            },
            {
              field: "balance",
              title: "Saldo contable",
              format: "\{0:c\} USD",
              attributes: {
                "class": "text-right"
              },
              headerAttributes: {
                "style": "text-align:right;"
              }
            },
            {
              field: "interest",
              title: "Interés",
              format: "\{0:c\} USD",
              attributes: {
                "class": "text-right"
              },
              headerAttributes: {
                "style": "text-align:right;"
              }
            },
            {
              field: "reference",
              title: "Reference"
            },
            {
              field: "user",
              title: "Usuario"
            }
          ]
        };
        $scope.valueBlock = {
          dataSource: {
            transport: {
              read: {
                url: "../../mocks/cta-value-block.json",
                contentType: "application/json; charset=utf-8",
                dataType: "json"
              }
            },
            schema: {
              model: {
                id: "id",
                fields: {
                  date: {
                    editable: false
                  }
                }
              }
            }
          },
          editable: true,
          scrollable: false,
          columns: [
            {
              field: "cause",
              title: "Causa",
              width: 300,
              editor: function(container, options) {
                $('<select kendo-combo-box><option>POR MAL MANEJO DE LA LIBRETA</option></select>').appendTo(container);
              }
            },
            {
              field: "value",
              title: "Valor",
              format: "\{0:c\} USD",
              width: 100,
              attributes: {
                "class": "text-right"
              },
              headerAttributes: {
                "style": "text-align:right;"
              }
            },
            {
              field: "term",
              title: "Plazo",
              width: 80,
              template: "#: data.term # días"
            },
            {
              field: "requestedBy",
              title: "Solicitado por"
            },
            {
              field: "date",
              editable: false,
              title: "Creada"
            },
            {
              field: "dateExpire",
              editable: false,
              title: "Vence"
            },
            {
              width: 20,
              headerAttributes: {
                "class": "cb-actions"
              },
              attributes: {
                "class": "cb-actions cb-no-wrap"
              },
              template: '<button class="btn btn-default btn-sm" title="Levantar bloqueo" ng-click="confirmRemoveValueBlock()"><span class="fa fa-times fa-fw"></span></button>'
            }
          ],
          toolbar: '<button class="btn btn-default k-grid-add"><span class="fa fa-plus"></span> Agregar</button>'
        };
        $scope.movementsBlock = {
          dataSource: {
            transport: {
              read: {
                url: "../../mocks/cta-movement-block.json",
                contentType: "application/json; charset=utf-8",
                dataType: "json"
              }
            },
            schema: {
              model: {
                id: "id",
                fields: {
                  date: {
                    editable: false
                  }
                }
              }
            }
          },
          editable: true,
          scrollable: false,
          columns: [{
              field: "type",
              title: "Tipo",
              width: 300,
              editor: function(container, options) {
                $('<select kendo-combo-box><option>CONTRA RETIRO</option></select>').appendTo(container);
              }
            },
            {
              field: "cause",
              title: "Causa",
              width: 300,
              editor: function(container, options) {
                $('<select kendo-combo-box><option>POR MAL MANEJO DE LA LIBRETA</option></select>').appendTo(container);
              }
            },
            {
              field: "requestedBy",
              title: "Solicitado por"
            },
            {
              field: "date",
              editable: false,
              title: "Fecha"
            },
            {
              width: 20,
              headerAttributes: {
                "class": "cb-actions"
              },
              attributes: {
                "class": "cb-actions cb-no-wrap"
              },
              template: '<button class="btn btn-default btn-sm" title="Levantar bloqueo" ng-click="confirmRemoveBlock()"><span class="fa fa-times fa-fw"></span></button>'
            }
          ],
          toolbar: '<button class="btn btn-default k-grid-add"><span class="fa fa-plus"></span> Agregar</button>'
        };
        $scope.removeCondition = function() {
          messages.confirm('Estás seguro que deseas eliminar la condición seleccionada?');
        }
        $scope.confirmRemoveBlock = function() {
          messages.confirm('Estás seguro que deseas levantar el bloqueo seleccionado?');
        };
        $scope.confirmRemoveValueBlock = function() {
          $('#value-unblock').modal();
        };
        $scope.selectedField = $scope.filters.field[0];
        $scope.setField = function(field) {
          $scope.selectedField = field;
        }
        $scope.showModal = function(selector) {
          $('#' + selector).modal();
        }
        $scope.showSignatures = function() {
          $('#signatures').modal();
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
              category: "Bloqueos",
              value: 20
            }, {
              category: "Retenciones",
              value: 10
            }, {
              category: "Disponible",
              value: 70
            }]
          }]
        };
        $scope.average6m = {
          title: {
            text: "Promedio últimos 6 meses"
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
            name: "Promedio mensual",
            data: [3907, 7943, 7848, 9284, 9263, 9801]
          }]
        };
        $scope.saveSavingPlan = function() {
          $scope.saved = true;
          $scope.savingPlanAccordion.expand($("#spDetail"));
        }
        $scope.activate();
      }
    ]);

  //Inicializa angular
  angular.bootstrap(document, ['app']);
});
