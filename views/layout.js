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
                $scope.activate = function() {
                    messages.loading(false);
                };
                
                $scope.garantiasPersonalOptions = {
                    dataSource: {
                        transport: {
                            read: "../mocks/garantiasPersonales.json"
                        }
                    },
                    columns: [
                        {
                            field: "code",
                            title: "Codigo"
                        }, {
                            field: "type",
                            title: "Tipo",
							attributes: {
							  "class": "text-center"
							},
							headerAttributes: {
							  "style": "text-align:center;"
							}
                        }, {
                            field: "description",
                            title: "Descripción"
                        },
                        {
                            field: "guarantor",
                            title: "Garante"
                        }
                    ],
					selectable: true
                };
				$scope.garantiasOtrasOptions = {
                    dataSource: {
                        transport: {
                            read: "../mocks/garantiasOtras.json"
                        }
                    },
                    columns: [
                        {
                            field: "code",
                            title: "Codigo"
                        }, {
                            field: "type",
                            title: "Tipo",
							attributes: {
							  "class": "text-center"
							},
							headerAttributes: {
							  "style": "text-align:center;"
							}
                        }, {
                            field: "description",
                            title: "Descripción"
                        },
                        {
                            field: "valueInit",
                            title: "Valor inicial",
							format: "{0:c}",
							attributes: {
							  "class": "text-right"
							},
							headerAttributes: {
							  "style": "text-align:right;"
							}
                        },
                        {
                            field: "date",
							title: "Fecha de avaluo",
							attributes: {
							  "class": "text-center"
							},
							headerAttributes: {
							  "style": "text-align:center;"
							}
                        },
                        {
                            field: "valueAvailable",
							title: "Valor disponible",
							format: "{0:c}",
							attributes: {
							  "class": "text-right"
							},
							headerAttributes: {
							  "style": "text-align:right;"
							}
                        },
                        {
                            field: "status",
							title: "Estado",
							attributes: {
							  "class": "text-center"
							},
							headerAttributes: {
							  "style": "text-align:center;"
							}
                        }
                    ],
					selectable: true
                };
                
                $scope.activate();
            }
        ]);

    //Inicializa angular
    angular.bootstrap(document, ['app']);
});