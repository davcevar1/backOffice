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

        };
        $scope.authorize = function() {
          messages.alert('La huella ingresada no coincide con los registros del usuario.');
        };
        $scope.notifications = [
            {
                icon: 'fa fa-birthday-cake bg-success',
                type: 'birthday',
                label: 'Viviana Tapia está de cumpleaños',
                description: 'Esta cumpliendo 46 años.',
                date: new Date(),
                read: false,
                priority: false
            },
            {
                icon: 'fa fa-check bg-success',
                type: 'product',
                label: 'Tiene un crédito pre-aprobado de $5,000',
                description: 'La oferta tiene 5 días de vigencia',
                date: new Date(),
                read: false,
                priority: true,
                actions: [
                    {
                        label: 'Aceptar',
                        class: 'btn-primary',
                        url: 'http://google.com'
                    },
                    {
                        label: 'Rechazar',
                        url: 'http://google.com'
                    } 
                ]
            },
            {
                icon: 'fa fa-times bg-info',
                type: 'blacklist',
                label: 'Cliente está en mora',
                description: 'El cliente tiene más de 30 días de mora en su crédito.',
                date: new Date(),
                read: false,
                priority: false
            },
            {
                icon: 'fa fa-times bg-warning',
                type: 'blacklist',
                label: 'Cliente está en mora',
                description: 'El cliente tiene más de 60 días de mora en su crédito.',
                date: new Date(),
                read: false,
                priority: false
            },
            {
                icon: 'fa fa-times bg-danger',
                type: 'blacklist',
                label: 'Cliente está en central de riesgos',
                description: 'El cliente tiene más de 90 días de mora en su crédito.',
                date: new Date(),
                read: false,
                priority: false
            },
            {
                icon: 'fa fa-warning bg-warning',
                type: 'warning',
                label: 'El último pago de servicio programado no se ejecutó',
                description: 'Saldo insuficiente en cuenta',
                date: new Date(),
                read: false,
                priority: false
            },
            {
                icon: 'fa fa-info bg-info',
                type: 'info',
                label: 'Cliente está próximo a terminar de pagar su crédito hipotecario.',
                date: new Date(),
                read: false,
                priority: false
            } 
        ];
        $scope.header = {
          primaryText: 'Tapia Andrade Viviana María (Principal)',
          secondaryText: '#0245000345 - PERSONA FISICA NACIONAL',
          fields: [{
              label: 'Ejecutivo de cuenta',
              value: 'MARCO VELASTEGUI',
              opened: true
            },
            {
              label: 'Cliente desde',
              value: '10/24/2013',
              opened: true
            },
            {
              label: 'Estado',
              value: 'VIGENTE',
              opened: true
            }
          ],
          actions: [
            {
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
              label: 'Captura de huellas digitales',
              opened: false,
              click: function() {
                $('#captura-huella').modal('show');
              }
            },
            {
              label: 'Verificación de huellas',
              opened: false,
              click: function() {
                $('#huella').modal('show');
              }
            }
          ]
        };
        $scope.activate();
      }
    ]);

  //Inicializa angular
  angular.bootstrap(document, ['app']);
});