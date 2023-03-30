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

        };
        $scope.back = function() {
          $scope.allowConfirm = false;
          $scope.processed = false;
        };
        $scope.confirm = function() {
          $scope.allowConfirm = false;
          $scope.processed = true;
        };
        $scope.process = function() {
          $scope.processed = false;
          if (!$scope.hasErrors) {
            $scope.hasErrors = true;
            $scope.allowConfirm = false;
          } else {
            $scope.hasErrors = false;
            $scope.allowConfirm = true;
          }
        };
        $scope.userTypes = {
          dataSource: [{
              'name': 'Tipo A'
            },
            {
              'name': 'Tipo B'
            },
            {
              'name': 'Tipo C'
            },
            {
              'name': 'Tipo E'
            }
          ],
          columns: [{
              field: "name",
              title: "Tipo de usuario"
            },
            {
              field: "load",
              title: "Carga",
              headerAttributes: {
                "style": "text-align:center;"
              },
              attributes: {
                "class": "text-center"
              },
              template: '<input type="checkbox" />',
              width: 120
            },
            {
              field: "auth",
              title: "Autorizacion",
              headerAttributes: {
                "style": "text-align:center;"
              },
              attributes: {
                "class": "text-center"
              },
              template: '<input type="checkbox" />',
              width: 120
            }
          ]
        };
        $scope.detalleCarga = {
          dataSource: [{
              'label': 'Servicio',
              value: 'Nomina'
            },
            {
              'label': 'Archivo',
              value: 'nomina_12122016.csv'
            },
            {
              'label': 'Fecha de procesamiento',
              value: '12/12/2016'
            },
            {
              'label': 'Concepto',
              value: 'Carga de nomina de empleados'
            },
            {
              'label': 'Número de registros',
              value: '312'
            },
            {
              'label': 'Monto total',
              value: '$23,000.00 USD'
            }
          ],
          scrollable: false,
          columns: [{
            field: "label",
            template: '<div class="text-muted small">#: label #</div><div>#: value #</div>'
          }]
        };
        $scope.manualNomina = {
          dataSource: {
            transport: {
              read: "../mocks/pagos.json"
            }
          },
          columns: [{
              width: 30,
              attributes: {
                "class": "text-center"
              },
              template: '<input type="checkbox" />'
            },
            {
              field: "account",
              title: "Cuenta",
              headerAttributes: {
                "style": "text-align:center;"
              },
              attributes: {
                "class": "text-center"
              },
            },
            {
              field: "product",
              title: "Producto",
              headerAttributes: {
                "style": "text-align:center;"
              },
              attributes: {
                "class": "text-center"
              },
            },
            {
              field: "amount",
              title: "Monto",
              format: "{0:c}",
              headerAttributes: {
                "style": "text-align:right;"
              },
              attributes: {
                "class": "text-right"
              },
            },
            {
              field: "id",
              title: "Identificación",
              headerAttributes: {
                "style": "text-align:center;"
              },
              attributes: {
                "class": "text-center"
              },
            },
            {
              field: "concept",
              title: "Concepto"
            },
            {
              field: "reference",
              title: "Referencia",
              headerAttributes: {
                "style": "text-align:center;"
              },
              attributes: {
                "class": "text-center"
              },
            },
            {
              width: 40,
              attributes: {
                "class": "cb-no-wrap"
              },
              template: '<button class="btn btn-default btn-sm" title="Editar"><span class="fa fa-pencil fa-fw"></span></button> <button class="btn btn-default btn-sm" title="Eliminar"><span class="fa fa-times fa-fw"></span></button>'
            }
          ],
          scrollable: false,
          toolbar: '<button class="btn btn-default" data-target="\\#form" data-toggle="modal"><span class="fa fa-plus"></span> Agregar</button> <button class="btn btn-default" data-target="\\#prompt" data-toggle="modal"><span class="fa fa-bookmark"></span> Guardar</button> <button class="btn btn-default"><span class="fa fa-list-alt"></span> Cargar plantilla</button>'
        };
        $scope.manualPagos = {
          dataSource: {
            transport: {
              read: "../mocks/pagos.json"
            }
          },
          columns: [{
              width: 30,
              attributes: {
                "class": "text-center"
              },
              template: '<input type="checkbox" />'
            },
            {
              field: "account",
              title: "Cuenta",
              headerAttributes: {
                "style": "text-align:center;"
              },
              attributes: {
                "class": "text-center"
              },
            },
            {
              field: "product",
              title: "Producto",
              headerAttributes: {
                "style": "text-align:center;"
              },
              attributes: {
                "class": "text-center"
              },
            },
            {
              field: "amount",
              title: "Monto",
              format: "{0:c}",
              headerAttributes: {
                "style": "text-align:right;"
              },
              attributes: {
                "class": "text-right"
              },
            },
            {
              field: "id",
              title: "Identificación",
              headerAttributes: {
                "style": "text-align:center;"
              },
              attributes: {
                "class": "text-center"
              },
            },
            {
              field: "concept",
              title: "Concepto"
            },
            {
              field: "reference",
              title: "Referencia",
              headerAttributes: {
                "style": "text-align:center;"
              },
              attributes: {
                "class": "text-center"
              },
            },
            {
              width: 40,
              attributes: {
                "class": "cb-no-wrap"
              },
              template: '<button class="btn btn-default btn-sm" title="Editar"><span class="fa fa-pencil fa-fw"></span></button> <button class="btn btn-default btn-sm" title="Eliminar"><span class="fa fa-times fa-fw"></span></button>'
            }
          ],
          scrollable: false,
          toolbar: '<button class="btn btn-default" data-target="\\#form" data-toggle="modal"><span class="fa fa-plus"></span> Agregar</button> <button class="btn btn-default" data-target="\\#search" data-toggle="modal"><span class="fa fa-search"></span> Seleccionar</button> <button class="btn btn-default" data-target="\\#prompt" data-toggle="modal"><span class="fa fa-bookmark"></span> Guardar</button> <button class="btn btn-default"><span class="fa fa-list-alt"></span> Cargar plantilla</button>'
        };

        $scope.afiliados = {
          dataSource: {
            transport: {
              read: "../mocks/afiliados.json"
            }
          },
          columns: [{
              field: "id",
              title: "RIF"
            },
            {
              field: "name",
              title: "Nombre"
            },
            {
              field: "documentNumber",
              title: "Identificación",
              template: '#: documentNumber # (#: documentType #)'
            },
            {
              field: "account",
              title: "Cuenta",
              headerAttributes: {
                "style": "text-align:center;"
              },
              attributes: {
                "class": "text-center"
              }
            },
            {
              field: "status",
              title: "Estado",
              headerAttributes: {
                "style": "text-align:center;"
              },
              attributes: {
                "class": "text-center"
              }
            },
            {
              template: '<button class="btn btn-default" data-toggle="modal" data-target="\\#afiliacion"><span class="fa fa-pencil" title="Editar"></span></button> <button class="btn btn-default" title="Eliminar"><span class="fa fa-times"></span></button>'
            }
          ],
          toolbar: '<button class="btn btn-default"><span class="fa fa-download"></span> Export</button>'
        };
        $scope.afiliados2 = {
          dataSource: {
            transport: {
              read: "../mocks/afiliados.json"
            }
          },
          columns: [{
              width: 30,
              attributes: {
                "class": "text-center"
              },
              template: '<input type="checkbox" />'
            },
            {
              field: "id",
              title: "RIF"
            },
            {
              field: "name",
              title: "Nombre"
            },
            {
              field: "documentNumber",
              title: "Identificación",
              template: '#: documentNumber # (#: documentType #)'
            },
            {
              field: "account",
              title: "Cuenta",
              headerAttributes: {
                "style": "text-align:center;"
              },
              attributes: {
                "class": "text-center"
              }
            },
            {
              field: "status",
              title: "Estado",
              headerAttributes: {
                "style": "text-align:center;"
              },
              attributes: {
                "class": "text-center"
              }
            }
          ]
        };

        $scope.afiliadosDetalle = {
          dataSource: {
            transport: {
              read: "../mocks/afiliados.json"
            }
          },
          columns: [{
              field: "name",
              title: "Nombre"
            },
            {
              field: "documentNumber",
              title: "Identificación",
              template: '#: documentNumber # (#: documentType #)'
            },
            {
              field: "account",
              title: "Cuenta",
              headerAttributes: {
                "style": "text-align:center;"
              },
              attributes: {
                "class": "text-center"
              }
            },
            {
              field: "phone",
              title: "Teléfono"
            },
            {
              field: "email",
              title: "Email"
            },
            {
              field: "action",
              title: "Acción",
              headerAttributes: {
                "style": "text-align:center;"
              },
              attributes: {
                "class": "text-center"
              }
            }
          ],
          toolbar: '<button class="btn btn-default"><span class="fa fa-download"></span> Export</button>'
        };

        $scope.autorizaciones = {
          dataSource: {
            transport: {
              read: "../mocks/autorizaciones.json"
            }
          },
          height: 400,
          resizable: true,
          columns: [{
              field: "auth",
              title: "# Autorización"
            },
            {
              field: "reference",
              title: "Referencia"
            },
            {
              field: "transaction",
              title: "Transacción"
            },
            {
              field: "status",
              title: "Estado",
              headerAttributes: {
                "style": "text-align:center;"
              },
              attributes: {
                "class": "text-center"
              }
            },
            {
              field: "account",
              title: "Cuenta",
              headerAttributes: {
                "style": "text-align:center;"
              },
              attributes: {
                "class": "text-center"
              }
            },
            {
              field: "dateStart",
              title: "Fecha inicial"
            },
            {
              field: "dateEnd",
              title: "Fecha final"
            },
            {
              field: "amount",
              title: "Monto"
            },
            {
              field: "records",
              title: "Registros"
            },
            {
              field: "user",
              title: "Usuario"
            },
            {
              field: "file",
              title: "Archivo"
            },
            {
              width: 150,
              template: '<div style="white-space:nowrap"><button class="btn btn-default" data-toggle="modal" data-target="\\#detalle" title="Detalle"><span class="fa fa-info-circle"></span></button> <button class="btn btn-default" title="Autorizar" data-toggle="modal" data-target="\\#autorizar"><span class="fa fa-check"></span></button> <button class="btn btn-default" title="Rechazar" data-toggle="modal" data-target="\\#rechazar"><span class="fa fa-ban"></span></button></div>'
            }
          ],
          toolbar: '<button class="btn btn-default"><span class="fa fa-download"></span> Export</button>'
        };

        $scope.activate();
      }
    ]);

  //Inicializa angular
  angular.bootstrap(document, ['app']);
});
