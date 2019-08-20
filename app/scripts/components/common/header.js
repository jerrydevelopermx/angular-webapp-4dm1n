(function(){
    'use strict';
    angular.module('webApp')

    .component('appHeader', {
        bindings: {
          data: '<',
        },
        templateUrl: 'views/common/header.html',
        controller : function($rootScope, $scope, $state, $mdSidenav, Auth) {
          var vm = this;
          vm.loggedUser = false;

          vm.$onInit = function(){
          }

          vm.toggleItemsList = function() {
              $mdSidenav('left').toggle();
          }

          $rootScope.$on('userLogged', function(event, params){
            vm.loggedUser = params.status;
          });

          vm.logout = function(){
            Auth.logout();
            $scope.$emit("userLogged", { status: false });
            $state.go('login');
          }
        }
      })
})();
