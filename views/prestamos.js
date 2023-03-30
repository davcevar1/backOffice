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
                $scope.activate = function () {
                    setTimeout(function () {
                        angular.element('#more-info').popover({
                            content: $('#info').html(),
                            html: true,
                            placement: 'bottom'
                        });
                        angular.element('.cb-value-summary').popover({
                            content: $('#value-summary').html(),
                            html: true,
                            placement: 'bottom'
                        });
                    }, 300);
                };
                $scope.changeCondonacion = function () {
                    $('#condonacion').modal();
                };
                $scope.changeNegociacion = function () {
                    $('#negociacion').modal();
                };
                $scope.changePriorities = function () {
                    $('#prioridades').modal();
                };
                $scope.paymentOptions = {
                    dataSource: {
                        transport: {
                            read: "../mocks/valores.json"
                        },
                        aggregate: [
                            {
                                field: "total",
                                aggregate: "sum"
                            }
						]
                    },
                    columns: [
                        {
                            field: "description",
                            title: "Descripción"
                        }, {
                            field: "vencido",
                            title: "Vencido",
                            format: "{0:c}",
                            attributes: {
                                "class": "text-right"
                            },
                            headerAttributes: {
                                "style": "text-align:right;"
                            }
                        }, {
                            field: "vigente",
                            title: "Vigente",
                            format: "{0:c}",
                            attributes: {
                                "class": "text-right"
                            },
                            headerAttributes: {
                                "style": "text-align:right;"
                            }
                        }, {
                            field: "novigente",
                            title: "No vigente",
                            format: "{0:c}",
                            attributes: {
                                "class": "text-right"
                            },
                            headerAttributes: {
                                "style": "text-align:right;"
                            }
                        }, {
                            field: "total",
                            title: "Total",
                            format: "{0:c}",
                            attributes: {
                                "class": "text-right"
                            },
                            headerAttributes: {
                                "style": "text-align:right;"
                            },
                            footerTemplate: '<div class="text-right">$#: kendo.toString(sum, "n") #</div>'
                        }
                    ]
                };
                $scope.priorities = {
                    dataSource: {
                        transport: {
                            read: "../mocks/valores.json"
                        }
                    },
                    columns: [
                        {
                            field: "description",
                            title: "Rubro"
                        }, {
                            field: "priority",
                            title: "Prioridad",
                            width: "50px",
                            attributes: {
                                "class": "text-center"
                            },
                            headerAttributes: {
                                "style": "text-align:center;"
                            }
                        }
                    ]
                };
                $scope.amortizacionChart = {
                    dataSource: {
                        transport: {
                            read: "../mocks/amortizacion.json"
                        },
                        schema: {
                            model: {
                                fields: {
                                    date: {
                                        type: "date"
                                    }
                                }
                            }
                        }
                    },
                    dateField: "date",
                    series: [
                        {
                            type: 'column',
                            field: 'capitalBalance',
                            name: 'Saldo'
                        },
                        {
                            type: 'line',
                            field: 'value',
                            name: 'Cuota',
                            markers: {
                                
                            }
                        }
                    ],
                    navigator: {
                        series: {
                            type: "area",
                            field: "capitalBalance"
                        },
                        pane: {
                            height: 50
                        }
                    },
                    pannable: {
                        lock: "y"
                    },
                    zoomable: {
                        mousewheel: {
                            lock: "y"
                        },
                        selection: {
                            lock: "y"
                        }
                    },
                    chartArea:{
                        height: 250   
                    }
                };
                $scope.tablaAmortizacion = {
                    dataSource: {
                        transport: {
                            read: "../mocks/amortizacion.json"
                        }
                    },
                    columns: [
                        {
                            field: "number",
                            title: "#",
                            width: 20,
                            attributes: {
                                "class": "text-right"
                            },
                            headerAttributes: {
                                "style": "text-align:right;"
                            }
                        },
                        {
                            field: "date",
                            title: "Fecha"
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
                            }
                        },
                        {
                            field: "interest",
                            title: "Interes",
                            format: "{0:c}",
                            attributes: {
                                "class": "text-right"
                            },
                            headerAttributes: {
                                "style": "text-align:right;"
                            }
                        },
                        {
                            field: "comission",
                            title: "Comisión",
                            format: "{0:c}",
                            attributes: {
                                "class": "text-right"
                            },
                            headerAttributes: {
                                "style": "text-align:right;"
                            }
                        },
                        {
                            field: "value",
                            title: "Cuota",
                            format: "{0:c}",
                            attributes: {
                                "class": "text-right"
                            },
                            headerAttributes: {
                                "style": "text-align:right;"
                            }
                        },
                        {
                            field: "capitalBalance",
                            title: "Saldo final",
                            format: "{0:c}",
                            attributes: {
                                "class": "text-right"
                            },
                            headerAttributes: {
                                "style": "text-align:right;"
                            }
                        }
                    ]
                };
                $scope.chargeOptions = {
                    dataSource: {
                        transport: {
                            read: "../mocks/valores.json"
                        },
                        aggregate: [
                            {
                                field: "total",
                                aggregate: "sum"
                            }
						]
                    },
                    selectable: true,
                    editable: 'incell',
                    columns: [
                        {
                            field: "description",
                            title: "Descripción"
                        }, {
                            field: "vencido",
                            title: "Vencido",
                            format: "{0:c}",
                            attributes: {
                                "class": "text-right"
                            },
                            headerAttributes: {
                                "style": "text-align:right;"
                            }
                        }, {
                            field: "vigente",
                            title: "Vigente",
                            format: "{0:c}",
                            attributes: {
                                "class": "text-right"
                            },
                            headerAttributes: {
                                "style": "text-align:right;"
                            }
                        }, {
                            field: "novigente",
                            title: "No vigente",
                            format: "{0:c}",
                            attributes: {
                                "class": "text-right"
                            },
                            headerAttributes: {
                                "style": "text-align:right;"
                            }
                        }, {
                            field: "total",
                            title: "Total",
                            format: "{0:c}",
                            attributes: {
                                "class": "text-right"
                            },
                            headerAttributes: {
                                "style": "text-align:right;"
                            },
                            footerTemplate: '<div class="text-right">$#: kendo.toString(sum, "n") #</div>'
                        }
                    ],
                    //toolbar: kendo.template($("#template").html())
                };
                $scope.condonacionOptions = {
                    dataSource: {
                        transport: {
                            read: "../mocks/valores.json"
                        },
                        aggregate: [
                            {
                                field: "total",
                                aggregate: "sum"
                            },
                            {
                                field: "condonar",
                                aggregate: "sum"
                            }
						]
                    },
                    selectable: true,
                    editable: 'incell',
                    columns: [
                        {
                            field: "description",
                            title: "Descripción"
                        }, {
                            field: "notes",
                            title: "Observaciones",
                            template: "Prueba"
                        }, {
                            field: "total",
                            title: "Total cuota",
                            format: "{0:c}",
                            attributes: {
                                "class": "text-right"
                            },
                            headerAttributes: {
                                "style": "text-align:right;"
                            },
                            footerTemplate: '<div class="text-right">$#: kendo.toString(sum, "n") #</div>'
                        }, {
                            field: "condonar_p",
                            title: "% a condonar",
                            headerAttributes: {
                                "style": "text-align:center;"
                            },
                            attributes: {
                                "class": "text-center"
                            }
                        }, {
                            field: "condonar_m",
                            title: "% máximo",
                            headerAttributes: {
                                "style": "text-align:center;"
                            },
                            attributes: {
                                "class": "text-center"
                            }
                        }, {
                            field: "condonar",
                            title: "Monto",
                            format: "{0:c}",
                            attributes: {
                                "class": "text-right"
                            },
                            headerAttributes: {
                                "style": "text-align:right;"
                            },
                            footerTemplate: '<div class="text-right">$#: kendo.toString(sum, "n") #</div>'
                        }
                    ],
                    //toolbar: kendo.template($("#template").html())
                };
                if ($("#template").length > 0) {
                    $scope.chargeOptions.toolbar = kendo.template($("#template").html());
                    $scope.condonacionOptions.toolbar = kendo.template($("#template").html());
                }
                $scope.cuotas = {
                    dataSource: {
                        transport: {
                            read: "../mocks/cuotas.json"
                        }
                    },
                    columns: [
                        {
                            field: "fee",
                            title: "# Cuota",
                            attributes: {
                                "class": "text-center"
                            },
                            headerAttributes: {
                                "style": "text-align:center;"
                            }
                        }, {
                            field: "startDate",
                            title: "Inicia",
                            attributes: {
                                "class": "text-center"
                            },
                            headerAttributes: {
                                "style": "text-align:center;"
                            }
                        }, {
                            field: "endDate",
                            title: "Vence",
                            attributes: {
                                "class": "text-center"
                            },
                            headerAttributes: {
                                "style": "text-align:center;"
                            }
                        }, {
                            field: "capital",
                            title: "Capital",
                            attributes: {
                                "class": "text-right"
                            },
                            headerAttributes: {
                                "style": "text-align:right;"
                            }
                        }, {
                            field: "interest",
                            title: "Interés",
                            attributes: {
                                "class": "text-right"
                            },
                            headerAttributes: {
                                "style": "text-align:right;"
                            }
                        }, {
                            field: "others",
                            title: "Otros",
                            attributes: {
                                "class": "text-right"
                            },
                            headerAttributes: {
                                "style": "text-align:right;"
                            }
                        }, {
                            field: "total",
                            title: "Total",
                            attributes: {
                                "class": "text-right"
                            },
                            headerAttributes: {
                                "style": "text-align:right;"
                            }
                        }
                    ]
                };
                $scope.header = {
                    primaryText: 'Aguas Munoz Betty Jeanneth',
                    secondaryText: '#56465465465',
                    fields: [
                        {
                            label: 'Crédito Automotriz',
                            value: '$20,000.00 USD',
                            opened: true
                        },
                        {
                            label: 'Valor exigible',
                            value: '$700.00 USD',
                            opened: true
                        },
                        {
                            label: 'Estado',
                            value: 'Vigente',
                            opened: true
                        },
                        {
                            label: 'Fecha de inicio',
                            value: '12/12/2015',
                            opened: false
                        },
                        {
                            label: 'Fecha de vigencia',
                            value: '12/12/2017',
                            opened: false
                        },
                        {
                            label: 'Oficina',
                            value: 'SUCRE',
                            opened: false
                        },
                        {
                            label: '# Cédula',
                            value: '1234567890',
                            opened: false
                        }
                    ],
                    actions: [
                        {
                            label: 'Buscar',
                            iconClass: 'fa fa-search',
                            opened: true,
                            click: function () {
                                location.href = 'prestamos-busqueda.html';
                            }
                        },
                        {
                            label: 'Pago',
                            opened: false,
                            click: function () {
                                location.href = 'prestamos-pago.html';
                            }
                        },
                        {
                            label: 'Prorroga',
                            opened: false,
                            click: function () {
                                location.href = 'prestamos-prorroga.html';
                            }
                        },
                        {
                            label: 'Proyección',
                            opened: false,
                            click: function () {
                                location.href = 'prestamos-proyeccion.html';
                            }
                        },
                        {
                            label: 'Cancelación',
                            opened: false,
                            click: function () {
                                //location.href = 'prestamos-proyeccion.html';
                            }
                        }
                    ]
                };

                $scope.activate();
            }
        ]);

    //Inicializa angular
    angular.bootstrap(document, ['app']);
});