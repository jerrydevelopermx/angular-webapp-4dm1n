(function(){
    'use strict';
    angular.module('webApp')

    .component('appHeader', {
        bindings: {
          data: '<',
        },
        templateUrl: 'views/common/header.html',
        controller : function($mdSidenav) {
          var vm = this;

          vm.$onInit = function(){

          }

          vm.toggleItemsList = function() {
              $mdSidenav('left').toggle();
          }
        }
      })
})();
