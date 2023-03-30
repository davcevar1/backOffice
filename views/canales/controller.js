require.config(requireConfig);
define(function (require) {
  'use strict';

  // Importación de módulos AMD
  var angular = require('angular'),
    kendo = require('kendo'),
    messages = require('cobis/messages');

  // Importación no son módulos
  require('bootstrap');

  var app = angular.module('app', ['kendo.directives'])
    .controller('controller', ['$scope', '$http', '$q', '$timeout',
      function ($scope, $http, $q, $timeout) {
        $scope.activate = function () {
          $http.get('../../mocks/canales-usuarios.json')
            .then(function (response) {
              $scope.users = response.data;
            });
          $http.get('../../mocks/canales-products.json')
            .then(function (response) {
              $scope.accounts = response.data;
            });
          $http.get('../../mocks/canales-delivery.json')
            .then(function (response) {
              $scope.mediaList = response.data;
            });
          $http.get('../../mocks/massive-services.json')
            .then(function (response) {
              $scope.massiveServicesData = response.data;
            });
          /*
          $timeout(function() {
            console.log($scope.usersByStatusGrid);
            $scope.usersByStatusGrid.dataSource.group({ field: "channel" });
          }, 100);
          */
        };
        $scope.authType = 'standard';
        $scope.addUser = function () {
          messages.alert('El usuario se ha creado exitosa, se enviará una notificación con las credenciales para el primer ingreso a los medios de envío principales.')
            .then(function () {
              location.href = 'user-view.html';
            });
        };
        $scope.clientes = {
          dataSource: {
            transport: {
              read: {
                url: "../../mocks/canales-usuarios.json",
                contentType: "application/json; charset=utf-8",
                dataType: "json"
              }
            }
          },
          change: function () {
            $('#cliente').modal('hide');
          },
          selectable: true,
          scrollable: false,
          columns: [{
            field: "id",
            template: $("#customer").length > 0 ? kendo.template($("#customer").html()) : kendo.template('')
          }]
        };
        $scope.currentType = 'virtual';
        $scope.addAuthCondition = function () {
          $scope.authMode = 'detail';
        };
        $scope.editAuthCondition = function () {
          $scope.authMode = 'detail';
        };
        $scope.cancelAuthCondition = function () {
          $scope.authMode = null;
        };
        $scope.condiciones = {
          dataSource: {
            transport: {
              read: {
                url: "../../mocks/canales-condiciones.json",
                contentType: "application/json; charset=utf-8",
                dataType: "json"
              }
            }
          },
          scrollable: false,
          detailTemplate: $("#auth-rules").length > 0 ? kendo.template($("#auth-rules").html()) : kendo.template(''),
          columns: [{
            field: "currency",
            title: "Moneda"
          },
          {
            field: "min",
            title: "Mínimo",
            format: '{0:c}',
            attributes: {
              "class": "text-right"
            },
            headerAttributes: {
              "style": "text-align:right;"
            }
          },
          {
            field: "max",
            title: "Máximo",
            format: '{0:c}',
            attributes: {
              "class": "text-right"
            },
            headerAttributes: {
              "style": "text-align:right;"
            }
          },
          {
            field: "transaction",
            title: "Transacción"
          },
          {
            field: "product",
            title: "Producto"
          },
          {
            field: "start",
            title: "Vigencia",
            template: "#if (data.start) {# #: data.start # - #: data.end # # } else { # Indefinido # } #"
          },
          {
            width: 20,
            headerAttributes: {
              "class": "cb-actions"
            },
            attributes: {
              "class": "cb-actions cb-no-wrap"
            },
            template: '<button class="btn btn-default btn-sm" title="Editar" ng-click="editAuthCondition();"><span class="fa fa-pencil fa-fw"></span></button><button class="btn btn-default btn-sm" title="Eliminar"><span class="fa fa-times fa-fw"></span></button>'
          }
          ],
          toolbar: '<button class="btn btn-default k-grid-add" ng-click="addAuthCondition();"><span class="fa fa-plus"></span> Agregar</button>'
        };
        $scope.condicionesReglas = {
          dataSource: {
            transport: {
              read: {
                url: "../../mocks/canales-auth-rules.json",
                contentType: "application/json; charset=utf-8",
                dataType: "json"
              }
            }
          },
          scrollable: false,
          columns: [{
            field: 'quantity',
            width: 30,
            title: "Cantidad",
            attributes: {
              "class": "text-right"
            },
            headerAttributes: {
              "style": "text-align:right;"
            }
          },
          {
            field: 'loginType',
            title: "Tipo de login"
          }
          ]
        };
        $scope.condicionesReglas2 = {
          dataSource: {
            transport: {
              read: {
                url: "../../mocks/canales-auth-rules.json",
                contentType: "application/json; charset=utf-8",
                dataType: "json"
              }
            },
            schema: {
              model: {
                fields: {
                  quantity: {
                    editable: true,
                    nullable: true
                  },
                  loginType: {
                    editable: true,
                    nullable: true
                  }
                }
              }
            }
          },
          editable: true,
          scrollable: false,
          columns: [{
            field: 'quantity',
            width: 30,
            title: "Cantidad",
            attributes: {
              "class": "text-right"
            },
            headerAttributes: {
              "style": "text-align:right;"
            }
          },
          {
            field: 'loginType',
            title: "Tipo de login",
            editor: "<select kendo-drop-down-list class=\"form-control\"><option>Login Tipo A - Nivel I</option><option>Login Tipo B - Nivel II</option><option>Login Tipo C - Nivel III</option><option>Login Tipo D - Nivel IV</option><option>Propietario</option><option>Titular</option></select>"
          }
          ],
          toolbar: '<div class="cb-flex cb-middle"><button class="btn btn-default k-grid-add"><span class="fa fa-plus"></span> Agregar</button></div>'
        };
        $scope.condicionesReglas3 = {
          dataSource: {
            transport: {
              read: {
                url: "../../mocks/canales-auth-rules.json",
                contentType: "application/json; charset=utf-8",
                dataType: "json"
              }
            },
            schema: {
              model: {
                fields: {
                  quantity: {
                    editable: true,
                    nullable: true
                  },
                  loginType: {
                    editable: true,
                    nullable: true
                  },
                  currency: {
                    editable: true,
                    nullable: true
                  }
                }
              }
            }
          },
          editable: true,
          scrollable: false,
          columns: [{
            field: 'quantity',
            width: 30,
            title: "Cantidad",
            attributes: {
              "class": "text-right"
            },
            headerAttributes: {
              "style": "text-align:right;"
            }
          },
          {
            field: 'loginType',
            title: "Tipo de login",
            editor: "<select kendo-drop-down-list class=\"form-control\"><option>Login Tipo A - Nivel I</option><option>Login Tipo B - Nivel II</option><option>Login Tipo C - Nivel III</option><option>Login Tipo D - Nivel IV</option><option>Propietario</option><option>Titular</option></select>"
          },
          {
            field: 'amount',
            title: "Monto",
            width: 120,
            editor: "<select kendo-drop-down-list class=\"form-control\"><option>Rango</option><option>Mayor que</option><option>Menor que</option><option>Igual a</option></select>"
          },
          {
            field: 'amount',
            width: 120,
            title: "Valor 1"
          },
          {
            field: 'amount',
            width: 120,
            title: "Valor 2"
          },
          {
            field: 'currency',
            width: 80,
            title: "Moneda",
            editor: "<select kendo-drop-down-list class=\"form-control\"><option>BOB</option><option>USD</option></select>"
          }
          ],
          toolbar: '<div class="cb-flex cb-middle"><button class="btn btn-default k-grid-add"><span class="fa fa-plus"></span> Agregar</button></div>'
        };
        $scope.confirmAddProducts = function () {
          messages.confirm('Esta seguro de agregar todos los productos disponibles?')
            .then(function (input) {
              if (input.buttonIndex == 1) {
                $('#product').modal('hide');
              }
            });
        };
        $scope.customers = {
          dataSource: {
            transport: {
              read: {
                url: "../../mocks/canales-usuarios.json",
                contentType: "application/json; charset=utf-8",
                dataType: "json"
              }
            }
          },
          selectable: true,
          change: function () {
            location.href = 'user-view.html';
          },
          columns: [{
            field: "id",
            template: $("#customer").length > 0 ? kendo.template($("#customer").html()) : kendo.template('')
          }],
          toolbar: '<div class="cb-flex cb-middle"><button class="btn btn-primary" ng-if="isAdvanced"><span class="fa fa-search"></span> Buscar</button><div class="cb-flex cb-middle cb-right cb-grow text-right"><div class="text-muted small" style="margin-right:10px;">Exportar:</div><button class="btn btn-default" style="margin:0;" title="Exportar a PDF"><span class="fa fa-file-pdf-o" style="margin:0;"></span></button><button class="btn btn-default" style="margin:0;" title="Exportar a Excel"><span class="fa fa-file-excel-o" style="margin:0;"></span></button></div></div>'
        };
        $scope.customers2 = {
          dataSource: {
            transport: {
              read: {
                url: "../../mocks/canales-usuarios.json",
                contentType: "application/json; charset=utf-8",
                dataType: "json"
              }
            }
          },
          scrollable: false,
          selectable: true,
          change: function (e) {
            let grid = e.sender;
            let currentDataItem = grid.dataItem(grid.select());
            $('#cliente').modal('hide');
            $scope.$apply(function () {
              $scope.selectedCustomer = currentDataItem;
            });
          },
          columns: [{
            field: "id",
            template: $("#customer").length > 0 ? kendo.template($("#customer").html()) : kendo.template('')
          }]
        };
        $scope.customers3 = {
          dataSource: {
            transport: {
              read: {
                url: "../../mocks/canales-usuarios.json",
                contentType: "application/json; charset=utf-8",
                dataType: "json"
              }
            }
          },
          selectable: true,
          change: function () {
            location.href = 'carga-masiva-1.html';
          },
          columns: [{
            field: "id",
            template: $("#customer").length > 0 ? kendo.template($("#customer").html()) : kendo.template('')
          }],
          toolbar: '<div class="cb-flex cb-middle"><button class="btn btn-primary" ng-if="isAdvanced"><span class="fa fa-search"></span> Buscar</button><div class="cb-flex cb-middle cb-right cb-grow text-right"><div class="text-muted small" style="margin-right:10px;">Exportar:</div><button class="btn btn-default" style="margin:0;" title="Exportar a PDF"><span class="fa fa-file-pdf-o" style="margin:0;"></span></button><button class="btn btn-default" style="margin:0;" title="Exportar a Excel"><span class="fa fa-file-excel-o" style="margin:0;"></span></button></div></div>'
        };
        $scope.customers4 = {
          dataSource: {
            transport: {
              read: {
                url: "../../mocks/canales-usuarios.json",
                contentType: "application/json; charset=utf-8",
                dataType: "json"
              }
            }
          },
          selectable: true,
          change: function () {
            location.href = 'user-view2.html';
          },
          columns: [{
            field: "id",
            template: $("#customer").length > 0 ? kendo.template($("#customer").html()) : kendo.template('')
          }],
          toolbar: '<div class="cb-flex cb-middle"><button class="btn btn-primary" ng-if="isAdvanced"><span class="fa fa-search"></span> Buscar</button><div class="cb-flex cb-middle cb-right cb-grow text-right"><div class="text-muted small" style="margin-right:10px;">Exportar:</div><button class="btn btn-default" style="margin:0;" title="Exportar a PDF"><span class="fa fa-file-pdf-o" style="margin:0;"></span></button><button class="btn btn-default" style="margin:0;" title="Exportar a Excel"><span class="fa fa-file-excel-o" style="margin:0;"></span></button></div></div>'
        };
        $scope.fieldCompare = {
          dataSource: {
            transport: {
              read: {
                url: "../../mocks/canales-fields.json",
                contentType: "application/json; charset=utf-8",
                dataType: "json"
              }
            }
          },
          scrollable: false,
          columns: [{
            field: "field",
            title: "Autorización de"
          },
          {
            field: "before",
            title: "Antes"
          },
          {
            field: "after",
            title: "Después"
          }
          ]
        };
        $scope.find = function () {
          $scope.showResults = true;
        };
        $scope.toggleChannel = function (channel, e) {
          e.stopPropagation();
          e.preventDefault();
          messages.confirm(channel ? 'Desea habilitar el canal seleccionado?' : 'Desea deshabilitar el canal seleccionado?')
            .then(function (index) {
              if (index == 1) {
                channel != channel;
              }
            });
        };
        $scope.filters = {
          field: [{
            label: "Usuario",
            id: 3
          },
          {
            label: "Identificación",
            id: 1
          },
          {
            label: "Código cliente",
            id: 3
          },
          {
            label: "Nombre cliente",
            id: 3
          }
          ]
        };
        $scope.gotoSearch = function () {
          location.href = 'user-search.html';
        };
        $scope.goto = function (url) {
          location.href = url;
        };
        $scope.header = {
          primaryText: 'Tapia Andrade Viviana María',
          secondaryText: '#0245000345 - Persona natural',
          fields: [{
            label: 'Oficina',
            value: 'Matriz',
            opened: true
          },
          {
            label: 'Oficial',
            value: 'Maritza Martinez',
            opened: true
          },
          {
            label: 'Creado',
            value: '12-12-2015',
            opened: true
          },
          {
            label: 'Estado',
            value: 'Vigente',
            opened: true
          },
          {
            label: 'Fecha de nacimiento',
            value: '2018-01-01',
            opened: false
          },
          {
            label: 'Oficina por defecto',
            value: 'Matriz',
            opened: false
          },
          {
            label: 'Segmento',
            value: 'Personal',
            opened: false
          }
          ],
          actions: [{
            label: 'Agregar usuario',
            opened: false,
            click: function () {
              $scope.showModal('user');
            }
          }, {
            label: 'Eliminar usuario',
            opened: false,
            click: function () {
              $scope.showModal('remove-user');
            }
          },
          {
            label: 'Restablecer acceso de usuario',
            opened: false,
            click: function () {
              $scope.showModal('reason-change');
            }
          },
          {
            label: 'Sesiones activas',
            opened: false,
            click: function () {
              $scope.showModal('sessions');
            }
          },
          {
            label: '-',
            opened: false
          },
          {
            label: 'Reimprimir contrato',
            opened: false,
            click: function () {
              messages.alert('Se abre ventana de impresión.');
            }
          },
          {
            label: '-',
            opened: false
          },
          {
            label: 'Servicios masivos',
            opened: false,
            click: function () {
              $scope.showModal('massive-services');
            }
          },
          {
            label: 'Carga masivos',
            opened: false,
            click: function () {
              $scope.showModal('upload-massive');
            }
          },
          {
            label: 'Transacciones canales',
            opened: false,
            click: function () {
              location.href = 'transacciones.html';
            }
          },
          {
            label: 'Pagos programados',
            opened: false,
            click: function () {
              location.href = 'pagos-programados.html';
            }
          },
          {
            label: '-',
            opened: false
          },
          {
            label: 'Autorizaciones',
            opened: false,
            click: function () {
              $scope.showModal('auth');
            }
          },
          {
            label: 'Bloqueo / desbloqueo de tarjetas',
            opened: false,
            click: function () {
              $scope.showModal('block-cards');
            }
          },
          {
            label: 'Solicitud de activación de tarjetas',
            opened: false,
            click: function () {
              $scope.showModal('request-activate-cards');
            }
          },
          {
            label: 'Activación de tarjetas',
            opened: false,
            click: function () {
              $scope.showModal('activate-cards');
            }
          }
          ]
        };
        $scope.header1 = {
          primaryText: 'Tapia Andrade Viviana María',
          secondaryText: '#0245000345 - Persona natural',
          fields: [{
            label: 'Oficina',
            value: 'Matriz',
            opened: true
          },
          {
            label: 'Oficial',
            value: 'Maritza Martinez',
            opened: true
          },
          {
            label: 'Perfil',
            value: 'Perfil Natural',
            opened: true
          },
          {
            label: 'Creado',
            value: '12-12-2015',
            opened: true
          },
          {
            label: 'Estado',
            value: 'Vigente',
            opened: true
          },
          {
            label: 'Fecha de nacimiento',
            value: '2018-01-01',
            opened: false
          },
          {
            label: 'Oficina por defecto',
            value: 'Matriz',
            opened: false
          }
          ]
        };
        $scope.selectedField = $scope.filters.field[0];
        $scope.setField = function (field) {
          $scope.selectedField = field;
        }
        $scope.showUser = function () {
          $('#user').modal();
        }
        $scope.showDeliveryType = function () {
          $('#deliveryType').modal();
        }
        $scope.showNotifications = function () {
          $('#notifications').modal();
        }
        $scope.showReason = function () {
          $('#reason-change').modal();
        }
        $scope.showPermissions = function () {
          $('#permissions').modal();
        }
        $scope.showAttribute = function () {
          $('#attribute').modal();
        }
        $scope.showModal = function (selector) {
          $('#' + selector).modal();
          if (selector == 'chart') {
            $timeout(function () {
              $scope.chartVisible = true;
            }, 300);
          }
        }
        $scope.transactionAutorization = {};
        $scope.confirmApprove = function () {
          messages.confirm('Está seguro que desea aprobar la solicitud seleccionada?')
            .then(function (input) {
              if (input.buttonIndex == 1) {
                messages.alert('La solicitud ha sido aprobada.');
                window.cancelationCalled = true;
              }
            });
        }
        $scope.confirmReject = function () {
          $scope.showModal('reject');
        }
        $scope.attributes = {
          dataSource: {
            transport: {
              read: {
                url: "../../mocks/canales-attributes.json",
                contentType: "application/json; charset=utf-8",
                dataType: "json"
              }
            }
          },
          scrollable: false,
          editable: true,
          columns: [{
            field: "type",
            title: "Tipo",
            width: 150,
            editor: function (container, options) {
              $('<select kendo-combo-box><option>Imagen</option><option>Descripción</option><option>Página ASP.NET</option></select>').appendTo(container);
            }
          },
          {
            field: "value",
            title: "Valor"
          },
          {
            width: 20,
            headerAttributes: {
              "class": "cb-actions"
            },
            attributes: {
              "class": "cb-actions cb-no-wrap"
            },
            template: '<button class="btn btn-default btn-sm" title="Eliminar"><span class="fa fa-times fa-fw"></span></button>'
          }
          ],
          toolbar: '<button class="btn btn-default k-grid-add"><span class="fa fa-plus"></span> Agregar</button>'
        };
        $scope.payReasons = {
          dataSource: {
            transport: {
              read: {
                url: "../../mocks/canales-pay-reasons.json",
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
            field: "code",
            title: "Código"
          },
          {
            field: "product",
            title: "Producto"
          },
          {
            field: "cause",
            title: "Causa"
          },
          {
            field: "type2",
            title: "Operación"
          },
          {
            width: 20,
            headerAttributes: {
              "class": "cb-actions"
            },
            attributes: {
              "class": "cb-actions cb-no-wrap"
            },
            template: '<button class="btn btn-default btn-sm" title="Editar"><span class="fa fa-pencil fa-fw"></span></button> <button class="btn btn-default btn-sm" title="Eliminar"><span class="fa fa-times fa-fw"></span></button>'
          }
          ],
          toolbar: '<button class="btn btn-default"><span class="fa fa-plus"></span> Agregar</button>'
        };
        $scope.canales = {
          dataSource: {
            transport: {
              read: {
                url: "../../mocks/canales-canales.json",
                contentType: "application/json; charset=utf-8",
                dataType: "json"
              }
            }
          },
          scrollable: false,
          columns: [{
            width: 48,
            title: "&nbsp;",
            template: "<svg style=\"width:48px; height:48px;\"><use xlink:href=\"../../images/factoricons-slim.svg\\##: data.icon#\"></use></svg>"
          },
          {
            field: "name",
            title: "Nombre"
          },
          {
            field: "description",
            title: "Descripción"
          },
          {
            field: "available",
            title: "Disponibilidad",
            width: 150
          },
          {
            width: 20,
            headerAttributes: {
              "class": "cb-actions"
            },
            attributes: {
              "class": "cb-actions cb-no-wrap"
            },
            template: '<button class="btn btn-default btn-sm" title="Configurar" ng-click="showModal(\'channel\')""><span class="fa fa-gear fa-fw"></span></button>'
          }
          ]
        };
        $scope.canales2 = {
          dataSource: {
            transport: {
              read: {
                url: "../../mocks/canales-canales.json",
                contentType: "application/json; charset=utf-8",
                dataType: "json"
              }
            }
          },
          height: 260,
          scrollable: true,
          selectable: true,
          columns: [{
            width: 48,
            title: "&nbsp;",
            template: "<div class=\"cb-flex cb-middle\"><svg style=\"width:32px; height:32px;\"><use xlink:href=\"../../images/factoricons-slim.svg\\##: data.icon#\"></use></svg><div style=\"margin-left:10px;\">#: data.name #</div></div>"
          }]
        };
        $scope.clientUsers = {
          dataSource: {
            transport: {
              read: {
                url: "../../mocks/canales-user.json",
                contentType: "application/json; charset=utf-8",
                dataType: "json"
              }
            }
          },
          scrollable: false,
          columns: [{
            field: "userName",
            title: "Usuario"
          },
          {
            field: "status",
            title: "Estado"
          },
          {
            width: 20,
            headerAttributes: {
              "class": "cb-actions"
            },
            attributes: {
              "class": "cb-actions cb-no-wrap"
            },
            template: '<button class="btn btn-default btn-sm" title="Eliminar"><span class="fa fa-times fa-fw"></span></button>'
          }
          ],
          toolbar: '<button class="btn btn-default k-grid-add" ng-click="showUser();"><span class="fa fa-plus"></span> Agregar</button>'
        };
        $scope.clientUsers2 = {
          dataSource: {
            transport: {
              read: {
                url: "../../mocks/canales-usuarios.json",
                contentType: "application/json; charset=utf-8",
                dataType: "json"
              }
            }
          },
          height: 260,
          scrollable: true,
          selectable: true,
          columns: [{
            width: 48,
            title: "&nbsp;",
            template: "<div>#: data.name #</div><div class=\"text-muted small\">#: data.alias #</div>"
          }]
        };
        $scope.channels = {
          dataSource: {
            transport: {
              read: {
                url: "../../mocks/canales-channels.json",
                contentType: "application/json; charset=utf-8",
                dataType: "json"
              }
            }
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
            template: '<input type="checkbox" #= data.enabled ? "checked=checked" : "" # />'
          },
          {
            field: "name",
            title: "Nombre"
          },
          {
            field: "authorized",
            title: "Autorizado"
          }
          ]
        };
        $scope.contextMenuOptions = {
          filter: ".cb-menu-options",
          showOn: 'click',
          alignToAnchor: true
        }
        $scope.profiles = {
          dataSource: {
            transport: {
              read: {
                url: "../../mocks/canales-profiles.json",
                contentType: "application/json; charset=utf-8",
                dataType: "json"
              }
            }
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
            field: "name",
            title: "Nombre"
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
        $scope.profiles2 = {
          dataSource: {
            transport: {
              read: {
                url: "../../mocks/canales-profiles.json",
                contentType: "application/json; charset=utf-8",
                dataType: "json"
              }
            }
          },
          scrollable: false,
          editable: true,
          detailTemplate: $("#features").length > 0 ? kendo.template($("#features").html()) : kendo.template(''),
          columns: [{
            field: "name",
            title: "Nombre"
          },
          {
            field: "type",
            title: "Tipo",
            width: 150,
            editor: function (container, options) {
              $('<select kendo-combo-box><option>ESPECIFICO</option></select>').appendTo(container);
            }
          },
          {
            field: "channel",
            title: "Canal",
            width: 150,
            editor: function (container, options) {
              $('<select kendo-combo-box><option>INTERNET</option><option>BANCAMOVIL</option></select>').appendTo(container);
            }
          },
          {
            field: "status",
            title: "Estado",
            width: 150,
            editor: function (container, options) {
              $('<select kendo-combo-box><option>VIGENTE</option><option>NO VIGENTE</option></select>').appendTo(container);
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
            template: '<button class="btn btn-default btn-sm" title="Eliminar"><span class="fa fa-times fa-fw"></span></button>'
          }
          ],
          toolbar: '<button class="btn btn-default"><span class="fa fa-search"></span> Buscar</button><button class="btn btn-default k-grid-add"><span class="fa fa-plus"></span> Agregar</button>'
        };
        $scope.deliveryTypes = {
          dataSource: {
            transport: {
              read: {
                url: "../../mocks/canales-delivery.json",
                contentType: "application/json; charset=utf-8",
                dataType: "json"
              }
            }
          },
          scrollable: false,
          columns: [{
            field: "default",
            title: "&nbsp;",
            width: 30,
            headerAttributes: {
              style: "text-align:center;"
            },
            attributes: {
              class: "text-center"
            },
            template: '#if (data.default) {# <span class=\"fa fa-check-circle text-success\"></span> # } #'
          }, {
            field: "userName",
            title: "Usuario"
          },
          {
            field: "description",
            title: "Descripción"
          },
          {
            field: "type",
            title: "Tipo"
          },
          {
            field: "value",
            title: "Valor"
          },
          {
            field: "createdAt",
            title: "Creado"
          },
          {
            field: "updatedAt",
            title: "Actualizado"
          },
          {
            width: 20,
            headerAttributes: {
              "class": "cb-actions"
            },
            attributes: {
              "class": "cb-actions cb-no-wrap"
            },
            template: '<button class="btn btn-default btn-sm" title="Eliminar"><span class="fa fa-times fa-fw"></span></button>'
          }
          ],
          toolbar: '<button class="btn btn-default k-grid-add" ng-click="showDeliveryType();"><span class="fa fa-plus"></span> Agregar</button>'
        };
        $scope.deliveryTypes2 = {
          dataSource: {
            transport: {
              read: {
                url: "../../mocks/canales-delivery.json",
                contentType: "application/json; charset=utf-8",
                dataType: "json"
              }
            }
          },
          scrollable: false,
          columns: [{
            field: "default",
            title: "&nbsp;",
            width: 30,
            headerAttributes: {
              style: "text-align:center;"
            },
            attributes: {
              class: "text-center"
            },
            template: '#if (data.default) {# <span class=\"fa fa-check-circle text-success\"></span> # } #'
          },
          {
            field: "type",
            title: "Tipo"
          },
          {
            field: "value",
            title: "Valor"
          },
          {
            width: 20,
            headerAttributes: {
              "class": "cb-actions"
            },
            attributes: {
              "class": "cb-actions cb-no-wrap"
            },
            template: '<button class="btn btn-default btn-sm" title="Editar" ng-click="showDeliveryType();"><span class="fa fa-pencil fa-fw"></span></button><button class="btn btn-default btn-sm" title="Eliminar"><span class="fa fa-times fa-fw"></span></button>'
          }
          ],
          toolbar: '<button class="btn btn-default k-grid-add" ng-click="showDeliveryType();"><span class="fa fa-plus"></span> Agregar</button>'
        };
        $scope.thirdParty = {
          dataSource: {
            transport: {
              read: {
                url: "../../mocks/canales-beneficiarios.json",
                contentType: "application/json; charset=utf-8",
                dataType: "json"
              }
            }
          },
          scrollable: false,
          editable: true,
          columns: [{
            field: "alias",
            title: "Alias"
          },
          {
            field: "type",
            title: "Tipo"
          },
          {
            field: "max",
            title: "Máximo",
            format: '{0:c}',
            attributes: {
              "class": "text-right"
            },
            headerAttributes: {
              "style": "text-align:right;"
            }
          },
          {
            field: "productType",
            title: "Producto"
          },
          {
            field: "account",
            title: "Cuenta #"
          },
          {
            field: "money",
            title: "Moneda"
          },
          {
            width: 20,
            headerAttributes: {
              "class": "cb-actions"
            },
            attributes: {
              "class": "cb-actions cb-no-wrap"
            },
            template: '<button class="btn btn-default btn-sm" title="Editar" ng-click="showModal(\'third-party\');"><span class="fa fa-pencil fa-fw"></span></button><button class="btn btn-default btn-sm" title="Eliminar"><span class="fa fa-times fa-fw"></span></button>'
          }
          ],
          toolbar: '<button class="btn btn-default k-grid-add" ng-click="showModal(\'third-party\');"><span class="fa fa-plus"></span> Agregar</button>'
        };
        $scope.features = {
          dataSource: {
            transport: {
              read: {
                url: "../../mocks/canales-permissions.json",
                contentType: "application/json; charset=utf-8",
                dataType: "json"
              }
            }
          },
          editable: true,
          scrollable: false,
          detailTemplate: $("#transactions").length > 0 ? kendo.template($("#transactions").html()) : kendo.template(''),
          columns: [{
            field: "name2",
            title: "Nombre"
          },
          {
            width: 20,
            headerAttributes: {
              "class": "cb-actions"
            },
            attributes: {
              "class": "cb-actions cb-no-wrap"
            },
            template: '<button class="btn btn-default btn-sm" title="Eliminar"><span class="fa fa-times fa-fw"></span></button>'
          }
          ],
          toolbar: '<button class="btn btn-default"><span class="fa fa-search"></span> Buscar</button><button class="btn btn-default k-grid-add"><span class="fa fa-plus"></span> Agregar</button>'
        };
        $scope.products = {
          dataSource: {
            transport: {
              read: {
                url: "../../mocks/canales-products.json",
                contentType: "application/json; charset=utf-8",
                dataType: "json"
              }
            }
          },
          scrollable: false,
          columns: [{
            field: "enabled",
            title: "Cobro comisiones",
            width: 50,
            headerAttributes: {
              style: "text-align:center;"
            },
            attributes: {
              class: "text-center"
            },
            template: '#if (data.commissions) {#<input type="radio" name="comisiones" #= data.enabled ? "checked=checked" : "" # /># } #'
          },
          {
            field: "code",
            title: "Número"
          },
          {
            field: "type",
            title: "Tipo"
          },
          {
            field: "currency",
            title: "Moneda"
          },
          {
            field: "alias",
            title: "Alias"
          },
          {
            field: "status",
            title: "Disponibilidad"
          },
          {
            headerAttributes: {
              "class": "cb-actions"
            },
            attributes: {
              "class": "cb-actions cb-no-wrap"
            },
            template: '<button class="btn btn-default btn-sm" ng-click="showNotifications()" title="Notificaciones"><span class="fa fa-bell"></span></button> <button class="btn btn-default btn-sm"><span class="fa fa-times"></span></button>'
          }
          ],
          toolbar: '<button class="btn btn-default" ng-click="showModal(\'product\')"><span class="fa fa-plus"></span> Agregar</button>'
        };
        $scope.products2 = {
          dataSource: {
            transport: {
              read: {
                url: "../../mocks/canales-products.json",
                contentType: "application/json; charset=utf-8",
                dataType: "json"
              }
            }
          },
          scrollable: false,
          columns: [{
            field: "enabled",
            title: "Cobro comisiones",
            width: 50,
            headerAttributes: {
              style: "text-align:center;"
            },
            attributes: {
              class: "text-center"
            },
            template: '#if (data.commissions) {#<input type="radio" name="comisiones" #= data.enabled ? "checked=checked" : "" # /># } #'
          },
          {
            field: "code",
            title: "Número"
          },
          {
            field: "type",
            title: "Tipo"
          },
          {
            field: "currency",
            title: "Moneda"
          },
          {
            field: "alias",
            title: "Alias"
          },
          {
            field: "status",
            title: "Disponibilidad"
          },
          {
            headerAttributes: {
              "class": "cb-actions"
            },
            attributes: {
              "class": "cb-actions cb-no-wrap"
            },
            template: '<button class="btn btn-default btn-sm" ng-click="showNotifications()" title="Notificaciones"><span class="fa fa-bell"></span></button>'
          }
          ]
        };
        $scope.productsSearch = {
          dataSource: {
            transport: {
              read: {
                url: "../../mocks/canales-products.json",
                contentType: "application/json; charset=utf-8",
                dataType: "json"
              }
            },
            group: {
              field: "type"
            }
          },
          scrollable: false,
          selectable: true,
          columns: [{
            field: "type",
            hidden: true,
            groupHeaderTemplate: "#= value #"
          },
          {
            field: "enabled",
            title: '&nbsp;',
            width: 30,
            headerAttributes: {
              style: "text-align:center;"
            },
            attributes: {
              class: "text-center"
            },
            template: '<input type="checkbox" />'
          },
          {
            field: "code",
            template: $("#productTemplate").length > 0 ? kendo.template($("#productTemplate").html()) : kendo.template('')
          }
          ]
        };
        $scope.notifications = {
          dataSource: {
            transport: {
              read: {
                url: "../../mocks/canales-notifications.json",
                contentType: "application/json; charset=utf-8",
                dataType: "json"
              }
            }
          },
          scrollable: false,
          columns: [{
            field: "enabled",
            title: "&nbsp;",
            width: 30,
            headerAttributes: {
              style: "text-align:center;"
            },
            headerTemplate: '<input type="checkbox" #= data.enabled ? "checked=checked" : "" # />',
            attributes: {
              class: "text-center"
            },
            template: '<input type="checkbox" #= data.enabled ? "checked=checked" : "" # />'
          },
          {
            field: "id",
            title: "Nemónico"
          },
          {
            field: "description",
            title: "Descripción"
          }
          ]
        };
        $scope.mediaTypes = [{
          name: 'Email',
          value: 'email',
          icon: 'envelope-closed'
        },
        {
          name: 'SMS',
          value: 'sms',
          icon: 'mobile'
        },
        {
          name: 'Push',
          value: 'push',
          icon: 'mobile--sms'
        }
        ];
        $scope.menus = {
          dragAndDrop: true,
          dataSource: {
            data: [{
              "code": "1",
              "text": "Principal",
              "items": [{
                "code": "22100",
                "text": "Posición consolidada",
                "items": []
              },
              {
                "code": "22200",
                "text": "Consultas",
                "items": [{
                  "code": "70",
                  "text": "Saldos",
                  "items": []
                },
                {
                  "code": "820",
                  "text": "Ultimos movimientos",
                  "items": []
                },
                {
                  "code": "10240",
                  "text": "Movimientos entre fechas",
                  "items": []
                },
                {
                  "code": "10496",
                  "text": "Préstamos",
                  "items": []
                },
                {
                  "code": "10752",
                  "text": "Depósitos a plazo fijo",
                  "items": []
                },
                {
                  "code": "10752",
                  "text": "Estados de cuenta",
                  "items": []
                }
                ]
              },
              {
                "code": "22300",
                "text": "Consulta de procesos masivos",
                "items": [{
                  "code": "1800",
                  "text": "Consulta y cancelación de lotes",
                  "items": []
                },
                {
                  "code": "1801",
                  "text": "Afiliaciones",
                  "items": []
                }
                ]
              },
              {
                "code": "22400",
                "text": "Cargas masivas",
                "items": [{
                  "code": "1203",
                  "text": "Carga de afiliados",
                  "items": []
                },
                {
                  "code": "1207",
                  "text": "Carga de pagos y cobros",
                  "items": []
                },
                {
                  "code": "1215",
                  "text": "Carga de domiciliados",
                  "items": []
                },
                {
                  "code": "1216",
                  "text": "Carga de pagos y cobros domiciliados",
                  "items": []
                }
                ]
              },
              {
                "code": "22500",
                "text": "Transferencias",
                "items": [{
                  "code": "1244",
                  "text": "A mis cuentas",
                  "items": []
                },
                {
                  "code": "1255",
                  "text": "Otras cuentas",
                  "items": []
                }
                ]
              },
              {
                "code": "22500",
                "text": "Administrativo",
                "items": [{
                  "code": "1244",
                  "text": "Parametrización de autorizaciones",
                  "items": []
                },
                {
                  "code": "1255",
                  "text": "Parametrización de condiciones",
                  "items": []
                },
                {
                  "code": "1255",
                  "text": "Doble autorización/rechazos",
                  "items": []
                },
                {
                  "code": "1255",
                  "text": "Afiliar terceros",
                  "items": []
                },
                {
                  "code": "1255",
                  "text": "Cambio de preguntas de seguridad",
                  "items": []
                },
                {
                  "code": "1255",
                  "text": "Cambio de imagen de seguridad",
                  "items": []
                },
                {
                  "code": "1255",
                  "text": "Buzón de notificaciones",
                  "items": []
                },
                {
                  "code": "1255",
                  "text": "Administración de notificaciones",
                  "items": []
                },
                {
                  "code": "1255",
                  "text": "Medios de notificación",
                  "items": []
                },
                {
                  "code": "1255",
                  "text": "Cambio de contraseña",
                  "items": []
                },
                {
                  "code": "1255",
                  "text": "Envio de mensajes",
                  "items": []
                }
                ]
              }
              ]
            }],
            schema: {
              model: {
                children: 'items',
                hasChildren: function (item) {
                  return item.items.length > 0;
                }
              }
            }
          }
        };
        $scope.noticias = {
          dataSource: {
            transport: {
              read: {
                url: "../../mocks/canales-noticias.json",
                contentType: "application/json; charset=utf-8",
                dataType: "json"
              }
            }
          },
          scrollable: false,
          columns: [{
            field: "id",
            template: $("#item").length > 0 ? kendo.template($("#item").html()) : kendo.template('')
          },
          {
            width: 20,
            headerAttributes: {
              "class": "cb-actions"
            },
            attributes: {
              "class": "cb-actions"
            },
            command: [{
              template: '<button class="btn btn-default btn-sm" title="Editar" ng-click="showModal(\'news\')"><span class="fa fa-pencil fa-fw"></span></button>',
            }, {
              template: '<button class="btn btn-default btn-sm" title="Eliminar"><span class="fa fa-times fa-fw"></span></button>'
            }]
          }
          ],
          toolbar: '<div class="cb-flex cb-middle"><button class="btn btn-default"><span class="fa fa-search"></span> Buscar</button><button class="btn btn-default" ng-click="showModal(\'news\')"><span class="fa fa-plus"></span> Agregar</button><div class="cb-flex cb-middle cb-right cb-grow text-right"><div class="text-muted small" style="margin-right:10px;">Exportar:</div><button class="btn btn-default" style="margin:0;" title="Exportar a PDF"><span class="fa fa-file-pdf-o" style="margin:0;"></span></button><button class="btn btn-default" style="margin:0;" title="Exportar a Excel"><span class="fa fa-file-excel-o" style="margin:0;"></span></button></div></div>'
        };
        $scope.mensajesMasivos = {
          dataSource: {
            transport: {
              read: {
                url: "../../mocks/canales-messages.json",
                contentType: "application/json; charset=utf-8",
                dataType: "json"
              }
            }
          },
          scrollable: false,
          columns: [{
            field: "category",
            title: "Categoría"
          },
          {
            field: "service",
            title: "Canal"
          },
          {
            field: "profile",
            title: "Perfil"
          },
          {
            field: "office",
            title: "Oficina"
          },
          {
            field: "product",
            title: "Producto"
          },
          {
            field: "message",
            title: "Mensaje"
          },
          {
            field: "date",
            title: "Fecha envio"
          },
          {
            field: "status",
            title: "Estado"
          },
          {
            width: 20,
            headerAttributes: {
              "class": "cb-actions"
            },
            attributes: {
              "class": "cb-actions cb-no-wrap"
            },
            template: '<button class="btn btn-default btn-sm" title="Editar" ng-click="showModal(\'message\')"><span class="fa fa-pencil fa-fw"></span></button><button class="btn btn-default btn-sm" title="Eliminar"><span class="fa fa-times fa-fw"></span></button>'
          }
          ],
          toolbar: '<div class="cb-flex cb-middle"><button class="btn btn-default"><span class="fa fa-search"></span> Buscar</button><button class="btn btn-default" ng-click="showModal(\'message\')"><span class="fa fa-plus"></span> Agregar</button><div class="cb-flex cb-middle cb-right cb-grow text-right"><div class="text-muted small" style="margin-right:10px;">Exportar:</div><button class="btn btn-default" style="margin:0;" title="Exportar a PDF"><span class="fa fa-file-pdf-o" style="margin:0;"></span></button><button class="btn btn-default" style="margin:0;" title="Exportar a Excel"><span class="fa fa-file-excel-o" style="margin:0;"></span></button></div></div>'
        };
        $scope.terms = {
          dataSource: {
            transport: {
              read: {
                url: "../../mocks/canales-terms.json",
                contentType: "application/json; charset=utf-8",
                dataType: "json"
              }
            }
          },
          scrollable: false,
          columns: [{
            field: "title",
            title: "Título"
          },
          {
            field: "channel",
            title: "Canal"
          },
          {
            field: "type",
            title: "Tipo de cliente"
          },
          {
            field: "date_start",
            title: "Fecha inicio"
          },
          {
            field: "date_end",
            title: "Fecha fin"
          },
          {
            field: "status",
            title: "Estado"
          },
          {
            width: 20,
            headerAttributes: {
              "class": "cb-actions"
            },
            attributes: {
              "class": "cb-actions cb-no-wrap"
            },
            template: '<button class="btn btn-default btn-sm" title="Editar" ng-click="showModal(\'message\')"><span class="fa fa-pencil fa-fw"></span></button><button class="btn btn-default btn-sm" title="Eliminar"><span class="fa fa-times fa-fw"></span></button>'
          }
          ],
          toolbar: '<div class="cb-flex cb-middle"><button class="btn btn-default"><span class="fa fa-search"></span> Buscar</button><button class="btn btn-default" ng-click="showModal(\'message\')"><span class="fa fa-plus"></span> Agregar</button><div class="cb-flex cb-middle cb-right cb-grow text-right"><div class="text-muted small" style="margin-right:10px;">Exportar:</div><button class="btn btn-default" style="margin:0;" title="Exportar a PDF"><span class="fa fa-file-pdf-o" style="margin:0;"></span></button><button class="btn btn-default" style="margin:0;" title="Exportar a Excel"><span class="fa fa-file-excel-o" style="margin:0;"></span></button></div></div>'
        };
        $scope.images = {
          dataSource: {
            transport: {
              read: {
                url: "../../mocks/canales-images.json",
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
            field: "description",
            title: "Descripción"
          },
          {
            field: "url",
            title: "URL"
          },
          {
            field: "status",
            title: "Estado"
          },
          {
            width: 20,
            headerAttributes: {
              "class": "cb-actions"
            },
            attributes: {
              "class": "cb-actions cb-no-wrap"
            },
            template: '<button class="btn btn-default btn-sm" title="Editar" ng-click="showModal(\'message\')"><span class="fa fa-pencil fa-fw"></span></button>'
          }
          ]
        };
        $scope.massives = [
          { "name": "Afiliaciones masivas", "icon": "usergroup--plus", "status": "Vigente", "blocked": "No aplica", "affectation": "Afectación línea a línea", "validate_affiliation": "No aplica", "authorization": "Si" },
          { "name": "Pago a terceros", "icon": "transfer--user", "status": "Vigente", "blocked": "No aplica", "affectation": "Afectación línea a línea", "validate_affiliation": "No aplica", "authorization": "Si" },
          { "name": "Domiciliados", "icon": "list-upload", "status": "Vigente", "blocked": "No aplica", "affectation": "Afectación línea a línea", "validate_affiliation": "No aplica", "authorization": "Si" },
          { "name": "Domiciliados Interbancarios", "icon": "list-upload", "status": "Vigente", "blocked": "No aplica", "affectation": "Afectación línea a línea", "validate_affiliation": "No aplica", "authorization": "Si" },
          { "name": "Pago de nómina", "icon": "payment-upload", "status": "Vigente", "blocked": "No aplica", "affectation": "Afectación línea a línea", "validate_affiliation": "No aplica", "authorization": "Si" },
          { "name": "Pagos masivos", "icon": "payments-upload", "status": "Vigente", "blocked": "No aplica", "affectation": "Afectación línea a línea", "validate_affiliation": "No aplica", "authorization": "Si" },
          { "name": "Cobros", "icon": "subscription", "status": "Vigente", "blocked": "No aplica", "affectation": "Afectación línea a línea", "validate_affiliation": "No aplica", "authorization": "Si" }
        ]
        $scope.massiveServices = {
          dataSource: {
            transport: {
              read: {
                url: "../../mocks/massive-services.json",
                contentType: "application/json; charset=utf-8",
                dataType: "json"
              }
            },
            schema: {
              model: {
                fields: {
                  name: {
                    editable: false
                  },
                  status: {
                    editable: true,
                    nullable: true
                  },
                  blocked: {
                    editable: true,
                    nullable: true
                  },
                  affectation: {
                    editable: true,
                    nullable: true
                  },
                  validate_affiliation: {
                    editable: true,
                    nullable: true
                  },
                  authorization: {
                    editable: true,
                    nullable: true
                  }
                }
              }
            }
          },
          editable: true,
          selectable: true,
          columns: [{
            width: 120,
            title: "&nbsp;",
            template: "<div class=\"cb-flex cb-middle\"><svg style=\"width:32px; height:32px;\"><use xlink:href=\"../../images/icons-slim.svg\\##: data.icon#\"></use></svg><div style=\"margin-left:10px;\">#: data.name #</div></div>"
          }, {
            field: 'status',
            title: 'Estado',
            editor: '<select kendo-drop-down-list class="form-control"><option>Vigente</option><option>Bloqueado</option></select>'
          }, {
            field: 'blocked',
            title: 'Bloqueado',
            editor: '<select kendo-drop-down-list class="form-control"><option>Con bloqueo de fondos</option><option>Sin bloqueo de fondos</option><option>No aplica</option></select>'
          }, {
            field: 'affectation',
            title: 'Afectación',
            editor: '<select kendo-drop-down-list class="form-control"><option>Afectación línea a línea</option><option>Afectación total</option><option>No aplica</option></select>'
          }, {
            field: 'validate_affiliation',
            title: 'Validar afectación',
            editor: '<select kendo-drop-down-list class="form-control"><option>Si</option><option>No</option><option>No aplica</option></select>'
          }, {
            field: 'authorization',
            title: 'Autorizado',
            editor: '<select kendo-drop-down-list class="form-control"><option>Si</option><option>No</option></select>'
          }]
        };
        $scope.massiveServices2 = {
          dataSource: {
            transport: {
              read: {
                url: "../../mocks/massive-services.json",
                contentType: "application/json; charset=utf-8",
                dataType: "json"
              }
            }
          },
          height: 340,
          scrollable: true,
          editable: true,
          selectable: true,
          columns: [{
            width: 48,
            title: "&nbsp;",
            template: "<div class=\"cb-flex cb-middle\"><svg style=\"width:32px; height:32px;\"><use xlink:href=\"../../images/icons-slim.svg\\##: data.icon#\"></use></svg><div style=\"margin-left:10px;\">#: data.name #</div></div>"
          }]
        };
        $scope.massiveServices3 = {
          dataSource: {
            transport: {
              read: {
                url: "../../mocks/massive-services.json",
                contentType: "application/json; charset=utf-8",
                dataType: "json"
              }
            }
          },
          columns: [{
            width: 48,
            title: "&nbsp;",
            template: "<div class=\"cb-flex cb-middle\"><svg style=\"width:32px; height:32px;\"><use xlink:href=\"../../images/icons-slim.svg\\##: data.icon#\"></use></svg><div style=\"margin-left:10px;\">#: data.name #</div></div>"
          }]
        };
        $scope.cards = {
          dataSource: {
            transport: {
              read: {
                url: "../../mocks/atms-cards.json",
                contentType: "application/json; charset=utf-8",
                dataType: "json"
              }
            }
          },
          columns: [{
            field: 'imageUrl',
            title: '&nbsp;',
            attributes: {
              "style": "padding: 20px;"
            },
            template: '<img src="#: data.imageUrl #" style="width: 100%;" />'
          }, {
            field: 'type',
            title: 'Tarjeta'
          }, {
            field: 'transactionsDaily',
            title: 'Transacciones diarias',
            headerAttributes: {
              "class": "text-center"
            },
            attributes: {
              "class": "text-center"
            }
          }, {
            field: 'transactionsMonthly',
            title: 'Transacciones mensuales',
            headerAttributes: {
              "class": "text-center"
            },
            attributes: {
              "class": "text-center"
            }
          }, {
            width: 40,
            headerAttributes: {
              "class": "cb-actions"
            },
            attributes: {
              "class": "cb-actions cb-no-wrap text-right"
            },
            template: '<button class="btn btn-default btn-sm" title="Editar" ng-click="showModal(\'card\')"><span class="fa fa-pencil fa-fw"></span></button><button class="btn btn-default btn-sm" title="Eliminar"><span class="fa fa-times fa-fw"></span></button>'
          }],
          toolbar: '<button class="btn btn-default" ng-click="showModal(\'card\')"><span class="fa fa-plus"></span> Agregar</button>'
        };
        $scope.cards2 = {
          dataSource: {
            transport: {
              read: {
                url: "../../mocks/atms-cards.json",
                contentType: "application/json; charset=utf-8",
                dataType: "json"
              }
            }
          },
          valueTemplate: '<div class="cb-flex cb-middle"><img src="{{dataItem.imageUrl}}" style="height: 20px;margin-left: 6px;"><div>{{dataItem.number}}</div>',
          template: '<div class="cb-flex cb-middle" style="padding-top: 8px; padding-bottom: 8px;"><img src="{{dataItem.imageUrl}}" style="height: 50px; margin-right:10px;"><div><div style="line-height: normal; font-weight: bold;">{{dataItem.name}}</div><div style="line-height: normal;">{{dataItem.product}} - {{dataItem.number}}</div><div class="small text-muted" style="line-height: normal;">{{dataItem.type}}</div></div></div>'
        };
        $scope.notificaciones = {
          dataSource: {
            transport: {
              read: {
                url: "../../mocks/canales-notifications.json",
                contentType: "application/json; charset=utf-8",
                dataType: "json"
              }
            }
          },
          scrollable: false,
          columns: [{
            field: "id",
            title: "Nemónico"
          },
          {
            field: "description",
            title: "Descripción"
          },
          {
            field: "product",
            title: "Producto"
          },
          {
            width: 20,
            headerAttributes: {
              "class": "cb-actions"
            },
            attributes: {
              "class": "cb-actions cb-no-wrap text-right"
            },
            template: '#if (data.editable) {# <button class="btn btn-default btn-sm" title="Editar" ng-click="showModal(\'notification\')"><span class="fa fa-pencil fa-fw"></span></button> # } #<button class="btn btn-default btn-sm" title="Eliminar"><span class="fa fa-times fa-fw"></span></button>'
          }
          ],
          toolbar: '<div class="cb-flex cb-middle"><button class="btn btn-default"><span class="fa fa-search"></span> Buscar</button><button class="btn btn-default" ng-click="showModal(\'notification\')"><span class="fa fa-plus"></span> Agregar</button><div class="cb-flex cb-middle cb-right cb-grow text-right"><div class="text-muted small" style="margin-right:10px;">Exportar:</div><button class="btn btn-default" style="margin:0;" title="Exportar a PDF"><span class="fa fa-file-pdf-o" style="margin:0;"></span></button><button class="btn btn-default" style="margin:0;" title="Exportar a Excel"><span class="fa fa-file-excel-o" style="margin:0;"></span></button></div></div>'
        };
        $scope.notificaciones2 = {
          dataSource: {
            transport: {
              read: {
                url: "../../mocks/canales-notifications3.json",
                contentType: "application/json; charset=utf-8",
                dataType: "json"
              }
            },
            pageSize: 8
          },
          pageable: {
            alwaysVisible: false
          },
          detailTemplate: $("#transaction-detail").length > 0 ? kendo.template($("#transaction-detail").html()) : kendo.template(''),
          scrollable: false,
          columns: [{
            field: "default",
            title: "&nbsp;",
            width: 30,
            headerAttributes: {
              style: "text-align:center;"
            },
            attributes: {
              class: "text-center"
            },
            template: '#if (data.status=="Ejecutada") {# <span class=\"fa fa-check-circle text-success\" title="Ejecutada"></span> # } # #if (data.status!="Ejecutada") {# <span class=\"fa fa-times-circle text-danger\" title="Error"></span> # } #'
          }, {
            field: "type",
            title: "Tipo"
          },
          {
            field: "name",
            title: "Nombre"
          },
          {
            field: "username",
            title: "usuario"
          },
          {
            field: "date_create",
            title: "Fecha registro"
          },
          {
            field: "date_sent",
            title: "Fecha envio"
          }
          ],
          toolbar: '<div class="cb-flex cb-middle"><button class="btn btn-default"><span class="fa fa-search"></span> Buscar</button><div class="cb-flex cb-middle cb-right cb-grow text-right"><div class="text-muted small" style="margin-right:10px;">Exportar:</div><button class="btn btn-default" style="margin:0;" title="Exportar a Excel"><span class="fa fa-file-excel-o" style="margin:0;"></span></button></div></div>'
        };
        $scope.notificaciones3 = {
          dataSource: {
            transport: {
              read: {
                url: "../../mocks/canales-notifications4.json",
                contentType: "application/json; charset=utf-8",
                dataType: "json"
              }
            }
          },
          seriesDefaults: {
            type: 'column'
          },
          series: [{
            name: 'Pendientes',
            field: 'pending',
            categoryField: 'type',
            labels: {
              visible: true
            }
          },
          {
            name: 'En proceso',
            field: 'process',
            categoryField: 'type',
            labels: {
              visible: true
            }
          }, {
            name: 'Finalizadas',
            field: 'finished',
            categoryField: 'type',
            labels: {
              visible: true
            }
          },
          {
            name: 'Canceladas',
            field: 'canceled',
            categoryField: 'type',
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
        $scope.notificaciones4 = {
          dataSource: {
            transport: {
              read: {
                url: "../../mocks/canales-notifications2.json",
                contentType: "application/json; charset=utf-8",
                dataType: "json"
              }
            }
          },
          columns: [{
            field: "type",
            title: "Tipo"
          }, {
            field: "pending",
            title: "Pendiente",
            headerAttributes: {
              style: "text-align:center;"
            },
            attributes: {
              class: "text-center"
            }
          }, {
            field: "process",
            title: "En proceso",
            headerAttributes: {
              style: "text-align:center;"
            },
            attributes: {
              class: "text-center"
            }
          }, {
            field: "finished",
            title: "Finalizado",
            headerAttributes: {
              style: "text-align:center;"
            },
            attributes: {
              class: "text-center"
            }
          }, {
            field: "canceled",
            title: "Cancelado",
            headerAttributes: {
              style: "text-align:center;"
            },
            attributes: {
              class: "text-center"
            }
          }, {
            field: "total",
            title: "Total",
            headerAttributes: {
              style: "text-align:center;"
            },
            attributes: {
              class: "text-center"
            }
          }]
        };
        $scope.sessions = {
          dataSource: {
            transport: {
              read: {
                url: "../../mocks/canales-sessions.json",
                contentType: "application/json; charset=utf-8",
                dataType: "json"
              }
            }
          },
          scrollable: false,
          columns: [{
            field: "id",
            title: "Cédula"
          },
          {
            field: "retries",
            title: "Intentos"
          },
          {
            field: "channel",
            title: "Canal"
          },
          {
            field: "lastRetry",
            title: "Ultimo intento"
          },
          {
            field: "status",
            title: "Estado"
          },
          {
            width: 20,
            headerAttributes: {
              "class": "cb-actions"
            },
            attributes: {
              "class": "cb-actions cb-no-wrap text-right"
            },
            template: '<button class="btn btn-default btn-sm" title="Liberar"><span class="fa fa-times fa-fw"></span></button>'
          }
          ]
        };
        $scope.institucionesFinancieras = {
          dataSource: {
            transport: {
              read: {
                url: "../../mocks/canales-institucionesFinancieras.json",
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
            field: "type",
            title: "Tipo"
          },
          {
            field: "status",
            title: "Estado"
          },
          {
            width: 20,
            headerAttributes: {
              "class": "cb-actions"
            },
            attributes: {
              "class": "cb-actions cb-no-wrap"
            },
            template: '<button class="btn btn-default btn-sm" title="Editar" ng-click="showModal(\'instituciones-financieras\')"><span class="fa fa-pencil fa-fw"></span></button><button class="btn btn-default btn-sm" title="Eliminar"><span class="fa fa-times fa-fw"></span></button>'
          }
          ],
          toolbar: '<div class="cb-flex cb-middle"><button class="btn btn-default"><span class="fa fa-search"></span> Buscar</button><button class="btn btn-default" ng-click="showModal(\'instituciones-financieras\')"><span class="fa fa-plus"></span> Agregar</button><div class="cb-flex cb-middle cb-right cb-grow text-right"><div class="text-muted small" style="margin-right:10px;">Exportar:</div><button class="btn btn-default" style="margin:0;" title="Exportar a PDF"><span class="fa fa-file-pdf-o" style="margin:0;"></span></button><button class="btn btn-default" style="margin:0;" title="Exportar a Excel"><span class="fa fa-file-excel-o" style="margin:0;"></span></button></div></div>'
        };
        $scope.autoenrolamiento = {
          dataSource: {
            transport: {
              read: {
                url: "../../mocks/canales-autoenrolamiento.json",
                contentType: "application/json; charset=utf-8",
                dataType: "json"
              }
            }
          },
          scrollable: false,
          columns: [{
            field: "default",
            title: "&nbsp;",
            width: 30,
            headerAttributes: {
              style: "text-align:center;"
            },
            attributes: {
              class: "text-center"
            },
            template: '#if (data.status=="approved") {# <span class=\"fa fa-check-circle text-success\" title="Aprobado"></span> # } # #if (data.status=="rejected") {# <span class=\"fa fa-times-circle text-danger\" title="Rechazado"></span> # } #'
          },
          {
            field: "name",
            title: "Nombre"
          },
          {
            field: "email",
            title: "Email"
          },
          {
            field: "phone",
            title: "Teléfono"
          },
          {
            field: "requestAt",
            title: "Solicitud"
          },
          {
            field: "approvedAt",
            title: "Aprobado"
          },
          {
            field: "username",
            title: "Usuario"
          },
          {
            width: 20,
            headerAttributes: {
              "class": "cb-actions"
            },
            attributes: {
              "class": "cb-actions cb-no-wrap"
            },
            template: '<button class="btn btn-default cb-menu-options"><span class="fa fa-ellipsis-v fa-fw"></span></button>'
          }
          ],
          toolbar: '<div class="cb-flex cb-middle"><button class="btn btn-default"><span class="fa fa-search"></span> Buscar</button><div class="cb-flex cb-middle cb-right cb-grow text-right"><div class="text-muted small" style="margin-right:10px;">Exportar:</div><button class="btn btn-default" style="margin:0;" title="Exportar a PDF"><span class="fa fa-file-pdf-o" style="margin:0;"></span></button><button class="btn btn-default" style="margin:0;" title="Exportar a Excel"><span class="fa fa-file-excel-o" style="margin:0;"></span></button></div></div>'
        };
        $scope.transactions = {
          dataSource: {
            transport: {
              read: {
                url: "../../mocks/canales-permissions.json",
                contentType: "application/json; charset=utf-8",
                dataType: "json"
              }
            }
          },
          dataTextField: "name",
          dataValueField: "code",
          filter: "contains",
          suggest: true
        };
        $scope.transactions2 = {
          dataSource: {
            transport: {
              read: {
                url: "../../mocks/canales-permissions.json",
                contentType: "application/json; charset=utf-8",
                dataType: "json"
              }
            }
          },
          scrollable: false,
          columns: [{
            field: "name",
            title: "Nombre"
          }]
        };
        $scope.transactions3 = {
          dataSource: {
            transport: {
              read: {
                url: "../../mocks/canales-transactions.json",
                contentType: "application/json; charset=utf-8",
                dataType: "json"
              }
            }
          },
          scrollable: false,
          columns: [{
            field: "code",
            title: "Código",
            width: 70,
            attributes: {
              "class": "text-right"
            },
          },
          {
            field: "name",
            title: "Nombre"
          },
          {
            width: 20,
            headerAttributes: {
              "class": "cb-actions"
            },
            attributes: {
              "class": "cb-actions cb-no-wrap"
            },
            template: '<button class="btn btn-default btn-sm" title="Eliminar"><span class="fa fa-times fa-fw"></span></button>'
          }
          ],
          toolbar: '<button class="btn btn-default"><span class="fa fa-plus"></span> Agregar</button>'
        };
        $scope.transactions4 = {
          dataSource: {
            transport: {
              read: {
                url: "../../mocks/canales-transactions2.json",
                contentType: "application/json; charset=utf-8",
                dataType: "json"
              }
            }
          },
          scrollable: false,
          detailTemplate: $("#transaction-detail").length > 0 ? kendo.template($("#transaction-detail").html()) : kendo.template(''),
          columns: [{
            field: "default",
            title: "&nbsp;",
            width: 30,
            headerAttributes: {
              style: "text-align:center;"
            },
            attributes: {
              class: "text-center"
            },
            template: '#if (data.status=="Ejecutada") {# <span class=\"fa fa-check-circle text-success\" title="Ejecutada"></span> # } # #if (data.status!="Ejecutada") {# <span class=\"fa fa-times-circle text-danger\" title="Error"></span> # } #'
          },
          {
            field: "description",
            title: "Descripción"
          },
          {
            field: "user",
            title: "Usuario"
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
            }
          },
          {
            field: "status",
            title: "Tipo",
            attributes: {
              "class": "text-center"
            },
            headerAttributes: {
              "style": "text-align:center;"
            }
          },
          {
            field: "executeStatus",
            title: "Estado",
            attributes: {
              "class": "text-center"
            },
            headerAttributes: {
              "style": "text-align:center;"
            }
          },
          {
            field: "date",
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
            template: '<button class="btn btn-default" title="Imprimir"><span class="fa fa-print fa-fw"></span></button>'
          }
          ],
          toolbar: '<div class="cb-flex cb-middle"><button class="btn btn-default"><span class="fa fa-search"></span> Buscar</button><div class="cb-flex cb-middle cb-right cb-grow text-right"><div class="text-muted small" style="margin-right:10px;">Exportar:</div><button class="btn btn-default" style="margin:0;" title="Exportar a PDF"><span class="fa fa-file-pdf-o" style="margin:0;"></span></button><button class="btn btn-default" style="margin:0;" title="Exportar a Excel"><span class="fa fa-file-excel-o" style="margin:0;"></span></button></div></div>'
        };
        $scope.transactions5 = {
          dataSource: {
            transport: {
              read: {
                url: "../../mocks/canales-transactions3.json",
                contentType: "application/json; charset=utf-8",
                dataType: "json"
              }
            }
          },
          scrollable: false,
          columns: [{
            field: "default",
            title: "&nbsp;",
            width: 30,
            headerAttributes: {
              style: "text-align:center;"
            },
            attributes: {
              class: "text-center"
            },
            template: '#if (data.status=="Aplicada") {# <span class=\"fa fa-check-circle text-success\" title="Aplicada"></span> # } # #if (data.status!="Aplicada") {# <span class=\"fa fa-times-circle text-danger\" title="Error"></span> # } #'
          }, {
            field: "id",
            width: 10,
            headerAttributes: {
              style: "text-align:right;"
            },
            attributes: {
              class: "text-right"
            },
            title: "#"
          },
          {
            field: "date",
            title: "Fecha pago"
          },
          {
            field: "date",
            title: "Fecha pago real"
          },
          {
            field: "reference",
            title: "Referencia"
          },
          {
            field: "notes",
            title: "Notas"
          },
          {
            field: "status",
            title: "Tipo",
            attributes: {
              "class": "text-center"
            },
            headerAttributes: {
              "style": "text-align:center;"
            }
          }
          ]
        };
        $scope.transactions6 = {
          dataSource: {
            transport: {
              read: {
                url: "../../mocks/canales-transactions6.json",
                contentType: "application/json; charset=utf-8",
                dataType: "json"
              }
            }
          },
          selectable: 'multiple',
          scrollable: false,
          columns: [{
            field: "date",
            title: "Fecha"
          },
          {
            field: "time",
            title: "Hora"
          },
          {
            field: "user",
            title: "Usuario"
          },
          {
            field: "description",
            title: "Transacción"
          },
          {
            field: "transaction_type",
            title: "Tipo de transación"
          },
          {
            width: 20,
            headerAttributes: {
              "class": "cb-actions"
            },
            attributes: {
              "class": "cb-actions cb-no-wrap"
            },
            template: '<button class="btn btn-default" title="Ver historial de autorizaciones" ng-click="showModal(\'detail\')"><span class="fa fa-eye fa-fw"></span></button>'
          }
          ],
          toolbar: '<div class="cb-flex cb-middle"><button class="btn btn-default"><span class="fa fa-search"></span> Buscar</button><button class="btn btn-default"><span class="fa fa-check-square-o"></span> Marcar todas</button> <button class="btn btn-default"><span class="fa fa-check"></span> Autorizar</button><div class="cb-flex cb-middle cb-right cb-grow text-right"><div class="text-muted small" style="margin-right:10px;">Exportar:</div><button class="btn btn-default" style="margin:0;" title="Exportar a PDF"><span class="fa fa-file-pdf-o" style="margin:0;"></span></button><button class="btn btn-default" style="margin:0;" title="Exportar a Excel"><span class="fa fa-file-excel-o" style="margin:0;"></span></button></div></div>'
        };
        $scope.transactions7 = {
          dataSource: {
            transport: {
              read: {
                url: "../../mocks/canales-transactions2.json",
                contentType: "application/json; charset=utf-8",
                dataType: "json"
              }
            },
            pageSize: 8
          },
          pageable: {
            alwaysVisible: false
          },
          scrollable: false,
          detailTemplate: $("#transaction-detail").length > 0 ? kendo.template($("#transaction-detail").html()) : kendo.template(''),
          columns: [{
            field: "default",
            title: "&nbsp;",
            width: 30,
            headerAttributes: {
              style: "text-align:center;"
            },
            attributes: {
              class: "text-center"
            },
            template: '#if (data.status=="Ejecutada") {# <span class=\"fa fa-check-circle text-success\" title="Ejecutada"></span> # } # #if (data.status!="Ejecutada") {# <span class=\"fa fa-times-circle text-danger\" title="Error"></span> # } #'
          },
          {
            field: "description",
            title: "Descripción"
          },
          {
            field: "user",
            title: "Usuario"
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
            }
          },
          {
            field: "status",
            title: "Tipo",
            attributes: {
              "class": "text-center"
            },
            headerAttributes: {
              "style": "text-align:center;"
            }
          },
          {
            field: "executeStatus",
            title: "Estado",
            attributes: {
              "class": "text-center"
            },
            headerAttributes: {
              "style": "text-align:center;"
            }
          },
          {
            field: "date",
            title: "Fecha"
          }
          ],
          toolbar: '<div class="cb-flex cb-middle"><button class="btn btn-default"><span class="fa fa-search"></span> Buscar</button><div class="cb-flex cb-middle cb-right cb-grow text-right"><div class="text-muted small" style="margin-right:10px;">Exportar:</div><button class="btn btn-default" style="margin:0;" title="Exportar a Excel"><span class="fa fa-file-excel-o" style="margin:0;"></span></button></div></div>'
        };
        $scope.transactionDetail = {
          dataSource: {
            transport: {
              read: {
                url: "../../mocks/transaction-detail.json",
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
              style: "font-weight: bold;"
            }
          },
          {
            field: "value",
            title: "Valor"
          }
          ]
        };
        $scope.permissions = {
          dataSource: {
            transport: {
              read: {
                url: "../../mocks/canales-permissions.json",
                contentType: "application/json; charset=utf-8",
                dataType: "json"
              }
            }
          },
          scrollable: false,
          filterable: {
            extra: false,
            operators: {
              string: {
                startswith: "Starts with",
                eq: "Is equal to",
                neq: "Is not equal to"
              }
            }
          },
          columns: [{
            field: "name",
            title: "Nombre"
          },
          {
            width: 20,
            headerAttributes: {
              "class": "cb-actions"
            },
            attributes: {
              "class": "cb-actions cb-no-wrap"
            },
            template: '<button class="btn btn-default btn-sm" title="Eliminar"><span class="fa fa-times fa-fw"></span></button>'
          }
          ]
        };
        $scope.removeUser = function () {
          messages.confirm('Realmente quiere eliminar el usuario "Tapia Andrade Viviana María"?, esta operación no se puede deshacer.');
        }
        $scope.removeNode = function () {
          messages.confirm('Realmente quiere eliminar el menú seleccionado?, esta operación no se puede deshacer.');
        }
        $scope.request = {
          expiration: 'undefined',
          allProducts: false,
          status: 'standby',
          transferType: 'all'
        };
        $scope.reportUsers = {
          dataSource: {
            transport: {
              read: {
                url: "../../mocks/canales-user.json",
                contentType: "application/json; charset=utf-8",
                dataType: "json"
              }
            }
          },
          scrollable: false,
          columns: [{
            field: "userName",
            title: "Usuario"
          },
          {
            field: "channel",
            title: "Canal"
          },
          {
            field: "name",
            title: "Nombre"
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
          toolbar: '<div class="cb-flex cb-middle"><button class="btn btn-default"><span class="fa fa-search"></span> Buscar</button> <button class="btn btn-default" ng-click="showModal(\'chart\')"><span class="fa fa-pie-chart"></span> Ver totales</button><div class="cb-flex cb-middle cb-right cb-grow text-right"><div class="text-muted small" style="margin-right:10px;">Exportar:</div><button class="btn btn-default" style="margin:0;" title="Exportar a PDF"><span class="fa fa-file-pdf-o" style="margin:0;"></span></button><button class="btn btn-default" style="margin:0;" title="Exportar a Excel"><span class="fa fa-file-excel-o" style="margin:0;"></span></button></div></div>'
        };
        $scope.resetForm = function () {
          this.state = null;
        };
        $scope.schedulePayments = {
          dataSource: {
            transport: {
              read: {
                url: "../../mocks/canales-schedule-payments.json",
                contentType: "application/json; charset=utf-8",
                dataType: "json"
              }
            }
          },
          scrollable: false,
          detailTemplate: $("#payment-detail").length > 0 ? kendo.template($("#payment-detail").html()) : kendo.template(''),
          columns: [{
            field: "type",
            title: "Tipo"
          },
          {
            field: "description",
            title: "Concepto"
          },
          {
            field: "name",
            title: "Nombre"
          },
          {
            field: "destination",
            title: "Cuenta crédito"
          },
          {
            field: "origin",
            title: "Cuenta débito"
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
          },
          {
            width: 20,
            headerAttributes: {
              "class": "cb-actions"
            },
            attributes: {
              "class": "cb-actions cb-no-wrap"
            },
            template: '<button class="btn btn-default" ng-click="showModal(\'detail\')" title="Detalle"><span class="fa fa-eye fa-fw"></span></button> <button class="btn btn-default" title="Cancelar pago"><span class="fa fa-times fa-fw"></span></button>'
          }
          ],
          toolbar: '<div class="cb-flex cb-middle"><button class="btn btn-default"><span class="fa fa-search"></span> Buscar</button><div class="cb-flex cb-middle cb-right cb-grow text-right"><div class="text-muted small" style="margin-right:10px;">Exportar:</div><button class="btn btn-default" style="margin:0;" title="Exportar a PDF"><span class="fa fa-file-pdf-o" style="margin:0;"></span></button><button class="btn btn-default" style="margin:0;" title="Exportar a Excel"><span class="fa fa-file-excel-o" style="margin:0;"></span></button></div></div>'
        };
        $scope.toggleAll = function (data) {
          /*
          console.log($scope.productsGrid);
          $("#InverterGrid tbody input:checkbox").attr("checked", this.checked);
          */
        }
        $scope.usersByChannel = {
          dataSource: {
            transport: {
              read: {
                url: "../../mocks/canales-usuarios0.json",
                contentType: "application/json; charset=utf-8",
                dataType: "json"
              }
            }
          },
          title: 'Usuarios por Canal',
          legend: {
            visible: false,
            position: 'bottom',
            labels: {
              template: "#= text # - #= kendo.format('{0:P}', percentage)#"
            }
          },
          tooltip: {
            visible: true,
            template: '#= category #'
          },
          seriesDefaults: {
            type: 'pie'
          },
          series: [{
            field: 'count',
            categoryField: 'name',
            padding: 0
          }],
          theme: 'metro'
        };
        $scope.usersByChannelDetail = {
          dataSource: {
            transport: {
              read: {
                url: "../../mocks/canales-usuarios0.json",
                contentType: "application/json; charset=utf-8",
                dataType: "json"
              }
            }
          },
          scrollable: false,
          columns: [{
            field: "color",
            title: ' ',
            width: 16,
            attributes: {
              class: "text-center"
            },
            template: '<div style="width: 10px; height: 10px; background-color: #: data.color #; border-radius: 100vh;"></div>'
          }, {
            field: "channel",
            title: 'Canal'
          }, {
            field: "percentage",
            title: 'Porcentaje',
            format: '{0:p}',
            attributes: {
              class: "text-right"
            },
            headerAttributes: {
              style: "text-align:right;"
            }
          }, {
            field: "count",
            title: 'Conteo',
            attributes: {
              class: "text-right"
            },
            headerAttributes: {
              style: "text-align:right;"
            }
          }]
        };
        $scope.usersByProfile = {
          dataSource: {
            data: [{
              "name": "Perfil Básico",
              "count": 3413
            }, {
              "name": "Perfil Jurídico",
              "count": 343
            }, {
              "name": "Perfil Jurídico Consulta",
              "count": 12
            }, {
              "name": "Perfil Jurídico Operador",
              "count": 45
            }, {
              "name": "Perfil Jurídico Autorizante",
              "count": 1
            }]
          },
          title: 'Usuarios por Perfil',
          legend: {
            position: 'bottom',
            labels: {
              template: "#= text # - #= kendo.format('{0:P}', percentage)#"
            }
          },
          tooltip: {
            visible: true,
            template: '#= category #'
          },
          seriesDefaults: {
            type: 'pie'
          },
          series: [{
            field: 'count',
            categoryField: 'name',
            padding: 0
          }],
          theme: 'metro'
        };
        $.get("../../mocks/users-by-status.json").then(function (response) {
          var channels = response
            .map(function (record) {
              return record.channel;
            })
            .filter(function (value, index, self) {
              return self.indexOf(value) === index;
            });
          var profiles = response
            .map(function (record) {
              return record.profile;
            })
            .filter(function (value, index, self) {
              return self.indexOf(value) === index;
            });
          var statuses = [{
            label: 'VIGENTE',
            field: 'active'
          },
          {
            label: 'CANCELADO',
            field: 'cancel'
          },
          {
            label: 'BLOQUEADO',
            field: 'bloqued'
          },
          {
            label: 'DESHABILITADO',
            field: 'inactiv'
          },
          {
            label: 'OTRO',
            field: 'other'
          }
          ];
          var series = [];
          profiles.forEach(function (profile) {
            statuses.forEach(function (status) {
              var data = [];
              channels.forEach(function (channel, i) {
                response.some(function (record, j) {
                  if (record.channel == channel && record.profile == profile) {
                    //data.push(Number(record[status.field]));
                    data[i] = Number(record[status.field]);
                    return true;
                  }
                });
                /*
                if (!data[i]) {
                  data.push(0);
                }
                */
              });
              series.push({
                name: profile,
                stack: status.label,
                data: data
              });
            });
          });
          $scope.usersByStatus = {
            title: 'Usuarios por Estado/Canal',
            legend: {
              visible: false
            },
            tooltip: {
              visible: true
            },
            seriesDefaults: {
              type: 'column',
              stack: true
            },
            series: series,
            valueAxis: {
              labels: {
                template: "#= value #"
              },
              line: {
                visible: false
              }
            },
            tooltip: {
              visible: true,
              template: "#= series.stack #: #= value # usuarios (#= series.name #)"
            },
            categoryAxis: {
              categories: channels,
              majorGridLines: {
                visible: false
              }
            },
            theme: 'metro'
          };
        });
        $scope.usersByStatusDetail = {
          dataSource: {
            transport: {
              read: {
                url: "../../mocks/users-by-status.json",
                contentType: "application/json; charset=utf-8",
                dataType: "json"
              }
            }
          },
          scrollable: false,
          columns: [{
            field: "color",
            title: ' ',
            width: 16,
            attributes: {
              class: "text-center"
            },
            template: '<div style="width: 10px; height: 10px; background-color: #: data.color #; border-radius: 100vh;"></div>'
          }, {
            field: "channel",
            title: 'Canal',
            hidden: true
          }, {
            field: "profile",
            title: 'Perfil'
          }, {
            field: "active",
            title: 'Vigente',
            attributes: {
              class: "text-center"
            },
            headerAttributes: {
              style: "text-align:center;"
            }
          }, {
            field: "bloqued",
            title: 'Bloqueado',
            attributes: {
              class: "text-center"
            },
            headerAttributes: {
              style: "text-align:center;"
            }
          }, {
            field: "cancel",
            title: 'Cancelado',
            attributes: {
              class: "text-center"
            },
            headerAttributes: {
              style: "text-align:center;"
            }
          }, {
            field: "inactiv",
            title: 'Deshabilitado',
            attributes: {
              class: "text-center"
            },
            headerAttributes: {
              style: "text-align:center;"
            }
          }, {
            field: "other",
            title: 'Otro',
            attributes: {
              class: "text-center"
            },
            headerAttributes: {
              style: "text-align:center;"
            }
          }]
        };
        $scope.usoCanal = $scope.operationsDetail = {
          dataSource: {
            transport: {
              read: {
                url: "../../mocks/uso-canal.json",
                contentType: "application/json; charset=utf-8",
                dataType: "json"
              }
            },
            pageSize: 15
          },
          pageable: true,
          detailTemplate: $("#operation-detail").length > 0 ? kendo.template($("#operation-detail").html()) : kendo.template(''),
          columns: [{
            field: 'id',
            title: 'Documento'
          },
          {
            field: 'user',
            title: 'Usuario',
            width: 60,
          },
          {
            field: 'product',
            title: 'Canal',
            width: 40,
          },
          {
            field: 'customer',
            title: 'Estado'
          },
          {
            field: 'date',
            title: 'Registro'
          },
          {
            field: 'date',
            title: 'Ultima conexión'
          },
          ],
          toolbar: '<div class="cb-flex cb-middle"><button class="btn btn-default"><span class="fa fa-search"></span> Buscar</button><div class="cb-flex cb-middle cb-right cb-grow text-right"><div class="text-muted small" style="margin-right:10px;">Exportar:</div><button class="btn btn-default" style="margin:0;" title="Exportar a PDF"><span class="fa fa-file-pdf-o" style="margin:0;"></span></button><button class="btn btn-default" style="margin:0;" title="Exportar a Excel"><span class="fa fa-file-excel-o" style="margin:0;"></span></button></div></div>'
        };
        $scope.transactionsByType = {
          dataSource: {
            transport: {
              read: {
                url: "../../mocks/canales-transactions7.json",
                contentType: "application/json; charset=utf-8",
                dataType: "json"
              }
            }
          },
          title: 'Transacciones por tipo de ejecución',
          legend: {
            position: 'bottom'
          },
          tooltip: {
            visible: true,
            template: '#= category #'
          },
          seriesDefaults: {
            type: 'column'
          },
          series: [{
            field: 'online',
            name: 'En línea',
            categoryField: 'channel'
          }, {
            field: 'offline',
            name: 'Fuera de línea',
            categoryField: 'channel'
          }],
          theme: 'metro'
        };
        $scope.transactionsByTypeDetail = {
          dataSource: {
            transport: {
              read: {
                url: "../../mocks/canales-transactions7.json",
                contentType: "application/json; charset=utf-8",
                dataType: "json"
              }
            }
          },
          scrollable: false,
          columns: [{
            field: "channel",
            title: 'Canal'
          }, {
            field: "online",
            title: 'En línea',
            attributes: {
              class: "text-right"
            },
            headerAttributes: {
              style: "text-align:right;"
            }
          }, {
            field: "offline",
            title: 'Fuera de línea',
            attributes: {
              class: "text-right"
            },
            headerAttributes: {
              style: "text-align:right;"
            }
          }]
        };
        $scope.channels = [{
          icon: 'channel-web',
          name: 'Internet Banking',
          type: 'virtual'
        },
        {
          icon: 'mobile--money',
          name: 'Banca Móvil',
          type: 'virtual'
        },
        {
          icon: 'channel-chatbot',
          name: 'Chatbot',
          type: 'virtual'
        },
        {
          icon: 'channel-cash',
          name: 'Cash Management',
          type: 'virtual'
        },
        {
          icon: 'channel-atm',
          name: 'ATM',
          type: 'person'
        },
        {
          icon: 'pos',
          name: 'POS',
          type: 'person'
        },
        {
          icon: 'tablet--money',
          name: 'Asesor móvil',
          type: 'tablet'
        }
        ];
        $scope.getIconByType = function (type) {
          var icon;
          switch (type) {
            case 'Email':
              icon = 'envelope-closed';
              break;
            case 'Celular':
              icon = 'mobile--sms';
              break;
          }
          return icon;
        };
        $scope.securityFactorList = [{
          name: 'OTP',
          icon: 'mobile--otp'
        },
        {
          name: 'Tarjeta de coordenadas',
          icon: 'key-card'
        }
        ];
        $scope.cardOptions = [{
          "imageUrl": "../../images/tw-visa-classic-card-498x280.png",
          "name": "Visa débito Clásica",
          "type": "Principal"
        },
        {
          "imageUrl": "../../images/tw-visa-gold-card-498x280.png",
          "name": "Visa débito Gold",
          "type": "Adicional"
        }
        ];
        $scope.setChannel = function (channel) {
          $scope.currentChannel = channel;
        }

        $scope.blockCards = {
          dataSource: {
            transport: {
              read: {
                url: "../../mocks/block-cards.json",
                contentType: "application/json; charset=utf-8",
                dataType: "json"
              }
            },
            pageSize: 15
          },
          change: function () {
            $scope.$apply(() => {
              $scope.currentCard = this.dataItem(this.select()[0]);
              $scope.blockCardDetail = true;
            });
          },
          selectable: true,
          detailTemplate: $("#card-detail").length > 0 ? kendo.template($("#card-detail").html()) : kendo.template(''),
          columns: [{
            field: 'cardNumber',
            title: '# Tarjeta'
          },
          {
            field: 'product',
            title: 'Tipo de cuenta'
          },
          {
            field: 'accountNumber',
            title: 'Número de cuenta'
          },
          {
            field: 'status',
            title: 'Estado'
          },
          {
            field: 'principal',
            title: 'Principal',
            headerAttributes: {
              style: 'text-align: center;'
            },
            attributes: {
              class: 'text-center'
            },
            template: '#if (data.principal) {# <span class=\"fa fa-check-circle text-success\"></span> # } #'
          }
          ]
        };
        $scope.requestActivateCards = {
          dataSource: {
            transport: {
              read: {
                url: "../../mocks/request-activate-cards.json",
                contentType: "application/json; charset=utf-8",
                dataType: "json"
              }
            },
            pageSize: 15
          },
          change: function () {
            $scope.$apply(() => {
              $scope.currentCard = this.dataItem(this.select()[0]);
              $scope.allowRequest = true;
            });
          },
          selectable: true,
          detailTemplate: $("#card-detail").length > 0 ? kendo.template($("#card-detail").html()) : kendo.template(''),
          columns: [{
            field: 'cardNumber',
            title: '# Tarjeta'
          },
          {
            field: 'product',
            title: 'Tipo de cuenta'
          },
          {
            field: 'accountNumber',
            title: 'Número de cuenta'
          },
          {
            field: 'status',
            title: 'Estado'
          },
          {
            field: 'principal',
            title: 'Principal',
            headerAttributes: {
              style: 'text-align: center;'
            },
            attributes: {
              class: 'text-center'
            },
            template: '#if (data.principal) {# <span class=\"fa fa-check-circle text-success\"></span> # } #'
          }
          ]
        };
        $scope.activateCards = {
          dataSource: {
            transport: {
              read: {
                url: "../../mocks/activate-cards.json",
                contentType: "application/json; charset=utf-8",
                dataType: "json"
              }
            },
            pageSize: 15
          },
          change: function () {
            $scope.$apply(() => {
              $scope.currentCard = this.dataItem(this.select()[0]);
              $scope.allowActivate = true;
            });
          },
          dataBound: function () {
            this.expandRow(this.tbody.find("tr.k-master-row"));
          },
          selectable: true,
          detailTemplate: $("#card-detail").length > 0 ? kendo.template($("#card-detail").html()) : kendo.template(''),
          columns: [{
            field: 'cardNumber',
            title: '# Tarjeta'
          },
          {
            field: 'product',
            title: 'Tipo de cuenta'
          },
          {
            field: 'accountNumber',
            title: 'Número de cuenta'
          },
          {
            field: 'status',
            title: 'Estado'
          },
          {
            field: 'principal',
            title: 'Principal',
            headerAttributes: {
              style: 'text-align: center;'
            },
            attributes: {
              class: 'text-center'
            },
            template: '#if (data.principal) {# <span class=\"fa fa-check-circle text-success\"></span> # } #'
          }
          ]
        };

        $scope.currentChannel = $scope.channels[0];
        $scope.setCard = function (card) {
          $scope.currentCard = card;
        }
        $scope.setMediaType = function (mediaType) {
          $scope.currentMediaType = mediaType;
        }
        $scope.setSecurityFactor = function (securityFactor) {
          $scope.currentSecurityFactor = securityFactor;
        }
        $scope.setValidity = function (validity) {
          $scope.currentValidity = validity;
        }
        $scope.setWizardStep = function (step) {
          if (step <= $scope.wizardAllowedStep) {
            $scope.wizardStep = step;
          }
        };
        $scope.setBlockCardDetail = function (value) {
          $scope.blockCardDetail = value;
        }
        $scope.selectCustomer = function () {
          if ($scope.wizardStep == 0) {
            $('#cliente').modal();
          }
        }
        $scope.$watch('selectedCustomer', function (value) {
          if (value) {
            $scope.wizardNextStep();
          }
        });
        $scope.toggleAllSelection = function (items) {
          items.forEach((item) => {
            item.selected = !item.selected;
          });
        }
        $scope.toggleSelection = function (item, items) {
          if (items) {
            items.forEach((_item) => {
              _item.selected = false;
            });
            item.selected = true;
          } else {
            item.selected = !item.selected;
          }
        }
        $scope.wizardStep = 0;
        $scope.wizardAllowedStep = 0;
        $scope.wizardItems = [{
          icon: 'user',
          name: 'Cliente',
          active: true
        },
        {
          icon: 'omnichannel',
          name: 'Canales'
        },
        {
          icon: 'preferences',
          name: 'Configuración'
        },
        {
          icon: 'bank-account',
          name: 'Productos habilitados'
        },
        {
          icon: 'envelope-closed',
          name: 'Medios de envío'
        },
        /*
        {
          icon: 'money',
          name: 'Servicios masivos'
        },
        */
        {
          icon: 'document--text',
          name: 'Resumen'
        }
        ];
        $scope.wizardNextStep = function () {
          if ($scope.wizardStep < 6) {
            $scope.wizardItems.forEach(function (item, index) {
              item.active = item.active ? item.active : index <= $scope.wizardStep + 1;
            });
            $scope.wizardStep++;
            if ($scope.wizardStep > $scope.wizardAllowedStep) {
              $scope.wizardAllowedStep = $scope.wizardStep;
            }
          } else {
            location.href = 'user-view.html';
          }
        };
        $scope.validityList = [{
          name: 'Indefinido',
          icon: 'infinite'
        },
        {
          name: 'General',
          icon: 'list--time'
        },
        {
          name: 'Específico',
          icon: 'calendar--time'
        }
        ];
        $scope.setSecurityFactor($scope.securityFactorList[0]);
        $scope.setValidity($scope.validityList[0]);
        $scope.editDeliveryType = function (event) {
          event.stopPropagation();
          $('#deliveryType').modal();
        };
        $scope.languages = [{
          name: 'Español Ecuador',
          code: 'es-EC'
        },
        {
          name: 'English United States',
          code: 'en-US'
        }
        ];
        $scope.securityFactors = [{
          name: 'OTP',
          icon: 'mobile--otp'
        },
        {
          name: 'Tarjeta de coordenadas',
          icon: 'key-card'
        }
        ];
        $scope.massiveUpload = {
          dataSource: {
            transport: {
              read: {
                url: "../../mocks/canales-upload.json",
                contentType: "application/json; charset=utf-8",
                dataType: "json"
              }
            },
            aggregate: [{
              field: "records",
              aggregate: "sum"
            }]
          },
          scrollable: false,
          columns: [{
            field: "records",
            title: "Registros",
            headerAttributes: {
              style: 'text-align: center;'
            },
            attributes: {
              class: 'text-center'
            },
            footerTemplate: "<div class='text-center'>#: sum #</div>"
          },
          {
            field: "currency",
            title: "Moneda",
            headerAttributes: {
              style: 'text-align: center;'
            },
            attributes: {
              class: 'text-center'
            }
          },
          {
            field: "amount",
            title: "Monto",
            format: '{0:c}',
            headerAttributes: {
              style: 'text-align: right;'
            },
            attributes: {
              class: 'text-right'
            }
          }
          ]
        };
        $scope.massiveUpload2 = {
          dataSource: {
            transport: {
              read: {
                url: "../../mocks/canales-upload0.json",
                contentType: "application/json; charset=utf-8",
                dataType: "json"
              }
            }
          },
          detailTemplate: $("#detail").length > 0 ? kendo.template($("#detail").html()) : kendo.template(''),
          detailInit: function (e) {
            var detailRow = e.detailRow;
          },
          columns: [{
            field: "lot",
            title: 'Lote'
          }, {
            field: "login",
            title: 'Login'
          }, {
            field: "service",
            title: 'Servicio'
          }, {
            field: "account",
            title: 'Cuenta'
          }, {
            field: "records",
            title: 'Registros'
          }, {
            field: "status",
            title: 'Estados'
          }],
          toolbar: '<div class="cb-flex cb-middle"><button class="btn btn-default"><span class="fa fa-search"></span> Buscar</button><button class="btn btn-default" ng-click="showModal(\'upload-massive\');"><span class="fa fa-plus"></span> Agregar</button><div class="cb-flex cb-middle cb-right cb-grow text-right"><div class="text-muted small" style="margin-right:10px;">Exportar:</div><button class="btn btn-default" style="margin:0;" title="Exportar a PDF"><span class="fa fa-file-pdf-o" style="margin:0;"></span></button><button class="btn btn-default" style="margin:0;" title="Exportar a Excel"><span class="fa fa-file-excel-o" style="margin:0;"></span></button></div></div>'
        };
        $scope.compensaciones = {
          dataSource: {
            transport: {
              read: {
                url: "../../mocks/compensacion.json",
                contentType: "application/json; charset=utf-8",
                dataType: "json"
              }
            },
            aggregate: [
              { field: "numero", aggregate: "sum" },
              { field: "valor", aggregate: "sum" }
            ],
            group: {
              field: "grupo",
              aggregates: [
                { field: "numero", aggregate: "sum" },
                { field: "valor", aggregate: "sum" }
              ]
            }
          },
          scrollable: false,
          selectable: true,
          change: function () {
            $('#detail').modal('show');
          },
          columns: [
            {
              field: "grupo",
              title: "Grupo",
              hidden: true,
              groupHeaderTemplate: "#= value #"
            },
            {
              field: "transaccion",
              title: "Tipo de movimiento"
            },
            {
              field: "numero",
              title: "N&uacute;mero",
              attributes: {
                "class": "text-right"
              },
              headerAttributes: {
                "style": "text-align:right;"
              },
              groupFooterTemplate: '<div class="text-right">#=data.numero.sum#</div>',
              footerTemplate: '<div class="text-right">#=data.numero.sum#</div>',
              aggregates: ["sum"]
            },
            {
              field: "valor",
              title: "Monto",
              format: "{0:c}",
              attributes: {
                "class": "text-right"
              },
              headerAttributes: {
                "style": "text-align:right;"
              },
              groupFooterTemplate: '<div class="text-right">#=kendo.toString(data.valor.sum, "c")#</div>',
              footerTemplate: '<div class="text-right">#=kendo.toString(data.valor.sum, "c")#</div>',
              aggregates: ["sum"]
            }
          ],
          toolbar: '<div class="cb-flex cb-middle" style="width: 100%; justify-content: space-between;"><button class="btn btn-default"><span class="fa fa-search"></span> Buscar</button><div class="cb-flex cb-middle cb-right cb-grow text-right"><div class="text-muted small" style="margin-right:10px;">Exportar:</div><button class="btn btn-default" style="margin:0;" title="Exportar a PDF"><span class="fa fa-file-pdf-o" style="margin:0;"></span></button><button class="btn btn-default" style="margin:0;" title="Exportar a Excel"><span class="fa fa-file-excel-o" style="margin:0;"></span></button></div></div>'
        };
        $scope.compensacionesDetalle = {
          dataSource: {
            transport: {
              read: {
                url: "../../mocks/compensacion-detalle.json",
                contentType: "application/json; charset=utf-8",
                dataType: "json"
              }
            },
            aggregate: [
              { field: "valor", aggregate: "sum" }
            ]
          },
          scrollable: false,
          selectable: true,
          change: function () {
            if (this.dataItem(this.select()[0]) == $scope.detalle1Selected) {
              this.clearSelection();
            }
            $scope.detalle1Selected = this.dataItem(this.select()[0]);
            $scope.$apply(function () {
              $scope.allowComp = $scope.detail1.select().length === 1 && $scope.detail2.select().length === 1;
              $scope.allowLiquidar = $scope.detail1.select().length === 1 && $scope.detail2.select().length === 0;
              $scope.allowAplicar = $scope.detail1.select().length === 0 && $scope.detail2.select().length === 1;
            });
          },
          columns: [
            {
              field: "numero",
              title: "Secuencia"
            },
            {
              field: "code",
              title: "Código"
            },
            {
              field: "transaccion",
              title: "Descripción"
            },
            {
              field: "code",
              title: "Tarjeta"
            },
            {
              field: "valor",
              title: "Valor origen",
              format: "{0:c}",
              attributes: {
                "class": "text-right"
              },
              headerAttributes: {
                "style": "text-align:right;"
              }
            },
            {
              field: "valor",
              title: "Valor destino",
              format: "{0:c}",
              attributes: {
                "class": "text-right"
              },
              headerAttributes: {
                "style": "text-align:right;"
              }
            },
            {
              field: "valor",
              title: "Monto dispersado",
              format: "{0:c}",
              attributes: {
                "class": "text-right"
              },
              headerAttributes: {
                "style": "text-align:right;"
              },
              footerTemplate: '<div class="text-right">#=kendo.toString(data.valor.sum, "c")#</div>',
              aggregates: ["sum"]
            },
            {
              field: "date",
              width: "105px",
              title: "Procesado"
            }
          ],
          toolbar: '<div class="cb-flex cb-middle" style="width: 100%; justify-content: space-between;"><div><button class="btn btn-default"><span class="fa fa-search"></span> Buscar</button><button class="btn btn-default" ng-if="allowComp"><span class="fa fa-arrow-circle-o-right"></span> Compensar</button><button class="btn btn-default" ng-if="allowLiquidar"><span class="fa fa-wpforms"></span> Liquidar</button><button class="btn btn-default" ng-if="allowAplicar"><span class="fa fa-check"></span> Aplicar</button></div><div class="cb-flex cb-middle cb-right cb-grow text-right"><div class="text-muted small" style="margin-right:10px;">Exportar:</div><button class="btn btn-default" style="margin:0;" title="Exportar a PDF"><span class="fa fa-file-pdf-o" style="margin:0;"></span></button><button class="btn btn-default" style="margin:0;" title="Exportar a Excel"><span class="fa fa-file-excel-o" style="margin:0;"></span></button></div></div>'
        };
        $scope.compensacionesDetalle2 = {
          dataSource: {
            transport: {
              read: {
                url: "../../mocks/compensacion-detalle.json",
                contentType: "application/json; charset=utf-8",
                dataType: "json"
              }
            },
            aggregate: [
              { field: "valor", aggregate: "sum" }
            ]
          },
          scrollable: false,
          selectable: true,
          change: function () {
            if (this.dataItem(this.select()[0]) == $scope.detalle2Selected) {
              this.clearSelection();
            }
            $scope.detalle2Selected = this.dataItem(this.select()[0]);
            $scope.$apply(function () {
              $scope.allowComp = $scope.detail1.select().length === 1 && $scope.detail2.select().length === 1;
              $scope.allowLiquidar = $scope.detail1.select().length === 1 && $scope.detail2.select().length === 0;
              $scope.allowAplicar = $scope.detail1.select().length === 0 && $scope.detail2.select().length === 1;
            });
          },
          columns: [
            {
              field: "numero",
              title: "Secuencia"
            },
            {
              field: "code",
              title: "Código"
            },
            {
              field: "transaccion",
              title: "Descripción"
            },
            {
              field: "code",
              title: "Tarjeta"
            },
            {
              field: "valor",
              title: "Valor origen",
              format: "{0:c}",
              attributes: {
                "class": "text-right"
              },
              headerAttributes: {
                "style": "text-align:right;"
              }
            },
            {
              field: "valor",
              title: "Valor destino",
              format: "{0:c}",
              attributes: {
                "class": "text-right"
              },
              headerAttributes: {
                "style": "text-align:right;"
              }
            },
            {
              field: "valor",
              title: "Monto dispersado",
              format: "{0:c}",
              attributes: {
                "class": "text-right"
              },
              headerAttributes: {
                "style": "text-align:right;"
              },
              footerTemplate: '<div class="text-right">#=kendo.toString(data.valor.sum, "c")#</div>',
              aggregates: ["sum"]
            },
            {
              field: "date",
              width: "105px",
              title: "Procesado"
            }
          ],
        };
        $scope.activate();
      }
    ]);

  //Inicializa angular
  angular.bootstrap(document, ['app']);
});