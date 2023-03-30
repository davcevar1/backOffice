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
        $scope.selectOptions = {
          placeholder: "Select products...",
          dataTextField: "ProductName",
          dataValueField: "ProductID",
          autoBind: false,
          dataSource: {
            type: "odata",
            serverFiltering: true,
            transport: {
              read: {
                url: "http://demos.telerik.com/kendo-ui/service/Northwind.svc/Products",
              }
            }
          }
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
        $scope.activate();
      }
    ]);

  //Inicializa angular
  angular.bootstrap(document, ['app']);
});
