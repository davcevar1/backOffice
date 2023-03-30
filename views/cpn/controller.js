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
          // Crea una instancia de observer
          var observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
              window.parent.postMessage({height: document.querySelector('.cb-view').clientHeight});
            });
          });
          setTimeout(function() {
            window.parent.postMessage({height: document.querySelector('.cb-view').clientHeight});
          }, 100);

          // Configura el observer:
          var config = { attributes: true, childList: true, characterData: true };

          // pasa al observer el nodo y la configuracion
          observer.observe(document.body, config);

          if (sessionStorage.appBackground == 'false') {
            $('body').css('background', 'url(bg0.png)');
          }
        };
        $scope.address = {
          city: 'Quito, Pichincha',
          street: 'Amazonas',
          number: 'E23-456',
          intersection: 'Ventinilla',
          reference: 'Ed. Colta, Dep 101'
        };
        $scope.birthday = new Date('12/16/1985');
        $scope.find = function() {
          $scope.showResults = true;
        };
        $scope.filters = {
          field: [{
            label: "Nombre",
            id: 3
            }
          ]
        };
        $scope.goto = function(url) {
          location.href = url;
        };
        $scope.maritalStatus = 'married';
        $scope.selectedField = $scope.filters.field[0];
        $scope.setField = function(field) {
          $scope.selectedField = field;
        }
        $scope.showModal = function(selector) {
          $('#' + selector).modal();
        }
        $scope.locations = {
          dataSource: {
            transport: {
              read: {
                url: "../../mocks/canales-locations.json",
                contentType: "application/json; charset=utf-8",
                dataType: "json"
              }
            }
          },
          scrollable: false,
          detailTemplate: $("#services").length > 0 ? kendo.template($("#services").html()) : kendo.template(''),
          columns: [{
              field: "id",
              template: $("#location").length > 0 ? kendo.template($("#location").html()) : kendo.template('')
            },
            {
              width: 20,
              headerAttributes: {
                "class": "cb-actions"
              },
              attributes: {
                "class": "cb-actions cb-no-wrap"
              },
              template: '<button class="btn btn-default btn-sm" title="Editar" ng-click="showModal(\'location-form\')"><span class="fa fa-pencil fa-fw"></span></button> <button class="btn btn-default btn-sm" title="Eliminar"><span class="fa fa-times fa-fw"></span></button>'
            }
          ],
          toolbar: '<div class="cb-flex cb-middle"><button class="btn btn-primary" ng-show="isAdvanced"><span class="fa fa-search"></span> Buscar</button><div class="cb-flex cb-middle cb-right cb-grow text-right"><div class="text-muted small" style="margin-right:10px;">Exportar:</div><button class="btn btn-default" style="margin:0;" title="Exportar a PDF"><span class="fa fa-file-pdf-o" style="margin:0;"></span></button><button class="btn btn-default" style="margin:0;" title="Exportar a Excel"><span class="fa fa-file-excel-o" style="margin:0;"></span></button></div></div>'
        };
        $scope.locations2 = {
          dataSource: {
            transport: {
              read: {
                url: "../../mocks/canales-locations.json",
                contentType: "application/json; charset=utf-8",
                dataType: "json"
              }
            }
          },
          scrollable: false,
          columns: [{
              field: "id",
              template: $("#location").length > 0 ? kendo.template($("#location").html()) : kendo.template('')
            },
            {
              width: 20,
              headerAttributes: {
                "class": "cb-actions"
              },
              attributes: {
                "class": "cb-actions cb-no-wrap"
              },
              template: '<button class="btn btn-default btn-sm" title="Editar" ng-click="showModal(\'location-form\')"><span class="fa fa-pencil fa-fw"></span></button> <button class="btn btn-default btn-sm" title="Eliminar"><span class="fa fa-times fa-fw"></span></button>'
            }
          ],
          toolbar: '<div class="cb-flex cb-middle"><button class="btn btn-primary" ng-show="isAdvanced"><span class="fa fa-search"></span> Buscar</button><div class="cb-flex cb-middle cb-right cb-grow text-right"><div class="text-muted small" style="margin-right:10px;">Exportar:</div><button class="btn btn-default" style="margin:0;" title="Exportar a PDF"><span class="fa fa-file-pdf-o" style="margin:0;"></span></button><button class="btn btn-default" style="margin:0;" title="Exportar a Excel"><span class="fa fa-file-excel-o" style="margin:0;"></span></button></div></div>'
        };
        $scope.offers = [
          {name: 'Crédito en línea', description: 'Desembolso automático', maxAmount: 3000, maxTime: 24, disabled: false},
          {name: 'Crédito sin garante', description: 'Firmar documentos en oficina', maxAmount: 5000, maxTime: 36, disabled: false},
          {name: 'Crédito con garante', description: 'Firmar documentos en oficina con garantes', maxAmount: 15000, maxTime: 72, disabled: true},
          {name: 'Crédito con garantía real', description: 'Necesita avalar sus bienes en las oficinas CPN', maxAmount: 65000, maxTime: 120, disabled: true}
        ]
        $scope.toggleSelection = function(item, items) {
          if (items) {
            items.forEach((_item) => {
              _item.selected = false;
            });
            item.selected = true;
          } else {
            item.selected = !item.selected;
          }
        }
        $scope.servicesOptions = {
            placeholder: "Seleccione servicios...",
            dataTextField: "label",
            dataValueField: "id",
            valuePrimitive: true,
            autoBind: false,
            dataSource: {
                data: [
                  {id:1, label:"Cajero Automático"},
                  {id:2, label:"Cajero Multifunción"},
                  {id:3, label:"Autoservicio"},
                  {id:4, label:"Ventanillas"},
                  {id:5, label:"Oficinas"}
                ]
            }
        };
        $scope.$watch('maritalStatus', function() {
          setTimeout(function() {
            window.parent.postMessage({height: document.querySelector('.cb-view').clientHeight});
          }, 100);
        });
        $scope.$watch('moreIncome', function() {
          setTimeout(function() {
            window.parent.postMessage({height: document.querySelector('.cb-view').clientHeight});
          }, 100);
        });
        $scope.activate();
      }
    ]);

  //Inicializa angular
  angular.bootstrap(document, ['app']);
});
