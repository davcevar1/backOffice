require.config(requireConfig);
define(function(require) {
  'use strict';

  // Importación de módulos AMD
  var angular = require('angular'),
    kendo = require('kendo'),
    messages = require('cobis/messages'),
    checkedNodeIds = function(nodes, checkedNodes) {
      for (var i = 0; i < nodes.length; i++) {
        if (nodes[i].checked) {
          checkedNodes.push(nodes[i].id);
        }
        if (nodes[i].hasChildren) {
          checkedNodeIds(nodes[i].children.view(), checkedNodes);
        }
      }
    };

  // Importación no son módulos
  require('bootstrap');

  var app = angular.module('app', ['kendo.directives'])
    .controller('controller', ['$scope', '$http', '$q', '$filter', '$timeout', function($scope, $http, $q, $filter, $timeout) {
      $scope.activate = function() {
        $timeout(function() {
          if ($scope.diccionariosGrid) {
            $scope.diccionariosGrid.table.kendoDraggable({
              filter: "tbody > tr",
              group: "gridGroup",
              threshold: 100,
              hint: function(e) {
                console.log($scope.diccionariosGrid.dataItem($(e)));
                return $('<div class="k-grid k-widget cb-draggable" style="box-shadow: 0 0 10px 0 rgba(0,0,0,.3); box-sizing:border-box; padding: .5em .6em; width:' + $scope.diccionariosGrid.element.width() + 'px;">' + $scope.diccionariosGrid.dataItem($(e)).name + '</div>');
              }
            });
            $scope.diccionariosGrid.table.kendoDropTarget({
              group: "gridGroup",
              drop: function(e) {
                e.draggable.hint.hide();
                var target = $scope.diccionariosGrid.dataSource.getByUid($(e.draggable.currentTarget).data("uid")),
                  dest = $(document.elementFromPoint(e.clientX, e.clientY));

                if (dest.closest('tr').length > 0 && dest.closest('tr').data("uid")) {
                  dest = $scope.diccionariosGrid.dataSource.getByUid(dest.closest('tr').data("uid"));

                  //not on same item
                  if (target.get("id") !== dest.get("id")) {
                    //reorder the items
                    var tmp = target.get("position");
                    target.set("position", dest.get("position"));
                    dest.set("position", tmp);

                    $scope.diccionariosGrid.dataSource.sort({
                      field: "position",
                      dir: "asc"
                    });
                  }
                }
              }
            });
          }
        }, 300);
      };
      $scope.productos = new kendo.data.HierarchicalDataSource({
        data: [{
          "code": "1",
          "text": "Productos",
          "items": [{
            "code": "22100",
            "text": "ACTIVAS",
            "items": [{
              "code": "1300",
              "text": "CARTERA",
              "items": [{
                "code": "1400",
                "text": "Préstamo Vehicular",
                "items": []
              }]
            }]
          }]
        }],
        schema: {
          model: {
            children: 'items',
            hasChildren: function(item) {
              return item.items.length > 0;
            }
          }
        }
      });
      $scope.plantillas = {
        dataSource: {
          transport: {
            read: "../../mocks/apf-plantillas.json"
          }
        },
        detailInit: function(e) {
          $("#form-template").appendTo(e.detailCell);
        },
        scrollable: false,
        columns: [{
            field: "template",
            title: "Plantilla"
          },
          {
            field: "nemonico",
            title: "Nemónico"
          },
          {
            field: "currency",
            title: "Moneda",
            attributes: {
              style: "overflow:visible;"
            },
            template: '#: currency# ' + $('#detail-dropdown').length > 0 ? $('#detail-dropdown')[0].outerHTML : ''
          },
          {
            field: "description",
            title: "Descripción"
          }
        ]
      };
      $scope.diccionarios = {
        dataSource: {
          transport: {
            read: "../../mocks/apf-diccionarios.json"
          }
        },
        scrollable: false,
        columns: [{
            field: "name",
            title: ""
          },
          {
            field: "productGroup",
            title: "Grupo de Producto",
            headerAttributes: {
              style: "text-align:center;"
            },
            attributes: {
              class: "text-center"
            },
            template: '<input type="checkbox" #= productGroup ? "checked=checked" : "" # />'
          },
          {
            field: "level4",
            title: "Cuarto Nivel",
            headerAttributes: {
              style: "text-align:center;"
            },
            attributes: {
              class: "text-center"
            },
            template: '<input type="checkbox" #= level4 ? "checked=checked" : "" # />'
          },
          {
            field: "product",
            title: "Producto Final",
            headerAttributes: {
              style: "text-align:center;"
            },
            attributes: {
              class: "text-center"
            },
            template: '<input type="checkbox" #= product ? "checked=checked" : "" # />'
          }
        ]
      };
      $scope.oficinasDataSource = new kendo.data.HierarchicalDataSource({
        data: [{
          "code": "1",
          "text": "Todas las Oficinas",
          "items": [{
              "code": "22100",
              "text": "REGIONAL ANTIOQUIA CONSOLIDADO",
              "items": [{
                  "code": "1300",
                  "text": "REGIONAL ANTIOQUIA PROPIO",
                  "items": []
                },
                {
                  "code": "1301",
                  "text": "ANDES",
                  "items": []
                },
                {
                  "code": "1302",
                  "text": "ABEJORRAL",
                  "items": []
                },
                {
                  "code": "1303",
                  "text": "MEDELLIN JUNIN",
                  "items": []
                },
                {
                  "code": "1307",
                  "text": "MEDELLIN AMERICA",
                  "items": []
                }
              ]
            },
            {
              "code": "22300",
              "text": "REGIONAL CAFETERA CONSOLIDADO",
              "items": [{
                  "code": "1800",
                  "text": "REGIONAL CAFETERA PROPIO",
                  "items": []
                },
                {
                  "code": "1801",
                  "text": "AGUADAS",
                  "items": []
                },
                {
                  "code": "1803",
                  "text": "MANIZALES SUCURSAL",
                  "items": []
                },
                {
                  "code": "1812",
                  "text": "NEIRA-CALDAS",
                  "items": []
                },
                {
                  "code": "1820",
                  "text": "BELALCAZAR",
                  "items": []
                }
              ]
            },
            {
              "code": "22400",
              "text": "REGIONAL COSTA CONSOLIDADO",
              "items": [{
                  "code": "1203",
                  "text": "ACHI",
                  "items": []
                },
                {
                  "code": "1207",
                  "text": "CARTAGENA SUCURSAL",
                  "items": []
                },
                {
                  "code": "1215",
                  "text": "ARJONA",
                  "items": []
                },
                {
                  "code": "1216",
                  "text": "CALAMAR",
                  "items": []
                },
                {
                  "code": "1218",
                  "text": "MARIA LA BAJA",
                  "items": []
                }
              ]
            },
            {
              "code": "22500",
              "text": "REGIONAL SANTANDER CONSOLIDADO",
              "items": [{
                  "code": "1244",
                  "text": "MORALES (BOLIVAR)",
                  "items": []
                },
                {
                  "code": "1255",
                  "text": "SAN PABLO (BOLIVAR)",
                  "items": []
                },
                {
                  "code": "1265",
                  "text": "SIMITI",
                  "items": []
                },
                {
                  "code": "1270",
                  "text": "SANTA ROSA DEL SUR",
                  "items": []
                },
                {
                  "code": "1394",
                  "text": "YONDO",
                  "items": []
                }
              ]
            }
          ]
        }],
        schema: {
          model: {
            children: 'items',
            hasChildren: function(item) {
              return item.items.length > 0;
            }
          }
        }
      });
      $scope.oficinas = {
        dataSource: $scope.oficinasDataSource,
        checkboxes: {
          checkChildren: true
        },
        check: function() {
          var checkedNodes = [],
            treeView = $("#treeview").data("kendoTreeView"),
            message;

          checkedNodeIds(treeView.dataSource.view(), checkedNodes);
          if (checkedNodes.length > 0) {
            message = "IDs of checked nodes: " + checkedNodes.join(",");
          } else {
            message = "No nodes checked.";
          }
          $("#result").html(message);
        }
      };
      $scope.showRename = function() {
        $('#rename').modal('show');
      };
      $scope.activate();
    }]);

  //Inicializa angular
  angular.bootstrap(document, ['app']);
});
