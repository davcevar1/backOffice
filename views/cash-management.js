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
                window.agregarCondicion = function() {
                    $scope.$apply(function() {
                        $scope.condicion = {};
                        $scope.mode = 'add';
                    });
                };
                $scope.cancelCondition = function() {
                    $scope.mode = null;
                    $scope.gridCondiciones.clearSelection();
                    $scope.condicion = null;
                };
                $scope.channelOptions = [
                    {id:1, description:'CASH MANAGEMENT'}
                ];
                $scope.condiciones = {
                    dataSource: [
						{channel: 'CASH MANAGEMENT', transaction:'', allTransactions: true, range: 'S', execution:'S', status:'V', auth:'N', product: true}
					],
                    height: 200,
                    scrollable: true,
                    selectable: true,
                    change: function() {
                        if (this.select().length>0) {
                            var selected = $scope.gridCondiciones.dataItem(this.select()).toJSON();
                            if (selected) {
                                $scope.$apply(function() {
                                    $scope.condicion = selected;
                                });
                            }
                        }else{
                            $scope.$apply(function() {
                                $scope.condicion = null;
                            });
                        }    
                    },
					columns: [
                        {
                            field: "channel",
                            title: "Canal"
                        },
						{
                            field: "transaction",
                            title: "Transacción"
                        },
						{
                            field: "execution",
                            title: "Tipo ejecución"
                        },
						{
                            field: "status",
                            title: "Estado"
                        },
						{
                            field: "auth",
                            title: "Autorizado"
                        }
                    ],
                    toolbar: '<button class="btn btn-default k-grid-add" onclick="agregarCondicion();"><span class="fa fa-plus"></span> Agregar</button>'
                };
                $scope.condiciones2 = {
                    dataSource: [
						{channel: 'CASH MANAGEMENT', transaction:'', allTransactions: true, range: 'S', execution:'S', status:'V', auth:'N', product: true, min:1, max:99999999}
					],
                    height: 200,
                    scrollable: true,
                    selectable: true,
                    change: function() {
                        if (this.select().length>0) {
                            var selected = $scope.gridCondiciones.dataItem(this.select()).toJSON();
                            if (selected) {
                                $scope.$apply(function() {
                                    $scope.condicion = selected;
                                });
                            }
                        }else{
                            $scope.$apply(function() {
                                $scope.condicion = null;
                            });
                        }    
                    },
					columns: [
                        {
                            field: "channel",
                            title: "Canal"
                        },
						{
                            field: "transaction",
                            title: "Transacción"
                        },
                        {
                            field: "a",
                            title: "Producto"
                        },
                        {
                            field: "a",
                            title: "Cuenta"
                        },
						{
                            field: "min",
                            title: "Minimo"
                        },
                        {
                            field: "max",
                            title: "Maximo"
                        },
                        {
                            field: "execution",
                            title: "Tipo ejecución"
                        },
						{
                            field: "status",
                            title: "Estado"
                        },
						{
                            field: "auth",
                            title: "Autorizado"
                        }
                    ],
                    toolbar: '<button class="btn btn-default k-grid-add" onclick="agregarCondicion();"><span class="fa fa-plus"></span> Agregar</button>'
                };
                $scope.jerarquia = {
                    dataSource: [
						{'loginType': 'Login Tipo A - Nivel', 'number':'1', 'operator':'RANGO', 'min':100, 'max':1000, 'currency':'DOLAR', 'createdAt':'25/04/2016', 'updatedAt':'25/04/2016'},
                        {'loginType': 'Login Tipo B - Nivel', 'number':'2', 'operator':'MAYOR QUE', 'min':1001, 'max':0, 'currency':'DOLAR', 'createdAt':'25/04/2016', 'updatedAt':'25/04/2016'}
					],
                    height: 200,
                    scrollable: true,
                    selectable: true,
                    sortable: true,
                    resizable: true,
                    columns: [
                        {
                            field: "loginType",
                            title: "Tipo login",
                            attributes: {
                                class: "cb-no-wrap"
                            }
                        },
						{
                            field: "number",
                            title: "Número"
                        },
                        {
                            field: "operator",
                            title: "Operador"
                        },
						{
                            field: "min",
                            title: "Min."
                        },
						{
                            field: "max",
                            title: "Max."
                        },
						{
                            field: "currency",
                            title: "Moneda"
                        },
						{
                            field: "createdAt",
                            title: "Creado"
                        },
						{
                            field: "updatedAt",
                            title: "Modificado"
                        },
                        {
                            attributes: {
                                class: "cb-no-wrap"
                            },
                            template: '<button class="btn btn-default btn-sm" title="Editar" data-toggle="modal" data-target="\\#jerarquia-form"><span class="fa fa-pencil fa-fw"></span></button> <button class="btn btn-default btn-sm" title="Eliminar"><span class="fa fa-times fa-fw"></span></button>'
                        }
                    ],
                    toolbar: '<button class="btn btn-default" data-toggle="modal" data-target="\\#jerarquia-form"><span class="fa fa-plus"></span> Agregar</button>'
                };
                $scope.atributos = {
                    dataSource: [
						{'loginType': 'Login Tipo A - Nivel', 'number':'1', 'operator':'RANGO', 'min':100, 'max':1000, 'currency':'DOLAR', 'createdAt':'25/04/2016', 'updatedAt':'25/04/2016'},
                        {'loginType': 'Login Tipo B - Nivel', 'number':'2', 'operator':'MAYOR QUE', 'min':1001, 'max':0, 'currency':'DOLAR', 'createdAt':'25/04/2016', 'updatedAt':'25/04/2016'}
					],
                    height: 200,
                    scrollable: true,
                    selectable: true,
                    sortable: true,
                    resizable: true,
                    columns: [
                        {
                            field: "loginType",
                            title: "Tipo login",
                            attributes: {
                                class: "cb-no-wrap"
                            }
                        },
						{
                            field: "number",
                            title: "Número"
                        },
						{
                            field: "createdAt",
                            title: "Creado"
                        },
						{
                            field: "updatedAt",
                            title: "Modificado"
                        },
                        {
                            attributes: {
                                class: "cb-no-wrap"
                            },
                            template: '<button class="btn btn-default btn-sm" title="Editar" data-toggle="modal" data-target="\\#jerarquia-form"><span class="fa fa-pencil fa-fw"></span></button> <button class="btn btn-default btn-sm" title="Eliminar"><span class="fa fa-times fa-fw"></span></button>'
                        }
                    ],
                    toolbar: '<button class="btn btn-default" data-toggle="modal" data-target="\\#jerarquia-form"><span class="fa fa-plus"></span> Agregar</button>'
                };
                $scope.autorizaciones = {
                    dataSource: [
						{'description': 'OPERADORES', 'code':'1', 'createdAt':'25/04/2016', 'updatedAt':'25/04/2016'},
                        {'description': 'AUTORIZADOR', 'code':'2', 'createdAt':'25/04/2016', 'updatedAt':'25/04/2016'},
                        {'description': 'PRUEBA', 'code':'3', 'createdAt':'25/04/2016', 'updatedAt':'25/04/2016'}
					],
                    height: 200,
                    scrollable: true,
                    selectable: true,
                    sortable: true,
                    resizable: true,
                    columns: [
						{
                            field: "code",
                            title: "Codigo"
                        },
                        {
                            field: "description",
                            title: "Descripcion"
                        },
						{
                            field: "createdAt",
                            title: "Creado"
                        },
						{
                            field: "updatedAt",
                            title: "Modificado"
                        },
                        {
                            attributes: {
                                class: "cb-no-wrap"
                            },
                            template: '<button class="btn btn-default btn-sm" title="Editar" data-toggle="modal" data-target="\\#jerarquia-form"><span class="fa fa-pencil fa-fw"></span></button> <button class="btn btn-default btn-sm" title="Eliminar"><span class="fa fa-times fa-fw"></span></button>'
                        }
                    ],
                    toolbar: '<button class="btn btn-default" data-toggle="modal" data-target="\\#jerarquia-form"><span class="fa fa-plus"></span> Agregar</button>'
                };
                $scope.saveCondition = function() {
                    $scope.mode = null;
                };
                $scope.activate();
            }
        ]);

    //Inicializa angular
    angular.bootstrap(document, ['app']);
});