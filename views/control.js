require.config(requireConfig);
define(function (require) {
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
            function ($scope, $http, $q) {
                $scope.activate = function () {
                    messages.loading(false);
                    
                    /*$.fn.responsiveTabs = function() {
                      this.addClass('responsive-tabs');
                      this.append($('<span class="fa fa-angle-down"></span>'));
                      this.append($('<span class="fa fa-angle-up"></span>'));

                      this.on('click', 'li.active > a, span.fa', function() {
                        this.toggleClass('open');
                      }.bind(this));

                      this.on('click', 'li:not(.active) > a', function() {
                        this.removeClass('open');
                      }.bind(this));
                    };

                    $('.cb-nav-responsive').responsiveTabs();*/
                    
                };
                $scope.activate();
            }
        ]);

    //Inicializa angular
    angular.bootstrap(document, ['app']);
});