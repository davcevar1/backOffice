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
					setTimeout(function(){
                        $(window).trigger("resize");
                    }, 100);
                    angular.element('#more-info').popover({
                        content: $('#info').html(),
                        html: true,
                        placement: 'left'
                    });
                };
                $scope.clientesFiltrados = {
                    dataSource: {
                        transport: {
                            read: "../mocks/clientes.json"
                        }
                    },
                    scrollable: false,
                    selectable: true,
                    change: function(e) {
                        var grid = e.sender,
                            currentDataItem = grid.dataItem(this.select());
                        if (currentDataItem) {
                            location.href = 'grupo-detalle.html';
                        }
                    },
                    columns: [
                        {
                            field: "blocked",
                            title: "&nbsp;",
                            width: 22,
                            template: '<span class="fa fa-circle #if (blocked){#cb-text-red#}else{#cb-text-green#}#"></span>'
                        },
                        {
                            field: "name",
                            title: "Nombre"
                        },
                        {
                            field: "officer",
                            title: "Oficial"
                        }
                    ],
                    toolbar: '<a href="grupo.html" class="btn btn-default"><span class="fa fa-plus"></span> Crear</a>'
                };
                $scope.miembros = {
                    dataSource: {
                        transport: {
                            read: "../mocks/clientes.json"
                        }
                    },
                    scrollable: false,
                    columns: [
                        {
                            field: "blocked",
                            title: "&nbsp;",
                            width: 22,
                            template: '<span class="fa fa-circle #if (blocked){#cb-text-red#}else{#cb-text-green#}#"></span>'
                        },
                        {
                            field: "name",
                            title: "Nombre"
                        },
                        {
                            field: "role",
                            title: "Rol"
                        },
                        {
                            field: "rate",
                            title: "Calificación interna"
                        },
                        {
                            attributes: {
                                class: "cb-no-wrap"
                            },
                            width: 20,
                            template: '<button class="btn btn-default btn-sm" title="Eliminar"><span class="fa fa-times fa-fw"></span></button>'
                        }
                    ],
                    toolbar: '<a href="grupo.html" class="btn btn-default"><span class="fa fa-plus"></span> Agregar</a>'
                };
                $scope.montos = {
                    dataSource: {
                        transport: {
                            read: "../mocks/clientes.json"
                        },
                        schema: {
                            model: {
                                id: "id",
                                fields: {
                                    amount: {type: "number", editable: true},
                                    blocked: {type: "string", editable: false},
                                    name: {type: "string", editable: false},
                                    role: {type: "string", editable: false},
                                    rate: {type: "string", editable: false}
                                }
                            }
                        }
                    },
                    scrollable: false,
                    editable: true,
                    columns: [
                        {
                            field: "blocked",
                            title: "&nbsp;",
                            width: 22,
                            template: '<span class="fa fa-circle #if (blocked){#cb-text-red#}else{#cb-text-green#}#"></span>',
                            editable: false
                        },
                        {
                            field: "name",
                            title: "Nombre",
                            editable: false
                        },
                        {
                            field: "role",
                            title: "Rol",
                            editable: false
                        },
                        {
                            field: "rate",
                            title: "Calificación interna",
                            editable: false
                        },
                        {
                            field: "amount",
                            width: 250,
                            title: "Monto",
                            editable: true,
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
                $scope.filters = {
                    entity: [
                        {label:"Cliente", id:1},
                        {label:"Prospecto", id:2}
                    ],
                    type: [
                        {label:"Natural", id:1},
                        {label:"Juridica", id:2},
                        {label:"Grupo económico", id:3}
                    ],
                    field: [
                        {label:"Identificación", id:1},
                        {label:"Nombre", id:2},
                        {label:"Consecutivo", id:3}
                    ]
                };
                $scope.selectedEntity = $scope.filters.entity[0];
                $scope.selectedType = $scope.filters.type[2];
                $scope.selectedField = $scope.filters.field[1];
                $scope.setEntity = function (entity) {
                    $scope.selectedEntity = entity;
                };
                $scope.setType = function (type) {
                    $scope.selectedType = type;
                    $scope.selectedField = $scope.filters.field[0];
                };
                $scope.setField = function (field) {
                    $scope.selectedField = field;
                };
                $scope.setCustomer = function(customer) {
                    $scope.customer = customer;
                };
                $scope.setCurrentView = function(currentView, e) {
                    if (e) e.stopPropagation();
                    $scope.currentView = currentView;
                };
				$scope.header = {
                    primaryText: 'La Esperanza',
                    moreInfoWidth: 400,
                    fields: [
                        {
                            label: 'Consecutivo',
                            value: '1232',
                            opened: true
                        },
                        {
                            label: 'Trámite',
                            value: '38611572',
                            opened: true
                        },
                        {
                            label: 'Monto Solicitado',
                            value: '$100,000.00 USD',
                            opened: true
                        },
                        {
                            label: 'Plazo',
                            value: '16 meses',
                            opened: true
                        },
                        {
                            label: 'Frecuencia',
                            value: 'Semanal',
                            opened: true
                        },
                        {
                            label: 'Categoría',
                            value: 'COMERCIAL',
                            opened: false
                        },
                        {
                            label: 'Oficina',
                            value: 'DISTRITO GENERAL',
                            opened: false
                        },
                        {
                            label: 'Subtipo',
                            value: 'Actividad empresarial o comercial microcrédito',
                            opened: false
                        },
                        {
                            label: 'Vinculado',
                            value: 'Si',
                            opened: false
                        },
                        {
                            label: 'Comportamiento',
                            value: '0',
                            opened: false
                        },
                        {
                            label: '# de ciclo',
                            value: '0',
                            opened: false
                        }
                    ],
                    actions: [
                        {
                            label: 'Buscar',
                            iconClass: 'fa fa-search',
                            opened: true,
                            click: function () {
                                location.href = 'grupo-busqueda.html';
                            }
                        },
						{
                            label: 'Editar',
                            iconClass: 'fa fa-pencil',
                            opened: false,
                            click: function () {
                                location.href = 'grupo.html';
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