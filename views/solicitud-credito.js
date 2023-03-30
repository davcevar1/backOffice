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
        .controller('controller', ['$scope', '$http', '$q', '$timeout',
            function ($scope, $http, $q, $timeout) {
                var container = angular.element('.cb-wizard-steps'),
				    positions = [];
				$scope.activate = function() {
                    messages.loading(false);
					angular.element('.cb-wizard-nav').find('[data-slide="prev"]').on('click', function(e) {
                        e.preventDefault();
                        container.animate({scrollLeft:positions.pop()}, function(){
                            $scope.refreshSteps();
                        });
                    });
                    angular.element('.cb-wizard-nav').find('[data-slide="next"]').on('click', function(e) {
                        e.preventDefault();
                        container.find('> .cb-wizard-step').each(function() { 
                            var button = angular.element(this);
                            if (button.offset().left+button.width()>container.width()) {	
                                var buttonLeft = button.offset().left+container.scrollLeft()-container.offset().left;
                                if (container.scrollLeft() != positions[positions.length-1]) {
                                    positions.push(container.scrollLeft());
                                }
                                container.animate({scrollLeft:buttonLeft}, function() {
                                    $scope.refreshSteps();    
                                });
                                return false;
                            }
                        });
                    });
                    angular.element(window).on('resize', function() {
                        $scope.refreshSteps();
                    });
					$timeout(function() {
						$scope.refreshSteps();
					}, 300);
                };
				$scope.refreshSteps = function() {
                    $scope.$apply(function(){
						console.log(container[0].clientWidth+'!='+container[0].scrollWidth+'-'+container.scrollLeft());
                        $scope.wizardScrollLeft = container.scrollLeft()>0;
                        $scope.wizardScrollRight = container[0].clientWidth!=container[0].scrollWidth-container.scrollLeft();
                    });
                };
				$scope.addPoliza = function() {
					$('#poliza').modal();
				};
				$scope.deudoresOptions = {
                    dataSource: {
                        transport: {
                            read: "../mocks/deudores.json"
                        }
                    },
                    columns: [
                        {
                            field: "id",
                            title: "Id #"
                        }, {
                            field: "name",
                            title: "Nombre"
                        }, {
                            field: "role",
                            title: "Rol"
                        },
                        {
                            field: "documentType",
                            title: "Tipo de documento",
							attributes: {
							  "class": "text-center"
							},
							headerAttributes: {
							  "style": "text-align:center;"
							}
                        },
                        {
                            field: "documentNumber",
							title: "Identificación"
                        },
                        {
                            field: "rate",
							title: "Calificación",
							attributes: {
							  "class": "text-center"
							},
							headerAttributes: {
							  "style": "text-align:center;"
							}
                        }
                    ],
                    toolbar: kendo.template($("#template").html())
                };
				$scope.rubrosOptions = {
                    dataSource: {
                        transport: {
                            read: "../mocks/rubros.json"
                        }
                    },
                    columns: [
                        {
                            field: "concept",
                            title: "Concepto",
							attributes: {
							  "class": "text-center"
							},
							headerAttributes: {
							  "style": "text-align:center;"
							}
                        }, {
                            field: "payment",
                            title: "Forma de pago",
							attributes: {
							  "class": "text-center"
							},
							headerAttributes: {
							  "style": "text-align:center;"
							}
                        }, {
                            field: "sign",
                            title: "Signo",
							attributes: {
							  "class": "text-center"
							},
							headerAttributes: {
							  "style": "text-align:center;"
							}
                        },
                        {
                            field: "factor",
                            title: "Factor",
							attributes: {
							  "class": "text-right"
							},
							headerAttributes: {
							  "style": "text-align:right;"
							}
                        },
                        {
                            field: "referencial",
							title: "Referencial",
							attributes: {
							  "class": "text-center"
							},
							headerAttributes: {
							  "style": "text-align:center;"
							}
                        },
                        {
                            field: "rate",
							title: "Tasa",
							attributes: {
							  "class": "text-right"
							},
							headerAttributes: {
							  "style": "text-align:right;"
							}
                        }
                    ],
					selectable: true,
                    toolbar: kendo.template($("#template").html())
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
				$scope.amortizacionOptions = {
                    dataSource: {
                        transport: {
                            read: "../mocks/amortizacion.json"
                        },
						aggregate: [
							{ field: "capital", aggregate: "sum" },
							{ field: "interest", aggregate: "sum" },
							{ field: "comission", aggregate: "sum" },
							{ field: "value", aggregate: "sum" }
						]
                    },
                    columns: [
                        {
                            field: "number",
                            title: "#",
							attributes: {
							  "class": "text-center"
							},
							headerAttributes: {
							  "style": "text-align:center;"
							}
                        }, {
                            field: "date",
                            title: "Fecha vencimiento",
							attributes: {
							  "class": "text-center"
							},
							headerAttributes: {
							  "style": "text-align:center;"
							}
                        }, {
                            field: "capitalBalance",
                            title: "Saldo capital", 
							format: "{0:c}",
							attributes: {
							  "class": "text-right"
							},
							headerAttributes: {
							  "style": "text-align:right;"
							}
                        },
                        {
                            field: "capital",
							title: "Capital",
							format: "{0:c}",
							attributes: {
							  "class": "text-right"
							},
							headerAttributes: {
							  "style": "text-align:right;"
							},
							footerTemplate: "<div class='text-right'>#: kendo.toString(sum, 'C') #</div>"
                        },
                        {
                            field: "interest",
							title: "Interés",
							format: "{0:c}",
							attributes: {
							  "class": "text-right"
							},
							headerAttributes: {
							  "style": "text-align:right;"
							},
							footerTemplate: "<div class='text-right'>#: kendo.toString(sum, 'C') #</div>"
                        },
                        {
                            field: "comission",
							title: "Comisión",
							format: "{0:c}",
							attributes: {
							  "class": "text-right",
							},
							headerAttributes: {
							  "style": "text-align:right;"
							},
							footerTemplate: "<div class='text-right'>#: kendo.toString(sum, 'C') #</div>"
                        },
                        {
                            field: "value",
							title: "Cuota",
							format: "{0:c}",
							attributes: {
							  "class": "text-right",
							},
							headerAttributes: {
							  "style": "text-align:right;"
							},
							footerTemplate: "<div class='text-right'>#: kendo.toString(sum, 'C') #</div>"
                        }
                    ],
                    toolbar: kendo.template($("#amortizacion2").html())
                };
				$scope.valoresOptions = {
                    dataSource: {
                        transport: {
                            read: "../mocks/valores.json"
                        }
                    },
                    columns: [
                        {
                            field: "concept",
                            title: "Concepto"
                        }, {
                            field: "description",
                            title: "Descripción"
                        },
                        {
                            field: "value",
                            title: "Valor",
							format: "{0:c}",
							attributes: {
							  "class": "text-right"
							},
							headerAttributes: {
							  "style": "text-align:right;"
							}
                        },
                        {
                            field: "sign",
                            title: "Signo",
							attributes: {
							  "class": "text-center"
							},
							headerAttributes: {
							  "style": "text-align:center;"
							}
                        }
                    ]
                };
				$scope.desembolsosOptions = {
                    dataSource: {
                        transport: {
                            read: "../mocks/desembolsos.json"
                        }
                    },
                    columns: [
                        {
                            field: "type",
                            title: "Forma de desembolso"
                        }, {
                            field: "currency",
                            title: "Moneda",
							attributes: {
							  "class": "text-center"
							},
							headerAttributes: {
							  "style": "text-align:center;"
							}
                        }, {
                            field: "value",
                            title: "Valor",
							format: "{0:c}",
							attributes: {
							  "class": "text-right"
							},
							headerAttributes: {
							  "style": "text-align:right;"
							}
                        },
                        {
                            field: "valueml",
                            title: "Valor ML",
							format: "{0:c}",
							attributes: {
							  "class": "text-right"
							},
							headerAttributes: {
							  "style": "text-align:right;"
							}
                        },
                        {
                            field: "price",
                            title: "Cotización",
							attributes: {
							  "class": "text-center"
							},
							headerAttributes: {
							  "style": "text-align:right;"
							}
                        }
                    ],
					selectable: true,
					toolbar: kendo.template($("#template").html())
                };
				$scope.fieldsOptions = {
                    dataSource: {
                        transport: {
                            read: "../mocks/fields.json"
                        }
                    },
                    columns: [
                        {
                            field: "field",
                            title: "Campo",
							template: '#: field # <span class="text-danger">*</span>'
                        }, {
                            field: "value",
                            title: "Valor"
                        }
                    ]
                };
				$scope.polizasOptions = {
                    dataSource: {
                        transport: {
                            read: "../mocks/fields.json"
                        }
                    },
                    columns: [
                        {
                            field: "field",
                            title: "Campo"
                        }, {
                            field: "value",
                            title: "Valor"
                        }
                    ],
					selectable: true,
					toolbar: kendo.template($("#polizaTools").html())
                };
                $scope.treeData = new kendo.data.HierarchicalDataSource({ data: [
					{ text: "Quirografaria", items: [
					  { text: "Pagaré" }
					] },
					{ text: "Prendaria", items: [
					  { text: "Maquinaria" },
					  { text: "Vehículo" },
					  { text: "Garantía vehicular Pyme" }
					] },
					{ text: "Título valor", items: [
					  { text: "Plazo fijo" }
					] },
					{ text: "Garantía hipotecaria", items: [
					  { text: "Inmuebles" },
					  { text: "Terreno" }
					] },
					{ text: "Garantía personal", items: [
					  { text: "Garantía personal" }
					] }
				  ]});
				$scope.info = {
                    alicuota: -1
                };
				
				$scope.activate();
            }
        ]);

    //Inicializa angular
    angular.bootstrap(document, ['app']);
});