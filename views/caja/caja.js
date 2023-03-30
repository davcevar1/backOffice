require.config(requireConfig);
define(function(require) {
  'use strict';

  // Importaci&oacute;n de m&oacute;dulos AMD
  var angular = require('angular'),
    kendo = require('kendo'),
    messages = require('cobis/messages');

  require('bootstrap');
  //require('cobis/ValidateLayout');

  var app = angular.module('app', ['kendo.directives'])
    .controller('controller', ['$scope', '$http', '$q', '$timeout',
      function($scope, $http, $q, $timeout) {
        window.agregarCaja = function() {
          $scope.$apply(function() {
            $scope.view = 'caja';
            $scope.state = 'add';
            $scope.selectedCaja = null;
          });
        };
        window.editarCaja = function(e) {
          $scope.$apply(function() {
            $scope.view = 'caja';
            $scope.state = 'edit';
            $scope.selectedCaja = $scope.gridCajas.dataItem($(e.target).closest("tr")).toJSON();
          });
        };
        $scope.activate = function() {
          messages.loading(false);
          setTimeout(function() {
            $(window).trigger("resize");
            $('[data-toggle="tooltip"]').tooltip();
          }, 100);
          if (typeof pinpad != 'undefined') {
            $(window).on('keypress', function(e) {
              if (e.which == 13) {
                $('#pinpad').modal('show');
              }
            });
          }
        };
        $scope.ambito = 'bank';
        $scope.asignado = 'rol';
        $scope.apertura = function() {
          messages.alert('Transacci&oacute;n OK');
        };
        $scope.cajas = {
          dataSource: {
            transport: {
              read: {
                url: "../../mocks/cajas.json",
                contentType: "application/json; charset=utf-8",
                dataType: "json"
              }
            }
          },
          scrollable: false,
          columns: [{
              field: "code",
              title: "C&oacute;digo",
              template: '<a href="caja/mantenimiento.html">#: code #</a>',
              attributes: {
                "class": "text-center"
              },
              headerAttributes: {
                "style": "text-align:center;"
              }
            },
            {
              field: "category",
              title: "Categor&iacute;a",
              attributes: {
                "class": "text-center"
              },
              headerAttributes: {
                "style": "text-align:center;"
              }
            }, {
              field: "type",
              title: "Tipo",
              attributes: {
                "class": "text-center"
              },
              headerAttributes: {
                "style": "text-align:center;"
              }
            }
          ]
        };
        $scope.cajas2 = {
          dataSource: {
            transport: {
              read: {
                url: "../../mocks/cajas2.json",
                contentType: "application/json; charset=utf-8",
                dataType: "json"
              }
            }
          },
          scrollable: false,
          columns: [{
              field: "code",
              title: "C&oacute;digo",
              template: '<a href="caja/mantenimiento.html">#: code #</a>',
              attributes: {
                "class": "text-center"
              },
              headerAttributes: {
                "style": "text-align:center;"
              }
            },
            {
              field: "id",
              title: "Id",
              attributes: {
                "class": "text-center"
              },
              headerAttributes: {
                "style": "text-align:center;"
              }
            },
            {
              field: "category",
              title: "Categor&iacute;a",
              attributes: {
                "class": "text-center"
              },
              headerAttributes: {
                "style": "text-align:center;"
              }
            }, {
              field: "type",
              title: "Tipo",
              attributes: {
                "class": "text-center"
              },
              headerAttributes: {
                "style": "text-align:center;"
              }
            }
          ]
        };
        $scope.cajasCategory = [{
            id: "P",
            description: "PRINCIPAL"
          },
          {
            id: "S",
            description: "SECUNDARIA"
          }
        ];
        $scope.cajasEstado = {
          dataSource: {
            transport: {
              read: {
                url: "../../mocks/cajas.json",
                contentType: "application/json; charset=utf-8",
                dataType: "json"
              }
            }
          },
          scrollable: false,
          columns: [{
              field: "status",
              title: "&nbsp;",
              template: '#if (status=="ok") {# <span class=\"fa fa-check-circle text-success\"></span>#}else{#<span class=\"fa fa-exclamation-circle text-danger\"></span>#}#',
              width: 30,
              attributes: {
                "class": "text-center"
              },
              headerAttributes: {
                "style": "text-align:center;"
              }
            },
            {
              field: "code",
              title: "C&oacute;digo",
              attributes: {
                "class": "text-center"
              },
              headerAttributes: {
                "style": "text-align:center;"
              }
            },
            {
              field: "user",
              title: "Usuario",
              attributes: {
                "class": "text-center"
              },
              headerAttributes: {
                "style": "text-align:center;"
              }
            },
            {
              field: "category",
              title: "Categor&iacute;a",
              attributes: {
                "class": "text-center"
              },
              headerAttributes: {
                "style": "text-align:center;"
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
            },
            {
              field: "status",
              title: "&nbsp;",
              width: 40,
              attributes: {
                "class": "cb-no-wrap"
              },
              template: '#if (status=="error") {#<button class="btn btn-default btn-sm" title="Cierre Forzoso"><span class="fa fa-ban fa-fw"></span></button>#}#'
            }
          ]
        };
        $scope.cajasEdicion = {
          dataSource: {
            transport: {
              read: {
                url: "../../mocks/cajas.json",
                contentType: "application/json; charset=utf-8",
                dataType: "json"
              }
            }
          },
          scrollable: false,
          columns: [{
              field: "code",
              title: "C&oacute;digo",
              attributes: {
                "class": "text-center"
              },
              headerAttributes: {
                "style": "text-align:center;"
              }
            },
            {
              field: "user",
              title: "Usuario"
            },
            {
              field: "category",
              title: "Categor&iacute;a",
              attributes: {
                "class": "text-center"
              },
              headerAttributes: {
                "style": "text-align:center;"
              }
            },
            {
              width: 40,
              attributes: {
                "class": "cb-no-wrap"
              },
              template: '<button class="btn btn-default btn-sm" title="Editar" onclick="editarCaja(event);"><span class="fa fa-pencil fa-fw"></span></button> <button class="btn btn-default btn-sm" title="Eliminar"><span class="fa fa-times fa-fw"></span></button>'
            }
          ],
          toolbar: '<button class="btn btn-default k-grid-add" onclick="agregarCaja();"><span class="fa fa-plus"></span> Agregar</button>'
        };
        $scope.cajeros = {
          dataSource: {
            transport: {
              read: {
                url: "../../mocks/cajeros.json",
                contentType: "application/json; charset=utf-8",
                dataType: "json"
              }
            },
            schema: {
              model: {
                id: "id",
                fields: {
                  id: {
                    editable: false,
                    nullable: true
                  },
                  name: {
                    editable: false,
                    nullable: true
                  },
                  from: {
                    editable: false,
                    nullable: true
                  },
                  to: {
                    editable: false,
                    nullable: true
                  }
                }
              }
            }
          },
          scrollable: false,
          editable: "inline",
          columns: [{
              field: "id",
              title: "&nbsp;",
              template: '#if (status=="S") {# <span class=\"fa fa-check-circle text-success\"></span>#}#',
              width: 40,
              attributes: {
                "class": "text-center"
              },
              headerAttributes: {
                "style": "text-align:center;"
              }
            },
            {
              field: "user",
              title: "Usuario",
              template: '<span>#:data.user#</span> - #:data.name#',
              editor: function(container, options) {
                $('<input required name="' + options.field + '"/>')
                  .appendTo(container)
                  .kendoComboBox({
                    autoBind: false,
                    dataTextField: "name",
                    dataValueField: "user",
                    template: '<span>#:data.user#</span> - #:data.name#',
                    dataSource: {
                      transport: {
                        read: {
                          url: "../../mocks/usuarios.json",
                          contentType: "application/json; charset=utf-8",
                          dataType: "json"
                        }
                      }
                    }
                  });
              }
            },
            {
              field: "from",
              title: "Desde"
            },
            {
              field: "to",
              title: "Hasta"
            },
            {
              width: 40,
              attributes: {
                "class": "cb-no-wrap"
              },
              template: '<button class="btn btn-default btn-sm k-grid-update" title="Actualizar"><span class="fa fa-check fa-fw"></span></button> <button class="btn btn-default btn-sm k-grid-cancel" title="Desactivar"><span class="fa fa-times fa-fw"></span></button> #if (status=="S") {#<button class="btn btn-default btn-sm cb-command" title="Desactivar"><span class="fa fa-ban fa-fw"></span></button>#}#'
            }
          ],
          toolbar: '<button class="btn btn-default k-grid-add"><span class="fa fa-plus"></span> Asignar</button>'
        };
        $scope.cajaFiltro = {
          dataSource: [{
              "code": 555,
              "id": 1,
              "user": "jzapata",
              "currency": "BOLIVIANOS",
              "category": "PRINCIPAL",
              "type": "NORMAL",
              "status": "ok"
            },
            {
              "code": 100,
              "id": 23,
              "user": "dvillagomez",
              "currency": "BOLIVIANOS",
              "category": "SUCURSAL",
              "type": "NORMAL",
              "status": "error"
            },
            {
              "code": 123,
              "id": 135,
              "user": "pchavez",
              "currency": "BOLIVIANOS",
              "category": "SUCURSAL",
              "type": "NORMAL",
              "status": "ok"
            }
          ],
          dataTextField: 'user',
          dataValueField: 'code',
          filter: "contains",
          template: '<div style="padding:5px;"><div style="line-height:normal;">\\##: code# - #: type#</div><div class="text-muted small" style="line-height:normal;">#: user#</div></div>'
        };
        $scope.cajeros2 = {
          dataSource: {
            transport: {
              read: {
                url: "../../mocks/usuarios.json",
                contentType: "application/json; charset=utf-8",
                dataType: "json"
              }
            }
          },
          scrollable: false,
          columns: [{
            field: "user",
            title: "Login",
            template: '<div class="text-muted small">#: user#</div><div>#:name #</div>'
          }]
        };
        $scope.clientes = {
          dataSource: {
            transport: {
              read: {
                url: "../../mocks/canales-usuarios.json",
                contentType: "application/json; charset=utf-8",
                dataType: "json"
              }
            }
          },
          change: function() {
            $('#cliente').modal('hide');
          },
          selectable: true,
          scrollable: false,
          columns: [{
              field: "id",
              template: $("#customer").length > 0 ? kendo.template($("#customer").html()) : kendo.template('')
            }
          ]
        };
        $scope.condiciones = {
          dataSource: {
            transport: {
              read: {
                url: "../../mocks/firmas-condiciones.json",
                contentType: "application/json; charset=utf-8",
                dataType: "json"
              }
            }
          },
          scrollable: false,
          columns: [
            {
              field: "min",
              title: "Monto mínimo"
            },
            {
              field: "max",
              title: "Monto máximo"
            },
            {
              field: "description",
              title: "Descripción"
            }
          ]
        };
        $scope.convenios = {
          dataSource: {
            transport: {
              read: {
                url: "../../mocks/convenios.json",
                contentType: "application/json; charset=utf-8",
                dataType: "json"
              }
            }
          },
          dataTextField: "name",
          dataValueField: "code",
          filter: "contains",
          suggest: true
        };
        $scope.firmaCondiciones = {
          dataSource: {
            data: [{
              a: "FIRMA INDISTINTA"
            }]
          },
          scrollable: false,
          columns: [{
            field: "a",
            title: "Condicion"
          }]
        };
        $scope.firmaAdicional = {
          dataSource: {
            data: [{
              a: ""
            }]
          },
          scrollable: false,
          columns: [{
            field: "a",
            title: "Detalle"
          }]
        };
        /*
        $scope.convenios = [{
            "code": "5022",
            "name": "ALCALDIA MUNICIPIO DE CALOTO CAUCA",
            "account": "021180001584"
          },
          {
            "code": "2511",
            "name": "ATENCION HUMANITARIA-DESPLAZADOS-CONTRATO 1512",
            "account": "300700006061"
          },
          {
            "code": "11725",
            "name": "CNSC-NIVEL NACIONAL",
            "account": "300700002441"
          },
          {
            "code": "2171",
            "name": "COLPENSIONES",
            "account": "303600005944"
          },
          {
            "code": "12119",
            "name": "COMPANIA NAL DE CHOCOLATES",
            "account": "013030616547"
          },
          {
            "code": "4446",
            "name": "COOLABORAMOS - COOP DE TRABAJO ASOCIADA",
            "account": "318200000053"
          },
          {
            "code": "21212",
            "name": "EMTELSA SERVICIO DE TELEVISION POR CABLE",
            "account": "018030318087"
          },
          {
            "code": "9408",
            "name": "FIDUAGRARIA FID PA COOARROZ COSECHA 2005",
            "account": "424033002542"
          },
          {
            "code": "22381",
            "name": "FIDUAGRARIA PA REMANENTE TELECOM SERV.TULUA",
            "account": "300700001351"
          },
          {
            "code": "9903",
            "name": "FOGACOOP FIDUCIARIA LA PREVISORA",
            "account": "308200001409"
          },
          {
            "code": "5043",
            "name": "FUNDACION ALIMENTAR MEJOR",
            "account": "369400000609"
          },
          {
            "code": "3051",
            "name": "HOSPITAL SAN JUAN DE DIOS DEL RETIRO",
            "account": "013480000366"
          },
          {
            "code": "21200",
            "name": "INST EDUCATIVA JOSE MIGUEL DE RESTREPO PUERTA",
            "account": "013557003066"
          },
          {
            "code": "22359",
            "name": "MUNICIPIO DE TURBO IMPUESTO PREDIAL",
            "account": "313320000182"
          },
          {
            "code": "7049",
            "name": "TESORERIA MUNICIPAL DE CUCUTA",
            "account": "051010056615"
          },
          {
            "code": "1086",
            "name": "VINCULAR LTDA",
            "account": "312070001382"
          }
        ];
        */
        $scope.cuadre = {
          dataSource: {
            transport: {
              read: {
                url: "../../mocks/cuadre.json",
                contentType: "application/json; charset=utf-8",
                dataType: "json"
              }
            },
            schema: {
              model: {
                fields: {
                  codgrupo: {
                    type: "number"
                  },
                  grupo: {
                    type: "string"
                  },
                  numero: {
                    type: "number"
                  },
                  transaccion: {
                    type: "string"
                  },
                  valor: {
                    type: "number"
                  }
                }
              }
            },
            group: {
              field: "grupo",
              aggregates: [{
                field: "valor",
                aggregate: "sum"
              }]
            }
          },
          scrollable: false,
          columns: [{
              field: "grupo",
              title: "Grupo",
              hidden: true,
              groupHeaderTemplate: "#= value #"
            },
            {
              field: "numero",
              title: "N&uacute;mero",
              attributes: {
                "class": "text-right"
              },
              headerAttributes: {
                "style": "text-align:right;"
              }
            },
            {
              field: "transaccion",
              title: "Transacci&oacute;n"
            },
            {
              field: "valor",
              title: "Valor",
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
        $scope.efectivo = {
          dataSource: {
            transport: {
              read: {
                url: "../../mocks/efectivo.json",
                contentType: "application/json; charset=utf-8",
                dataType: "json"
              }

            }
          },
          scrollable: false,
          detailTemplate: kendo.template($("#detail-template").length > 0 ? $("#detail-template").html() : ''),
          columns: [{
            field: "description",
            title: "Moneda"
          }, {
            field: "balance",
            title: "Saldo",
            format: "{0:c}",
            attributes: {
              "class": "text-right"
            },
            headerAttributes: {
              "style": "text-align:right;"
            }
          }],
          toolbar: '<button class="btn btn-default k-grid-add"><span class="fa fa-download"></span> Exportar a Excel</button>'
        };
        $scope.fillName = function(model) {
          if (model.accountNumber == '4-082-03-01413-8') {
            model.accountName = 'RESGUARDO INDIGENA YANACONAS PANCITARA';
          }
          if (model.accountNumber == '4-007-02-16561-8') {
            model.accountName = 'EMPRESA SOCIAL DEL ESTADO HOSPITAL DEPARTAMENTAL S';
          }
        };
        $scope.filters = {
          field: [
            {
              label: "Identificación",
              id: 1
            },
            {
              label: "Código cliente",
              id: 3
            },
            {
              label: "Nombre cliente",
              id: 3
            }
          ]
        };
        $scope.detalleEfectivo = {
          dataSource: {
            transport: {
              read: {
                url: "../../mocks/detalle-efectivo.json",
                contentType: "application/json; charset=utf-8",
                dataType: "json"
              }
            }
          },
          scrollable: false,
          columns: [{
              field: "denomination",
              title: "Denominaci&oacute;n",
              attributes: {
                "class": "text-right"
              },
              headerAttributes: {
                "style": "text-align:right;"
              }
            },
            {
              field: "quantity",
              title: "Cantidad",
              attributes: {
                "class": "text-right"
              },
              headerAttributes: {
                "style": "text-align:right;"
              }
            },
            {
              field: "balance",
              title: "Saldo",
              template: "$#: kendo.toString(denomination*quantity, 'n')#",
              attributes: {
                "class": "text-right"
              },
              headerAttributes: {
                "style": "text-align:right;"
              }
            }
          ]
        };
        $scope.detalleTransacciones = {
          dataSource: {
            transport: {
              read: {
                url: "../../mocks/detalle-transacciones.json",
                contentType: "application/json; charset=utf-8",
                dataType: "json"
              }
            }
          },
          scrollable: false,
          columns: [{
              field: "description",
              title: "Descripci&oacute;n"
            },
            {
              field: "date",
              title: "Fecha",
              attributes: {
                "class": "text-center"
              },
              headerAttributes: {
                "style": "text-align:center;"
              }
            },
            {
              field: "hour",
              title: "Hora",
              attributes: {
                "class": "text-center"
              },
              headerAttributes: {
                "style": "text-align:center;"
              }
            },
            {
              field: "id",
              title: "#"
            },
            {
              field: "idBranch",
              title: "# Branch"
            },
            {
              field: "alt",
              title: "Alt"
            },
            {
              field: "reference",
              title: "Cuenta / Cheque"
            },
            {
              field: "total",
              title: "Monto total",
              format: "{0:c}",
              attributes: {
                "class": "text-right"
              },
              headerAttributes: {
                "style": "text-align:right;"
              }
            },
            {
              field: "cash",
              title: "Efectivo",
              format: "{0:c}",
              attributes: {
                "class": "text-right"
              },
              headerAttributes: {
                "style": "text-align:right;"
              }
            },
            {
              field: "checkOwn",
              title: "Cheques propios",
              format: "{0:c}",
              attributes: {
                "class": "text-right"
              },
              headerAttributes: {
                "style": "text-align:right;"
              }
            },
            {
              field: "checkLocal",
              title: "Cheques locales",
              format: "{0:c}",
              attributes: {
                "class": "text-right"
              },
              headerAttributes: {
                "style": "text-align:right;"
              }
            },
            {
              field: "checkExterior",
              title: "Cheques exterior",
              format: "{0:c}",
              attributes: {
                "class": "text-right"
              },
              headerAttributes: {
                "style": "text-align:right;"
              }
            },
            {
              field: "name",
              title: "Nombre"
            },
            {
              field: "value",
              title: "Valor",
              attributes: {
                "class": "text-right"
              },
              headerAttributes: {
                "style": "text-align:right;"
              }
            }
          ]
        };
        $scope.especifico = new kendo.data.HierarchicalDataSource({
          data: [{
            "code": "1",
            "text": "BANCO AGRARIO DE COLOMBIA",
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
                "code": "22200",
                "text": "REGIONAL BOGOTA CONSOLIDADO",
                "items": [{
                    "code": "70",
                    "text": "AVENIDA JIMENEZ",
                    "items": [{
                        "code": "A",
                        "text": "ATM CAJEROS AUTOMATICOS",
                        "items": []
                      },
                      {
                        "code": "B",
                        "text": "BOVEDA",
                        "items": []
                      },
                      {
                        "code": "D",
                        "text": "DIFERIDO",
                        "items": []
                      },
                      {
                        "code": "E",
                        "text": "DISPENSADOR DE EFECTIVO",
                        "items": []
                      },
                      {
                        "code": "L",
                        "text": "BLINDADO",
                        "items": []
                      },
                      {
                        "code": "M",
                        "text": "MINITESORO",
                        "items": []
                      },
                      {
                        "code": "N",
                        "text": "NORMAL",
                        "items": []
                      },
                      {
                        "code": "V",
                        "text": "CAJAS MOVILES",
                        "items": []
                      },
                      {
                        "code": "X",
                        "text": "CAJAS EXTENDIDAS",
                        "items": []
                      }
                    ]
                  },
                  {
                    "code": "820",
                    "text": "AVENIDA CHILE",
                    "items": []
                  },
                  {
                    "code": "10240",
                    "text": "|CB  CAFE INTERNET BOX",
                    "items": []
                  },
                  {
                    "code": "10496",
                    "text": "CB - DROGUERIA EXPRESS",
                    "items": []
                  },
                  {
                    "code": "10752",
                    "text": "CB - ENVIOS DIMONEX",
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
        $scope.general = new kendo.data.HierarchicalDataSource({
          data: [{
              text: "Banco"
            },
            {
              text: "Regional"
            },
            {
              text: "Sucursal"
            },
            {
              text: "Agencia"
            },
            {
              text: "Tipo caja"
            },
            {
              text: "Cajero"
            }
          ]
        });
        $scope.openPinpad = function() {
          $('#pinpad').modal('show');
        };
        $scope.header = {
          primaryText: '71 - N/C AHORROS SIN LIBRETA',
          collapsable: false,
          hideSearch: true,
          hideMoreInfo: true,
          fields: [
            {
              label: 'Caja',
              value: '600',
              opened: true
            },
            {
              label: 'ID',
              value: '15',
              opened: true
            },
            {
              label: 'MONEDA',
              value: 'DOLAR',
              opened: true
            },
            {
              label: 'FILIAL',
              value: 'COOP POLICIA NACIONAL LTDA.',
              opened: true
            }
          ]
        };
        $scope.limites = {
          dataSource: {
            transport: {
              read: {
                url: "../../mocks/efectivo.json",
                contentType: "application/json; charset=utf-8",
                dataType: "json"
              }
            },
            schema: {
              model: {
                id: "id",
                fields: {
                  status: {
                    editable: false
                  }
                }
              }
            }
          },
          scrollable: false,
          editable: true,
          columns: [{
              field: "description",
              title: "Descripci&oacute;n"
            },
            {
              field: "max",
              title: "M&aacute;ximo",
              attributes: {
                "class": "text-right"
              },
              headerAttributes: {
                "style": "text-align:right;"
              }
            }, {
              field: "min",
              title: "M&iacute;nimo",
              attributes: {
                "class": "text-right"
              },
              headerAttributes: {
                "style": "text-align:right;"
              }
            },
            {
              field: "type",
              title: "Tipo"
            },
            {
              field: "notes",
              title: "Observaciones"
            },
            {
              field: "status",
              title: "Estado"
            },
            {
              width: 40,
              attributes: {
                "class": "cb-no-wrap"
              },
              template: '<button class="btn btn-default btn-sm k-grid-update" title="Actualizar"><span class="fa fa-check fa-fw"></span></button> <button class="btn btn-default btn-sm k-grid-cancel" title="Desactivar"><span class="fa fa-times fa-fw"></span></button> <button class="btn btn-default btn-sm cb-command" title="Inhabilitar"><span class="fa fa-ban fa-fw"></span></button>'
            }
          ],
          toolbar: '<button class="btn btn-default k-grid-add"><span class="fa fa-plus  k-grid-add"></span> Agregar</button>'
        };
        $scope.transferencias = {
          dataSource: {
            transport: {
              read: {
                url: "../../mocks/transferencias.json",
                contentType: "application/json; charset=utf-8",
                dataType: "json"
              }
            }
          },
          scrollable: false,
          columns: [{
              field: "id",
              title: "#"
            },
            {
              field: "currency",
              title: "Moneda"
            },
            {
              field: "value",
              title: "Monto",
              format: "{0:c}",
              attributes: {
                "class": "text-right"
              },
              headerAttributes: {
                "style": "text-align:right;"
              }
            },
            {
              field: "cashDeskOrigin",
              title: "Caja origen"
            },
            {
              field: "cashDeskDestination",
              title: "Caja destino"
            },
            {
              field: "officeOrigin",
              title: "Oficina origen"
            },
            {
              field: "officeDestination",
              title: "Oficina destino"
            },
            {
              field: "cashierOrigin",
              title: "Cajero origen"
            },
            {
              field: "cashierDestination",
              title: "Cajero destino"
            },
            {
              field: "reason",
              title: "Causa"
            }
          ]
        };
        $scope.transacciones = {
          dataSource: {
            transport: {
              read: {
                url: "../../mocks/transaccionesMonetarias.json",
                contentType: "application/json; charset=utf-8",
                dataType: "json"
              }
            }
          },
          scrollable: false,
          columns: [{
              field: "description",
              title: "Transacci&oacute;n"
            },
            {
              field: "cash",
              title: "Afecta efectivo"
            },
            {
              field: "sign",
              title: "Sign"
            },
            {
              field: "catalog",
              title: "Catalogo"
            },
            {
              field: "cause",
              title: "Detalle"
            },
            {
              width: 40,
              attributes: {
                "class": "cb-no-wrap"
              },
              template: '<button class="btn btn-default btn-sm" title="Editar" data-toggle="modal" data-target="\\#transaccion"><span class="fa fa-pencil fa-fw"></span></button> <button class="btn btn-default btn-sm" title="Eliminar"><span class="fa fa-times fa-fw"></span></button>'
            }
          ],
          toolbar: '<button class="btn btn-default k-grid-add" data-toggle="modal" data-target="\\#transaccion"><span class="fa fa-plus"></span> Agregar</button>'
        };
        $scope.transaccionesMonetarias = {
          dataSource: {
            transport: {
              read: {
                url: "../../mocks/transaccionesMonetarias.json",
                contentType: "application/json; charset=utf-8",
                dataType: "json"
              }
            }
          },
          scrollable: false,
          columns: [{
              field: "date",
              title: "Fecha"
            },
            {
              field: "transaction",
              title: "# Transacci&oacute;n"
            },
            {
              field: "description",
              title: "Descripci&oacute;n"
            },
            {
              field: "cause",
              title: "Causa"
            },
            {
              field: "account",
              title: "Cuenta"
            }
          ]
        };
        $scope.reversos = {
          dataSource: {
            transport: {
              read: {
                url: "../../mocks/reversos.json",
                contentType: "application/json; charset=utf-8",
                dataType: "json"
              }
            }
          },
          scrollable: false,
          detailTemplate: kendo.template($("#detail-template").length > 0 ? $("#detail-template").html() : ''),
          columns: [{
              field: "name",
              title: "Nombre"
            },
            {
              field: "hour",
              title: "Hora",
              attributes: {
                "class": "text-center"
              },
              headerAttributes: {
                "style": "text-align:center;"
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
            },
            {
              field: "reverse",
              title: "Reverso",
              attributes: {
                "class": "text-center"
              },
              headerAttributes: {
                "style": "text-align:center;"
              }
            },
            {
              field: "return",
              title: "Retorno",
              attributes: {
                "class": "text-center"
              },
              headerAttributes: {
                "style": "text-align:center;"
              }
            },
            {
              field: "id",
              title: "&nbsp;",
              template: '#if (active) {#<span class=\"fa fa-check-circle text-success\"></span>#}else{#<span class=\"fa fa-minus-circle text-danger\" data-toggle="tooltip" data-placement="left" title="Este es el mensaje de error"></span>#}#',
              width: 30,
              attributes: {
                "class": "text-center"
              },
              headerAttributes: {
                "style": "text-align:center;"
              }
            },
            {
              width: 30,
              template: '#if (active) {#<button class="btn btn-default btn-sm" data-toggle="modal" data-target="\\#reverso-form" title="Reversar"><span class="fa fa-reply fa-fw"></span></button>#}#'
            }
          ]
        };
        $scope.reversosParametros = {
          dataSource: {
            transport: {
              read: {
                url: "../../mocks/reversosParametros.json",
                contentType: "application/json; charset=utf-8",
                dataType: "json"
              }
            }
          },
          scrollable: true,
          height: 200,
          columns: [{
              field: "name",
              title: "Nombre"
            },
            {
              field: "value",
              title: "Valor"
            }
          ]
        };
        $scope.rubros = {
          dataSource: {
            transport: {
              read: {
                url: "../../mocks/caja-rubros.json",
                contentType: "application/json; charset=utf-8",
                dataType: "json"
              }
            },
            schema: {
              model: {
                fields: {
                  value: {
                    type: "number"
                  }
                }
              }
            },
            group: {
              field: "service"
            },
            aggregates: [{
                field: "value",
                aggregate: "sum"
              }
            ]
          },
          change: function() {

          },
          selectable: true,
          scrollable: false,
          columns: [{
            width: 28,
            template: "<input type='checkbox' class='checkbox' style='margin:auto;' ng-click='selectRow($event)' />",
            headerTemplate: "<input type='checkbox' class='checkbox' style='margin:auto;' ng-click='selectAll($event)' />"
          },
          {
              field: "service",
              hidden: true,
              groupHeaderTemplate: "#= value #"
            },
            {
              field: "code",
              title: "Código"
            },
            {
              field: "description",
              title: "Descripción"
            },
            {
              field: "value",
              title: "Valor",
              headerAttributes: {
                style: 'text-align: right'
              },
              attributes: {
                class: 'text-right'
              },
              format: '{0:c}',
              aggregates: ['sum'],
            }
          ]
        };
        $scope.selectedField = $scope.filters.field[0];
        $scope.setField = function(field) {
          $scope.selectedField = field;
        }
        $scope.signatures = [
          {name:"Richard Nixon", url:"../../images/signature1.svg"},
          {name:"Riaz Ahamed", url:"../../images/signature2.png"},
          {name:"Ston Nuilan", url:"../../images/sign.jpg"}
        ]
        $scope.sucursales = {
          dataSource: {
            transport: {
              read: {
                url: "../../mocks/sucursales.json",
                contentType: "application/json; charset=utf-8",
                dataType: "json"
              }
            }
          },
          scrollable: false,
          columns: [{
            field: "name",
            title: "Sucursales"
          }],
        };
        $scope.supervisoresData = {
          dataSource: {
            transport: {
              read: {
                url: "../../mocks/supervisores.json",
                contentType: "application/json; charset=utf-8",
                dataType: "json"
              }
            }
          },
          scrollable: false,
          columns: [{
            field: "name",
            title: "Supervisores"
          }],
        };
        $scope.getCheckAccount = function() {
          $scope.checkAccount = $scope.checkAccount || {};
          $scope.checkAccount.number = '3-480-10006-85-9';
          $scope.checkAccount.auxiliar = '3-480-10006-85-9';
          $scope.checkAccount.name = 'RIVERA MONTENEGRO RICARDO RANULFO';
        };
        $scope.toggleCurrentSignature = function(signature) {
          $scope.currentSignature = $scope.currentSignature==signature? null : signature;
        }
        $scope.selectAll = function(event) {
          var checked = event.target.checked,
              grid = this.gridRubros;

          $scope.checkedIds[dataItem.id] = checked;
          this.gridRubros.dataItems().forEach(function(item) {
            if (checked) {
                // Select the row
                row.addClass("k-state-selected");
                } else {
                // Remove selection
                row.removeClass("k-state-selected");
            }
          });
        }
        $scope.checkedIds = {};
        $scope.selectRow = function(event) {
          var checked = event.target.checked,
              row = $(event.target).closest("tr"),
              grid = this.gridRubros,
              dataItem = grid.dataItem(row);

          $scope.checkedIds[dataItem.id] = checked;
          if (checked) {
              // Select the row
              row.addClass("k-state-selected");
              } else {
              // Remove selection
              row.removeClass("k-state-selected");
          }
        }
        $scope.submitSaveDeposit = function() {
          messages.alert('Transacci&oacute;n #2452434 procesada exitosamente');
          $scope.resetSaveDeposit();
        }
        $scope.submitCheckAccount = function() {
          messages.alert('Transacci&oacute;n #2452435 procesada exitosamente');
          $scope.resetCheckAccount();
        };
        $scope.submitCaja = function() {
          messages.alert('Transacci&oacute;n OK');
          $scope.selectedCaja = {};
          $scope.view = 'cajas';
        };
        $scope.submitInicio = function() {
          messages.alert('Transacci&oacute;n OK');
          $scope.selectedCaja = {};
          $scope.view = 'cajas';
        };
        $scope.supervisores = new kendo.data.HierarchicalDataSource({
          data: [{
            "code": "1",
            "text": "Arbol de Supervisores",
            "items": [{
                "code": "22100",
                "text": "1 - ADMUSER - Nivel 8 - 8",
                "items": [{
                  "code": "1300",
                  "text": "ALEXANDRA ABADIANO - Nivel 7 - 7",
                  "items": []
                }]
              },
              {
                "code": "1301",
                "text": "IVAN ESPINOZA - Nivel 8 - 8",
                "items": []
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
        $scope.rangosAprobacion = {
          dataSource: {
            transport: {
              read: {
                url: "../../mocks/ranges.json",
                contentType: "application/json; charset=utf-8",
                dataType: "json"
              }
            }
          },
          scrollable: false,
          columns: [{
              field: "idLevel",
              title: "Código Nivel"
            },
            {
              field: "level",
              title: "Nivel"
            },
            {
              field: "currency",
              title: "Moneda"
            },
            {
              field: "transactionNumber",
              title: "# Transacción"
            },
            {
              field: "transactionDescription",
              title: "Descripción"
            },
            {
              field: "min",
              title: "Mínimo"
            },
            {
              field: "max",
              title: "Máximo"
            },
            {
              field: "radAccount",
              title: "Radicación Cuenta"
            },
            {
              field: "online",
              title: "En línea"
            },
            {
              field: "secuential",
              title: "Secuencial"
            },
            {
              width: 40,
              attributes: {
                "class": "cb-no-wrap"
              },
              template: '<button class="btn btn-default btn-sm" title="Actualizar" data-toggle="modal" data-target="\\#ingreso"><span class="fa fa-check fa-fw"></span></button> <button class="btn btn-default btn-sm k-grid-cancel" title="Desactivar"><span class="fa fa-times fa-fw"></span></button>'
            }
          ],
          toolbar: '<button class="btn btn-default k-grid-add" data-toggle="modal" data-target="\\#ingreso"><span class="fa fa-plus"></span> Agregar</button>'
        };
        $scope.validacionMontos = {
          dataSource: {
            transport: {
              read: {
                url: "../../mocks/validacion-montos.json",
                contentType: "application/json; charset=utf-8",
                dataType: "json"
              }
            }
          },
          scrollable: false,
          columns: [{
              field: "transactionNumber",
              title: "Código"
            },
            {
              field: "transactionDescription",
              title: "Descripción"
            },
            {
              field: "type",
              title: "Tipo"
            },
            {
              field: "transactionNumber",
              title: "# Transacción"
            },
            {
              field: "min",
              title: "Mínimo"
            },
            {
              width: 40,
              attributes: {
                "class": "cb-no-wrap"
              },
              template: '<button class="btn btn-default btn-sm" title="Actualizar" data-toggle="modal" data-target="\\#ingreso"><span class="fa fa-check fa-fw"></span></button> <button class="btn btn-default btn-sm k-grid-cancel" title="Desactivar"><span class="fa fa-times fa-fw"></span></button>'
            }
          ],
          toolbar: '<button class="btn btn-default k-grid-add" data-toggle="modal" data-target="\\#ingreso"><span class="fa fa-plus"></span> Agregar</button>'
        };
        $scope.reversoClick = function() {
          messages.alert('Transacci&oacute;n #2452435 reversada');
        };
        $scope.resetSaveDeposit = function() {
          $scope.saveDeposit = {};
        }
        $scope.resetCheckAccount = function() {
          $scope.checkAccount = {};
        };
        $scope.tiposCaja = {
          dataSource: {
            transport: {
              read: {
                url: "../../mocks/tipos-caja.json",
                contentType: "application/json; charset=utf-8",
                dataType: "json"
              }
            }
          },
          scrollable: false,
          columns: [{
              field: "name",
              title: "Caja"
            },
            {
              width: 40,
              attributes: {
                "class": "cb-no-wrap"
              },
              template: '<button class="btn btn-default btn-sm k-grid-cancel" title="Eliminar"><span class="fa fa-times fa-fw"></span></button>'
            }
          ],
          toolbar: '<button class="btn btn-default k-grid-add" data-toggle="modal" data-target="\\#caja"><span class="fa fa-plus"></span> Agregar</button> <button class="btn btn-default k-grid-add" data-toggle="modal" data-target="\\#historial"><span class="fa fa-history"></span> Historial</button>'
        };
        $scope.tiposCajaVista = {
          dataSource: {
            transport: {
              read: {
                url: "../../mocks/tipos-caja.json",
                contentType: "application/json; charset=utf-8",
                dataType: "json"
              }
            }
          },
          scrollable: false,
          selectable: true,
          columns: [{
            field: "name",
            title: "Caja"
          }]
        };
        $scope.tiposCajaHistoria = {
          dataSource: {
            transport: {
              read: {
                url: "../../mocks/tipos-caja.json",
                contentType: "application/json; charset=utf-8",
                dataType: "json"
              }
            }
          },
          scrollable: false,
          columns: [{
              field: "name",
              title: "Caja"
            },
            {
              field: "role",
              title: "Rol"
            },
            {
              field: "created",
              title: "Creado"
            },
            {
              field: "user",
              title: "Usuario"
            }
          ]
        };
        $scope.showLicitud = function() {
          $('#licitud').modal('show');
        };
        $scope.showFirmas = function() {
          $('#firmas').modal('show');
        };
        if (typeof savingAccount != 'undefined') {
          $scope.saveDeposit = $scope.saveDeposit || {};
          $scope.saveDeposit.totalDeposit = $scope.saveDeposit.totalDeposit || 0;
          $scope.$watchGroup(['saveDeposit.cash', 'saveDeposit.checkOwn', 'saveDeposit.checkOther', 'saveDeposit.transfer'], function(newValues, oldValues) {
            var total = (newValues[0] || 0) + (newValues[1] || 0) + (newValues[2] || 0) + (newValues[3] || 0);
            $scope.saveDeposit.totalDeposit = kendo.toString(total, 'c');
            $scope.saveDeposit.totalDepositConverted = kendo.toString(total * 6.88, 'c');
          });
        }
        $scope.activate();
      }
    ]);

  //Inicializa angular
  angular.bootstrap(document, ['app']);
});
