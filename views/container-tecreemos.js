require.config(requireConfig);
window.name = "NG_DEFER_BOOTSTRAP!";

require(['jquery', 'angular', 'cobis/messages', 'kendo', 'bootstrap'], function($, angular, messages) {
  'use strict';

  var $html = angular.element(document.getElementsByTagName('html')[0]),
    app = angular.module('app', ['kendo.directives']);
  app
    .controller('ContainerController', function($scope, $http, $log, $timeout) {
      var Favorites = function($scope) {
          var self = this;
          self.addFolder = function() {
            messages.prompt('Ingrese un nombre', 'Agregar nueva carpeta').then(function(response) {
              if (response.buttonIndex == 1 && response.input) {
                //TODO: Implement
                console.log('Carpeta ' + response.input + ' ha sido agregada.');
                self.menu.items.children.push({
                  "id": 4,
                  "label": response.input,
                  "children": []
                });
              }
            });
          };
          self.draggableHint = function(context) {
            return $("#panel-favorites-draggable").clone().text(context.text());
          };
          self.menu = new Menu('../mocks/favorites.json', $scope);
          self.onDrop = function(e) {
            var draggingId = $(e.draggable.currentTarget).data('id'),
              dropTargetId = $(e.dropTarget).data('id');
            console.log('Item arrastrado:' + draggingId + ' a carpeta ' + dropTargetId);
            //TODO: Implement
          };
          self.removeFolder = function() {
            messages.confirm('Esta seguro de eliminar la carpeta actual y todos sus items?', 'Confirmación').then(function(response) {
              if (response.buttonIndex == 1) {
                //TODO: Implement
              }
            });
          };
        },
        Menu = function(url, $scope) {
          var self = this;
          self.crawl = function(nodes, query) {
            var items = [];
            if ($.trim(query).length > 0) {
              $.each(nodes, function() {
                if (this.label.toLowerCase().indexOf(query.toLowerCase()) != -1 && this.url && this.url.length > 0) {
                  items.push(this);
                }
                if (this.children && this.children.length > 0) {
                  $.merge(items, self.crawl(this.children, query));
                }
              });
            }
            return items;
          };
          self.currentGroup = null;
          self.load = function() {
            return $http({
                url: url
              })
              .then(function(response) {
                if (response.data.success) {
                  var items = response.data.data;
                  items.parent = null;
                  self.items = items;
                  self.setCurrentItem(items);
                }
              });
          };
          self.items = [];
          self.isSearching = function(value) {
            self.searching = value;
            if (value && !self.currentGroup.id || (self.currentGroup.id && self.currentGroup.id != 'searchResults')) {
              self.tempCurrentGroup = self.currentGroup;
              self.currentGroup = self.searchResults;
            } else if (self.searchResults.children.length == 0) {
              self.currentGroup = self.tempCurrentGroup;
            }
          };
          self.search = function(query) {
            self.searchResults.children = self.crawl(self.items.children, query);
          };
          self.searchResults = {
            "label": "Resultados de búsqueda",
            "id": "searchResults",
            "root": true,
            "children": []
          };
          self.setCurrentItem = function(item, newTab) {
            if (item.children && item.children.length > 0) {
              if (!item.root && !item.parent) {
                item.parent = self.currentGroup || null;
              }
              self.currentGroup = item;
            } else if (item.url) {
              $scope.tabs.setCurrentItem(item, newTab);
            } else if (item.children && item.children.length == 0 && !item.url) {
              messages.alert('El elemento seleccionado no tiene hijos.');
            }
            //Si el ancho de la pagina es menor a 690 cierra automaticamente el panel
            if ($(window).width() <= 690) {
              $scope.tools.toggleCurrentItem(null);
            }
          };
          self.toggleFavorite = function(item) {
            item.favorite = !item.favorite;
            if (item.favorite) {
              $scope.favorites.menu.items.children.push(item);
            } else {
              var index = $scope.favorites.menu.items.children.indexOf(item);
              $scope.favorites.menu.items.children.splice(index, 1);
            }
          };
        },
        Tabs = function() {
          var self = this;
          self.currentIndex = null;
          self.currentItem = null;
          self.getCurrentIndex = function() {
            var currentIndex = -1;
            $.each(self.items, function(index) {
              if (this == self.currentItem) {
                currentIndex = index;
                return false;
              }
            });
            return currentIndex;
          };
          self.items = [];
          self.remove = function(index) {
            if (self.items.length > 1) {
              if (index > 0 && index == self.getCurrentIndex()) {
                self.setCurrentItem(index - 1);
              } else if (index == 0 && index == self.getCurrentIndex()) {
                self.setCurrentItem(index + 1);
              }
            }
            self.items.splice(index, 1);
            $timeout(function() {
              $scope.tabsScroll();
            }, 300);
          };
          self.setCurrentItem = function(menuItem, newTab) {
            if (typeof menuItem == 'object') {
              var tab = angular.copy(menuItem);
              tab.loading = true;
              if (newTab || self.items.length == 0) {
                self.items.push(tab);
              } else if (!newTab) {
                var currentIndex = self.getCurrentIndex();
                if (currentIndex >= 0) {
                  self.items[currentIndex] = tab;
                }
              }
            } else {
              tab = self.items[menuItem];
            }
            self.currentItem = tab;
            $timeout(function() {
              $scope.tabsScroll();
            }, 300);
          };
          self.stopLoading = function(tab) {
            tab.loading = false;
          };
        },
        Tools = function() {
          var self = this;
          self.currentItem = null;
          self.hideCurrentItem = function(item, e) {
            if (e) e.preventDefault();
            self.currentItem = null;
          };
          self.toggleCurrentItem = function(item, e) {
            if (e) e.preventDefault();
            self.currentItem = self.currentItem && self.currentItem === item ? null : item;
          };
          //Principal
          self.menu = {
            'id': 'menu',
            'label': 'Menu',
            'iconClass': 'fa fa-bars',
            'active': false
          };
          self.mainItems = [{
              'id': 'favorites',
              'label': 'Favoritos',
              'iconClass': 'fa fa-star',
              'active': false
            },
            {
              'id': 'settings',
              'label': 'Preferencia de usuario',
              'iconClass': 'fa fa-user',
              'active': false
            },
            {
              'id': 'info',
              'label': 'Información',
              'iconClass': 'fa fa-info-circle',
              'active': false
            }
          ];

          //Favoritos
          self.items = [{
              'id': 'saving-deposit-c',
              'label': 'Depósito ahorros con libreta',
              'iconClass': 'cb-deposit-saving-c',
              'active': false,
              'url': 'caja-deposito-ahorros.html'
            },
            {
              'id': 'saving-withdraw-c',
              'label': 'Retiro ahorros con libreta',
              'iconClass': 'cb-withdraw-saving-c',
              'active': false
            },
            {
              'id': 'saving-deposit-s',
              'label': 'Depósito ahorros sin libreta',
              'iconClass': 'cb-deposit-saving-s',
              'active': false,
              'url': 'caja-deposito-ahorros.html'
            },
            {
              'id': 'saving-withdraw-s',
              'label': 'Retiro ahorros sin libreta',
              'iconClass': 'cb-withdraw-saving-s',
              'active': false
            },
            {
              'id': 'saving-credit-note',
              'label': 'Nota de crédito ahorros',
              'iconClass': 'cb-credit-note-saving',
              'active': false
            },
            {
              'id': 'check-deposit',
              'label': 'Depósito corriente',
              'iconClass': 'cb-deposit-checking',
              'active': false
            },
            {
              'id': 'check-pay',
              'label': 'Pago de cheque',
              'iconClass': 'cb-check-pay',
              'active': false
            },
            {
              'id': 'checking-credit-note',
              'label': 'Nota de crédito corriente',
              'iconClass': 'cb-credit-note-checking',
              'active': false
            },
            {
              'id': 'transfer',
              'label': 'Transferencia entre cuentas',
              'iconClass': 'cb-transfer',
              'active': false
            },
            {
              'id': 'collect',
              'label': 'Recaudos',
              'iconClass': 'cb-money',
              'active': false
            },
            {
              'id': 'casher',
              'label': 'Cajero',
              'iconClass': 'fa fa-calculator',
              'active': false
            }
          ];

          self.current = self.mainItems;
          self.setCurrent = function(items) {
            self.current = items;
            self.currentItem = null;
          };
        },
        User = function() {
          var self = this;
          self.data = {};
          self.load = function() {
            return $.ajax({
                url: '../mocks/user.json',
                dataType: 'json'
              })
              .done(function(response) {
                if (response.success) {
                  self.data = response.data;
                }
              })
              .fail(function(jqXHR, textStatus, thrownError) {
                //$log.error(textStatus);
              });
          };
        };

      $scope.addClass = function(className, e) {
        e.sender.wrapper.addClass(className);
      };
      $scope.tabs = new Tabs();
      $scope.tools = new Tools();
      $scope.favorites = new Favorites($scope);
      $scope.navigation = new Menu('../mocks/menu-tc.json', $scope);
      $scope.lockScreen = {
        isVisible: function(state) {
          $scope.lockScreen.visible = state;
        },
        visible: false,
        unlock: function() {
          //TODO: funcionalidad para reautenticarse
          $scope.lockScreen.isVisible(false);
        }
      };
      $scope.user = new User();
      $scope.splashVisible = true;

      var pagesTabsContainer = angular.element('#pages-tabs > .nav-tabs'),
        positions = [];
      angular.element('#pages-tabs').on('click', '[data-slide="prev"]', function(e) {
        e.preventDefault();
        pagesTabsContainer.animate({
          scrollLeft: positions.pop()
        }, function() {
          $scope.tabsScroll();
        });
      });
      angular.element('#pages-tabs').on('click', '[data-slide="next"]', function(e) {
        e.preventDefault();
        pagesTabsContainer.find('> li').each(function() {
          var button = angular.element(this);
          if (button.offset().left + button.width() > pagesTabsContainer.width()) {
            var buttonLeft = button.offset().left + pagesTabsContainer.scrollLeft() - pagesTabsContainer.offset().left;
            if (pagesTabsContainer.scrollLeft() != positions[positions.length - 1]) {
              positions.push(pagesTabsContainer.scrollLeft());
            }
            pagesTabsContainer.animate({
              scrollLeft: buttonLeft
            }, function() {
              $scope.tabsScroll();
            });
            return false;
          }
        });
      });
      $scope.tabsScroll = function() {
        $scope.$apply(function() {
          $scope.scrollLeft = pagesTabsContainer.scrollLeft() > 0;
          $scope.scrollRight = pagesTabsContainer[0].clientWidth != pagesTabsContainer[0].scrollWidth - pagesTabsContainer.scrollLeft();
        });
      };
      angular.element(window).on('resize', function() {
        $scope.tabsScroll();
      });
      $timeout(function() {
        $scope.tabsScroll();
      }, 300);
      window.tabsScrollTo = function(index) {
        var $container = $('#pages-tabs > .nav-tabs'),
          $tabs = $container.find('> li'),
          $element = $($tabs[index]),
          leftPosition = $element.position().left + $container.scrollLeft(),
          rightPosition = leftPosition + $element.outerWidth() + 2,
          position = rightPosition > $container.width() ? rightPosition - $container.width() : leftPosition;

        $container.animate({
          scrollLeft: position
        });
      };


      //Inicializa
      //Comprueba que cargue todo lo necesario para presentar el UI
      $.when(
        $scope.navigation.load(),
        $scope.favorites.menu.load(),
        $scope.user.load()
      ).done(function() {
        $scope.$apply(function() {
          $scope.splashVisible = false;
        });
      });

      var operators = ['+', '-', 'x', '÷'],
        decimalAdded = false;

      $('#calculator button').on('click', function(e) {
        // Get the input and button values
        var input = document.querySelector('.screen');
        var inputVal = input.innerHTML;
        var btnVal = this.innerHTML;

        // Now, just append the key values (btnValue) to the input string and finally use javascript's eval function to get the result
        // If clear key is pressed, erase everything
        if (btnVal == 'C') {
          input.innerHTML = '';
          decimalAdded = false;
        }

        // If eval key is pressed, calculate and display the result
        else if (btnVal == '=') {
          var equation = inputVal;
          var lastChar = equation[equation.length - 1];

          // Replace all instances of x and ÷ with * and / respectively. This can be done easily using regex and the 'g' tag which will replace all instances of the matched character/substring
          equation = equation.replace(/x/g, '*').replace(/÷/g, '/');

          // Final thing left to do is checking the last character of the equation. If it's an operator or a decimal, remove it
          if (operators.indexOf(lastChar) > -1 || lastChar == '.')
            equation = equation.replace(/.$/, '');

          if (equation)
            input.innerHTML = eval(equation);

          decimalAdded = false;
        }

        // Basic functionality of the calculator is complete. But there are some problems like
        // 1. No two operators should be added consecutively.
        // 2. The equation shouldn't start from an operator except minus
        // 3. not more than 1 decimal should be there in a number

        // We'll fix these issues using some simple checks

        // indexOf works only in IE9+
        else if (operators.indexOf(btnVal) > -1) {
          // Operator is clicked
          // Get the last character from the equation
          var lastChar = inputVal[inputVal.length - 1];

          // Only add operator if input is not empty and there is no operator at the last
          if (inputVal != '' && operators.indexOf(lastChar) == -1)
            input.innerHTML += btnVal;

          // Allow minus if the string is empty
          else if (inputVal == '' && btnVal == '-')
            input.innerHTML += btnVal;

          // Replace the last operator (if exists) with the newly pressed operator
          if (operators.indexOf(lastChar) > -1 && inputVal.length > 1) {
            // Here, '.' matches any character while $ denotes the end of string, so anything (will be an operator in this case) at the end of string will get replaced by new operator
            input.innerHTML = inputVal.replace(/.$/, btnVal);
          }

          decimalAdded = false;
        }

        // Now only the decimal problem is left. We can solve it easily using a flag 'decimalAdded' which we'll set once the decimal is added and prevent more decimals to be added once it's set. It will be reset when an operator, eval or clear key is pressed.
        else if (btnVal == '.') {
          if (!decimalAdded) {
            input.innerHTML += btnVal;
            decimalAdded = true;
          }
        }

        // if any other key is pressed, just append it
        else {
          input.innerHTML += btnVal;
        }

        // prevent page jumps
        e.preventDefault();
      });
    })
    .directive('ngLoad', function() {
      return function(scope, iElement, iAttrs, controller) {
        scope.$watch(iAttrs.pgVisible, function(value) {
          iElement.bind('load', function(evt) {
            scope.$apply(iAttrs.ngLoad);
          });
        });
      };
    });

  //Inicializa
  angular.element().ready(function() {
    angular.resumeBootstrap([app['name']]);
  });
});
