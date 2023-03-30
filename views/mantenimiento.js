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
        .controller('controller', ['$scope', '$http', '$q',
            function ($scope, $http, $q) {
                $scope.activate = function() {
                    angular.element('#more-info').popover({
                        content: $('#info').html(),
                        html: true,
                        placement: 'bottom'
                    });
                };
                $scope.activate();
				
				$scope.tiposTasas = {
                    dataSource: {
                        transport: {
                            read: "../mocks/tipos-tasas.json"
                        }
                    },
                    change: function(e) {
                        $scope.$apply(function(){
                            $scope.showRates = true;    
                        });
                    },
                    scrollable: false,
                    selectable: true,
                    toolbar: '<button class="btn btn-default" data-toggle="modal" data-target="\\#type-form"><span class="glyphicon glyphicon-plus"></span> Agregar</button>',
					columns: [
                        {
                            field: "id",
                            title: "Identificador"
                        }, {
                            field: "description",
                            title: "Descripción",
					    }, {
                            field: "class",
                            title: "Clase",
                            headerAttributes: {
							  "style": "text-align:center;"
							},
							attributes: {
							  "class": "text-center"
							}
                        },
                        {
                            width: 80,
                            template: '<div style="white-space:nowrap"><button class="btn btn-default btn-sm" data-toggle="modal" data-target="\\#type-form" title="Editar"><span class="fa fa-pencil"></span></button> <button class="btn btn-default btn-sm" title="Eliminar"><span class="fa fa-remove"></span></button></div>'
                        }
                    ]
                };
                
                $scope.tasas = {
                    dataSource: {
                        transport: {
                            read: "../mocks/tasas.json"
                        }
                    },
                    scrollable: false,
                    toolbar: '<button class="btn btn-default" data-toggle="modal" data-target="\\#rate-form"><span class="glyphicon glyphicon-plus"></span> Agregar</button>',
					columns: [
                        {
                            field: "cartera",
                            title: "Cartera"
                        }, {
                            field: "valor",
                            title: "Valor",
                            headerAttributes: {
							  "style": "text-align:right;"
							},
							attributes: {
							  "class": "text-right"
							}
					    }, {
                            field: "valorReferencial",
                            title: "Valor Referencial",
                            headerAttributes: {
							  "style": "text-align:center;"
							},
							attributes: {
							  "class": "text-center"
							}
                        }, {
                            field: "valorDefecto",
                            title: "Valor Defecto",
                            headerAttributes: {
							  "style": "text-align:center;"
							},
							attributes: {
							  "class": "text-center"
							}
                        }, {
                            field: "valorMinimo",
                            title: "Valor Minimo",
                            headerAttributes: {
							  "style": "text-align:center;"
							},
							attributes: {
							  "class": "text-center"
							}
                        }, {
                            field: "valorMaximo",
                            title: "Valor Maximo",
                            headerAttributes: {
							  "style": "text-align:center;"
							},
							attributes: {
							  "class": "text-center"
							}
                        },
                        {
                            width: 80,
                            template: '<div style="white-space:nowrap"><button class="btn btn-default btn-sm" data-toggle="modal" data-target="\\#rate-form" title="Editar"><span class="fa fa-pencil"></span></button> <button class="btn btn-default btn-sm" title="Eliminar"><span class="fa fa-remove"></span></button></div>'
                        }
                    ]
                };
                
                $scope.formasPago = {
                    dataSource: {
                        transport: {
                            read: "../mocks/formas-pago.json"
                        }
                    },
                    scrollable: false,
                    toolbar: '<button class="btn btn-default" data-toggle="modal" data-target="\\#payment-type-form"><span class="glyphicon glyphicon-plus"></span> Agregar</button>',
					columns: [
                        {
                            field: "id",
                            title: "Identificador"
                        }, {
                            field: "description",
                            title: "Descripción"
					    },
                        {
                            width: 80,
                            template: '<div style="white-space:nowrap"><button class="btn btn-default btn-sm" data-toggle="modal" data-target="\\#payment-type-form" title="Editar"><span class="fa fa-pencil"></span></button> <button class="btn btn-default btn-sm" title="Eliminar"><span class="fa fa-remove"></span></button></div>'
                        }
                    ]
                };
            }
        ]);

    //Inicializa angular
    angular.bootstrap(document, ['app']);
});