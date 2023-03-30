require.config(requireConfig);
window.name = "NG_DEFER_BOOTSTRAP!";

require(['jquery', 'angular', 'kendo', 'cobis/messages', 'bootstrap', 'kendo.cultures/kendo.culture.es.min', 'kendo.lang/kendo.es-EC'], function ($, angular, kendo, messages) {
    'use strict';

    var app = angular.module('app', ['kendo.directives'])
        .controller('inboxController', function ($scope, $http, $log) {
            $scope.activate = function() {
              $http({
                  url: '../mocks/tasks.json'
              })
                  .then(function (response) {
                      $scope.tasks = response.data;

                      //Oculta pantalla de precarga
                      $scope.initialized = true;
                  });
            }
            $scope.assignedToString = function (task) {
                var taskString = task.taskState.description;
                if (task.taskState.code == 2 && task.userAssigned.login == task.user.login) {
                    taskString = 'Asignado a ti';
                } else if (task.taskState.code == 2) {
                    taskString = 'Asignado a ' + task.userAssigned.name;
                }
                return taskString;
            }
            $scope.changeTaskPane = function (id, task, e) {
                e.preventDefault();
                task.currentPane = {
                    id: id,
                    label: $(e.target).text()
                };
            };
            $scope.executeTaskAction = function (action, task, e) {
                //TODO: Implement
                e.preventDefault()
                $scope.message.open().center();
            }
            $scope.filteredTasks = function () {
                return $scope.tasks.filter(function (task) {
                    var condition;
                    switch ($scope.summary.currentItem) {
                    case 1: //Todos
                        condition = true;
                        break;
                    case 2: //Asignados a ti
                        condition = task.user.login == task.userAssigned.login && task.taskState.code == 2;
                        break;
                    case 3: //Sin asignar
                        condition = task.taskState.code == 1;
                        break;
                    }
                    return condition;
                });
            }
            $scope.filterTasks = function (code) {
                $scope.summary.currentItem = code;
            };
            $scope.goto = function (task, e) {
                e.preventDefault();
                messages.alert('TODO: Abrir pantalla de ' + task.title);
            };
            $scope.historyOptions = {
                dataSource: {
                    data: [
                        {
                            id: 1,
                            assignDate: '2014/02/12 13:25:00',
                            response: 'OK',
                            executeDate: '2014/02/15 13:25:00',
                            task: 'Ingreso de datos',
                            user: "ypacheco"
                        }, {
                            id: 1,
                            assignDate: '2014/02/12 13:25:00',
                            response: 'OK',
                            executeDate: '2014/02/14 13:25:00',
                            task: 'Generación de tabla de amortización',
                            user: "ypacheco"
                        }, {
                            id: 1,
                            assignDate: '2014/02/12 13:25:00',
                            response: 'OK',
                            executeDate: '2014/02/14 13:25:00',
                            task: 'Generación de tabla de amortización',
                            user: "ypacheco"
                        }
                ],
                    schema: {
                        model: {
                            id: "id"
                        }
                    }
                },
                columns: [{
                    title: "Fecha de asignación",
                    field: "assignDate"
                }, {
                    title: "Respuesta",
                    field: "response"
                }, {
                    title: "Fecha de ejecución",
                    field: "executeDate"
                }, {
                    title: "Tarea",
                    field: "task"
                }, {
                    title: "Usuario",
                    field: "user"
                }]
            };
            $scope.requirements = [
                'Avaluo',
                'Personería jurídica',
                'VB de cobros',
                'CCSS del día',
                'Seguros vigentes',
                'Cumplimiento de condiciones especiales',
                'Verificación del margen estimado permitido',
                'Carátula de crédito aprobada',
                'Solicitud del cliente'

            ];
            $scope.selectedTasks = function(){
                return $scope.tasks.filter(function (task) {
                    return task.selected;
                });
            };
            $scope.summary = {
                currentItem: 1,
                items: [
                    {
                        code: 1,
                        label: 'Supervisados por mi',
                        count: 22
                    }, {
                        code: 2,
                        label: 'Asignados a mi',
                        count: 3
                    }, {
                        code: 3,
                        label: 'Atrasados',
                        count: 7
                    }, {
                        code: 4,
                        label: 'Por vencer',
                        count: 19
                    }, {
                        code: 5,
                        label: 'A tiempo',
                        count: 2
                    }
                ]
            };
            $scope.tasks = [];
            $scope.toggleTaskDetails = function (task, e) {
                task.currentPane = task.currentPane || {
                    id: 'detail',
                    label: 'Detalle'
                };
                if ($.inArray(e.target.tagName, ['A', 'BUTTON', 'INPUT', 'LABEL']) == -1) {
                    task.expanded = !task.expanded;
                    if (!task.expanded) {
                        $('#task-' + task.code + ' .panel-footer').slideUp('fast');
                    } else {
                        $('#task-' + task.code + ' .panel-footer').slideDown('fast');
                    }
                }
            };
            $scope.users = [
                'avelasco',
                'calmeida',
                'sgavilanes',
                'ypachec'
            ];
            $scope.activate();
        });

    //Inicializa
    angular.element().ready(function () {
        angular.resumeBootstrap([app['name']]);
        kendo.culture('es');
    });
});
