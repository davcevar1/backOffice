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
          $http.get('../../mocks/usuarios.json')
            .then(function(response) {
              $scope.users = response.data;
            });
        };
        $scope.addOficial = function() {
          $('#oficial').modal();
        };
        $scope.addRole = function() {
          $('#role').modal();
        };
        $scope.addServer = function() {
          $('#server').modal();
        };
        $scope.addUser = function() {
          messages.alert('El funcionario ha sido creado exitosamente')
            .then(function() {
              location.href = 'user-view.html';
            });
        };
        $scope.batch = {
          dataSource: {
            transport: {
              read: {
                url: "../../mocks/admin-oficiales.json",
                contentType: "application/json; charset=utf-8",
                dataType: "json"
              }
            }
          },
          scrollable: false,
          columns: [{
              field: "username",
              title: "Funcionario"
            },
            {
              width: 150,
              field: "status",
              title: "Estado"
            },
            {
              width: 20,
              attributes: {
                "class": "cb-actions cb-no-wrap"
              },
              template: '<button class="btn btn-default btn-sm" title="Eliminar"><span class="fa fa-times fa-fw"></span></button>'
            }
          ],
          toolbar: '<button class="btn btn-default k-grid-add" ng-click="showModal(\'batch\');"><span class="fa fa-plus"></span> Agregar</button>'
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
              field: "code",
              title: "Código",
              attributes: {
                class: "text-right"
              },
              width: 50
            },
            {
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
          toolbar: '<button class="btn btn-default k-grid-add"><span class="fa fa-plus"></span> Agregar</button><button class="btn btn-default"><span class="fa fa-search"></span> Buscar</button>'
        };
        $scope.find = function() {
          $scope.showResults = true;
        };
        $scope.filters = {
          field: [{
              label: "Código",
              id: 1
            },
            {
              label: "Login",
              id: 2
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
          secondaryText: '#0245000345 - Funcionario',
          fields: [{
              label: 'Oficina',
              value: 'Matriz',
              opened: true
            },
            {
              label: 'Departamento',
              value: 'Contabilidad',
              opened: true
            },
            {
              label: 'Cargo',
              value: 'Analista',
              opened: true
            },
            {
              label: 'Estado',
              value: 'Vigente',
              opened: true
            },
            {
              label: 'Fecha último acceso',
              value: '2018-01-01',
              opened: false
            }
          ],
          actions: [{
              label: 'Actualizar',
              opened: false,
              click: function() {
                $scope.editable = !$scope.editable;
                if ($scope.editable) {
                  $scope.tabs.activateTab($('#tab-general'));
                }
              }
            }, {
              label: 'Bloquear',
              opened: false,
              click: function() {
                $scope.showModal('reason');
              }
            }, {
              label: 'Desbloquear',
              opened: false,
              click: function() {}
            },
            {
              label: 'Eliminar',
              opened: false,
              click: function() {
                messages.confirm('Realmente quiere eliminar el usuario "Tapia Andrade Viviana María"?, esta operación no se puede deshacer.');
              }
            },
            {
              label: 'Imprimir',
              opened: false,
              click: function() {
                messages.alert('Se abre ventana de impresión.');
              }
            }
          ]
        };
        $scope.menus = {
          dragAndDrop: true,
          dataTextField: 'label',
          dataUrlField: 'url2',
          dataSource: new kendo.data.HierarchicalDataSource({
            transport: {
              read: function(options) {
                $.ajax({
                  url: "../../mocks/menu.json",
                  success: function(result) {
                    var tree = [JSON.parse(JSON.stringify(result.data).replace(/children/g, 'items'))];
                    options.success(tree);
                  },
                  error: function(result) {
                    options.error(result);
                  }
                });
              }
            },
            schema: {
              model: {
                children: 'items',
                hasChildren: function(item) {
                  return item.items && item.items.length > 0;
                }
              }
            }
          })
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
              template: '<button class="btn btn-default btn-sm" title="Transacciones" ng-click="showModal(\'transactions\')"><span class="fa fa-unlock fa-fw"></span></button> <button class="btn btn-default btn-sm" title="Eliminar"><span class="fa fa-times fa-fw"></span></button>'
            }
          ]
        };
        $scope.profiles = {
          dataSource: {
            transport: {
              read: {
                url: "../../mocks/admin-roles.json",
                contentType: "application/json; charset=utf-8",
                dataType: "json"
              }
            }
          },
          scrollable: false,
          detailTemplate: $("#features").length > 0 ? kendo.template($("#features").html()) : kendo.template(''),
          columns: [{
              field: "name",
              title: "Nombre"
            },
            {
              field: "status",
              title: "Estado",
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
              template: '<button class="btn btn-default btn-sm" title="Eliminar"><span class="fa fa-times fa-fw"></span></button>'
            }
          ],
          toolbar: '<button class="btn btn-default" ng-click="showModal(\'role\')"><span class="fa fa-plus"></span> Agregar</button><button class="btn btn-default"><span class="fa fa-search"></span> Buscar</button>'
        };
        $scope.oficiales = {
          dataSource: {
            transport: {
              read: {
                url: "../../mocks/admin-oficiales.json",
                contentType: "application/json; charset=utf-8",
                dataType: "json"
              }
            }
          },
          scrollable: false,
          columns: [{
              field: "username",
              title: "Funcionario"
            },
            {
              field: "level",
              title: "Nivel"
            },
            {
              field: "sector",
              title: "Sector"
            },
            {
              field: "usernameParent",
              title: "Oficial Superior"
            },
            {
              width: 20,
              attributes: {
                "class": "cb-actions cb-no-wrap"
              },
              template: '<button class="btn btn-default btn-sm" title="Eliminar"><span class="fa fa-times fa-fw"></span></button>'
            }
          ],
          toolbar: '<button class="btn btn-default k-grid-add" ng-click="addOficial();"><span class="fa fa-plus"></span> Agregar</button>'
        };
        $scope.oficiales2 = {
          dataSource: {
            data: [{
              "code": "1",
              "text": "Oficiales",
              "expanded": true,
              "items": [
                {
                "code": "22100",
                "text": "JALTAMIRANO - Nivel 8",
                "expanded": true,
                "items": [
                  {
                    "code": "22100",
                    "text": "DCLAVIJO - Nivel 7",
                    "items": []
                  },
                  {
                    "code": "22100",
                    "text": "SCASTILLO - Nivel 7",
                    "items": []
                  }
                ]
              }, {
                "code": "22100",
                "text": "CMARTINEZ - Nivel 8",
                "items": []
              }]
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
        $scope.roles = {
          dataSource: {
            transport: {
              read: {
                url: "../../mocks/roles.json",
                contentType: "application/json; charset=utf-8",
                dataType: "json"
              }
            }
          },
          scrollable: false,
          columns: [{
              field: "role",
              title: "Rol"
            },
            {
              field: "schedule",
              title: "Horario"
            },
            {
              width: 20,
              attributes: {
                "class": "cb-actions cb-no-wrap"
              },
              template: '<button class="btn btn-default btn-sm" title="Eliminar"><span class="fa fa-times fa-fw"></span></button>'
            }
          ],
          toolbar: '<button class="btn btn-default k-grid-add" ng-click="addRole();"><span class="fa fa-plus"></span> Agregar</button>'
        };
        $scope.selectedField = $scope.filters.field[0];
        $scope.servers = {
          dataSource: {
            transport: {
              read: {
                url: "../../mocks/servers.json",
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
              field: "filial",
              title: "Filial"
            },
            {
              field: "office",
              title: "Oficina"
            },
            {
              width: 20,
              attributes: {
                "class": "cb-actions cb-no-wrap"
              },
              template: '<button class="btn btn-default btn-sm" title="Eliminar"><span class="fa fa-times fa-fw"></span></button>'
            }
          ],
          toolbar: '<button class="btn btn-default k-grid-add" ng-click="addServer();"><span class="fa fa-plus"></span> Agregar</button>'
        };
        $scope.setField = function(field) {
          $scope.selectedField = field;
        }
        $scope.showModal = function(selector) {
          $('#' + selector).modal();
        }
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
          scrollable: false,
          columns: [{
            field: "name",
            title: "Nombre"
          }]
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
        $scope.transactions3 = {
          dataSource: {
            transport: {
              read: {
                url: "../../mocks/admin-permissions.json",
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
        $scope.activate();
      }
    ]);

  //Inicializa angular
  angular.bootstrap(document, ['app']);
});
