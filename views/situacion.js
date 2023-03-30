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
                    
                };
                
                $scope.activos = {
                    dataSource: [
						{'label':'Bienes muebles', value:20000},
                        {'label':'Bienes inmuebles', value:20000},
                        {'label':'Otros', value:20000}
					],
                    height: 200,
                    scrollable: true,
					columns: [
                        {
                            field: "label",
                            title: "Activos"
                        },
                        {
                            field: "value",
                            title: "&nbsp;",
                            format: "{0:c}",
                            template: "#if (value>0) {# #: kendo.toString(value, 'c') # #}else{# - #}#",
                            headerAttributes: {
							  "style": "text-align:right;"
							},
							attributes: {
							  "class": "text-right"
							},
                        }
                    ]
                };
                $scope.pasivos = {
                    dataSource: [
						{'label':'Obligaciones con la institucion', value:20000},
                        {'label':'Obligaciones con el sector financiero', value:20000},
                        {'label':'Otros', value:20000}
					],
                    height: 200,
                    scrollable: true,
					columns: [
                        {
                            field: "label",
                            title: "Pasivos"
                        },
                        {
                            field: "value",
                            title: "&nbsp;",
                            format: "{0:c}",
                            template: "#if (value>0) {# #: kendo.toString(value, 'c') # #}else{# - #}#",
                            headerAttributes: {
							  "style": "text-align:right;"
							},
							attributes: {
							  "class": "text-right"
							},
                        }
                    ]
                };
                $scope.patrimonio = {
                    dataSource: [
						{'label':'Total activos', value:20000},
                        {'label':'Total pasivos', value:20000},
                        {'label':'Total Patrimonio', value:20000}
					],
                    height: 200,
                    scrollable: true,
					columns: [
                        {
                            field: "label",
                            title: "Patrimonio"
                        },
                        {
                            field: "value",
                            title: "&nbsp;",
                            format: "{0:c}",
                            headerAttributes: {
							  "style": "text-align:right;"
							},
							attributes: {
							  "class": "text-right"
							},
                        }
                    ]
                };
                
                $scope.ingresos = {
                    dataSource: [
						{'label':'Sueldo titular', value:3000},
                        {'label':'Negocio propio titular', value:0},
                        {'label':'Utilidades/Acciones', value:0},
                        {'label':'Sueldo conyuge', value:2000},
                        {'label':'Negocio propio titular', value:0},
                        {'label':'Otros ingresos', value:0}
					],
                    height: 200,
                    scrollable: true,
					columns: [
                        {
                            field: "label",
                            title: "Ingresos"
                        },
                        {
                            field: "value",
                            title: "&nbsp;",
                            format: "{0:c}",
                            template: "#if (value>0) {# #: kendo.toString(value, 'c') # #}else{# - #}#",
                            headerAttributes: {
							  "style": "text-align:right;"
							},
							attributes: {
							  "class": "text-right"
							},
                        }
                    ]
                };
                $scope.gastos = {
                    dataSource: [
						{'label':'Alimentacion', value:500},
                        {'label':'Vivienda', value:0},
                        {'label':'Servicios basicos', value:200},
                        {'label':'Vestimenta', value:0},
                        {'label':'Educacion', value:500},
                        {'label':'Salud', value:100},
                        {'label':'Transporte', value:100},
                        {'label':'Creditos mut.', value:0}
					],
                    height: 200,
                    scrollable: true,
					columns: [
                        {
                            field: "label",
                            title: "Gastos"
                        },
                        {
                            field: "value",
                            title: "&nbsp;",
                            format: "{0:c}",
                            template: "#if (value>0) {# #: kendo.toString(value, 'c') # #}else{# - #}#",
                            headerAttributes: {
							  "style": "text-align:right;"
							},
							attributes: {
							  "class": "text-right"
							},
                        }
                    ]
                };
                $scope.situacionEconomica = {
                    dataSource: [
						{'label':'Total ingresos', value:5000},
                        {'label':'Total gastos', value:800},
                        {'label':'Balance', value:4200}
					],
                    height: 200,
                    scrollable: true,
					columns: [
                        {
                            field: "label",
                            title: "Situacion economica"
                        },
                        {
                            field: "value",
                            title: "&nbsp;",
                            format: "{0:c}",
                            headerAttributes: {
							  "style": "text-align:right;"
							},
							attributes: {
							  "class": "text-right"
							},
                        }
                    ]
                };
                
                $scope.activate();
            }
        ]);

    //Inicializa angular
    angular.bootstrap(document, ['app']);
});