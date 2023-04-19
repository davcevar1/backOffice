require.config(requireConfig);
define(function(require) {
  'use strict';
 

  // Importación de módulos AMD
  var angular = require('angular'),
    kendo = require('kendo'),
    messages = require('cobis/messages'),
    getParams = function() {
      var pairs = location.search.substr(1).split('&');
      var result = {};
      pairs.forEach(function(pair) {
        pair = pair.split('=');
        result[pair[0]] = decodeURIComponent(pair[1] || '');
      });
      return result;
    };

  // Importación no son módulos
  require('bootstrap');
   require('misc/dropzone');

  var app = angular.module('app', ['kendo.directives'])
    .filter('nl2br', function($sce) {
      return function(msg, is_xhtml) {
        var is_xhtml = is_xhtml || true;
        var breakTag = (is_xhtml) ? '<br />' : '<br>';
        var msg = (msg + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + breakTag + '$2');
        return $sce.trustAsHtml(msg);
      }
    })
    .filter('abbrNumber', function() {
      return function(num, fixed) {
        if (num === null || num === undefined) {
          return null;
        } // terminate early
        if (num === 0) {
          return '0';
        } // terminate early
        fixed = (!fixed || fixed < 0) ? 0 : fixed; // number of decimal places to show
        var b = (num).toPrecision(2).split("e"), // get power
          k = b.length === 1 ? 0 : Math.floor(Math.min(b[1].slice(1), 14) / 3), // floor at decimals, ceiling at trillions
          c = k < 1 ? num.toFixed(0 + fixed) : (num / Math.pow(10, k * 3)).toFixed(1 + fixed), // divide by power
          d = c < 0 ? c : Math.abs(c), // enforce -0 is 0
          e = d + ['', 'K', 'M', 'B', 'T'][k]; // append power
        return e;
      }
    })
    .controller('controller', ['$scope', '$http', '$q', '$filter',
      function($scope, $http, $q, $filter) {
        $scope.activate = function() {
          $http.get('../../mocks/canales-usuarios.json')
            .then(function(response) {
              $scope.users = response.data;
            });
          $http.get('../../mocks/mainstreet/countries.json')
            .then(function(response) {
              $scope.countries = response.data;
            });
          $http.get('../../mocks/mainstreet/ofac.json')
            .then(function(response) {
              $scope.ofac = response.data["SOAP-ENV:Envelope"]["SOAP-ENV:Body"]["OSIOFAC.SEARCHRESULTSResponse"]["Searchresultsrs"]["Results"]["Results_Type.ResultsItem"];
            });
          $http.get('../../mocks/mainstreet/bankruptcy.json')
            .then(function(response) {
              $scope.backruptcy = response.data.BankruptcySearch2ResponseEx.response.Records.Record;
            });
          $http.get('../../mocks/mainstreet/liens.json')
            .then(function(response) {
              $scope.lien = response.data.LienJudgmentSearchResponseEx.response.Records.Record;
            });
          $http.get('../../mocks/mainstreet/criminal.json')
            .then(function(response) {
              $scope.criminal = response.data.CrimSearchResponseEx.response.Records.Record;
            });
          $http.get('../../mocks/mainstreet/foreclosure.json')
            .then(function(response) {
              $scope.foreclosure = response.data.ForeclosureSearchResponseEx.response.Records.Record;
            });
          $http.get('../../mocks/mainstreet/uccBusinessMatch.json')
            .then(function(response) {
              $scope.ucc = response.data.UCCSearch2ResponseEx.response.Records.Record;
            });
            Dropzone.autoDiscover = false;
          $(".dropzone").dropzone({
            url: "http://localhost",
            uploadMultiple: true,
            addRemoveLinks: true,
            autoProcessQueue: false,
            acceptedFiles: 'application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            init: function() {
              this.on("error", function(file) {
                if (!file.accepted) {
                  this.removeFile(file);
                  alert('Selected file has not a valid format.');
                }
              });
            }
          });
          $scope.decisionLogic = {
            debits: 8808.68,
            credits: 8343.18
          };
          $scope.decisionLogicBalance = $scope.decisionLogic.credits - $scope.decisionLogic.debits;
          if (location.search) {
            $scope.owner.relationship = location.search.split('=')[1];
          }
          //Urls
          var params = getParams();
          for (var key in params) {
            if (params.hasOwnProperty(key)) {
              $scope.params = $scope.params || {};
              $scope.params[key] = params[key];
            }
          }

          if ($scope.params.status) {
            $scope.header.fields[3].value = $scope.params.status;
          }
          if ($scope.params.documentStatus) {
            $scope.documents.forEach(function(document) {
              document.status = $scope.params.documentStatus;
            });
          }
          if ($scope.params.adddocuments == 'true') {
            $scope.documents.push({name: 'Additional primary ID', files: 1, editable:false, new: true});
          }
        };
        $scope.addDocument = function(name) {
          $scope.documents.push({name:name, files: 0, editable:true, new: true});
          $scope.documentName = '';
        }
        $scope.bankAccounts = {
          dataSource: {
            data: [
              {number:'00043523453', bankName: 'American City Bank'}
            ]
          },
          scrollable: false,
          selectable: true,
          columns: [{
              field: "number",
              title: "Number"
            },
            {
              field: "bankName",
              title: "Bank Name"
            }
          ]
        };
        Dropzone.autoDiscover = false;
    var myDropzone = new Dropzone("#my-awesome-dropzone", {
      addRemoveLinks: true,
      url: "/file-upload"
    });
    
    // Funciones de eventos de Dropzone
    myDropzone.on("addedfile", function(file) {
      console.log("File added: " + file.name);
    });
    
    myDropzone.on("removedfile", function(file) {
      console.log("File removed: " + file.name);
    });
        $scope.contextMenuOptions = {
          filter: ".cb-menu-options",
          showOn: 'click',
          alignToAnchor: true
        }
        $scope.documents = [
          {name:'One acceptable valid /unexpired primary ID', files: 1, editable: false, new: false},
          {name:'One acceptable valid /unexpired secondary ID', files: 1, editable: false, new: false},
          {name:'Proof of home address (utility bill, lease, etc.)', files: 1, editable: false, new: false}
        ];
        $scope.exists = function (items, value) {
          var items = items.split(',');
          return items.indexOf(value)>=0;
        }
        $scope.find = function() {
          $scope.showResults = true;
        };
        $scope.filters = {
          field: [{
              label: "SSN",
              id: 1
            },
            {
              label: "Tax ID",
              id: 3
            },
            {
              label: "Application ID",
              id: 3
            },
            {
              label: "Core ID",
              id: 3
            }
          ]
        };
        $scope.gotoSearch = function() {
          location.href = 'search.html';
        };
        $scope.uploadFiles = function() {
          var dropzones = $('.dropzone').map(function() {
            return Dropzone.forElement(this);
          }).toArray();
          $scope.filesUpload.files = [];
          dropzones.forEach(function(dropzone, dropzoneIndex) {
            $scope.filesUpload.count += dropzone.files.length;
            $scope.filesUpload.files = $scope.filesUpload.files.concat(dropzone.files);
          });
          $scope.simulateUpload();
        }
        $scope.header = {
          primaryText: 'Jeniffer C, Thompson',
          secondaryText: '#ACCO.1.08.003688 - Personal',
          hideMoreInfo: true,
          fields: [{
              label: 'Office',
              value: 'Matriz',
              opened: true
            },
            {
              label: 'Oficial',
              value: 'Maritza Martinez',
              opened: true
            },
            {
              label: 'Submission date',
              value: '12-12-2015',
              opened: true
            },
            {
              label: 'Status',
              value: 'Pending',
              opened: true
            },
            {
              label: 'Date of birth',
              value: '2018-01-01',
              opened: false
            }
          ],
          actions: []
        };
        $scope.selectedField = $scope.filters.field[0];
        $scope.setField = function(field) {
          $scope.selectedField = field;
        }
        $scope.showModal = function(selector) {
          $('#' + selector).modal();
        }
        $scope.addBusinessName = function(person) {
          person.businessNames = person.businessNames || [];
          person.businessNames.push({
            id: (new Date()).getTime(),
            value: ''
          });
        };
        $scope.addPhone = function(phones) {
          phones.push({
            type: '',
            number: ''
          });
        }
        $scope.removeDocument = function(document, event) {
          event.stopPropagation();
          $scope.documents.splice($scope.documents.indexOf(document), 1);
        };
        $scope.removeItem = function(array, item) {
          array.splice(array.indexOf(item), 1);
        };
        $scope.uploadFiles = function() {
          var dropzones = $('.dropzone').map(function() {
            return Dropzone.forElement(this);
          }).toArray();
          $scope.filesUpload.files = [];
          dropzones.forEach(function(dropzone, dropzoneIndex) {
            $scope.filesUpload.count += dropzone.files.length;
            $scope.filesUpload.files = $scope.filesUpload.files.concat(dropzone.files);
          });
          $scope.simulateUpload();
        }
        $scope.toggleDetail = function(type, item) {
          if (item.open) {
            item.open = false;
          } else {
            switch (type) {
              case 'bankruptcy':
                $http.get('mocks/bankruptcyReport.json')
                  .then(function(response) {
                    var data = response.data.BankruptcyReport2ResponseEx.response.BankruptcyReportRecords.BankruptcyReportRecord,
                      records = data.length > 0 ? data : [data];
                    var detail = records.find(function(record) {
                      return record.CaseNumber == item.Bankruptcy.CaseNumber;
                    });
                    if (detail) {
                      var template = kendo.template($("#bankruptcy-detail-template").html());
                      var content = template({
                        Bankruptcy: detail
                      });
                      item.detail = $sce.trustAsHtml(content);
                      item.open = true;
                    }
                  });
                break;
              case 'lien':
                $http.get('mocks/lienReport.json')
                  .then(function(response) {
                    var data = response.data.LienJudgmentReportResponseEx.response.LienJudgments.LienJudgment,
                      records = data.length > 0 ? data : [data];
                    var detail = records.find(function(record) {
                      return record.CaseNumber == item.CaseNumber;
                    });
                    if (detail) {
                      var template = kendo.template($("#lien-detail-template").html());
                      var content = template(detail);
                      item.detail = $sce.trustAsHtml(content);
                      item.open = true;
                    }
                  });
                break;
              case 'criminal':
                $http.get('mocks/criminalReport.json')
                  .then(function(response) {
                    var data = response.data.CrimReportResponseEx.response.CriminalRecords.CriminalRecord,
                      records = data.length > 0 ? data : [data];
                    var detail = records.find(function(record) {
                      return record.CaseNumber == item.CaseNumber;
                    });
                    if (detail) {
                      var template = kendo.template($("#criminal-detail-template").html());
                      var content = template(detail);
                      item.detail = $sce.trustAsHtml(content);
                      item.open = true;
                    }
                  });
                break;
              case 'foreclosure':
                $http.get('mocks/foreclosureReport.json')
                  .then(function(response) {
                    var data = response.data.ForeclosureReportResponseEx.response.Foreclosures.Foreclosure,
                      records = data.length > 0 ? data : [data];
                    var detail = records.find(function(record) {
                      return record.CaseNumber == item.CaseNumber;
                    });
                    if (detail) {
                      var template = kendo.template($("#foreclosure-detail-template").html());
                      var content = template(detail);
                      item.detail = $sce.trustAsHtml(content);
                      item.open = true;
                    }
                  });
                break;
              case 'ucc':
                $http.get('mocks/uccBusinessReport.json')
                  .then(function(response) {
                    var data = response.data.UCCReport2ResponseEx.response.UCCFilings.UCCFiling,
                      records = data.length > 0 ? data : [data];
                    var detail = records.find(function(record) {
                      return record.TMSId == item.TMSId;
                    });
                    if (detail) {
                      var template = kendo.template($("#ucc-detail-template").html());
                      var content = template(detail);
                      item.detail = $sce.trustAsHtml(content);
                      item.open = true;
                    }
                  });
                break;
            }
          }
        };
        $scope.getSSN = function(value) {
          if (!$scope.clearSSN) {
            return 'XXX-XX-X' + value.substr(value.length - 3);
          } else {
            return value;
          }
        }
        $scope.inOutActivities = [
          {
            type: "Cash"
          },
          {
            type: "Checks"
          },
          {
            type: "Debit card"
          },
          {
            type: "Wires"
          },
          {
            type: "Internal transfers"
          },
          {
            type: "Protransfers"
          },
          {
            type: "ACH"
          },
          {
            type: "Others"
          }
        ];
        $scope.inOutNumOptions = {
          min: 0,
          spinners: false,
          decimals: 0,
          format: "n0"
        }
        $scope.inOutValueOptions = {
          min: 0,
          spinners: false,
          decimals: 0,
          format: "c0"
        }
        $scope.getTotal = function(type) {
          var value = 0;
          $scope.inOutActivities.forEach(function(inOutActivity) {
            if (inOutActivity[type]) {
              value += Number(inOutActivity[type]);
            }
          });
          return value;
        }
        $scope.getValue = function(value, min, max) {
          if (value <= min) {
            return 'Less than ' + value + ' year';
          } else if (value >= max) {
            return value + ' or more years';
          } else {
            return value + ' years';
          }
        };
        $scope.owner = {
          firstName: 'Jennifer',
          middleName: 'C',
          lastName: 'Thompson',
          referrer: 'Jennifer Adams',
          citizenshipCountry: 'US',
          email: 'jennifer.thompson@hotmail.com',
          ssn: '123-45-6789',
          dayOfBirth: new Date('1960-01-01'),
          phones: [{
            type: 'Home',
            number: '908 456 7890'
          }],
          phone: '908 456 7890',
          street: '123 N Washington St.',
          city: 'Miami',
          state: 'FL',
          zip: '33101',
          country: 'US',
          income: '80K',
          ownershipPercentage: 15,
          employmentType: [
            'Employed'
          ],
          estimatedIncome: '4',
          employer: [
            'ABC Company'
          ],
          beneficiaries: [{
            "lastName": "Thompson",
            "firstName": "Jeniffer",
            "middleName": "C",
            "ssn": "123-45-6231",
            "phone": "(908) 207 8822",
            "address": "234 Main St., NJ 20435, United States",
            "dayOfBirth": "01/01/1970"
          }],
          relationship: 'Personal',
          notShowMailAddress: true,
          businessNames: [{
            id: (new Date()).getTime(),
            value: ''
          }]
        }
        $scope.owners = {
          dataSource: {
            transport: {
              read: {
                url: "../../mocks/mainstreet/account-owners.json",
                contentType: "application/json; charset=utf-8",
                dataType: "json"
              }
            }
          },
          scrollable: false,
          selectable: true,
          change: function() {
            $('#owner').modal();
          },
          columns: [{
              field: "lastName",
              title: "Name",
              width: 180,
              template: "#: firstName # #: middleName #, #: lastName #"
            },
            {
              field: "dob",
              title: "Date of Birth"
            },
            {
              field: "phone",
              title: "Phone"
            },
            {
              field: "address",
              title: "Address"
            }
          ]
        };
        $scope.beneficiaries = {
          dataSource: {
            transport: {
              read: {
                url: "../../mocks/mainstreet/account-beneficiaries.json",
                contentType: "application/json; charset=utf-8",
                dataType: "json"
              }
            }
          },
          scrollable: false,
          selectable: true,
          change: function() {
            $('#beneficiary').modal();
          },
          columns: [{
              field: "lastName",
              title: "Name",
              width: 180,
              template: "#: firstName # #: middleName #, #: lastName #"
            },
            {
              field: "dob",
              title: "Date of Birth"
            },
            {
              field: "phone",
              title: "Phone"
            },
            {
              field: "address",
              title: "Address"
            }
          ]
        };
        $scope.business = {
          businessName: "Frank's Auto Repair Inc.",
          dba: "Frank's Auto Repair",
          taxId: "12-123-3456",
          website: "http://www.franksrepair.com",
          businessIndustry: 2,
          yearsInBusiness: 5,
          annualRevenue: 120000,
          annualExpenses: 100000,
          street: '123 N Washington St.',
          city: 'Miami',
          state: 'FL',
          zip: '33101',
          country: 'US',
          phones: [{
            type: "work",
            number: "(908) 345 4567"
          }],
          topClients: [
            {id:1, value: 'HHM'},
            {id:1, value: 'Constructora Garcia'}
          ],
          topVendors: [
            {id:1, value: 'Amazon'},
            {id:1, value: 'Aliexpress'}
          ]
        };
        $scope.addTopClients = function(business) {
          business.topClients = business.topClients || [];
          business.topClients.push({
            id: (new Date()).getTime(),
            value: ''
          });
        };
        $scope.addTopVendors = function(business) {
          business.topVendors = business.topVendors || [];
          business.topVendors.push({
            id: (new Date()).getTime(),
            value: ''
          });
        };
        $scope.formatCurrency = function(value, min, max) {
          if (value >= min && value <= max) {
            return $filter('currency')(value);
          } else if (value < min) {
            return 'Less than ' + $filter('currency')(value);
          } else if (value > max) {
            return $filter('currency')(value) + ' or more';
          }
        }
        $scope.signers = {
          dataSource: {
            transport: {
              read: {
                url: "../../mocks/mainstreet/account-signers.json",
                contentType: "application/json; charset=utf-8",
                dataType: "json"
              }
            }
          },
          scrollable: false,
          selectable: true,
          change: function() {
            $('#beneficiary').modal();
          },
          columns: [{
              field: "lastName",
              title: "Name",
              width: 180,
              template: "#: firstName # #: middleName #, #: lastName #"
            },
            {
              field: "dob",
              title: "Date of Birth"
            },
            {
              field: "phone",
              title: "Phone"
            },
            {
              field: "address",
              title: "Address"
            }
          ]
        };
        $scope.request = {
          relationship: 'Personal',
          notShowMailAddress: true
        };
        $scope.requests = {
          dataSource: {
            transport: {
              read: {
                url: "../../mocks/originacion-requests.json",
                contentType: "application/json; charset=utf-8",
                dataType: "json"
              }
            }
          },
          scrollable: false,
          selectable: true,
          change: function() {
            location.href = 'account-view.html';
          },
          columns: [{
              field: "applicationID",
              template: $("#request").length > 0 ? kendo.template($("#request").html()) : kendo.template('')
            },
            {
              width: 20,
              headerAttributes: {
                "class": "cb-actions"
              },
              attributes: {
                "class": "cb-actions cb-no-wrap"
              },
              template: '<button class="btn btn-default cb-menu-options"><span class="fa fa-ellipsis-v fa-fw"></span></button>'
            }
          ],
          toolbar: '<div class="cb-flex cb-middle"><button class="btn btn-primary" ng-if="isAdvanced"><span class="fa fa-search"></span> Search</button><div class="cb-flex cb-middle cb-right cb-grow text-right"><div class="text-muted small" style="margin-right:10px;">Export:</div><button class="btn btn-default" style="margin:0;" title="Export PDF"><span class="fa fa-file-pdf-o" style="margin:0;"></span></button><button class="btn btn-default" style="margin:0;" title="Export Excel"><span class="fa fa-file-excel-o" style="margin:0;"></span></button></div></div>'
        };
        $scope.requestType = 'from-loan';
        $scope.shareholder = {};
        $scope.shareholders = {
          dataSource: {
            transport: {
              read: {
                url: "../../mocks/mainstreet/account-owners.json",
                contentType: "application/json; charset=utf-8",
                dataType: "json"
              }
            }
          },
          scrollable: false,
          selectable: true,
          change: function() {
            $('#owner').modal();
          },
          columns: [{
              field: "lastName",
              title: "Name",
              width: 180,
              template: "#: firstName # #: middleName #, #: lastName #"
            },
            {
              field: "dob",
              title: "Date of Birth"
            },
            {
              field: "phone",
              title: "Phone"
            },
            {
              field: "address",
              title: "Address"
            },
            {
              field: "ownership",
              title: "Ownership"
            }
          ]
        };
        $scope.activate();
      }
    ]);
    

  //Inicializa angular
  angular.bootstrap(document, ['app']);
});
