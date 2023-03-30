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
          $http.get('../../mocks/canales-usuarios.json')
            .then(function(response) {
              $scope.users = response.data;
            });
        };
        $scope.addUser = function() {
          messages.alert('El usuario ha sido creado exitosamente')
            .then(function() {
              location.href = 'user-view.html';
            });
        };
        $scope.find = function() {
          $scope.showResults = true;
        };
        $scope.filters = {
          field: [{
              label: "Identificación",
              id: 1
            },
            {
              label: "Nombre",
              id: 3
            }
          ]
        };
        $scope.gotoSearch = function() {
          location.href = 'user-search.html';
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
            }
          ],
          actions: [{
              label: 'Actualizar',
              opened: false,
              click: function() {
                $scope.editable = !$scope.editable;
              }
            },
            {
              label: 'Imprimir contrato',
              opened: false,
              click: function() {
                messages.alert('Se abre ventana de impresión.');
              }
            },
            {
              label: 'Sesiones activas',
              opened: false,
              click: function() {
                $scope.showModal('sessions');
              }
            }
          ]
        };
        $scope.selectedField = $scope.filters.field[0];
        $scope.setField = function(field) {
          $scope.selectedField = field;
        }
        $scope.showUser = function() {
          $('#user').modal();
        }
        $scope.showDeliveryType = function() {
          $('#deliveryType').modal();
        }
        $scope.showNotifications = function() {
          $('#notifications').modal();
        }
        $scope.showReason = function() {
          $('#reason-change').modal();
        }
        $scope.showPermissions = function() {
          $('#permissions').modal();
        }
        $scope.showAttribute = function() {
          $('#attribute').modal();
        }
        $scope.showModal = function(selector) {
          $('#'+selector).modal();
        }
        $scope.confirmApprove = function() {
          messages.confirm('Está seguro que desea aprobar la solicitud seleccionada?')
            .then(function(input) {
              if (input.buttonIndex==1) {
                messages.alert('La solicitud ha sido aprobada.');
                window.cancelationCalled = true;
              }
            });
        }
        $scope.confirmReject = function() {
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
          columns: [
            {
              field: "type",
              title: "Tipo",
              width: 150,
              editor: function(container, options) {
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
          columns: [
            {
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
              template: '<input type="checkbox" #= enabled ? "checked=checked" : "" # />'
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
          columns: [
            {
              field: "name",
              title: "Nombre"
            },
            {
              field: "type",
              title: "Tipo",
              width: 150,
              editor: function(container, options) {
                $('<select kendo-combo-box><option>ESPECIFICO</option></select>').appendTo(container);
              }
            },
            {
              field: "channel",
              title: "Canal",
              width: 150,
              editor: function(container, options) {
                $('<select kendo-combo-box><option>INTERNET</option><option>BANCAMOVIL</option></select>').appendTo(container);
              }
            },
            {
              field: "status",
              title: "Estado",
              width: 150,
              editor: function(container, options) {
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
              template: '<button class="btn btn-default btn-sm" title="Permisos" ng-click="showPermissions()"><span class="fa fa-unlock fa-fw"></span></button><button class="btn btn-default btn-sm" title="Eliminar"><span class="fa fa-times fa-fw"></span></button>'
            }
          ],
          toolbar: '<button class="btn btn-default k-grid-add"><span class="fa fa-plus"></span> Agregar</button><button class="btn btn-default"><span class="fa fa-search"></span> Buscar</button>'
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
              title: "Estado"
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
                hasChildren: function(item) {
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
          columns: [
            {
              field: "name",
              title: "Nombre"
            },
            {
              field: "service",
              title: "Servicio"
            },
            {
              field: "description",
              title: "Descripción"
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
              template: '<button class="btn btn-default btn-sm" title="Editar" ng-click="showModal(\'news\')"><span class="fa fa-pencil fa-fw"></span></button><button class="btn btn-default btn-sm" title="Eliminar"><span class="fa fa-times fa-fw"></span></button>'
            }
          ],
          toolbar: '<button class="btn btn-default" ng-click="showModal(\'news\')"><span class="fa fa-plus"></span> Agregar</button><button class="btn btn-default"><span class="fa fa-search"></span> Buscar</button><button class="btn btn-default"><span class="fa fa-print"></span> Imprimir</button><button class="btn btn-default"><span class="fa fa-download"></span> Exportar</button>'
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
          columns: [
            {
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
          toolbar: '<button class="btn btn-default" ng-click="showModal(\'notification\')"><span class="fa fa-plus"></span> Agregar</button><button class="btn btn-default"><span class="fa fa-search"></span> Buscar</button><button class="btn btn-default"><span class="fa fa-print"></span> Imprimir</button><button class="btn btn-default"><span class="fa fa-download"></span> Exportar</button>'
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
          columns: [
            {
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
          columns: [
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
          toolbar: '<button class="btn btn-default" ng-click="showModal(\'instituciones-financieras\')"><span class="fa fa-plus"></span> Agregar</button><button class="btn btn-default"><span class="fa fa-search"></span> Buscar</button><button class="btn btn-default"><span class="fa fa-print"></span> Imprimir</button><button class="btn btn-default"><span class="fa fa-download"></span> Exportar</button>'
        };
        $scope.edicion = {
          dataSource: {
            transport: {
              read: {
                url: "../../mocks/canales-institucionesFinancieras.json",
                contentType: "application/json; charset=utf-8",
                dataType: "json"
              }
            },
            batch: true
          },
          editable: "inline",
          scrollable: false,
          columns: [
            {
              field: "name",
              title: "Nombre"
            },
            {
              field: "type",
              title: "Tipo",
              editor: '<select class="form-control"><option>Test</option></select>'
            },
            {
              field: "attachment",
              title: "Adjunto",
              editor: '<div class="input-group"><input type="text" class="form-control" readonly /><span class="input-group-btn"><button class="btn btn-default"><span class="fa fa-paperclip"></span></button><button class="btn btn-default"><span class="fa fa-times-circle-o"></span></button></span></div>'
            },
            {
              field: "catalog",
              title: "Catálogo",
              editor: '<div class="input-group"><input type="text" class="form-control" readonly /><span class="input-group-btn"><button class="btn btn-default" ng-click="customer={}"><span class="fa fa-bars"></span></button></span></div>'
            },
            {
              field: "status",
              title: "Estado"
            },
            { command: ["edit", "destroy"], title: "&nbsp;", width: "250px" }
          ],
          toolbar: '<button class="btn btn-default k-grid-add"><span class="fa fa-plus"></span> Agregar</button>'
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
          columns: [
            {
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
              template: '<button class="btn btn-default btn-sm cb-menu-options"><span class="fa fa-ellipsis-v fa-fw"></span></button>'
            }
          ],
          toolbar: '<button class="btn btn-default"><span class="fa fa-search"></span> Buscar</button><button class="btn btn-default"><span class="fa fa-print"></span> Imprimir</button><button class="btn btn-default"><span class="fa fa-download"></span> Exportar</button>'
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
              field: "code",
              title: "Código"
            },
            {
              field: "name",
              title: "Nombre"
            }
          ],
          toolbar: '<button class="btn btn-default"><span class="fa fa-search"></span> Buscar</button>'
        };
        $scope.removeUser = function() {
          messages.confirm('Realmente quiere eliminar el usuario "Tapia Andrade Viviana María"?, esta operación no se puede deshacer.');
        }
        $scope.request = {
          expiration: 'undefined',
          allProducts: true,
          status: 'standby',
          transferType: 'all'
        };
        $scope.toggleAll = function(data) {
          /*
          console.log($scope.productsGrid);
          $("#InverterGrid tbody input:checkbox").attr("checked", this.checked);
          */
        }
        $scope.activate();
      }
    ]);

  //Inicializa angular
  angular.bootstrap(document, ['app']);
});
