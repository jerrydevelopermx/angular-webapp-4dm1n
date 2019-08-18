(function(){
    'use strict';
    angular.module('webApp')

    .component('appNCols', {
        bindings: {
          data: '=',
        },
        templateUrl: 'views/common/content-n-cols.html',
        controller: componentController
      });

      function componentController($scope){
        var vm = this;

        vm.$onInit = function(){
        //  console.log(vm.data)
        }
      }

})();
