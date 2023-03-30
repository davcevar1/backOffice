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
          
        };
        $scope.notifications = {
          dataSource: {
            transport: {
              read: {
                url: "../../mocks/notifications.json",
                contentType: "application/json; charset=utf-8",
                dataType: "json"
              }
            }
          },
          scrollable: false,
          // detailTemplate: $("#conditions-detail").length > 0 ? kendo.template($("#conditions-detail").html()) : kendo.template(''),
          columns: [{
            field: ' ',
            width: 20,
            template: '<input type="checkbox" data-bind="checked:enabled" />'
          }, {
            field: 'description',
            title: 'Descripción'
          },
          {
            field: 'description',
            title: 'Condición',
            template: '#if (data.enabled) {#<div>#if (data.type == "days") {#Número de días#}else if (data.type == "none"){#No aplica#}else{#Monto#}# # if (data.type != "none"){#<strong>#:data.operator#</strong> #:data.value#</div>#}##}#'
          },
          {
            field: 'description',
            title: 'Medio de envío',
            headerAttributes: {
              "style": "text-align:center;"
            },
            attributes: {
              "class": "text-center"
            },
            template: '#if (data.enabled) {#<div class="cb-flex cb-middle cb-center" style="gap:8px;"><span class="fa fa-envelope" style="font-size:17px;"></span><span class="fa fa-mobile" style="font-size:28px;"></span></div>#}#'
          },
          {
            width: 20,
            attributes: {
              "class": "cb-actions cb-no-wrap"
            },
            template: '#if (data.enabled) {#<button class="btn btn-default btn-sm" title="Editar" ng-click="showModal(\'conditions\', dataItem)"><span class="fa fa-pencil fa-fw"></span></button>#}#'
          }],
          dataBound: function(e) {
            e.sender.items().each(function(){
              var dataItem = e.sender.dataItem(this);
              kendo.bind(this, dataItem);
              if(dataItem.Discontinued){
                $(this).addClass("k-state-selected");
              }
            })
            // iterate the table rows and apply custom row and cell styling
            var rows = e.sender.tbody.children();
            for (var j = 0; j < rows.length; j++) {
              var row = $(rows[j]);
              var dataItem = e.sender.dataItem(row);
              var hasCondition = dataItem.get("hasConditions");

              if (!hasCondition) {
                row.addClass("not-expand");
              }
            }
          }
        };
        $scope.showModal = function(selector, dataItem) {
          $('#' + selector).modal();
          $scope.dataItem = dataItem;
          console.log(dataItem);
        }
        $scope.activate();
      }
    ]);

  //Inicializa angular
  angular.bootstrap(document, ['app']);
});