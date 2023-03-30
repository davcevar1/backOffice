require.config(requireConfig);
define(function(require) {
  'use strict';

  // Importación de módulos AMD
  var angular = require('angular'),
    kendo = require('kendo'),
    messages = require('cobis/messages');

  // Importación no son módulos
  require('bootstrap');

  window.cancelationCalled = false;
  window.parseQueryString = function() {
    var str = window.location.search;
    var objURL = {};

    str.replace(
      new RegExp("([^?=&]+)(=([^&]*))?", "g"),
      function($0, $1, $2, $3) {
        objURL[$1] = $3;
      }
    );
    return objURL;
  };

  var app = angular.module('app', ['kendo.directives'])
    .controller('controller', ['$scope', '$http', '$q',
      function($scope, $http, $q) {
        $scope.params = parseQueryString();
        $scope.activate = function() {
          $http.get('../../mocks/dpf-results.json')
            .then(function(response) {
              $scope.results = response.data;
            });
        };
        $scope.addCondition = function() {
          $('#conditions').modal();
        };
        $scope.addOwner = function() {
          messages.alert('Abre popup de selección de clientes');
        };
        $scope.addReception = function() {
          $('#payment').modal();
        };
        $scope.cancelacion = {
          dataSource: {
            transport: {
              read: {
                url: "../../mocks/dpf-reception.json",
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
              field: "type",
              title: "Forma de pago"
            },
            {
              field: "bank",
              title: "Banco"
            },
            {
              field: "account",
              title: "Cuenta"
            },
            {
              field: "amount",
              title: "Monto",
              format: "\{0:n\} USD",
              attributes: {
                "class": "text-right"
              },
              headerAttributes: {
                "style": "text-align:right;"
              },
              aggregates: ["sum"],
              footerTemplate: $scope.params.id=='0456880001'? '<div class="text-right">Subtotal: #= kendo.toString(sum, "n") # USD</div><div class="text-right">Penalización de interés: #= kendo.toString(200, "n") # USD</div><div class="text-right">Retención: #= kendo.toString(560, "n") # USD</div><div class="text-right text-danger">Remanente: #= kendo.toString(4240, "n") # USD</div><hr style="margin: 5px 0;" /><div class="text-right">Total a pagar: #= kendo.toString(25000, "n") # USD</div>' : '<div class="text-right">Subtotal: #= kendo.toString(sum, "n") # USD</div><div class="text-right">Retención: #= kendo.toString(560, "n") # USD</div><div class="text-right text-danger">Remanente: #= kendo.toString(4640, "n") # USD</div><hr style="margin: 5px 0;" /><div class="text-right">Total: #= kendo.toString(25000, "n") # USD</div><div class="text-right">Interés por días vencidos: #= kendo.toString(200, "n") # USD</div><div class="text-right">Total a pagar: #= kendo.toString(25200, "n") # USD</div>'
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
        $scope.cancelType = 'normal';
        $scope.capitalPayment = {
          dataSource: {
            transport: {
              read: {
                url: "../../mocks/dpf-reception.json",
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
              field: "type",
              title: "Forma de pago"
            },
            {
              field: "bank",
              title: "Banco"
            },
            {
              field: "account",
              title: "Cuenta"
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
              },
              aggregates: ["sum"],
              footerTemplate: '<div class="text-right">Remanente: #= kendo.toString(5000, "c") # USD</div><div class="text-right">Acumulado: #= kendo.toString(sum, "c") # USD</div><div class="text-right">Total: #= kendo.toString(25000, "c") # USD</div>'
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
              template: '<button class="btn btn-default btn-sm" title="Eliminar"><span class="fa fa-times fa-fw"></span></button>'
            }
          ],
          toolbar: '<button class="btn btn-default k-grid-add" ng-click="addCondition();"><span class="fa fa-plus"></span> Agregar</button>'
        };
        $scope.confirm = function() {
          $('#confirmation').modal();
        };
        $scope.dateTypes = [{
            label: 'Fecha de Ingreso',
            value: 1
          },
          {
            label: 'Fecha de Vencimiento',
            value: 2
          }
        ];
        $scope.selectedDateType = $scope.dateTypes[0];
        $scope.date = new Date('5/3/2018');
        $scope.deposits = {
          dataSource: {
            transport: {
              read: {
                url: "../../mocks/dpf-deposits.json",
                contentType: "application/json; charset=utf-8",
                dataType: "json"
              }
            }
          },
          scrollable: false,
          selectable: true,
          change: function(e) {
            var grid = e.sender,
              currentDataItem = grid.dataItem(this.select());
            if (currentDataItem) {
              location.href = 'detalle.html';
            }
          },
          columns: [{
              field: "number",
              title: "Número"
            },
            {
              field: "owner",
              title: "Nombre"
            },
            {
              field: "startDate",
              title: "Fecha ingreso"
            },
            {
              field: "endDate",
              title: "Fecha vencimiento"
            }
          ]
        };
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
          $('#confirmation').modal('hide');
          messages.alert('La operación ha sido creada exitosamente')
            .then(function() {
              location.href = 'detalle.html'
            });
        };
        $scope.guarantee = {
          dataSource: {
            transport: {
              read: {
                url: "../../mocks/dpf-guarantee.json",
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
              field: "reason",
              title: "Motivo"
            },
            {
              field: "notes",
              title: "Observaciones"
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
              },
              aggregates: ["sum"],
              footerTemplate: '<div class="text-right">Total: #= kendo.toString(sum, "c") # USD</div>'
            },
            {
              width: 20,
              attributes: {
                "class": "cb-no-wrap"
              },
              template: '<button class="btn btn-default btn-sm" title="Eliminar"><span class="fa fa-times fa-fw"></span></button>'
            }
          ],
          toolbar: '<button class="btn btn-default k-grid-add" onclick="addReception();"><span class="fa fa-plus"></span> Agregar</button>'
        };
        $scope.gotoSearch = function() {
          location.href = 'busqueda.html';
        };
        $scope.header = {
          primaryText: 'Tapia Andrade Viviana María (Principal)',
          secondaryText: '#0245000345 - Depósito al vencimiento',
          fields: [{
              label: 'Monto',
              value: '20,000.00 USD',
              opened: true
            },
            {
              label: 'Fecha valor',
              value: '2016-03-05',
              opened: true
            },
            {
              label: 'Fecha de vencimiento',
              value: '2018-02-05',
              opened: true
            },
            {
              label: 'Estado',
              value: 'Vigente',
              opened: true
            },
            {
              label: 'Tipo de plazo',
              value: '1234567890',
              opened: false
            },
            {
              label: 'Tipo emisión',
              value: '',
              opened: false
            },
            {
              label: 'Duplicados',
              value: '2',
              opened: false
            },
            {
              label: 'Retiene impuestos',
              value: 'Si',
              opened: false
            },
            {
              label: 'Fecha de ingreso',
              value: '2018-01-01',
              opened: false
            },
            {
              label: 'Interés a pagar',
              value: '122.45 USD',
              opened: false
            },
            {
              label: 'Interés a retener',
              value: '0.35 USD',
              opened: false
            },
            {
              label: 'Interés ganado a la fecha',
              value: '123 USD',
              opened: false
            },
            {
              label: 'Interés por ganar a la fecha',
              value: '2018-02-05',
              opened: false
            },
            {
              label: 'Fecha de pago del interés',
              value: '2018-01-01',
              opened: false
            },
            {
              label: 'Fecha de ultimo cálculo de interés',
              value: '2018-01-01',
              opened: false
            },
            {
              label: '# de reimpreso',
              value: '2',
              opened: false
            },
            {
              label: 'Acción siguiente',
              value: 'Autorizar',
              opened: false
            },
            {
              label: 'Oficial',
              value: 'Jose Gonzales',
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
              label: 'Imprimir ticket monetario',
              opened: false,
              click: function() {
                messages.alert('Se abre ventana de impresión.');
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
              label: 'Reimprimir certificado',
              opened: false,
              click: function() {
                messages.alert('Se abre ventana de impresión.');
              }
            },
            {
              label: '-',
              opened: false
            },
            /*
            {
              label: 'Activar',
              opened: false,
              click: function() {
                messages.confirm('Esta seguro que desea activar el depósito actual?.')
                  .then(function(input) {
                    console.log(input);
                  });
              }
            },*/
            {
              label: 'Anular',
              opened: false,
              click: function() {
                messages.confirm('Esta seguro que desea anular el depósito actual?.')
                  .then(function(input) {
                    console.log(input);
                  });
              }
            },
            {
              label: 'Reversar',
              opened: false,
              click: function() {
                $('#reverse').modal();
              }
            },
            {
              label: 'Cancelar',
              opened: false,
              click: function() {
                if (!cancelationCalled && $scope.params.id=='0456880001') {
                  messages.confirm('La operación no está vencida, desea solicitar autorización para una cancelación anticipada?')
                    .then(function(input) {
                      if (input.buttonIndex==1) {
                        messages.alert('La solicitud de autorización ha sido enviada. Para ver el estado ingrese en la pantalla de Autorizaciones.');
                        window.cancelationCalled = true;
                      }
                    });
                } else {
                  $('#cancel').modal();
                }
              }
            },
            {
              label: 'Renovar',
              opened: false,
              click: function() {
                location.href = 'renovacion.html';
              }
            },
            {
              label: 'Endosar',
              opened: false,
              click: function() {

              }
            },
            {
              label: '-',
              opened: false
            },
            {
              label: 'Bloqueos',
              opened: false,
              click: function() {
                $('#retention').modal();
              }
            },
            {
              label: 'Garantías',
              opened: false,
              click: function() {
                $('#guarantee').modal();
              }
            }
          ]
        };
        $scope.interestPayment = {
          dataSource: {
            transport: {
              read: {
                url: "../../mocks/dpf-reception.json",
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
              field: "type",
              title: "Forma de pago"
            },
            {
              field: "bank",
              title: "Banco"
            },
            {
              field: "account",
              title: "Cuenta"
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
              },
              aggregates: ["sum"],
              footerTemplate: '<div class="text-right">Remanente: #= kendo.toString(5000, "c") # USD</div><div class="text-right">Acumulado: #= kendo.toString(sum, "c") # USD</div><div class="text-right">Total: #= kendo.toString(25000, "c") # USD</div>'
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
        $scope.levels = [{
            label: 'Nivel ciudad',
            value: 1
          },
          {
            label: 'Nivel oficina',
            value: 2
          },
          {
            label: 'Nivel oficial',
            value: 3
          }
        ];
        $scope.selectedLevel = $scope.levels[0];
        $scope.markCheckError = function() {
          console.log($scope.checkError);
          messages.alert('Se han marcado con problemas los cheques seleccionados');
        }
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
            },
            {
              field: "transaction",
              title: "Transacción"
            },
            {
              field: "type",
              title: "Forma de pago"
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
                      value: "Titular",
                      label: "Titular"
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
              title: "Nombre"
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
        $scope.rate = 1.25;
        $scope.reception = {
          dataSource: {
            transport: {
              read: {
                url: "../../mocks/dpf-reception.json",
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
              field: "error",
              title: "&nbsp;",
              template: '#if (data.type=="Cheque") { # <input type="checkbox" ng-model="checkError" /> # } #',
              width: 20
            }, {
              field: "type",
              title: "Forma de recepción"
            }, {
              field: "date",
              title: "Fecha de recepción"
            },
            {
              field: "bank",
              title: "Banco"
            },
            {
              field: "account",
              title: "Cuenta"
            },
            {
              field: "amount",
              title: "Monto",
              format: "{0:c} USD",
              attributes: {
                "class": "text-right"
              },
              headerAttributes: {
                "style": "text-align:right;"
              },
              aggregates: ["sum"],
              footerTemplate: '<div class="text-right">Remanente: #= kendo.toString(5000, "c") # USD</div><div class="text-right">Acumulado: #= kendo.toString(sum, "c") # USD</div><div class="text-right">Total: #= kendo.toString(25000, "c") # USD</div>'
            },
            {
              width: 20,
              attributes: {
                "class": "cb-no-wrap"
              },
              template: '<button class="btn btn-default btn-sm" title="Eliminar"><span class="fa fa-times fa-fw"></span></button>'
            }
          ],
          toolbar: '<button class="btn btn-default k-grid-add" ng-click="addReception();"><span class="fa fa-plus"></span> Agregar</button><button class="btn btn-default k-grid-add" ng-click="markCheckError();"><span class="fa fa-minus-circle"></span> Marcar con problema</button>'
        };
        $scope.reception2 = {
          dataSource: {
            transport: {
              read: {
                url: "../../mocks/dpf-reception.json",
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
              field: "type",
              title: "Forma de recepción"
            }, {
              field: "date",
              title: "Fecha de recepción"
            },
            {
              field: "bank",
              title: "Banco"
            },
            {
              field: "account",
              title: "Cuenta"
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
              },
              aggregates: ["sum"],
              footerTemplate: '<div class="text-right">Remanente: #= kendo.toString(5000, "c") # USD</div><div class="text-right">Acumulado: #= kendo.toString(sum, "c") # USD</div><div class="text-right">Total: #= kendo.toString(25000, "c") # USD</div>'
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
        $scope.retention = {
          dataSource: {
            transport: {
              read: {
                url: "../../mocks/dpf-retention.json",
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
              field: "reason",
              title: "Motivo"
            },
            {
              field: "notes",
              title: "Observaciones"
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
              },
              aggregates: ["sum"],
              footerTemplate: '<div class="text-right">Remanente: #= kendo.toString(5000, "c") # USD</div><div class="text-right">Acumulado: #= kendo.toString(sum, "c") # USD</div><div class="text-right">Total: #= kendo.toString(25000, "c") # USD</div>'
            },
            {
              width: 20,
              attributes: {
                "class": "cb-no-wrap"
              },
              template: '<button class="btn btn-default btn-sm" title="Eliminar"><span class="fa fa-times fa-fw"></span></button>'
            }
          ],
          toolbar: '<button class="btn btn-default k-grid-add" onclick="addReception();"><span class="fa fa-plus"></span> Agregar</button>'
        };
        $scope.simulate = function() {
          $('#simulate').modal();
        };
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
              visible: true,
              background: "transparent"
            }
          },
          series: [{
            type: "donut",
            data: [{
              category: "Bloqueos",
              value: 20
            }, {
              category: "Garantías",
              value: 10
            }, {
              category: "Disponible",
              value: 70
            }]
          }]
        };
        $scope.selectedField = $scope.filters.field[0];
        $scope.setField = function(field) {
          $scope.selectedField = field;
        }
        $scope.setDateType = function(dateType) {
          $scope.selectedDateType = dateType;
        }
        $scope.setLevel = function(level) {
          $scope.selectedLevel = level;
        }
        $scope.activate();
      }
    ]);

  //Inicializa angular
  angular.bootstrap(document, ['app']);
});
