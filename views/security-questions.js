require.config(requireConfig);
define(function (require) {
  'use strict';

  // Importaci&oacute;n de m&oacute;dulos AMD
  var angular = require('angular'),
    kendo = require('kendo'),
    messages = require('cobis/messages');

  var app = angular.module('app', ['kendo.directives'])
    .controller('controller', ['$scope', '$http', '$q', '$timeout',
      function ($scope, $http, $q, $timeout) {
        $scope.questions = [
            {label: '¿Cuál sería su vacación ideal?', checked: false},
            {label: '¿Cuál es su pasatiempo favorito?', checked: false},
            {label: '¿Cuál es su plato favorito?', checked: false},
            {label: '¿Cuál es su color favorito?', checked: false},
            {label: '¿En qué hora del día nació?', checked: false},
            {label: '¿Lugar dónde fuiste al colegio?', checked: false},
            {label: '¿Nombre de tu primera mascota?', checked: false},
            {label: '¿En que ciudad naciste?', checked: false},
            {label: '¿Tu equipo deportivo favorito?', checked: false},
            {label: '¿Cuál es la marca de tu primer auto?', checked: false}
        ];
        $scope.questionsChecked = function() {
            var questionsChecked = $scope.questions.filter(function(question) {
                return question.checked;
            });
            return questionsChecked.length;
        }
      }
    ]);

  //Inicializa angular
  angular.bootstrap(document, ['app']);
});