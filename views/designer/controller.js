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
          $timeout(function() {
            $scope.validator.bind('validateInput', function(e) {
              console.log("error");
            });
          }, 100);
        };
        $scope.customers = {
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
                    nullable: false,
                    validation: {
                      required: true
                    }
                  },
                  loginType: {
                    editable: true,
                    nullable: false,
                    validation: {
                      required: true
                    }
                  }
                }
              }
            }
          },
          editable: "inline",
          edit: function (e) {
            e.sender.editable.validatable._errorTemplate = kendo.template($('#tooltip-template').html());
          },
          scrollable: true,
          height: 140,
          columns: [
            {
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
              command: ["edit", "destroy"],
              title: "&nbsp;"
            }
          ],
          toolbar: '<div class="cb-flex cb-middle"><button class="btn btn-default k-grid-add"><span class="fa fa-plus"></span> Agregar</button></div>'
        };
        $scope.validateHandler = function(event) {
          console.log(event);
        }
        $scope.validate = function(event) {
          $scope.submitSaveDeposit(event);
        }
        $scope.submitSaveDeposit = function(event) {
          if (event) event.preventDefault();
          if ($scope.validator.validate()) {

          }
        }

        $scope.activate();
      }
    ]);

  //Inicializa angular
  angular.bootstrap(document, ['app']);
});
