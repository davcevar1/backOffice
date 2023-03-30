require.config(requireConfig);
define(function(require) {
  'use strict';

  // Importación de módulos AMD
  var angular = require('angular'),
    kendo = require('kendo'),
    messages = require('cobis/messages');

  // Importación no son módulos
  require('bootstrap');
  require('cobis/ValidateLayout');

  var app = angular.module('app', ['kendo.directives'])
    .controller('controller', ['$scope', '$http', '$q',
      function($scope, $http, $q) {
        $scope.activate = function() {
          messages.loading(false);
          setTimeout(function() {
            $(window).trigger("resize");
          }, 100);
        };
        $scope.countryNames = [
          "Albania",
          "Andorra",
          "Armenia",
          "Austria",
          "Azerbaijan",
          "Belarus",
          "Belgium",
          "Bosnia & Herzegovina",
          "Bulgaria",
          "Croatia",
          "Cyprus",
          "Czech Republic",
          "Denmark",
          "Estonia",
          "Finland",
          "France",
          "Georgia",
          "Germany",
          "Greece",
          "Hungary",
          "Iceland",
          "Ireland",
          "Italy",
          "Kosovo",
          "Latvia",
          "Liechtenstein",
          "Lithuania",
          "Luxembourg",
          "Macedonia",
          "Malta",
          "Moldova",
          "Monaco",
          "Montenegro",
          "Netherlands",
          "Norway",
          "Poland",
          "Portugal",
          "Romania",
          "Russia",
          "San Marino",
          "Serbia",
          "Slovakia",
          "Slovenia",
          "Spain",
          "Sweden",
          "Switzerland",
          "Turkey",
          "Ukraine",
          "United Kingdom",
          "Vatican City"
        ];
        $scope.clientesFiltrados = {
          dataSource: {
            transport: {
              read: "../mocks/clientes.json"
            }
          },
          scrollable: false,
          selectable: true,
          change: function(e) {
            var grid = e.sender,
              currentDataItem = grid.dataItem(this.select());
            if (currentDataItem) {
              location.href = 'cliente-detalle.html';
            }
          },
          columns: [{
              field: "blocked",
              title: "&nbsp;",
              width: 22,
              template: '<span class="fa fa-circle #if (blocked){#cb-text-red#}else{#cb-text-green#}#"></span>'
            },
            {
              field: "id",
              title: "#"
            },
            {
              field: "documentNumber",
              title: "Identificación"
            },
            {
              field: "name",
              title: "Nombre"
            },
            {
              field: "officer",
              title: "Oficial"
            }
          ],
          toolbar: '<a href="cliente.html" class="btn btn-default"><span class="fa fa-plus"></span> Crear cliente</a>'
        };
        $scope.relaciones = {
          dataSource: {
            transport: {
              read: "../mocks/relaciones.json"
            }
          },
          scrollable: false,
          editable: "inline",
          columns: [{
              field: "name",
              title: "Nombre"
            },
            {
              field: "relation",
              title: "Relación"
            }
          ],
          toolbar: '<button class="btn btn-default k-grid-add"><span class="fa fa-plus"></span> Agregar relación</button>'
        };
        $scope.filters = {
          entity: [{
              label: "Cliente",
              id: 1
            },
            {
              label: "Prospecto",
              id: 2
            }
          ],
          type: [{
              label: "Natural",
              id: 1
            },
            {
              label: "Juridica",
              id: 2
            },
            {
              label: "Grupo económico",
              id: 3
            }
          ],
          field: [{
              label: "Identificación",
              id: 1
            },
            {
              label: "Nombre",
              id: 2
            },
            {
              label: "Consecutivo",
              id: 3
            }
          ]
        };
        $scope.selectedEntity = $scope.filters.entity[0];
        $scope.selectedType = $scope.filters.type[0];
        $scope.selectedField = $scope.filters.field[0];
        $scope.setEntity = function(entity) {
          $scope.selectedEntity = entity;
        };
        $scope.setType = function(type) {
          $scope.selectedType = type;
          $scope.selectedField = $scope.filters.field[0];
        };
        $scope.setField = function(field) {
          $scope.selectedField = field;
        };
        $scope.goto = function(url) {
          location.href = url;
        };
        $scope.type = 'person';
        $scope.direcciones = {
          dataSource: {
            transport: {
              read: "../mocks/direcciones.json"
            }
          },
          scrollable: false,
          columns: [{
              field: "type",
              title: "Tipo"
            },
            {
              field: "street",
              title: "Calles"
            },
            {
              field: "city",
              title: "Ciudad"
            }, {
              field: "state",
              title: "Provincia"
            },
            {
              field: "country",
              title: "País"
            },
            {
              width: '40px',
              attributes: {
                class: 'cb-no-wrap'
              },
              template: '<button class="btn btn-default" title="Editar"><span class="fa fa-pencil"></span></button> <button class="btn btn-default" title="Eliminar"><span class="fa fa-times"></span></button>'
            }
          ],
          toolbar: '<button class="btn btn-default" data-toggle="modal" data-target="\\#address-form"><span class="fa fa-plus"></span> Agregar</button>'
        };
        $scope.telefonos = {
          dataSource: {
            transport: {
              read: "../mocks/telefonos.json"
            }
          },
          columns: [{
              field: "type",
              title: "Tipo"
            },
            {
              field: "code",
              title: "Código"
            },
            {
              field: "number",
              title: "Número"
            },
            {
              width: '20px',
              attributes: {
                class: 'cb-no-wrap'
              },
              template: '<button class="btn btn-default" title="Editar"><span class="fa fa-pencil"></span></button> <button class="btn btn-default" title="Eliminar"><span class="fa fa-times"></span></button>'
            }
          ],
          toolbar: '<button class="btn btn-default" data-toggle="modal" data-target="\\#address-form"><span class="fa fa-plus"></span> Agregar</button>'
        };
        $scope.emails = {
          dataSource: {
            transport: {
              read: "../mocks/emails.json"
            }
          },
          columns: [{
              field: "email",
              title: "Correo electrónico"
            },
            {
              width: '20px',
              attributes: {
                class: 'cb-no-wrap'
              },
              template: '<button class="btn btn-default" title="Editar"><span class="fa fa-pencil"></span></button> <button class="btn btn-default" title="Eliminar"><span class="fa fa-times"></span></button>'
            }
          ],
          toolbar: '<button class="btn btn-default"><span class="fa fa-plus"></span> Agregar</button>'
        };
        $scope.setCustomer = function(customer) {
          $scope.customer = customer;
        };
        $scope.setCurrentView = function(currentView, e) {
          if (e) e.stopPropagation();
          $scope.currentView = currentView;
        };
        $scope.amortizacionOptions = {
          dataSource: {
            transport: {
              read: "../mocks/amortizacion.json"
            },
            aggregate: [{
                field: "capital",
                aggregate: "sum"
              },
              {
                field: "interest",
                aggregate: "sum"
              },
              {
                field: "comission",
                aggregate: "sum"
              },
              {
                field: "value",
                aggregate: "sum"
              }
            ]
          },
          columns: [{
              field: "number",
              title: "#",
              attributes: {
                "class": "text-center"
              },
              headerAttributes: {
                "style": "text-align:center;"
              }
            }, {
              field: "date",
              title: "Fecha vencimiento",
              attributes: {
                "class": "text-center"
              },
              headerAttributes: {
                "style": "text-align:center;"
              }
            }, {
              field: "capitalBalance",
              title: "Saldo capital",
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
              title: "Capital",
              format: "{0:c}",
              attributes: {
                "class": "text-right"
              },
              headerAttributes: {
                "style": "text-align:right;"
              },
              footerTemplate: "<div class='text-right'>#: kendo.toString(sum, 'C') #</div>"
            },
            {
              field: "interest",
              title: "Interés",
              format: "{0:c}",
              attributes: {
                "class": "text-right"
              },
              headerAttributes: {
                "style": "text-align:right;"
              },
              footerTemplate: "<div class='text-right'>#: kendo.toString(sum, 'C') #</div>"
            },
            {
              field: "comission",
              title: "Comisión",
              format: "{0:c}",
              attributes: {
                "class": "text-right",
              },
              headerAttributes: {
                "style": "text-align:right;"
              },
              footerTemplate: "<div class='text-right'>#: kendo.toString(sum, 'C') #</div>"
            },
            {
              field: "value",
              title: "Cuota",
              format: "{0:c}",
              attributes: {
                "class": "text-right",
              },
              headerAttributes: {
                "style": "text-align:right;"
              },
              footerTemplate: "<div class='text-right'>#: kendo.toString(sum, 'C') #</div>"
            }
          ]
        };
        $scope.operacionesOptions = {
          dataSource: {
            transport: {
              read: "../mocks/garantiasOtras.json"
            }
          },
          columns: [{
              field: "code",
              title: "Codigo"
            }, {
              field: "type",
              title: "Tipo",
              attributes: {
                "class": "text-center"
              },
              headerAttributes: {
                "style": "text-align:center;"
              }
            }, {
              field: "description",
              title: "Descripción"
            },
            {
              field: "valueInit",
              title: "Valor inicial",
              format: "{0:c}",
              attributes: {
                "class": "text-right"
              },
              headerAttributes: {
                "style": "text-align:right;"
              }
            },
            {
              field: "date",
              title: "Fecha de avaluo",
              attributes: {
                "class": "text-center"
              },
              headerAttributes: {
                "style": "text-align:center;"
              }
            },
            {
              field: "valueAvailable",
              title: "Valor disponible",
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
              title: "Estado",
              attributes: {
                "class": "text-center"
              },
              headerAttributes: {
                "style": "text-align:center;"
              }
            }
          ],
          selectable: true
        };
        $scope.activate();
      }
    ]);

  //Inicializa angular
  angular.bootstrap(document, ['app']);
});
