require.config(requireConfig);
define(function(require) {
  'use strict';

  // Importación de módulos AMD
  var angular = require('angular'),
    kendo = require('kendo'),
    messages = require('cobis/messages');

  // Importación no son módulos
  require('bootstrap');

  var app = angular.module('app', ['kendo.directives'])
    .controller('controller', ['$scope', '$http', '$q', '$timeout',
      function($scope, $http, $q, $timeout) {
        $scope.activate = function() {};
        $scope.leads = {
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
            location.href = 'prospecto-cliente.html';
          },
          selectable: true,
          scrollable: false,
          columns: [{
            field: "id",
            template: $("#customer").length > 0 ? kendo.template($("#customer").html()) : kendo.template('')
          }]
        };
        $scope.addresses = {
          dataSource: {
            transport: {
              read: {
                url: "../../mocks/prestamos-direcciones.json",
                contentType: "application/json; charset=utf-8",
                dataType: "json"
              }
            }
          },
          scrollable: false,
          columns: [
            {
              field: "type",
              title: "Tipo"
            },
            {
              field: "address",
              title: "Dirección"
            },
            {
              width: 20,
              headerAttributes: {
                "class": "cb-actions"
              },
              attributes: {
                "class": "cb-actions cb-no-wrap"
              },
              template: '<button class="btn btn-default btn-sm" title="Editar" data-target="\\#addressForm" data-toggle="modal"><span class="fa fa-pencil fa-fw"></span></button> <button class="btn btn-default btn-sm" title="Eliminar"><span class="fa fa-times fa-fw"></span></button>'
            }
          ],
          toolbar: '<button class="btn btn-default" data-target="\\#addressForm" data-toggle="modal"><span class="fa fa-plus"></span> Agregar</button>'
        };
        $scope.countries = [
          "México",
          "Afganistan",
          "Albania",
          "Alemania",
          "Andorra",
          "Angola",
          "Antartida",
          "Antigua y Barbuda",
          "Arabia Saudi",
          "Argelia",
          "Argentina",
          "Armenia",
          "Australia",
          "Austria",
          "Azerbaiyan",
          "Bahamas",
          "Bahrain",
          "Bangladesh",
          "Barbados",
          "Belgica",
          "Belice",
          "Benin",
          "Bermudas",
          "Bielorrusia",
          "Birmania Myanmar",
          "Bolivia",
          "Bosnia y Herzegovina",
          "Botswana",
          "Brasil",
          "Brunei",
          "Bulgaria",
          "Burkina Faso",
          "Burundi",
          "Butan",
          "Cabo Verde",
          "Camboya",
          "Camerun",
          "Canada",
          "Chad",
          "Chile",
          "China",
          "Chipre",
          "Colombia",
          "Comores",
          "Congo",
          "Corea del Norte",
          "Corea del Sur",
          "Costa de Marfil",
          "Costa Rica",
          "Croacia",
          "Cuba",
          "Dinamarca",
          "Dominica",
          "Ecuador",
          "Egipto",
          "El Salvador",
          "El Vaticano",
          "Emiratos arabes Unidos",
          "Eritrea",
          "Eslovaquia",
          "Eslovenia",
          "España",
          "Estados Unidos",
          "Estonia",
          "Etiopia",
          "Filipinas",
          "Finlandia",
          "Fiji",
          "Francia",
          "Gabon",
          "Gambia",
          "Georgia",
          "Ghana",
          "Gibraltar",
          "Granada",
          "Grecia",
          "Guam",
          "Guatemala",
          "Guinea",
          "Guinea Ecuatorial",
          "Guinea Bissau",
          "Guyana",
          "Haiti",
          "Honduras",
          "Hungria",
          "India",
          "Indian Ocean",
          "Indonesia",
          "Iran",
          "Iraq",
          "Irlanda",
          "Islandia",
          "Israel",
          "Italia",
          "Jamaica",
          "Japon",
          "Jersey",
          "Jordania",
          "Kazajstan",
          "Kenia",
          "Kirguistan",
          "Kiribati",
          "Kuwait",
          "Laos",
          "Lesoto",
          "Letonia",
          "Libano",
          "Liberia",
          "Libia",
          "Liechtenstein",
          "Lituania",
          "Luxemburgo",
          "Macedonia",
          "Madagascar",
          "Malasia",
          "Malawi",
          "Maldivas",
          "Mali",
          "Malta",
          "Marruecos",
          "Mauricio",
          "Mauritania",
          "Mexico",
          "Micronesia",
          "Moldavia",
          "Monaco",
          "Mongolia",
          "Montserrat",
          "Mozambique",
          "Namibia",
          "Nauru",
          "Nepal",
          "Nicaragua",
          "Niger",
          "Nigeria",
          "Noruega",
          "Nueva Zelanda",
          "Oman",
          "Paises Bajos",
          "Pakistan",
          "Palau",
          "Panama",
          "Papua Nueva Guinea",
          "Paraguay",
          "Peru",
          "Polonia",
          "Portugal",
          "Puerto Rico",
          "Qatar",
          "Reino Unido",
          "Republica Centroafricana",
          "Republica Checa",
          "Republica Democratica del Congo",
          "Republica Dominicana",
          "Ruanda",
          "Rumania",
          "Rusia",
          "Sahara Occidental",
          "Samoa",
          "San Cristobal y Nevis",
          "San Marino",
          "San Vicente y las Granadinas",
          "Santa Lucia",
          "Santo Tome y Principe",
          "Senegal",
          "Seychelles",
          "Sierra Leona",
          "Singapur",
          "Siria",
          "Somalia",
          "Southern Ocean",
          "Sri Lanka",
          "Swazilandia",
          "Sudafrica",
          "Sudan",
          "Suecia",
          "Suiza",
          "Surinam",
          "Tailandia",
          "Taiwan",
          "Tanzania",
          "Tayikistan",
          "Togo",
          "Tokelau",
          "Tonga",
          "Trinidad y Tobago",
          "Tunez",
          "Turkmekistan",
          "Turquia",
          "Tuvalu",
          "Ucrania",
          "Uganda",
          "Uruguay",
          "Uzbekistan",
          "Vanuatu",
          "Venezuela",
          "Vietnam",
          "Yemen",
          "Djibouti",
          "Zambia",
          "Zimbabue"
        ].map((item) => {
          return { value: item, label: item };
        });
        $scope.exists = function (items, value) {
          if (items && value) {
            var items = items.split(',');
            return items.indexOf(value)>=0;
          }
          return false;
        }
        $scope.phones = {
          dataSource: {
            transport: {
              read: {
                url: "../../mocks/prestamos-phones.json",
                contentType: "application/json; charset=utf-8",
                dataType: "json"
              }
            }
          },
          scrollable: false,
          columns: [
            {
              field: "type",
              title: "Tipo"
            },
            {
              field: "code",
              title: "Código area"
            },
            {
              field: "phone",
              title: "Teléfono"
            },
            {
              width: 20,
              headerAttributes: {
                "class": "cb-actions"
              },
              attributes: {
                "class": "cb-actions cb-no-wrap"
              },
              template: '<button class="btn btn-default btn-sm" title="Editar" data-target="\\#addressForm" data-toggle="modal"><span class="fa fa-pencil fa-fw"></span></button> <button class="btn btn-default btn-sm" title="Eliminar"><span class="fa fa-times fa-fw"></span></button>'
            }
          ],
          toolbar: '<button class="btn btn-default" data-target="\\#addressForm" data-toggle="modal"><span class="fa fa-plus"></span> Agregar</button>'
        };
        $scope.documents = {
          dataSource: {
            transport: {
              read: {
                url: "../../mocks/prestamos-documentos.json",
                contentType: "application/json; charset=utf-8",
                dataType: "json"
              }
            }
          },
          scrollable: false,
          columns: [{
              field: "default",
              title: "&nbsp;",
              width: 30,
              headerAttributes: {
                style: "text-align:center;"
              },
              attributes: {
                class: "text-center"
              },
              template: '#if (data.status=="uploaded") {# <span class=\"fa fa-check-circle text-success\" title="Subida"></span> # } # #if (data.status!="uploaded") {# <span class=\"fa fa-times-circle text-danger\" title="Por subir"></span> # } #'
            }, {
              field: "name",
              title: "Nombre"
            },
            {
              width: 20,
              headerAttributes: {
                "class": "cb-actions"
              },
              attributes: {
                "class": "cb-actions cb-no-wrap"
              },
              template: '<button class="btn btn-default btn-sm" title="Subir archivo"><span class="fa fa-upload fa-fw"></span></button> <button class="btn btn-default btn-sm" title="Eliminar"><span class="fa fa-times fa-fw"></span></button>'
            }
          ]
        };
        $scope.find = function() {
          $scope.showResults = true;
        };
        $scope.filters = {
          field: [{
              label: "Nombre",
              id: 3
            },
            {
              label: "CURP",
              id: 3
            }
          ]
        };
        $scope.gotoSearch = function(url) {
          $scope.goto('prospectos.html');
        };
        $scope.goto = function(url) {
          location.href = url;
        };
        $scope.header = {
          primaryText: 'Tapia Andrade Viviana María',
          secondaryText: '#1234567890',
          fields: [{
              label: 'Producto',
              value: 'Termina tu casa',
              opened: true
            },
            {
              label: 'RFC',
              value: '0987654321',
              opened: true
            },
            {
              label: 'Creado',
              value: '12-12-2015',
              opened: true
            },
            {
              label: 'Estado',
              value: 'Vigente',
              opened: true
            },
            {
              label: 'Fecha de nacimiento',
              value: '2018-01-01',
              opened: false
            },
            {
              label: 'Género',
              value: 'Femenino',
              opened: false
            },
            {
              label: 'Estado civil',
              value: 'Casado/a',
              opened: false
            },
            {
              label: 'País de nacionalidad',
              value: 'México',
              opened: false
            },
            {
              label: 'Estado de nacimiento',
              value: 'AGUASCALIENTES',
              opened: false
            }
          ],
          actions: [{
              label: 'Sincronizar móvil',
              opened: false,
              click: function() {

              }
            }
          ]
        };
        $scope.homeTypes = [
          {
            value: 'Propia',
            label: 'Propia'
          },
          {
            value: 'Rentada',
            label: 'Rentada'
          },
          {
            value: 'Pagándola',
            label: 'Pagándola'
          },
          {
            value: 'De familiares',
            label: 'De familiares'
          },
          {
            value: 'Otro',
            label: 'Otro'
          }
        ];
        $scope.identityTypes = [
          {
            value: 'INE',
            label: 'INE'
          },
          {
            value: 'Pasaporte',
            label: 'Pasaporte'
          },
          {
            value: 'Otro',
            label: 'Otro'
          }
        ];
        $scope.selectedField = $scope.filters.field[0];
        $scope.setField = function(field) {
          $scope.selectedField = field;
        };
        $scope.showModal = function(selector) {
          $('#' + selector).modal();
          if (selector == 'chart') {
            $timeout(function() {
              $scope.chartVisible = true;
            }, 300);
          }
        };
        $scope.states = [
          { value: "AGS", label: "AGUASCALIENTES" },
          { value: "BC", label: "BAJA CALIFORNIA" },
          { value: "BCS", label: "BAJA CALIFORNIA S" },
          { value: "CMP", label: "CAMPECHE" },
          { value: "COA", label: "COAHUILA" },
          { value: "COL", label: "COLIMA" },
          { value: "CHI", label: "CHIHUAHUA" },
          { value: "CHS", label: "CHIAPAS" },
          { value: "CMX", label: "CIUDAD DE MEXICO" },
          { value: "DGO", label: "DURANGO" },
          { value: "GRO", label: "GUERRERO" },
          { value: "GTO", label: "GUANAJUATO" },
          { value: "HGO", label: "HIDALGO" },
          { value: "JAL", label: "JALISCO" },
          { value: "MCH", label: "MICHOACAN" },
          { value: "MEX", label: "ESTADO DE MEXICO" },
          { value: "MOR", label: "MORELOS" },
          { value: "NAY", label: "NAYARIT" },
          { value: "NL", label: "NUEVO LEON" },
          { value: "OAX", label: "OAXACA" },
          { value: "PUE", label: "PUEBLA" },
          { value: "QR", label: "QUINTANA ROO" },
          { value: "QRO", label: "QUERETARO" },
          { value: "SIN", label: "SINALOA" },
          { value: "SLP", label: "SAN LUIS POTOSI" },
          { value: "SON", label: "SONORA" },
          { value: "TAB", label: "TABASCO" },
          { value: "TLX", label: "TLAXCALA" },
          { value: "TMS", label: "TAMAULIPAS" },
          { value: "VER", label: "VERACRUZ" },
          { value: "YUC", label: "YUCATAN" },
          { value: "ZAC", label: "ZACATECAS" }
        ];
        $scope.validateCurp = function() {
          messages.alert('Validación CURP exitosa').then(function() {
            location.href = 'prospecto-cliente.html';
          });
        };
        $scope.validateProviders = function() {
          $('#validationProgress').modal();
          $timeout(function() {
            $('#validationProgress').modal('hide');
            $scope.params = $scope.params || {};
            $scope.params.active = 'indicators';
            $scope.params.step = 'validated';
            $scope.params.tabs = 'indicators,credit,business,analysis,references,beneficiaries'
          }, 2000);
        };
        $scope.loanMotivation = [
          { value: 'Ampliación y/o remodelación', label: 'Ampliación y/o remodelación' },
          { value: 'Capital de trabajo', label: 'Capital de trabajo' },
          { value: 'Colegiatura', label: 'Colegiatura' },
          { value: 'Compra de activos', label: 'Compra de activos' },
          { value: 'Consumo', label: 'Consumo' },
          { value: 'Consumo dirigido', label: 'Consumo dirigido' },
          { value: 'Inicio de operaciones', label: 'Inicio de operaciones' },
          { value: 'Sustitución de deuda', label: 'Sustitución de deuda' }
        ];
        $scope.loanTypes = [
          { value: 'Mensual', label: 'Mensual' },
          { value: 'Quincenal', label: 'Quincenal' },
          { value: 'Semanal', label: 'Semanal' }
        ];
        $scope.knownBy = [
          { value: 'Visita de especialista', label: 'Visita de especialista' },
          { value: 'Publicidad', label: 'Publicidad' },
          { value: 'Recomendación', label: 'Recomendación' },
          { value: 'Redes Sociales', label: 'Redes Sociales' },
          { value: 'Evento', label: 'Evento' },
          { value: 'Página web', label: 'Página web' },
          { value: 'Otros', label: 'Otros' }
        ];
        $scope.activate();
        $scope.$watch('address.postalCode', function(value) {
          if (value && value.length>=5) {
            $scope.address = $scope.address || {};
            $scope.address.state = 'AGUASCALIENTES';
            $scope.address.delegation = 'San José de Gracia';
            $scope.address.municipality = 'San José';
            $scope.address.locality = 'San José';
          }
        });
      }
    ]);

  //Inicializa angular
  angular.bootstrap(document, ['app']);
});
