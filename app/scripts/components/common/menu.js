(function(){
    'use strict';
    angular.module('webApp')

    .component('appMenu', {
        bindings: {
          data: '<',
        },
        templateUrl: 'views/common/menu.html',
        controller: componentController
      })

      function componentController($scope, $timeout, $mdSidenav){

        var vm = this;
        vm.toggleLeft = buildDelayedToggler('left');
        vm.toggleRight = buildToggler('right');
        vm.isOpenRight = function() {
          return $mdSidenav('right').isOpen();
        };

        vm.menuClicked = function(){
          $mdSidenav('right').close()
            .then(function() {
              //return;
            });
        };

        function debounce(func, wait, context) {
          var timer;
          return function debounced() {
            var context = $scope,
              args = Array.prototype.slice.call(arguments);
            $timeout.cancel(timer);
            timer = $timeout(function() {
              timer = undefined;
              func.apply(context, args);
            }, wait || 10);
          };
        }

        function buildDelayedToggler(navID) {
          return debounce(function() {
            // Component lookup should always be available since we are not using `ng-if`
            $mdSidenav(navID)
              .toggle()
              .then(function() {
                //$log.debug("toggle " + navID + " is done");
              });
          }, 0);
        }

        function buildToggler(navID) {
          return function() {
            // Component lookup should always be available since we are not using `ng-if`
            $mdSidenav(navID)
              .toggle()
              .then(function() {
              //  $log.debug("toggle " + navID + " is done");
              });
          }
        }
      }
})();
